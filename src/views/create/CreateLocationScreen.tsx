import React, { useEffect, useState } from "react";
import {
	Box,
	Breadcrumbs,
	Collapse,
	Divider,
	IconButton,
	InputAdornment,
	InputBase,
	OutlinedInput,
	Stack,
	Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "../../components/link/Link";
import { Record } from "../../types/Record";

import MenuIcon from "@mui/icons-material/Grain";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

import SaveButton from "../../components/button/SaveButton";
import { SearchBox } from "../../components/input/SearchBar";

interface FormData {
	latitude: string;
	longitude: string;
	address: string;
}

const CreateLocationScreen: React.FC = () => {
	const { handleSubmit, control, setValue, getValues } = useForm<FormData>();
	const [mapUrl, setMapUrl] = useState<string>(
		"https://www.openstreetmap.org/export/embed.html?bbox=-74.0060%2C40.7128%2C-73.9352%2C40.7306&layer=mapnik"
	);
	const [showCoordinates, setShowCoordinates] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const locationData = location.state || {};
	const isEditing = locationData?.selectedItem;

	const inputStyle = {
		borderRadius: 20,
		maxWidth: 140,
		"& input": {
			paddingY: "6px",
			fontSize: "small",
		},
	};

	const splitUrl = (url: string) => {
		if (url.startsWith("geo:")) {
			const match = url.match(/geo:([^,]+),([^?]+)/);
			if (match) {
				const [, latitude, longitude] = match;
				return [latitude, longitude];
			}
		} else if (url.startsWith("http://maps.apple.com/")) {
			const match = url.match(/ll=([^,]+),([^&]+)/);
			if (match) {
				const [, latitude, longitude] = match;
				return [latitude, longitude];
			}
		} else if (url.startsWith("https://www.google.com/maps/search")) {
			const match = url.match(/query=([^,]+),([^&]+)/);
			if (match) {
				const [, latitude, longitude] = match;
				return [latitude, longitude];
			}
		}
		return ["", ""];
	};

	useEffect(() => {
		if (isEditing) {
			const [latitude, longitude] = splitUrl(isEditing.value);
			setValue("latitude", latitude);
			setValue("longitude", longitude);
			setMapUrl(
				`https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&layer=mapnik`
			);
		}
	}, [isEditing]);

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		const record: Record = {
			type: "Location",
			value: createUriLocation(formData.latitude, formData.longitude),
		};

		const state = {
			records: locationData.records || [],
			selectedItem: isEditing || {},
			newItem: record,
		};

		navigate("..", { relative: "path", state });
	};

	const handleCheckCoordinates = async () => {
		const address = getValues("address");
		if (address) {
			const { latitude, longitude } = await fetchCoordinates(address);
			setValue("latitude", latitude);
			setValue("longitude", longitude);
			setMapUrl(
				`https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&layer=mapnik`
			);
		} else {
			alert("Please enter an address.");
		}
	};

	const fetchCoordinates = async (address: string) => {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
		);
		const data = await response.json();

		if (data.length > 0) {
			const location = data[0];
			return { latitude: location.lat, longitude: location.lon };
		} else {
			alert("No results found for this address.");
			return { latitude: "0", longitude: "0" };
		}
	};
	const toggleCoordinates = () => {
		setShowCoordinates(!showCoordinates);
	};

	const handleRedirectToMaps = () => {
		const { latitude, longitude } = getValues();
		if (!latitude || !longitude) {
			return;
		} else {
			window.location.href = createUriLocation(latitude, longitude);
		}
	};

	const createUriLocation = (latitude: string, longitude: string) => {
		if (navigator.userAgent.match(/Android/i)) {
			return `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
		} else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
			return `http://maps.apple.com/?ll=${latitude},${longitude}`;
		} else {
			return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
		}
	};

	return (
		<Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
			<Breadcrumbs>
				<Link to=".." relative="path" state={locationData}>
					Create Tag
				</Link>
				<Typography color="text.secondary">Location</Typography>
			</Breadcrumbs>
			<Typography variant="h4">Location</Typography>
			<SearchBox>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<IconButton aria-label="menu" onClick={toggleCoordinates}>
						<MenuIcon />
					</IconButton>
					<Controller
						name="address"
						control={control}
						defaultValue="New York, NY"
						render={({ field }) => (
							<InputBase
								{...field}
								placeholder="Search in Maps"
								inputProps={{ "aria-label": "search in maps" }}
								sx={{ flex: 1, p: 1 }}
							/>
						)}
					/>
					<IconButton onClick={handleCheckCoordinates} aria-label="search">
						<SearchIcon />
					</IconButton>
					<Divider orientation="vertical" sx={{ height: 28, m: 0.5 }} />
					<IconButton color="primary" aria-label="directions" onClick={handleRedirectToMaps}>
						<DirectionsIcon />
					</IconButton>
				</Box>
				<Collapse in={showCoordinates} timeout="auto">
					<Stack direction="row" spacing={1} paddingX={4} marginBottom={1}>
						<Controller
							name="latitude"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<OutlinedInput
									{...field}
									placeholder="74.006"
									startAdornment={
										<InputAdornment position="start">
											<Typography fontSize="small">Lat:</Typography>
										</InputAdornment>
									}
									required
									sx={inputStyle}
								/>
							)}
						/>
						<Controller
							name="longitude"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<OutlinedInput
									{...field}
									startAdornment={
										<InputAdornment position="start">
											<Typography fontSize="small">Long:</Typography>
										</InputAdornment>
									}
									placeholder="-73.933"
									required
									sx={inputStyle}
								/>
							)}
						/>
					</Stack>
				</Collapse>
			</SearchBox>

			<iframe
				title="Map"
				src={mapUrl}
				style={{ height: 250, width: "100%", border: 0, borderRadius: 6 }}
				allowFullScreen
			/>

			<SaveButton />
		</Stack>
	);
};

export default CreateLocationScreen;

import {
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid2 as Grid,
	IconButton,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";

import routes from "../router/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import ApproachDialog from "../components/dialog/ApproachDialog";
import { ChangeEvent, useEffect, useState } from "react";
import { useNFC } from "../context/NFCContext";
import RecordList from "../components/list/RecordList";
import { toast } from "react-toastify";
import RecordTypeCard from "../components/card/RecordTypeCard";
import { Record } from "../types/Record";
import sections from "../router/sections/CreateTagSections";
import { RecordType } from "../types/RecordType";
import TapAndPlayIcon from "@mui/icons-material/TapAndPlay";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface LocationData {
	records: Record[];
	selectedItem?: Record;
	newItem?: Record;
}
const getRoute = (ref: RecordType) => {
	switch (ref) {
		case "QuickNote":
			return routes.CREATE_NOTE;
		case "WebsiteLink":
			return routes.CREATE_LINK;
		case "BrowserSearch":
			return routes.CREATE_SEARCH;
		case "SocialProfile":
			return routes.CREATE_SOCIAL;
		case "ContactInformation":
			return routes.CREATE_CONTACT;
		case "Location":
			return routes.CREATE_LOCATION;
		case "WifiCredentials":
			return routes.CREATE_WIFI;
		default:
			return routes.CREATE;
	}
};

const CreateTagScreen = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isWriting, setIsWriting] = useState(false);
	const [addToFavs, setAddToFavs] = useState<boolean>(localStorage.getItem("addToFavs") === "true");
	const locationData: LocationData = location?.state || { records: [] };
	const newItem = location?.state?.newItem || null;
	const [tagAlias, setTagAlias] = useState<string>(localStorage.getItem("tagAlias") || "Untitled");

	const { read, write, abortAction, supported } = useNFC();

	useEffect(() => {
		if (newItem) {
			handleAddItem(newItem);
		}
	}, [newItem]);

	const handleAction = (href: string) => {
		const { records } = locationData;
		navigate(href, { state: { records } });
	};

	const onCloseHandler = () => {
		setIsWriting(false);
		abortAction();
	};

	const handleAddItem = (newRecord: Record) => {
		// Filter results different of selected item
		const records: Record[] =
			locationData?.records?.filter(
				(record: Record) => record.value !== locationData?.selectedItem?.value && record.value !== newRecord.value
			) || [];

		// Check if the new quick note already exists in records
		if (!records.includes(newRecord)) {
			// If it doesn't exist, append it to the array
			records.push(newRecord);
		}

		navigate(".", { relative: "path", state: { records } });
	};

	const handleEditItem = (index: number) => {
		const selectedItem = locationData?.records?.[index];
		if (selectedItem) {
			const state = {
				...locationData,
				selectedItem: selectedItem,
			};
			const route = getRoute(selectedItem.type);
			navigate(`${route}`, { state });
		}
	};

	const handleDeleteItem = (index: number) => {
		if (locationData?.records) {
			const records = locationData.records.filter((_, i) => i !== index);
			navigate(".", { state: { records } });
		}
	};

	const handleWrite = async () => {
		if (!supported) {
			return;
		}
		const { records } = locationData;
		// Try to write
		setIsWriting(true);
		const isCompleted = await write(records);
		if (!isCompleted) {
			toast.error("Upps! There was an error saving, please try again.");
			return;
		}
		if (addToFavs) {
			await read(addToFavs);
			toast.success("The tag was successfully added!");
			navigate(routes.HOME);
		} else {
			toast.success("The tag was successfully written!");
			navigate(routes.CREATE);
		}
		setIsWriting(false);
	};

	const handleTagAliasChange = (event: ChangeEvent<HTMLInputElement>) => {
		localStorage.setItem("tagAlias", event.target.value);
		setTagAlias(event.target.value);
	};

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAddToFavs(event.target.checked);
		localStorage.setItem("addToFavs", String(event.target.checked));
	};

	return (
		<Stack spacing={2}>
			{locationData?.records?.length > 0 && (
				<>
					<TextField
						id="input-tag-alias"
						label="Tag alias"
						variant="standard"
						value={tagAlias}
						onChange={handleTagAliasChange}
						required
						sx={{
							"& .MuiInputBase-input": { fontSize: 22 },
							"& .MuiInputLabel-root": { fontSize: 18 },
						}}
					/>
					<RecordList
						records={locationData.records}
						onEdit={(index) => handleEditItem(index)}
						onDelete={(index) => handleDeleteItem(index)}
					/>
					<Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={2}>
						<FormControlLabel
							control={<Checkbox checked={addToFavs} onChange={handleCheckboxChange} />}
							label="Add to favorites"
						/>
						<Button onClick={handleWrite} variant="contained" startIcon={<TapAndPlayIcon />}>
							Save to NFC
						</Button>
					</Stack>
					<Divider />
				</>
			)}
			{/* TAG LIST SECTION */}
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant="subtitle1">Select a Record</Typography>
				<Tooltip
					title="Here you can choose a new record to add."
					placement="left"
					arrow
					enterTouchDelay={0}
					leaveTouchDelay={2500}
				>
					<IconButton>
						<MoreHorizIcon />
					</IconButton>
				</Tooltip>
			</Stack>
			<Grid container spacing={{ xs: 2, md: 3 }}>
				{sections.map((section) => {
					return (
						<Grid key={section.title} size={{ xs: 12, sm: 6, md: 4 }}>
							<RecordTypeCard
								href={section.href}
								onClick={handleAction}
								icon={section.icon}
								title={section.title}
								description={section.description}
							/>
						</Grid>
					);
				})}
			</Grid>
			<ApproachDialog open={isWriting} onClose={onCloseHandler} />
		</Stack>
	);
};

export default CreateTagScreen;

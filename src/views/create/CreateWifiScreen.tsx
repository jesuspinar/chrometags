import {
	Avatar,
	Grid2 as Grid,
	Breadcrumbs,
	Stack,
	TextField,
	Typography,
	MenuItem,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "../../components/link/Link";
import { Record } from "../../types/Record";
import SaveButton from "../../components/button/SaveButton";

import WifiIcon from "@mui/icons-material/WifiPassword";

interface FormData {
	authType: string;
	isHidden: boolean;
	ssid: string;
	password: string;
}

const authOptions = [
	{ value: "nopass", label: "Open" },
	{ value: "WEP", label: "WEP" },
	{ value: "WPA-PSK", label: "WPA Personal" },
	{ value: "WPA-EAP", label: "WPA Enterprise" },
	{ value: "WPA2-PSK", label: "WPA2 Personal" },
	{ value: "WPA2-EAP", label: "WPA2 Enterprise" },
	{ value: "WPA3-PSK", label: "WPA3 Personal" },
	{ value: "WPA3-EAP", label: "WPA3 Enterprise" },
	{ value: "WPA/WPA2-PSK", label: "WPA/WPA2 Personal" },
];

const CreateWifiScreen: React.FC = () => {
	const { handleSubmit, control, setValue } = useForm<FormData>();
	const navigate = useNavigate();
	const location = useLocation();
	const locationData = location.state || {};
	const isEditing = locationData?.selectedItem;

	if (isEditing) {
		const match = isEditing.value.match(/WIFI:S:(.*);T:(.*);P:(.*);H:(.*);/);
		if (match) {
			const [, ssid, authType, password, isHidden] = match;
			setValue("ssid", ssid);
			setValue("authType", authType);
			setValue("password", password);
			setValue("isHidden", isHidden === "true");
		}
	}

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		const password = formData.authType === "nopass" ? "" : formData.password;

		const nfcString = `WIFI:S:${formData.ssid};T:${formData.authType};P:${password};H:${formData.isHidden};`;

		const record: Record = {
			type: "WifiCredentials",
			value: nfcString,
		};

		const state = {
			records: locationData.records || [],
			selectedItem: isEditing || {},
			newItem: record,
		};

		navigate("..", { relative: "path", state });
	};

	return (
		<Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
			<Breadcrumbs>
				<Link to=".." relative="path" state={locationData}>
					Create Tag
				</Link>
				<Typography color="text.secondary">Wifi Credentials</Typography>
			</Breadcrumbs>
			<Typography variant="h4">Wifi Credentials</Typography>
			<Grid container spacing={2} alignItems="center">
				<Grid size={{ xs: 12, sm: 4 }}>
					<Stack justifyContent="center" alignItems="center" spacing={1}>
						<Avatar sx={{ height: 85, width: 85, bgcolor: "primary.main" }}>
							<WifiIcon sx={{ fontSize: 45 }} />
						</Avatar>
						<Typography variant="subtitle2" color="text.secondary">
							Quick connect
						</Typography>
					</Stack>
				</Grid>

				<Grid container size={{ xs: 12, sm: 8 }} spacing={2}>
					<Grid size={{ xs: 12 }}>
						<Controller
							name="authType"
							control={control}
							defaultValue={authOptions[0].value}
							render={({ field }) => (
								<TextField {...field} label="Security" select required fullWidth>
									{authOptions.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											<Typography>{option.label}</Typography>
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</Grid>
					<Grid size={{ xs: 12, sm: 6 }}>
						<Controller
							name="ssid"
							control={control}
							defaultValue=""
							render={({ field }) => <TextField {...field} label="Wifi Name" placeholder="Home" required fullWidth />}
						/>
					</Grid>
					<Grid size={{ xs: 12, sm: 6 }}>
						<Controller
							name="password"
							control={control}
							defaultValue=""
							render={({ field }) => <TextField {...field} label="Password" placeholder="..." fullWidth />}
						/>
					</Grid>
					<Grid size={{ xs: 12 }}>
						<Controller
							name="isHidden"
							control={control}
							defaultValue={false}
							render={({ field }) => (
								<FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Hidden Network" />
							)}
						/>
					</Grid>
				</Grid>
			</Grid>

			<SaveButton />
		</Stack>
	);
};

export default CreateWifiScreen;

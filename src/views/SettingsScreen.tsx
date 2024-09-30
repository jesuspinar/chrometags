import { Box, Button, Stack, Typography, Grid2 as Grid, Avatar, TextField } from "@mui/material";
import UploadButton from "../components/button/UploadButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Controller, useForm } from "react-hook-form";
import SaveButton from "../components/button/SaveButton";
import { useNFC } from "../context/NFCContext";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import stringAvatar from "../utils/avatar";
import { useThemeContext } from "../context/ThemeContext";
import ContrastIcon from "@mui/icons-material/Contrast";

const SettingsScreen: React.FC = () => {
	const { setHistoryFromData, setTagsFromData, tags, history } = useNFC();
	const { username, handleUsernameChange } = useUser();
	const { themeMode, toggleTheme } = useThemeContext();
	const { handleSubmit, control, setValue } = useForm<{ username: string }>();
	const avatarProps = stringAvatar(username);

	const handleExport = () => {
		const userData = {
			username,
			tags,
			history,
		};
		const dataStr = JSON.stringify(userData, null, 2);
		const blob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "nfc-data.json";
		a.click();
	};

	const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const json = JSON.parse(e.target?.result as string);
					if (json.tags) {
						setTagsFromData(json.tags);
					}
					if (json.history) {
						setHistoryFromData(json.history);
					}
					if (json.username) {
						setValue("username", json.username);
						handleUsernameChange(json.username);
					}
					toast.success("Data was successfully imported!");
				} catch (error) {
					toast.error(`Sorry, your data is not imported. ${error instanceof Error ? error.message : "Unknown error"}`);
				}
			};
			reader.readAsText(file);
		}
	};

	const onSubmit = (data: { username: string }) => {
		handleUsernameChange(data.username);
	};

	return (
		<Stack spacing={6} component="form" onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={2} alignItems="center">
				<Grid size={{ xs: 12 }}>
					<Typography variant="subtitle1" gutterBottom>
						Settings
					</Typography>
				</Grid>
				<Grid size={{ xs: 12, sm: 3, md: 5 }}>
					<Stack justifyContent="center" alignItems="center">
						<Avatar
							{...avatarProps}
							sx={{ ...avatarProps.sx, height: 112, width: 112, fontSize: 59, border: "none" }}
						/>
					</Stack>
				</Grid>
				<Grid container direction="column" alignItems="end" size={{ xs: 12, sm: 9, md: 7 }}>
					<Grid size={{ xs: 12 }}>
						<Controller
							name="username"
							control={control}
							defaultValue={username || ""}
							render={({ field }) => <TextField {...field} label="Username" placeholder="JohnDoe" required fullWidth />}
						/>
					</Grid>
					<Grid size={{ xs: 12, sm: 6 }}>
						<SaveButton type="submit" fullWidth />
					</Grid>
				</Grid>
			</Grid>

			<Box>
				<Typography variant="subtitle1" gutterBottom>
					Import / Export
				</Typography>
				<Stack direction={{ sm: "row" }} gap={2}>
					<UploadButton onChange={handleImport} accept=".json" color="inherit" label="Import Data" />
					<Button variant="contained" onClick={handleExport} startIcon={<FileDownloadIcon />}>
						Export Data
					</Button>
				</Stack>
			</Box>

			<Box>
				<Typography variant="subtitle1" gutterBottom>
					Change Color Scheme
				</Typography>
				<Stack direction={{ sm: "row" }}>
					<Button variant="contained" onClick={toggleTheme} startIcon={<ContrastIcon />}>
						{`${themeMode} Mode`}
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
};

export default SettingsScreen;

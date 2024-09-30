import { Breadcrumbs, MenuItem, Stack, SvgIcon, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "../../components/link/Link";
import { Record } from "../../types/Record";

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import SaveButton from "../../components/button/SaveButton";

interface FormData {
	url: string;
	username: string;
}

const socialOptions = [
	{ value: "https://github.com/", icon: <GitHubIcon />, label: "Github" },
	{ value: "https://www.linkedin.com/in/", icon: <LinkedInIcon />, label: "Linkedin" },
	{ value: "https://www.facebook.com/", icon: <FacebookIcon />, label: "Facebook" },
	{ value: "https://instagram.com/", icon: <InstagramIcon />, label: "Instagram" },
	{ value: "https://wa.me/", icon: <WhatsAppIcon />, label: "WhatsApp" },
	{ value: "https://t.me/", icon: <TelegramIcon />, label: "Telegram" },
];

const CreateSocialScreen: React.FC = () => {
	const { handleSubmit, control, setValue } = useForm<FormData>();
	const navigate = useNavigate();
	const location = useLocation();
	const locationData = location.state || {};
	const isEditing = locationData?.selectedItem;
	const splitUrl = (url: string) => {
		const [, base = url, content = ""] = url.match(/^(.+\/)?([^/]*)$/) || [];
		return [base, content];
	};

	if (isEditing) {
		const [url, username] = splitUrl(isEditing.value);
		setValue("url", url);
		setValue("username", username);
	}

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		const record: Record = {
			type: "SocialProfile",
			value: formData.url + formData.username,
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
				<Typography color="text.secondary">Social Profile</Typography>
			</Breadcrumbs>
			<Typography variant="h4">Social Profile</Typography>
			<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
				<Controller
					name="url"
					control={control}
					defaultValue={socialOptions[0].value}
					render={({ field }) => (
						<TextField {...field} select required sx={{ minWidth: 200 }}>
							{socialOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									<Stack spacing={2} direction="row" alignItems="center">
										<SvgIcon>{option.icon}</SvgIcon>
										<Typography>{option.label}</Typography>
									</Stack>
								</MenuItem>
							))}
						</TextField>
					)}
				/>
				<Controller
					name="username"
					control={control}
					defaultValue=""
					render={({ field }) => <TextField {...field} placeholder="jesuspinar" required fullWidth />}
				/>
			</Stack>
			<SaveButton />
		</Stack>
	);
};

export default CreateSocialScreen;

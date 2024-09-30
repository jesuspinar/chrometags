import { Breadcrumbs, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "../../components/link/Link";
import { Record } from "../../types/Record";
import SaveButton from "../../components/button/SaveButton";

interface FormData {
	protocol: string;
	url: string;
}

const uriOptions = [
	{ value: "https://", label: "https://" },
	{ value: "http://", label: "http://" },
	{ value: "ftp://", label: "ftp://" },
	{ value: "sftp://", label: "sftp://" },
	{ value: "ws://", label: "ws://" },
	{ value: "wss://", label: "wss://" },
	{ value: "telnet://", label: "telnet://" },
	{ value: "smb://", label: "smb://" },
	{ value: "nfs://", label: "nfs://" },
];

const CreateLinkScreen: React.FC = () => {
	const { handleSubmit, control, setValue } = useForm<FormData>();
	const navigate = useNavigate();
	const location = useLocation();
	const locationData = location.state || {};
	const isEditing = locationData?.selectedItem;

	if (isEditing) {
		const [protocol, ...rest] = isEditing.value.split("://");
		setValue("protocol", protocol + "://");
		setValue("url", rest.join("://"));
	}

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		const record: Record = {
			type: "WebsiteLink",
			value: formData.protocol + formData.url,
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
				<Typography color="text.secondary">Website Link</Typography>
			</Breadcrumbs>
			<Typography variant="h4">Website Link</Typography>
			<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
				<Controller
					name="protocol"
					control={control}
					defaultValue={uriOptions[0].value}
					render={({ field }) => (
						<TextField {...field} label='Protocol' select required sx={{ minWidth: 100 }}>
							{uriOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									<Typography>{option.label}</Typography>
								</MenuItem>
							))}
						</TextField>
					)}
				/>
				<Controller
					name="url"
					control={control}
					defaultValue=""
					render={({ field }) => <TextField {...field} label='Content' placeholder="github.com/..." required fullWidth />}
				/>
			</Stack>
			<SaveButton />
		</Stack>
	);
};

export default CreateLinkScreen;

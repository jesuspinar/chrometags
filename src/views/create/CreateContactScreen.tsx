import { Avatar, Grid2 as Grid, Breadcrumbs, Stack, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "../../components/link/Link";
import { Record } from "../../types/Record";
import SaveButton from "../../components/button/SaveButton";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";
interface FormData {
	fullName: string;
	phoneNumber: string;
	email: string;
}

const CreateContactScreen: React.FC = () => {
	const { handleSubmit, control, setValue } = useForm<FormData>();
	const navigate = useNavigate();
	const location = useLocation();
	const locationData = location.state || {};
	const isEditing = locationData?.selectedItem;

	if (isEditing) {
		const lines = isEditing.value.split("\n");
		const fullNameLine = lines.find((line: string) => line.startsWith("FN:")) || "";
		const phoneNumberLine = lines.find((line: string) => line.startsWith("TEL:")) || "";
		const emailLine = lines.find((line: string) => line.startsWith("EMAIL:")) || "";

		const fullName = fullNameLine.replace("FN:", "").trim();
		const phoneNumber = phoneNumberLine.replace("TEL:", "").trim();
		const email = emailLine.replace("EMAIL:", "").trim();

		setValue("fullName", fullName);
		setValue("phoneNumber", phoneNumber);
		setValue("email", email);
	}

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		const str = `BEGIN:VCARD\nVERSION:3.0\nFN:${formData.fullName}\nTEL:${formData.phoneNumber}\nEMAIL:${formData.email}\nEND:VCARD`;
		const record: Record = {
			type: "ContactInformation",
			value: str,
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
				<Typography color="text.secondary">Contact Information</Typography>
			</Breadcrumbs>
			<Typography variant="h4">Contact Information</Typography>
			<Grid container spacing={2} alignItems="center">
				<Grid size={{ xs: 12, sm: 4 }}>
					<Stack justifyContent="center" alignItems="center" spacing={1}>
						<Avatar onClick={() => toast.info("This action is not available!")} sx={{ height: 85, width: 85 }}>
							<PersonIcon sx={{ fontSize: 50 }} />
						</Avatar>
						<Typography variant="subtitle2">Upload picture</Typography>
					</Stack>
				</Grid>

				<Grid container size={{ xs: 12, sm: 8 }} spacing={2}>
					<Grid size={{ xs: 12, sm: 6 }}>
						<Controller
							name="fullName"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField {...field} label="Full Name" placeholder="John Doe" required fullWidth />
							)}
						/>
					</Grid>
					<Grid size={{ xs: 12, sm: 6 }}>
						<Controller
							name="phoneNumber"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField {...field} label="Phone Number" placeholder="+34 789 ..." required fullWidth />
							)}
						/>
					</Grid>
					<Grid size='grow'>
						<Controller
							name="email"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField {...field} label="Email Address" placeholder="johndoe@mail.com" required fullWidth />
							)}
						/>
					</Grid>
				</Grid>
			</Grid>

			<SaveButton />
		</Stack>
	);
};

export default CreateContactScreen;

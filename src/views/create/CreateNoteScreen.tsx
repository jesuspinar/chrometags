import { Breadcrumbs, OutlinedInput, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "../../components/link/Link";
import { Record } from "../../types/Record";
import SaveButton from "../../components/button/SaveButton";

interface FormData {
	quickNote: string;
}

const CreateNoteScreen: React.FC = () => {
	const { handleSubmit, control, setValue } = useForm<FormData>();
	const navigate = useNavigate();
	const location = useLocation();
	const locationData = location.state || {};
	const isEditing = locationData?.selectedItem;

	if (isEditing) {
		setValue("quickNote", isEditing.value);
	}

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		const record: Record = {
			type: "QuickNote",
			value: formData.quickNote,
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
				<Typography color="text.secondary">Quick Note</Typography>
			</Breadcrumbs>
			<Typography variant="h4">Quick Note</Typography>
			<Controller
				name="quickNote"
				control={control}
				defaultValue=""
				render={({ field }) => (
					<OutlinedInput
						{...field}
						id="quick-note-input"
						placeholder="Some inspiring note..."
						multiline
						minRows={5}
						maxRows={8}
						required
					/>
				)}
			/>
			<SaveButton />
		</Stack>
	);
};

export default CreateNoteScreen;

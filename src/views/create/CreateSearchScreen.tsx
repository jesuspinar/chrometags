import { Breadcrumbs, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "../../components/link/Link";
import { Record } from "../../types/Record";

import SearchIcon from "@mui/icons-material/Search";
import SaveButton from "../../components/button/SaveButton";

interface FormData {
	urlSearch: string;
	content: string;
}

const searchOptions = [
	{ value: "https://www.youtube.com/results?search_query=", label: "YouTube" },
	{ value: "https://www.amazon.com/s?k=", label: "Amazon" },
	{ value: "https://www.ebay.com/sch/i.html?_nkw=", label: "eBay" },
	{ value: "https://www.bing.com/search?q=", label: "Bing" },
	{ value: "https://www.google.com/search?q=", label: "Google" },
	{ value: "https://www.google.com/images?q=", label: "Google Images" },
	{ value: "https://en.wikipedia.org/wiki/Special:Search?search=", label: "Wikipedia" },
	{ value: "https://www.reddit.com/search/?q=", label: "Reddit" },
];

const CreateSearchScreen: React.FC = () => {
	const { handleSubmit, control, setValue } = useForm<FormData>();
	const navigate = useNavigate();
	const location = useLocation();
	const locationData = location.state || {};
	const isEditing = locationData?.selectedItem;

	const splitUrl = (url: string) => {
		const [base, content] = url.split(/=(.+)/);
		return [base + "=", content || ""];
	};

	if (isEditing) {
		const [urlSearch, content] = splitUrl(isEditing.value);
		setValue("urlSearch", urlSearch);
		setValue("content", content);
	}

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		const formattedContent = formData.content.replace(/\s+/g, "+");

		const record: Record = {
			type: "BrowserSearch",
			value: formData.urlSearch + formattedContent,
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
				<Typography color="text.secondary">Browser Search</Typography>
			</Breadcrumbs>
			<Typography variant="h4">Browser Search</Typography>
			<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
				<Controller
					name="urlSearch"
					control={control}
					defaultValue={searchOptions[0].value}
					render={({ field }) => (
						<TextField
							{...field}
							select
							required
							sx={{ minWidth: 200 }}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<SearchIcon />
										</InputAdornment>
									),
								},
							}}
						>
							{searchOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									<Typography>{option.label}</Typography>
								</MenuItem>
							))}
						</TextField>
					)}
				/>
				<Controller
					name="content"
					control={control}
					defaultValue=""
					render={({ field }) => <TextField {...field} placeholder="search..." required fullWidth />}
				/>
			</Stack>
      <SaveButton />
		</Stack>
	);
};

export default CreateSearchScreen;

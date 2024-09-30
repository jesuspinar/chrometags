import React, { useState } from "react";
import { InputBase, IconButton, Stack, Box, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/system";
import { Tag } from "../../types/Tag";
import { useForm } from "react-hook-form";
import { useNFC } from "../../context/NFCContext";
import CloseIcon from "@mui/icons-material/Close";

export const SearchBox = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(2),
	padding: theme.spacing(0.75),
	border: "1px solid",
	borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200],
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : "white",
	[theme.breakpoints.up("md")]: {
		boxShadow: theme.palette.mode === "dark" ? "0 0 4px rgba(255, 255, 255, 0.1)" : "0 0 4px rgba(0, 0, 0, 0.1)",
	},
}));

interface SearchBarProps {
	onFilter: (tags: Tag[]) => void;
	filterOption?: FilterOptions;
}

enum FilterOptions {
	NAME = "name",
	SERIAL_NUMBER = "serial number",
}

interface FormData {
	search: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilter, filterOption = FilterOptions.NAME }) => {
	const { tags } = useNFC();
	const disabled = tags.length <= 0;
	const { register, handleSubmit, setValue } = useForm<FormData>();
	const [currentFilter, setCurrentFilter] = useState<FilterOptions>(filterOption);

	const onSubmit = (data: FormData) => {
		const searchValue = data.search.toLowerCase();

		const filteredTags = tags.filter((tag: Tag) =>
			currentFilter === "name" ? tag.name.toLowerCase().includes(searchValue) : tag.serialNumber.includes(searchValue)
		);

		onFilter(filteredTags.length > 0 ? filteredTags : []);
	};

	const toggleFilterOption = () => {
		setCurrentFilter((prevOption) =>
			prevOption === FilterOptions.NAME ? FilterOptions.SERIAL_NUMBER : FilterOptions.NAME
		);
	};

	const clearFilter = () => {
		setValue("search", "");
		onFilter(tags);
	};

	return (
		<SearchBox>
			<Stack direction="row" spacing={0.5} component="form" onSubmit={handleSubmit(onSubmit)}>
				<IconButton type="submit" color="primary" disabled={disabled}>
					<SearchIcon />
				</IconButton>
				<InputBase
					{...register("search")}
					placeholder={`Search by ${currentFilter}`}
					fullWidth
					inputProps={{ "aria-label": "search" }}
					disabled={disabled}
				/>
				<IconButton disabled={disabled} onClick={clearFilter}>
					<CloseIcon fontSize="small" />
				</IconButton>
				<Divider orientation="vertical" flexItem />
				<IconButton color="primary" disabled={disabled} onClick={toggleFilterOption}>
					<FilterListIcon />
				</IconButton>
			</Stack>
		</SearchBox>
	);
};

export default SearchBar;

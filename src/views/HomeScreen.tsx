import React, { useState } from "react";
import { Box, Typography, Button, Grid2 as Grid, IconButton, Stack, Tooltip } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";

import SearchBar from "../components/input/SearchBar";
import TagList from "../components/list/TagList";
import StatCard from "../components/card/StatCard";
import EmptyList from "../components/list/EmptyList";
import { useNavigate } from "react-router-dom";
import routes from "../router/Routes";
import { useNFC } from "../context/NFCContext";
import { Tag } from "../types/Tag";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

const HomeScreen: React.FC = () => {
	const { tags, history } = useNFC();
	const [filtered, setFiltered] = useState<Tag[]>(tags);
	const { notifications } = useNotificationCenter();

	const navigate = useNavigate();
	const isEmpty = tags.length <= 0;

	const handleAddTag = () => {
		navigate(routes.CREATE);
	};

	const handleDetailTag = (serialNumber: string) => {
		const selectedItem = tags.find((tag) => tag.serialNumber === serialNumber);
		navigate(routes.HOME_DETAIL_TAG, { state: selectedItem });
	};

	const handleFilter = (filteredTags: Tag[]) => {
		setFiltered(filteredTags);
	};

	return (
		<Box id="Home">
			<SearchBar onFilter={handleFilter} />

			{/* STATS SECTION */}
			<Grid container spacing={2} marginY={2}>
				<Grid size="grow">
					<StatCard title="Paired Devices" value={tags.length} />
				</Grid>
				<Grid size="grow">
					<StatCard title="History Logs" value={history.length} />
				</Grid>
				<Grid size="grow">
					<StatCard title="Recent Activity" value={notifications.length} />
				</Grid>
			</Grid>

			{/* TAG LIST SECTION */}
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant="subtitle1">Tags</Typography>
				<Tooltip
					title={"This is where you can store all your nfc data."}
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
			{isEmpty && <EmptyList onClick={handleAddTag} />}
			{!isEmpty && (
				<Box>
					<TagList tags={filtered} onClick={handleDetailTag} />
					<Button variant="contained" onClick={handleAddTag} fullWidth startIcon={<AddIcon />}>
						Add New Tag
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default HomeScreen;

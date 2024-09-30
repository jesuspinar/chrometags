import React, { useState } from "react";
import { Box, Typography, IconButton, Stack, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import TagList from "../components/list/TagList";
import { useNavigate } from "react-router-dom";
import routes from "../router/Routes";
import { useNFC } from "../context/NFCContext";

const HistoryScreen: React.FC = () => {
	const { history, clearHistory } = useNFC();
	const navigate = useNavigate();
	const [confirm, setConfirm] = useState<boolean>(false);

	const handleDetailTag = (serialNumber: string) => {
		const selectedItem = history.find((tag) => tag.serialNumber === serialNumber);
		navigate(routes.HISTORY_DETAIL_TAG, { state: selectedItem });
	};

	const handleClearHistory = () => {
		if (confirm) {
			clearHistory();
			setConfirm(false);
		} else {
			setConfirm(true);
		}
	};

	return (
		<Box id="History">
			{history.length > 0 ? (
				<Box>
					<Stack direction="row" justifyContent="space-between" alignItems="center">
						<Typography variant="subtitle1">History</Typography>
						<Tooltip
							title={confirm ? "Tap again to confirm" : "Clear history?"}
							placement="top"
							arrow
							enterTouchDelay={0}
							leaveTouchDelay={1500}
						>
							<IconButton
								onClick={(e) => {
									e.stopPropagation();
									handleClearHistory();
								}}
							>
								{confirm ? <DeleteIcon /> : <MoreHorizIcon />}
							</IconButton>
						</Tooltip>
					</Stack>
					<TagList tags={history} onClick={handleDetailTag} />
				</Box>
			) : (
				<Typography>No history for the moment</Typography>
			)}
		</Box>
	);
};

export default HistoryScreen;

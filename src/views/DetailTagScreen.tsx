import { useLocation } from "react-router-dom";
import { useNFC } from "../context/NFCContext";
import { Box, Breadcrumbs, IconButton, Stack, Typography } from "@mui/material";
import RecordList from "../components/list/RecordList";
import routes from "../router/Routes";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { useState } from "react";
import Link from "../components/link/Link";
import { Record } from "../types/Record";

const DetailTagScreen = () => {
	const location = useLocation();
	const { removeTag, appendTag } = useNFC();
	const [isFav, setIsFav] = useState<boolean>(true);
	const tag = location.state || null;

	const isScanDetail = location.pathname === routes.SCAN_DETAIL_TAG;
	const isHomeDetail = location.pathname === routes.HOME_DETAIL_TAG;
	const isHistoryDetail = location.pathname === routes.HISTORY_DETAIL_TAG;

	const backLinkText = isHomeDetail ? "Home" : isScanDetail ? "Scan" : isHistoryDetail ? "History" : "Back";

	const handleRemoveAddTagFromFav = () => {
		if (isFav) {
			removeTag(tag.serialNumber);
		} else {
			appendTag(tag);
		}
		setIsFav(!isFav);
	};

	const handleHyperlink = (record: Record) => {
		window.open(record.value, "_blank");
	};

	return (
		<Box>
			<Breadcrumbs sx={{ marginBottom: 2 }}>
				<Link to=".." relative="path">
					{backLinkText}
				</Link>
				<Typography color="text.secondary">Detail Tag</Typography>
			</Breadcrumbs>

			<Stack spacing={2}>
				<Stack direction="row" justifyContent="space-between">
					<Box>
						<Typography variant="h5">{tag?.name}</Typography>
						<Typography variant="subtitle1">{tag?.serialNumber}</Typography>
					</Box>
					{isHomeDetail && (
						<Box>
							<IconButton color="primary" onClick={handleRemoveAddTagFromFav}>
								{isFav ? <BookmarkIcon /> : <BookmarkAddOutlinedIcon />}
							</IconButton>
						</Box>
					)}
				</Stack>
				<RecordList hideActions onRedirect={handleHyperlink} records={tag?.records || []} />
			</Stack>
		</Box>
	);
};

export default DetailTagScreen;

import React, { useState } from "react";
import { List, ListItemIcon, ListItemText, styled, Box, Pagination, ListItem } from "@mui/material";
import NfcSharpIcon from "@mui/icons-material/NfcSharp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Tag } from "../../types/Tag";

interface TagListProps {
	tags: Tag[];
	itemsPerPage?: 5 | 10 | 15;
	onClick: (id: string) => void;
}

const TagListItem = styled(ListItem)(({ theme }) => ({
	fontSize: "1rem",
	border: "1px solid",
	borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200],
	borderRadius: theme.shape.borderRadius,
	marginBottom: 6,
	boxShadow: theme.palette.mode === "dark" ? "0 0 4px rgba(255, 255, 255, 0.1)" : "0 0 4px rgba(0, 0, 0, 0.1)",
}));

const TagList: React.FC<TagListProps> = ({ tags, itemsPerPage = 5, onClick }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const pageCount = Math.ceil(tags.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedTags = tags.slice(startIndex, endIndex);

	const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	return (
		<>
			<List>
				{paginatedTags?.map((tag, index) => (
					<TagListItem key={index} onClick={() => onClick(tag.serialNumber)}>
						<ListItemIcon>
							<NfcSharpIcon color="primary" />
						</ListItemIcon>
						<ListItemText primary={tag.name} secondary={tag.serialNumber} />
						<ChevronRightIcon />
					</TagListItem>
				))}
			</List>

			{tags?.length > itemsPerPage && (
				<Box display="flex" justifyContent="center" alignItems="center" marginY={2}>
					<Pagination
						count={pageCount}
						page={currentPage}
						onChange={handlePageChange}
						color="primary"
						variant="outlined"
						shape="rounded"
						size="large"
					/>
				</Box>
			)}
		</>
	);
};

export default TagList;

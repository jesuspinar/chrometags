import { useState } from "react";
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Pagination, styled } from "@mui/material";
import { Edit, Delete, OpenInNew, Info } from "@mui/icons-material";
import CreateTagIconPicker from "../icon-picker/CreateTagIconPicker";
import { Record } from "../../types/Record";

const CategoryListItem = styled(ListItem)(({ theme }) => ({
	fontSize: "1rem",
	border: "1px solid",
	borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200],
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.palette.mode === "dark" ? " 0 1px 8px rgba(255, 255, 255, 0.1)" : "0 1px 8px rgba(0, 0, 0, 0.1)",
	textOverflow: "ellipsis",
	marginBottom: 6,
}));

interface CategoryListProps {
	records: Record[];
	hideActions?: boolean;
	itemsPerPage?: number;
	onEdit?: (index: number) => void;
	onDelete?: (index: number) => void;
	onRedirect?: (record: Record) => void;
}

// Add space before upper case
const format = (str: string) => {
	return str?.replace(/([A-Z])/g, " $1")?.trim();
};

const RecordList = ({
	records,
	hideActions = false,
	itemsPerPage = 5,
	onEdit,
	onDelete,
	onRedirect,
}: CategoryListProps) => {
	const [currentPage, setCurrentPage] = useState(1);

	const pageCount = Math.ceil(records.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedRecors = records.slice(startIndex, endIndex);

	const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	const handleRedirect = (record: Record) => {
		const validURI =
			record.type !== "QuickNote" && record.type !== "ContactInformation" && record.type !== "WifiCredentials";
		if (onRedirect && validURI) {
			onRedirect(record);
		}
	};

	return (
		<>
			<List>
				{paginatedRecors.map((record, index) => (
					<CategoryListItem key={index}>
						<ListItemIcon>
							<CreateTagIconPicker iconName={record.type} />
						</ListItemIcon>

						<ListItemText
							primary={format(record.type)}
							secondary={record.value}
							secondaryTypographyProps={{ noWrap: true }}
						/>
						{hideActions ? (
							<IconButton onClick={() => handleRedirect(record)}>
								{record.type === "QuickNote" ||
								record.type === "ContactInformation" ||
								record.type === "WifiCredentials" ? (
									<Info />
								) : (
									<OpenInNew color="primary" />
								)}
							</IconButton>
						) : (
							<>
								<IconButton onClick={() => onEdit && onEdit(index)}>
									<Edit />
								</IconButton>
								<IconButton onClick={() => onDelete && onDelete(index)}>
									<Delete />
								</IconButton>
							</>
						)}
					</CategoryListItem>
				))}
			</List>
			{records?.length > itemsPerPage && (
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

export default RecordList;

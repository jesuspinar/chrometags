import { Box, Stack, Typography } from "@mui/material";
import NfcIcon from "@mui/icons-material/Nfc";
import { styled } from "@mui/system";
import { FC } from "react";

interface EmptyListProps {
	onClick: () => void;
}

const StyledBox = styled(Box)(({ theme }) => ({
	cursor: "pointer",
	padding: theme.spacing(4, 2),
	textAlign: "center",
	borderRadius: theme.shape.borderRadius,
	border: "1px dashed",
	borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[400],
}));

const EmptyList: FC<EmptyListProps> = ({ onClick }) => {
	const handleClick = () => {
		onClick();
	};

	return (
		<StyledBox onClick={handleClick}>
			<Stack spacing={1} textAlign="center">
				<Box>
					<NfcIcon fontSize="large" htmlColor="grey" />
				</Box>
				<Typography>No tags where found...</Typography>
				<Typography color="primary" fontWeight="bold" sx={{ textDecoration: "underline" }}>
					Add one here!
				</Typography>
			</Stack>
		</StyledBox>
	);
};

export default EmptyList;

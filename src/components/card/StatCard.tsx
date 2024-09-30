import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

interface StatCardProps {
	title: string;
	value: number;
}

const StyledBox = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2.5, 2),
	textAlign: "center",
	borderRadius: theme.shape.borderRadius,
	boxShadow:
		theme.palette.mode === "dark" ? "inset 0 1px 8px rgba(255, 255, 255, 0.1)" : "inset 0 1px 8px rgba(0, 0, 0, 0.1)",
}));

const NumberTypography = styled(Typography)(({ theme }) => ({
	fontWeight: "bold",
	fontSize: "3rem",
	color: theme.palette.primary.main,
}));

const TextTypography = styled(Typography)(({ theme }) => ({
	fontSize: "1rem",
	color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
}));

const StatCard: React.FC<StatCardProps> = ({ value, title }) => {
	return (
		<StyledBox>
			<Box height={90}>
				<NumberTypography variant="h1">{value}</NumberTypography>
				<TextTypography>{title}</TextTypography>
			</Box>
		</StyledBox>
	);
};

export default StatCard;

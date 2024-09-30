import React from "react";
import { Box, SvgIcon, Typography } from "@mui/material";
import { styled } from "@mui/system";
import CreateTagIconPicker from "../icon-picker/CreateTagIconPicker";
import { RecordType } from "../../types/RecordType";

const StyledBox = styled(Box)(({ theme }) => ({
	cursor: "pointer",
	padding: theme.spacing(2.5, 2),
	textAlign: "center",
	borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200],
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.palette.mode === "dark" ? " 0 1px 8px rgba(255, 255, 255, 0.1)" : "0 1px 8px rgba(0, 0, 0, 0.1)",
}));

const Icon = styled(SvgIcon)(({ theme }) => ({
	fontSize: "2.45rem",
	color: theme.palette.primary.main,
}));

const EllipsisTypography = styled(Typography)({
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
	textOverflow: "ellipsis",
	WebkitLineClamp: 3, // old browsers support
	lineClamp: 3,
});

export interface TypeTagCardProps {
	href: string;
	icon: RecordType;
	title: string;
	description: string;
	onClick: (href: string) => void;
}

const RecordTypeCard: React.FC<TypeTagCardProps> = ({ icon, title, description, href, onClick }) => {
	return (
		<StyledBox onClick={() => onClick(href)}>
			<Box>
				<Icon>
					<CreateTagIconPicker iconName={icon} />
				</Icon>
				<Typography variant="h5" noWrap gutterBottom color="primary.main">
					{title}
				</Typography>
				<EllipsisTypography variant="body1" color="text.secondary">
					{description}
				</EllipsisTypography>
			</Box>
		</StyledBox>
	);
};

export default RecordTypeCard;

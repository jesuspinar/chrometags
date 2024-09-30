import { FC } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Stack, Typography } from "@mui/material";
import PremiumIcon from "@mui/icons-material/WorkspacePremiumTwoTone";

interface PremiumCardProps {
	onClick: () => void;
}

const StyledBox = styled(Box)(({ theme }) => ({
	margin: theme.spacing(2.5, 0),
	padding: theme.spacing(2, 2.5),
	backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
	border: "1px solid",
	borderColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.grey[200],
	borderRadius: theme.shape.borderRadius,
}));

const PremiumBanner = styled(Box)(({ theme }) => ({
	color: theme.palette.mode === "dark" ? theme.palette.text.primary : theme.palette.primary.main,
	backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.primary.light,
	fontWeight: "bold",
	padding: theme.spacing(0.6, 2),
	borderRadius: theme.shape.borderRadius * 2,
}));

const PremiumCard: FC<PremiumCardProps> = ({ onClick }) => {
	const handleClick = () => {
		onClick();
	};

	return (
		<StyledBox>
			<Stack direction="row">
				<PremiumIcon fontSize="large" color="primary" />
				<PremiumBanner>GO PREMIUM</PremiumBanner>
			</Stack>
			<Typography variant="h5" component="h3" fontWeight="bold" mt={2} mb={1}>
				Unlock all features and unlimited tags
			</Typography>
			<Typography variant="body2" color="text.secondary" mb={2}>
				you can subscribe to the premium version which allows you to have unlimited tags and the app without ads
			</Typography>
			<Button variant="contained" fullWidth onClick={handleClick}>
				Unlock Now
			</Button>
		</StyledBox>
	);
};

export default PremiumCard;

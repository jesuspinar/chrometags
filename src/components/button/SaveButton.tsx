// SaveButton.tsx
import React from "react";
import { Button, ButtonProps, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

interface SaveButtonProps extends ButtonProps {
	label?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ label = "Save Changes", ...props }) => {
	return (
		<Box textAlign="right">
			<Button type="submit" variant="contained" startIcon={<SaveIcon />} {...props}>
				{label}
			</Button>
		</Box>
	);
};

export default SaveButton;

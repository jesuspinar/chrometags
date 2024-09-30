import React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonOwnProps } from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";

// Estilos del input visualmente oculto
const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

interface UploadButtonProps extends ButtonOwnProps {
	label?: string;
	icon?: React.ReactNode;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	accept?: string;
	multiple?: boolean;
}

const UploadButton: React.FC<UploadButtonProps> = ({
	label = "Upload files",
	icon = <FileUploadIcon />,
	onChange = () => {},
	accept = "*",
	multiple = false,
	color = "primary",
	...buttonProps
}) => {
	return (
		<Button component="label" variant="contained" color={color} tabIndex={-1} startIcon={icon} {...buttonProps}>
			{label}
			<VisuallyHiddenInput type="file" accept={accept} onChange={onChange} multiple={multiple} />
		</Button>
	);
};

export default UploadButton;

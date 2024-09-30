import { Components } from "@mui/material/styles/components";

export const components: Components = {
	MuiContainer: {
		defaultProps: {
			maxWidth: "md",
		},
	},
	MuiTable: {
		defaultProps: {
			size: "small",
		},
	},
	MuiButton: {
		styleOverrides: {
			root: {
				textTransform: "capitalize",
				fontWeight: "bold",
				boxShadow: "none",
				"&:hover": {
					boxShadow: "none",
				},
				paddingTop: 15,
				paddingBottom: 15,
			},
		},
		defaultProps: {
			size: "large",
		},
	},
};

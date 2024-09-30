import { ThemeOptions } from "@mui/material/styles";
import { components } from "./components";

export const options: ThemeOptions = {
	palette: {
		mode: "light",
		primary: {
			main: "#347de1",
			light: "#d1e3fc",
		},
		secondary: {
			main: "#4234E0",
		},
	},
	components,
	shape: { borderRadius: 6 },
};

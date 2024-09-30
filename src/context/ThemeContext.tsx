import { createContext, useState, useContext, useEffect, ReactNode, FC } from "react";
import {  ThemeProvider as ThemeProviderMui, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteMode, useMediaQuery } from "@mui/material";
import { options } from "../theme/options";

interface ThemeContextType {
	toggleTheme: () => void;
	themeMode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [themeMode, setThemeMode] = useState<PaletteMode>(prefersDarkMode ? "dark" : "light");

	useEffect(() => {
		setThemeMode(prefersDarkMode ? "dark" : "light");
	}, [prefersDarkMode]);

	const toggleTheme = () => setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

	const theme = createTheme({
		...options,
		palette: {
			...options.palette,
			mode: themeMode,
		},
	});

	return (
		<ThemeContext.Provider value={{ toggleTheme, themeMode }}>
			<ThemeProviderMui theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProviderMui>
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeContext must be used within a ThemeContextProvider");
	}
	return context;
};

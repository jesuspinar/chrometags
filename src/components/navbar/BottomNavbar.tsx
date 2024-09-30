import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ScannerIcon from "@mui/icons-material/WifiTethering";
import { BottomNavigation, BottomNavigationAction, Box, Fab, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../router/Routes";

const StyledNav = styled(BottomNavigation)(({ theme }) => ({
	position: "fixed",
	bottom: 0,
	left: 0,
	right: 0,
	zIndex: 10,
	backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
	boxShadow: "inset rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
}));

const BottomNavbar: React.FC = () => {
	const [value, setValue] = useState<routes>(routes.HOME);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleAction = (action: routes) => {
		navigate(action);
	};

	useEffect(() => {
		switch (pathname) {
			case routes.HOME:
			case routes.HOME_DETAIL_TAG:
				setValue(routes.HOME);
				break;

			case routes.SCAN:
			case routes.SCAN_DETAIL_TAG:
				setValue(routes.SCAN);
				break;

			case routes.CREATE:
			case routes.CREATE_CONTACT:
			case routes.CREATE_FILE:
			case routes.CREATE_LINK:
			case routes.CREATE_LOCATION:
			case routes.CREATE_NOTE:
			case routes.CREATE_SEARCH:
			case routes.CREATE_SOCIAL:
			case routes.CREATE_WIFI:
				setValue(routes.CREATE);
				break;
			case routes.HISTORY:
			case routes.HISTORY_DETAIL_TAG:
				setValue(routes.HISTORY);
				break;
			case routes.SETTINGS:
				setValue(routes.SETTINGS);
				break;
			default:
				break;
		}
	}, [pathname]);

	return (
		<Box>
			<StyledNav showLabels value={value} onChange={(_, newValue) => handleAction(newValue)}>
				<BottomNavigationAction label="Home" value={routes.HOME} icon={<HomeIcon />} />
				<BottomNavigationAction label="Scanner" value={routes.SCAN} icon={<ScannerIcon />} />
				<BottomNavigationAction disabled />
				<BottomNavigationAction value={routes.HISTORY} label="History" icon={<HistoryIcon />} />
				<BottomNavigationAction value={routes.SETTINGS} label="Settings" icon={<PersonIcon />} />
			</StyledNav>
			<Fab
				color={value === routes.CREATE ? "success" : "primary"}
				onClick={() => handleAction(routes.CREATE)}
				sx={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)" }}
			>
				<AddIcon />
			</Fab>
		</Box>
	);
};

export default BottomNavbar;

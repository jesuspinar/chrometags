import { Box, Container } from "@mui/material";
import BottomNavbar from "../components/navbar/BottomNavbar";
import { Outlet } from "react-router-dom";
import Topbar from "../components/navbar/Topbar";
import { useUser } from "../context/UserContext";
import { useNFC } from "../context/NFCContext";

const Layout = () => {
	const { username } = useUser();
	const { supported } = useNFC();
	const status = supported ? "Supported" : "Not supported";
	return (
		<Box id="layout">
			<Topbar username={username} status={status} />
			<Container>
				<Box marginTop={4} marginBottom={12}>
					<Outlet />
				</Box>
			</Container>
			<BottomNavbar />
		</Box>
	);
};

export default Layout;

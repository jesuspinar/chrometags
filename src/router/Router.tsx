import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeScreen from "../views/HomeScreen";
import Layout from "./Layout";
import ScanScreen from "../views/ScanScreen";
import routes from "./Routes";
import CreateTagScreen from "../views/CreateTagScreen";
import CreateNoteScreen from "../views/create/CreateNoteScreen";
import CreateLinkScreen from "../views/create/CreateLinkScreen";
import CreateSocialScreen from "../views/create/CreateSocialScreen";
import CreateSearchScreen from "../views/create/CreateSearchScreen";
import CreateContactScreen from "../views/create/CreateContactScreen";
import CreateLocationScreen from "../views/create/CreateLocationScreen";
import CreateWifiScreen from "../views/create/CreateWifiScreen";
import DetailTagScreen from "../views/DetailTagScreen";
import HistoryScreen from "../views/HistoryScreen";
import SettingsScreen from "../views/SettingsScreen";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Navigate to={routes.HOME} replace />,
			},
			{
				path: routes.HOME,
				element: <HomeScreen />,
			},
			{
				path: routes.HOME_DETAIL_TAG,
				element: <DetailTagScreen />,
			},
			{
				path: routes.SCAN,
				element: <ScanScreen />,
			},
			{
				path: routes.SCAN_DETAIL_TAG,
				element: <DetailTagScreen />,
			},
			{
				path: routes.CREATE,
				element: <CreateTagScreen />,
			},
			{
				path: routes.CREATE_NOTE,
				element: <CreateNoteScreen />,
			},
			{
				path: routes.CREATE_LINK,
				element: <CreateLinkScreen />,
			},
			{
				path: routes.CREATE_SOCIAL,
				element: <CreateSocialScreen />,
			},
			{
				path: routes.CREATE_SEARCH,
				element: <CreateSearchScreen />,
			},
			{
				path: routes.CREATE_CONTACT,
				element: <CreateContactScreen />,
			},
			{
				path: routes.CREATE_LOCATION,
				element: <CreateLocationScreen />,
			},
			{
				path: routes.CREATE_WIFI,
				element: <CreateWifiScreen />,
			},

			{
				path: routes.HISTORY,
				element: <HistoryScreen />,
			},
			{
				path: routes.HISTORY_DETAIL_TAG,
				element: <DetailTagScreen />,
			},
			{
				path: routes.SETTINGS,
				element: <SettingsScreen />,
			},
		],
	},
]);

export default router;

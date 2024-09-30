import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import WebsiteIcon from "@mui/icons-material/AddLink";
import BrowserSearchIcon from "@mui/icons-material/TravelExplore";
import SocialIcon from "@mui/icons-material/AlternateEmail";
import ContactIcon from "@mui/icons-material/AccountBox";
import LocationIcon from "@mui/icons-material/Place";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { SvgIconProps } from "@mui/material";
import { RecordType } from "../../types/RecordType";

const iconMap = {
	QuickNote: EditNoteIcon,
	WebsiteLink: WebsiteIcon,
	BrowserSearch: BrowserSearchIcon,
	SocialProfile: SocialIcon,
	ContactInformation: ContactIcon,
	Location: LocationIcon,
	WifiCredentials: WifiPasswordIcon,
} as const;

interface DynamicIconProps extends SvgIconProps {
	iconName: RecordType;
}

const CreateTagIconPicker: React.FC<DynamicIconProps> = ({ iconName, ...props }) => {
	const IconComponent = iconMap[iconName] || HelpOutlineIcon;

	return <IconComponent color="primary" fontSize="large" {...props} />;
};

export default CreateTagIconPicker;

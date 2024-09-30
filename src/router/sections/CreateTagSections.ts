import { RecordType } from "../../types/RecordType";
import routes from "../Routes";

interface SectionsProps {
	href: routes;
	icon: RecordType;
	title: string;
	description: string;
}

const sections: SectionsProps[] = [
	{
		href: routes.CREATE_NOTE,
		icon: "QuickNote",
		title: "Quick Note",
		description:
			"Capture and save brief notes instantly, with a limit of 280 characters. Perfect for reminders or short messages.",
	},
	{
		href: routes.CREATE_LINK,
		icon: "WebsiteLink",
		title: "Website Link",
		description:
			"Easily store and share a URL to any website. A convenient way to direct others to your online resources.",
	},
	{
		href: routes.CREATE_SOCIAL,
		icon: "SocialProfile",
		title: "Social Profile",
		description:
			"Share your social media profiles like LinkedIn, Instagram, or Facebook. Keep your connections just a tap away.",
	},
	{
		href: routes.CREATE_SEARCH,
		icon: "BrowserSearch",
		title: "Browser Search",
		description:
			"Save and share your favorite web searches from popular search engines. Get quick access to information.",
	},
	{
		href: routes.CREATE_CONTACT,
		icon: "ContactInformation",
		title: "Contact Information",
		description:
			"Store and share contact details including name, phone number, and email. Simplify networking with a quick tap.",
	},
	{
		href: routes.CREATE_LOCATION,
		icon: "Location",
		title: "Location",
		description:
			"Share your location details with a label, latitude, and longitude. Perfect for meeting spots or event venues.",
	},
	{
		href: routes.CREATE_WIFI,
		icon: "WifiCredentials",
		title: "WiFi Credentials",
		description: "Provide secure WiFi access with your network's name and password. Easy connection with just a tap.",
	},
];

export default sections;

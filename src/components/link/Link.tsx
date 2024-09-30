import React from "react";
import { styled } from "@mui/material/styles";
import { Link as LinkRouter, LinkProps as RouterLinkProps } from "react-router-dom";
import { Theme } from "@mui/material/styles";

const LinkStyled = styled(LinkRouter)<{ theme?: Theme }>(({ theme }) => ({
	textTransform: "capitalize",
	color: theme?.palette.text.secondary,
}));

// Extend RouterLinkProps to include all props from react-router-dom's Link
interface LinkProps extends RouterLinkProps {
	to: To;
	replace?: boolean;
	state?: unknown;
	relative?: "route" | "path";
	preventScrollReset?: boolean;
	unstable_viewTransition?: boolean;
}

// Define the `To` type as used in react-router-dom
type To = string | Partial<Path>;

interface Path {
	pathname: string;
	search: string;
	hash: string;
}

const Link: React.FC<LinkProps> = (props) => {
	return <LinkStyled {...props} />;
};

export default Link;

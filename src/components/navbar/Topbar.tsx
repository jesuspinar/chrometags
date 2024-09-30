import React, { useState } from "react";
import {
	Alert,
	AlertColor,
	Avatar,
	Badge,
	Box,
	Button,
	Container,
	Drawer,
	FormControlLabel,
	FormGroup,
	IconButton,
	Stack,
	styled,
	Switch,
	Typography,
} from "@mui/material";
import stringAvatar from "../../utils/avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

interface TopbarProps {
	username: string;
	status: string;
}

const StatusLabel = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.main,
	backgroundColor: theme.palette.primary.light,
	textAlign: "center",
	textTransform: "capitalize",
	fontSize: "0.8rem",
	fontWeight: "bold",
	borderRadius: theme.shape.borderRadius,
	width: 125,
}));

const Topbar: React.FC<TopbarProps> = ({ username, status }) => {
	const { notifications, clear, markAllAsRead, markAsRead, unreadCount } = useNotificationCenter();
	const [showUnreadOnly, setShowUnreadOnly] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const toggleNotificationCenter = () => {
		setIsOpen(!isOpen);
	};

	const toggleFilter = () => {
		setShowUnreadOnly(!showUnreadOnly);
	};

	return (
		<Box sx={{ backgroundColor: "primary.main" }}>
			<Container>
				<Stack direction="row" justifyContent="space-between" alignItems="center" paddingY={2}>
					<Stack direction="row" spacing={2} alignItems="center">
						<Avatar {...stringAvatar(username)} />
						<Stack spacing={0.5}>
							<Typography color="white" fontWeight={300}>
								Hello <span style={{ fontWeight: 700, textTransform: "capitalize" }}>{username}!</span>
							</Typography>
							<StatusLabel>{status}</StatusLabel>
						</Stack>
					</Stack>
					<Box>
						<IconButton onClick={toggleNotificationCenter}>
							<Badge badgeContent={unreadCount} color="secondary">
								<NotificationsIcon htmlColor="white" />
							</Badge>
						</IconButton>
					</Box>
				</Stack>
			</Container>
			<Drawer anchor="right" open={isOpen} onClose={toggleNotificationCenter}>
				<Stack
					padding={2}
					paddingTop={3}
					direction={"row"}
					justifyContent="space-between"
					alignItems="center"
					spacing={4}
				>
					<Typography variant="h5">Notification center</Typography>
					<IconButton onClick={toggleNotificationCenter}>
						<CloseIcon />
					</IconButton>
				</Stack>
				<Stack
					sx={{
						padding: "20px",
						height: "100%",
						width: "350px",
						borderRadius: "8px",
						overflowY: "auto",
					}}
					spacing={2}
				>
					{(!notifications.length || (unreadCount === 0 && showUnreadOnly)) && (
						<Typography variant="h6" textAlign="center">
							Your queue is empty!{" 🎉"}
						</Typography>
					)}
					{(showUnreadOnly ? notifications.filter((v) => !v.read) : notifications).map((notification) => {
						return (
							<Alert
								severity={(notification.type as AlertColor) || "info"}
								action={
									notification.read ? (
										<DoneAllIcon />
									) : (
										<CheckIcon color="primary" onClick={() => markAsRead(notification.id)} />
									)
								}
							>
								<Typography>{notification.content as string}</Typography>
							</Alert>
						);
					})}
				</Stack>

				{notifications.length > 0 && (
					<>
						<FormGroup sx={{ paddingX: "20px" }}>
							<FormControlLabel
								control={<Switch color="secondary" onChange={toggleFilter} checked={showUnreadOnly} />}
								label="Show unread only"
							/>
						</FormGroup>
						<Stack gap={2} padding={2}>
							<Button variant="contained" onClick={clear} color="inherit" fullWidth>
								Clear All
							</Button>
							<Button variant="contained" onClick={markAllAsRead} fullWidth>
								Mark all as Read
							</Button>
						</Stack>
					</>
				)}
			</Drawer>
		</Box>
	);
};

export default Topbar;

// NFCDialog.tsx
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	CircularProgress,
	Typography,
	Box,
} from "@mui/material";

interface ApproachDialogProps {
	open: boolean;
	onClose: () => void;
}

const ApproachDialog: React.FC<ApproachDialogProps> = ({ open, onClose }) => {
	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="nfc-dialog-title" maxWidth="md">
			<DialogTitle id="nfc-dialog-title">Approach NFC Device</DialogTitle>
			<DialogContent>
				<Typography>Approach an NFC device to perform action data.</Typography>
				<Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: 200 }}>
					<CircularProgress />
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ApproachDialog;

import { Box, Stack, Typography } from "@mui/material";
import Radar from "../components/radar/Radar";
import { useNFC } from "../context/NFCContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../router/Routes";
import { toast } from "react-toastify";

const ScanScreen = () => {
	const { read, abortAction, supported } = useNFC();
	const [isReading, setIsReading] = useState(false);
	const navigate = useNavigate();

	const handleStartScan = async () => {
		if (isReading || !supported) {
			return;
		}
		setIsReading(true);
		const result = await read();
		if (result) {
			toast.success("The tag was successfully detected!");
			navigate(routes.SCAN_DETAIL_TAG, { state: result });
		} else {
			toast.info("Please try again.");
		}
		setIsReading(false);
	};

	const handleAbortAction = () => {
		setIsReading(false);
		abortAction();
	};

	return (
		<Stack gap={5} justifyContent="center" alignItems="center" sx={{ overflow: "hidden" }}>
			<Box marginTop={{ xs: 6, sm: 12 }}>
				<Radar onClick={handleStartScan} onCancel={handleAbortAction} />
			</Box>

			<Typography variant="h4" textAlign="center" color="text.secondary" maxWidth={235}>
				{isReading ? "Move NFC device closer" : "Tap for start scanning"}
			</Typography>
		</Stack>
	);
};
export default ScanScreen;

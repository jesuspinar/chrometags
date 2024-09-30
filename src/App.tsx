import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";
import { NFCProvider } from "./context/NFCContext";
import { UserProvider } from "./context/UserContext";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";

function App() {
	return (
		<ThemeProvider>
			<ToastContainer position="bottom-right" theme="colored" transition={Slide} stacked style={{ bottom: 80 }} />
			<NFCProvider>
				<UserProvider>
					<RouterProvider router={router} />
				</UserProvider>
			</NFCProvider>
		</ThemeProvider>
	);
}

export default App;

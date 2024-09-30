import React, { createContext, useContext, useState } from "react";

interface UserContextProps {
	username: string;
	handleUsernameChange: (username: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [username, setUsername] = useState("Anonymous");

	const handleUsernameChange = (name: string) => {
		localStorage.setItem("username", name);
		setUsername(name);
	};

	return <UserContext.Provider value={{ username, handleUsernameChange }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextProps => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

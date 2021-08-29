import { User } from "Models/user.model";
import React, { Dispatch } from "react";
import {
	createContext,
	ReactNode,
	useContext,
	useReducer,
	useState
} from "react";
import { IUserContext } from "Store/User/types";
import { userReducer, USER_INITIAL_VALUE } from "Store/User/userReducer";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	const [database, setDatabase] = useState<User[]>([]);
	const [userState, userDispatch] = useReducer(
		userReducer,
		USER_INITIAL_VALUE
	);

	return (
		<DatabaseContext.Provider
			value={{ databaseState: database, updateDatabase: setDatabase }}
		>
			<UserContext.Provider value={{ userState, userDispatch }}>
				{children}
			</UserContext.Provider>
		</DatabaseContext.Provider>
	);
};

export const UserContext = createContext<IUserContext>({
	userState: USER_INITIAL_VALUE,
	userDispatch: () => null
});

export const DatabaseContext = createContext<{
	databaseState: User[];
	updateDatabase: Dispatch<any>;
}>({
	databaseState: [],
	updateDatabase: () => null
});

export const useUserContext = () => useContext(UserContext);
export const useDatabaseContext = () => useContext(DatabaseContext);

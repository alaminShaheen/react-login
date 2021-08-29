import { AuthHelper } from "Helpers/authHelper";
import { User } from "Models/user.model";
import { UserActions, UserActionTypes } from "Store/User/types";

export const USER_INITIAL_VALUE: User = AuthHelper.getUser() || {
	Email: "",
	FirstName: "",
	Id: "",
	LastName: "",
	Password: ""
};

export const userReducer = (state: User, action: UserActions): User => {
	switch (action.type) {
		case UserActionTypes.UPDATE_USER:
			AuthHelper.setUser(action.payload);
			return { ...state, ...action.payload };
		case UserActionTypes.CLEAR_USER:
			AuthHelper.clearUser();
			return state;
		default:
			return state;
	}
};

import {
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS
} from "./types";

export const loginRequest = auth => ({
	type: LOGIN_REQUEST,
	auth
});

export const loginSuccess = token => ({
	type: LOGIN_SUCCESS,
	token
});

export const logoutRequest = () => ({type: LOGOUT_REQUEST});

export const logoutSuccess = () => ({type: LOGOUT_SUCCESS});

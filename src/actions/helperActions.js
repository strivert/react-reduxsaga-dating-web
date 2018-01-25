import {
	SET_COMPONENT_LOADING_REQUEST,
	SET_COMPONENT_LOADING,
	DISMISS_TOASTER,
	SET_TOAST
} from './types';

export const setComponentLoadingRequest = (isLoading) => ({type: SET_COMPONENT_LOADING_REQUEST, isLoading});

export const setComponentLoading = (isLoading) => ({type: SET_COMPONENT_LOADING, isLoading});

export const dismissToaster = () => ({ type: DISMISS_TOASTER });

export const setToast = ({toastType, message}) => ({ type: SET_TOAST, toastType, message})

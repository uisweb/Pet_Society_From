import { useContext, useEffect } from 'react';
import { useAuth } from './useAuth';
import { privateBackendAPI } from '../api/backendAPI';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext';

export const useAxiosPrivate = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const { addToast } = useContext(ToastContext);

	useEffect(() => {
		const requestIntercept = privateBackendAPI.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);



		return () => {
			privateBackendAPI.interceptors.request.eject(requestIntercept);
			// privateBackendAPI.interceptors.response.eject(responseIntercept);
		};
	}, [auth]);

	return { privateBackendAPI };
};

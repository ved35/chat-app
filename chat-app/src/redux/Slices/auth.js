import { createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import { toast } from "react-toastify";

const initialState = {
    isLoading: false,
    error: null,
    token: null,
    user: {},
    isLoggedIn: false,
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        updateLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateError: (state, action) => {
            state.error = action.payload;
        },
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logoutSuccess: (state, action) => {
            state.token = null;
            state.isLoggedIn = false;
        },
    }
});

//Register User Api
export function RegisterUser(formData, navigate) {

    return async (dispatch, getState) => {
        dispatch(updateError(null));
        dispatch(updateLoading(true));

        //make Api call
        const reqBody = {
            ...formData
        }

        await axios.post('/api/v1/auth/register', reqBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log("🚀 ~ return ~ r̥es:", res)
            toast.success(res.data.message);
        }).catch((error) => {
            toast.error(error?.message || 'Something went wrong');
            dispatch(updateError(error?.response?.data?.message || error?.message || 'Something went wrong'));
        }).finally(() => {
            dispatch(updateLoading(false));
            if (!getState().auth.error) {
                navigate(`/auth/verify?email=${formData.email}`);
            }
        })
    }
}

// Resend otp Api
export function ResendOtp(email) {
    return async (dispatch, getState) => {
        dispatch(updateError(null));
        dispatch(updateLoading(true));

        //make Api call

        await axios.post('/api/v1/auth/resend-otp', { email }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log("🚀 ~ return ~ r̥es:", res)
            toast.success(res.data.message);
        }).catch((error) => {
            toast.error(error?.message || 'Something went wrong');
            dispatch(updateError(error?.response?.data?.message || error?.message || 'Something went wrong'));
        }).finally(() => {
            dispatch(updateLoading(false));
        })
    }
};

//Verify otp Api
export function VerifyOtp(formValue, navigate) {
    return async (dispatch, getState) => {
        dispatch(updateError(null));
        dispatch(updateLoading(true));

        //make Api call
        const reqBody = {
            ...formValue
        }

        await axios.post('/api/v1/auth/verify-otp', reqBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log("🚀 ~ return ~ r̥es:", res);
            const { token, message } = res.data;
            dispatch(loginSuccess(token));
            toast.success(message);
        }).catch((error) => {
            toast.error(error?.message || 'Something went wrong');
            dispatch(updateError(error?.response?.data?.message || error?.message || 'Something went wrong'));
        }).finally(() => {
            dispatch(updateLoading(false));
            if (!getState().auth.error) {
                navigate('/dashboard');
            }
        })
    }
};

//login Api
export function loginUser(formValue, navigate) {
    return async (dispatch, getState) => {
        dispatch(updateError(null));
        dispatch(updateLoading(true));

        //make Api call
        const reqBody = {
            ...formValue
        }
        console.log("🚀 ~ loginUser ~ reqBody", reqBody);

        await axios.post('/api/v1/auth/login', reqBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log("🚀 ~ return ~ r̥es:", res);
            const { token, message } = res.data;
            dispatch(loginSuccess(token));
            toast.success(message || 'Login Success');
        }).catch((error) => {
            toast.error(error?.message || 'Something went wrong');
            dispatch(updateError(error?.response?.data?.message || error?.message || 'Something went wrong'));
        }).finally(() => {
            dispatch(updateLoading(false));
            if (!getState().auth.error) {
                navigate('/dashboard');
            }
        })
    }
}

export function loggedOutUser(navigate) {
    return async (dispatch) => {
        try {
            dispatch(logoutSuccess());
            navigate('/');
            toast.success('Logout Success');
        } catch (error) {
            console.log("🚀 ~ loggedOutUser ~ error", error)
        }
    }
}

export default slice.reducer;
export const { updateLoading, updateError, logoutSuccess, loginSuccess } = slice.actions;
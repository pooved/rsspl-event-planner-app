import { InitialAuthState, type AuthAction, type AuthState } from "../types/event";

  export const authReducer = (state= InitialAuthState,
    action: AuthAction):AuthState => {
        switch (action.type) {
            case 'LOGIN_SUCCESS':
                return { ...state, isAuthenticated: true, user:action.payload  };
            case 'LOGOUT':
                return { ...state, isAuthenticated: false, user: null };
            default:
                return state;
        }
    };
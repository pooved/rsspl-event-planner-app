import { createContext } from "preact";
import type { AuthAction, AuthContextType, IUser } from "../types/event";
import { useReducer, type ReactNode } from "preact/compat";
import { authReducer } from "./AuthReducer";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) =>{
      const [state, dispatch] = useReducer(authReducer, {
            isAuthenticated: false,
            user: null,
        });

        const login = async (userData:IUser) => {
         
            dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
        };
        const logout = () => {
            dispatch({ type: 'LOGOUT' });
        };
const value: AuthContextType = {
    state,
    dispatch,
    login,
    logout
};
        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        );
}
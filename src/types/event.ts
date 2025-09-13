import type { Dispatch } from "preact/hooks";

export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  imageUrl: string;
  category: string;
}
export interface ICategory {
  id: "string";
  name: "string";
}
export interface IUser {
  userName: "string";
  password: "string";
}
export interface InitialStateType {
  events: IEvent[];
  category: ICategory[];
  loading: boolean;
  error: string | null;
}
export interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}
export type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: IUser }
  | { type: "LOGOUT" };
export type Action =
  | { type: "FETCH_ITEMS_REQUEST" }
  | {
      type: "FETCH_ITEMS_SUCCESS";
      payload: { events: IEvent[]; category: ICategory[] };
    }
  | { type: "FETCH_ITEMS_FAILURE"; payload: string }
  | { type: "ADD_EVENT"; payload: IEvent }
  | { type: "DELETE_EVENT"; payload: string }
  | { type: "UPDATE_EVENT"; payload: IEvent };

export const InitialState: InitialStateType = {
  events: [],
  category: [],
  loading: false,
  error: null,
};
export const InitialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};
export interface EventContextProps {
  state: InitialStateType;
  dispatch: Dispatch<Action>;
  addEvent: (event: Omit<IEvent, "id">) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (event: IEvent) => void;
}
export interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  login: (user: IUser) => void;
  logout: () => void;
}
export interface FilterCriteria {
  searchText: string;
  category: string;
  date: Date | null;
}
export interface ConfirmationBoxProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

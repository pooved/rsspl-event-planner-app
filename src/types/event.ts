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
export interface InitialStateType {
  events: IEvent[];
  category: ICategory[];
  loading: boolean;
  error: string | null;
}

export type Action =
  | { type: "FETCH_ITEMS_REQUEST" }
  | {
      type: "FETCH_ITEMS_SUCCESS";
      payload: { events: IEvent[]; category: ICategory[] };
    }
  | { type: "FETCH_ITEMS_FAILURE"; payload: string }
  | { type: "ADD_EVENT"; payload: IEvent }
  | { type: "DELETE_EVENT"; payload: string }
  | { type: "UPDATE_EVENT"; payload: IEvent }
  | { type: "SET_FILTER"; payload: Date };

export const InitialState: InitialStateType = {
  events: [],
  category: [],
  loading: false,
  error: null,
};

export interface EventContextProps {
  state: InitialStateType;
  dispatch: Dispatch<Action>;
  addEvent: (event: Omit<IEvent, "id">) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (event: IEvent) => void;
}
export interface FilterCriteria {
  searchText: string;
  category: string;
  date: Date | null;
}

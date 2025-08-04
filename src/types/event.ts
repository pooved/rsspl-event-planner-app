export interface IEvent {
  title: string;
  discription: string;
  date: string;
  location: string;
  organizer: string;
}

export interface InitialStateType {
  events: IEvent[];
}
export const InitialState: InitialStateType = {
  events: [],
};

export interface addEvent {
  type: "ADD_EVENT";
  payload: {
    events: IEvent[];
  };
}
export type Action = addEvent;
export interface EventContextProps {
  event: IEvent[];
  addEvent: (event: IEvent) => void;
}

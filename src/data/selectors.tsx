import { AppState } from './state';

export const getPersons = (state: AppState) => state.data.persons;
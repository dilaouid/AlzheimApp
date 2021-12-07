import { createSelector } from 'reselect';
import { AppState } from './state';
import { Person } from '../models/Person';

export const getPersons = (state: AppState) => state.data.persons;
const getSearchText = (state: AppState) => state.data.searchText;

const getIdParam = (_state: AppState, props: any) => {
    return props.match.params['id'];
};

export const getPersonById = (state: any, id: string) => {
    const persons = getPersons(state);
    return persons.find((x: Person) => x.id === id);
};

export const getPerson = createSelector(
    getPersons, getIdParam,
    (persons, id) => persons.find((x: Person) => x.id === id)
);

export const getSearchedPerson = createSelector(
    getPersons, getSearchText,
    (persons: Person[], searchText) => {
      if (!searchText) {
        return persons;
      }
      return (persons.filter(s => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
    }
);
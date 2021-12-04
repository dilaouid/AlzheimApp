import { Person } from '../../models/Person';
export interface ConfState {
  persons: Person[];
  filteredPersons: string[];
  searchText?: string;
  loading?: boolean;
  menuEnabled: boolean;
};

import { getConfData } from '../api';
import { ActionType } from '../../util/types';
import { ConfState } from './conf.state';

export const loadConfData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getConfData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-conf-loading',
  isLoading
} as const);

export const setData = (data: Partial<ConfState>) => ({
  type: 'set-conf-data',
  data
} as const);

export const setSearchText = (searchText?: string) => ({ 
  type: 'set-search-text', 
  searchText 
} as const);

export const setMenuEnabled = (menuEnabled: boolean) => ({ 
  type: 'set-menu-enabled', 
  menuEnabled
} as const);

export const updateFilteredPersons = (filteredPersons: string[]) => ({
    type: 'update-filtered-persons', 
    filteredPersons 
  } as const);
  

export type SessionsActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setSearchText>
  | ActionType<typeof updateFilteredPersons>
  | ActionType<typeof setMenuEnabled>

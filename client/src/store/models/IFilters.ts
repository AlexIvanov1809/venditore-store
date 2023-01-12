export interface IFilters {
  _id: string;
  value: string;
  __v: number;
}

export interface GetFiltersResponse {
  content: IFilters[];
}

export interface AllFiltersResponse {
  content: IFilters;
}

export interface RemoveFiltersResponse {
  content: null | string;
}

export interface IFiltersInitialState {
  entities: IFilters[] | null;
  isLoading: boolean;
  error: string | null;
}

export interface ICreateFilters {
  value: string;
}

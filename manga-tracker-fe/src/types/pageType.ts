interface Pageable {
  offset: number;
  isPaged: boolean;
  sort: Sort;
}

interface Sort {
  empty: boolean;
  isSorted: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

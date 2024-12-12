// Define the Pageable interface
interface Pageable {
    pageNumber: number;   // Current page number
    pageSize: number;     // Number of items per page
    offset: number;       // Offset for the current page
    paged: boolean;       // Whether pagination is applied
    unpaged: boolean;     // Whether pagination is not applied
    sort: Sort;           // Sorting information
  }
  
  // Define the Sort interface
  interface Sort {
    empty: boolean;       // Whether the sort is empty
    sorted: boolean;      // Whether sorting is applied
    unsorted: boolean;    // Whether sorting is not applied
  }
  
  // Define the Page interface with generics
  export interface Page<T> {
    content: T[];               // Array of items in the current page
    pageable: Pageable;         // Pageable metadata
    last: boolean;              // Whether this is the last page
    totalPages: number;         // Total number of pages
    totalElements: number;      // Total number of items across all pages
    first: boolean;             // Whether this is the first page
    size: number;               // Number of items per page
    number: number;             // Current page number
    sort: Sort;                 // Sorting information
    numberOfElements: number;   // Number of items in the current page
    empty: boolean;             // Whether the current page is empty
  }
  
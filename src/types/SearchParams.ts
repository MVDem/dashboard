export type SearchParams = {
  searchMethod?: string;
  searchValue?: string;
  pagination: {
    page: number;
    limit: number;
  };
};

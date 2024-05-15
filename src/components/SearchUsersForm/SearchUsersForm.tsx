import { useState } from 'react';
import styles from './searchUsersForm.module.scss';
import { BiError } from 'react-icons/bi';

function SearchUsersForm({
  setSearchParam,
}: {
  setSearchParam: React.Dispatch<
    React.SetStateAction<{
      searchMethod: string;
      searchValue?: string | undefined;
    }>
  >;
}) {
  const [errorForm, setErrorForm] = useState<string | null>(null);

  const hendleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const searchMethod = data.get('searchMethod') as string;
    const searchValue = data.get('searchValue') as string;
    if (!searchValue) {
      setErrorForm('Search value is required');
      return;
    }
    const newParam = { searchMethod, searchValue };
    setSearchParam(newParam);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={(event) => hendleSearchSubmit(event)}>
        <select name="searchMethod">
          <option value="email">Search by email</option>
          <option value="id">Search by id</option>
        </select>
        <input type="text" name="searchValue" placeholder="Search" />

        <button type="submit">Search</button>
        <button
          type="button"
          onClick={() => {
            setSearchParam({
              searchMethod: 'all',
            }),
              setErrorForm(null);
          }}
        >
          Reset
        </button>
      </form>
      {errorForm && (
        <p className={styles.error}>
          <BiError />
          {errorForm}
        </p>
      )}
    </div>
  );
}
export default SearchUsersForm;

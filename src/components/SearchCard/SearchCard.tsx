import { useState } from 'react';
import styles from './searchCard.module.scss';
import { InputUI, SelectUI, ButtonUI, ErrorDisplay } from '../../UI';
import { SearchParams } from '../../types/SearchParams';

function SearchCard({
  setSearchParam,
}: {
  setSearchParam: React.Dispatch<React.SetStateAction<SearchParams>>;
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
    setSearchParam((prev) => {
      return { ...prev, newParam };
    });
  };

  return (
    <div className={styles.searchContainer}>
      <form id="Search-Form" onSubmit={(event) => hendleSearchSubmit(event)}>
        <SelectUI
          name="searchMethod"
          options={[
            { value: 'email', label: 'Search by email' },
            { value: 'id', label: 'Search by id' },
          ]}
        />
        <InputUI name="searchValue" placeholder="Search" type="text" />
        <ButtonUI type="submit">Search</ButtonUI>
        <ButtonUI
          type="button"
          onClick={() => {
            setSearchParam((prev) => {
              return { ...prev, searchMethod: 'all' };
            }),
              setErrorForm(null);
          }}
        >
          Reset
        </ButtonUI>
      </form>
      {errorForm && <ErrorDisplay text={errorForm} />}
    </div>
  );
}
export default SearchCard;

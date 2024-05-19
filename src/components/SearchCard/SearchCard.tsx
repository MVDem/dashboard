import { useContext, useState } from 'react';
import styles from './searchCard.module.scss';
import { InputUI, SelectUI, ButtonUI, ErrorDisplay } from '../../UI';
import { SearchParams } from '../../types/SearchParams';
import { TranslateContext } from '../../tranclations/context';
import { getTranclation } from '../../tranclations/utils';

function SearchCard({
  setSearchParam,
}: {
  setSearchParam: React.Dispatch<React.SetStateAction<SearchParams>>;
}) {
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const { language } = useContext(TranslateContext);
  const currentTarget = {
    language,
    page: '/users',
    block: 'searchCard',
  };

  const hendleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const searchMethod = data.get('searchMethod') as string;
    const searchValue = data.get('searchValue') as string;
    if (!searchValue) {
      setErrorForm('Search value is required');
      return;
    }
    setSearchParam((prev) => {
      return { ...prev, searchMethod, searchValue };
    });
  };

  const options = [
    {
      value: 'email',
      label: getTranclation({ ...currentTarget, name: 'option_email' }),
    },
    {
      value: 'id',
      label: getTranclation({ ...currentTarget, name: 'option_id' }),
    },
  ];

  return (
    <div className={styles.searchContainer}>
      <form id="Search-Form" onSubmit={(event) => hendleSearchSubmit(event)}>
        <SelectUI name="searchMethod" options={options} />
        <InputUI
          name="searchValue"
          placeholder={getTranclation({
            ...currentTarget,
            name: 'input_placeholder',
          })}
          type="text"
        />
        {errorForm && <ErrorDisplay text={errorForm} />}
        <ButtonUI type="submit">
          {getTranclation({
            ...currentTarget,
            name: 'submit_btn',
          })}
        </ButtonUI>
        <ButtonUI
          type="button"
          onClick={() => {
            setSearchParam((prev) => {
              return { ...prev, searchMethod: 'all' };
            }),
              setErrorForm(null);
          }}
        >
          {getTranclation({
            ...currentTarget,
            name: 'reset_btn',
          })}
        </ButtonUI>
      </form>
    </div>
  );
}
export default SearchCard;

import { ButtonUI, SelectUI } from '../../UI';
import { SearchParams } from '../../types/SearchParams';
import styles from './paginationCard.module.scss';

type PaginationCardProps = {
  searchParam: SearchParams;
  setSearchParam: React.Dispatch<React.SetStateAction<SearchParams>>;
};

function PaginationCard({ searchParam, setSearchParam }: PaginationCardProps) {
  const { page, limit, numberOfUsers } = searchParam.pagination;

  const handleChange = (param: string, value: number) => {
    setSearchParam((prev) => {
      const newPagination = {
        ...prev.pagination,
        [param]: value,
      };
      return {
        ...prev,
        pagination: newPagination,
      };
    });
  };

  return (
    <div className={styles.pageSettings}>
      <ButtonUI
        onClick={() => handleChange('page', page - 1)}
        disabled={page === 1}
      >
        Prev
      </ButtonUI>
      <p>{page}</p>
      <ButtonUI
        onClick={() => handleChange('page', page + 1)}
        disabled={numberOfUsers < page * limit}
      >
        next
      </ButtonUI>
      <SelectUI
        options={[
          { value: '10', label: '10' },
          { value: '15', label: '15' },
          { value: '20', label: '20' },
        ]}
        onChange={(e) => handleChange('limit', +e.target.value)}
      />
    </div>
  );
}
export default PaginationCard;

import { Language } from '../types';

const getTranclation = ({
  language,
  page,
  block,
  name,
}: {
  language: Language | undefined;
  page: string;
  block: string;
  name: string;
}) => {
  if (
    !language ||
    !language?.pages![page] ||
    !language?.pages![page][block][name]
  ) {
    return name;
  }
  return language?.pages![page][block][name];
};

export { getTranclation };

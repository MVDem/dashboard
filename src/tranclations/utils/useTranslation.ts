import { useContext } from 'react';
import { TranslateContext } from '../context';

function useTranslate(pathName: string, _block?: string) {
  const { language, selectedLanguage } = useContext(TranslateContext);

  const page =
    '/' +
    (pathName.split('/').filter((item) => item)[0]
      ? pathName.split('/').filter((item) => item)[0]
      : '');

  const getTranslations = ({
    name,
    block = _block,
  }: {
    name: string;
    block?: string;
  }) => {
    if (
      !block ||
      !language ||
      !language?.pages![page][block] ||
      !language?.pages![page][block] ||
      !language?.pages![page][block][name]
    ) {
      return name;
    }
    return language?.pages![page][block][name];
  };
  return { getTranslations, selectedLanguage };
}

export { useTranslate };

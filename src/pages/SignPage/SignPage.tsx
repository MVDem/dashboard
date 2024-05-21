import { useContext, useState } from 'react';
import styles from './signPage.module.scss';
import { AuthContext } from '../../context';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonUI, ErrorDisplay, InputUI } from '../../UI';
import ThemeButton from '../../UI/ThemeButton/ThemeButton';
import LanguageButton from '../../UI/LanguageButton/LanguageButton';
import { loginRequest } from '../../requests/service/auth';
import { useTranslate } from '../../tranclations/utils/useTranslation';

function SignPage() {
  const signinMethods = ['sign_in', 'sign_up'];
  const [signMethod, setSignMethod] = useState(0);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getTranslations } = useTranslate(pathname);

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get('username');
    const password = formData.get('password');
    if (!userName || !password) {
      setError('Please enter username and password');
      return;
    }
    const user = await loginRequest(userName as string, password as string);
    if (!user) {
      setError('Username or password is incorrect');
      return;
    }
    login(user);
    navigate('/');
  };

  const handleChangeSignMethod = () => {
    setSignMethod(signMethod === 0 ? 1 : 0);
    setError('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.signContainer}>
        <div className={styles.signWrapper}>
          <h1 className={styles.title}>
            {getTranslations({
              block: 'title',
              name: signinMethods[signMethod],
            })}
          </h1>
          <h2 className={styles.subTitle}>
            {getTranslations({
              block: 'title',
              name: 'greetings',
            })}
          </h2>
          <form
            id="Sign-Form"
            className={styles.signForm}
            onSubmit={(e) => handlerSubmit(e)}
          >
            <InputUI
              label={getTranslations({
                block: 'form',
                name: 'user_name',
              })}
              type="text"
              name="username"
              placeholder={getTranslations({
                block: 'form',
                name: 'user_name',
              })}
            />
            <InputUI
              label={getTranslations({
                block: 'form',
                name: 'password',
              })}
              type="password"
              name="password"
              placeholder={getTranslations({
                block: 'form',
                name: 'password',
              })}
            />
            <ErrorDisplay text={error} isVisible={error.length > 0} />
            <ButtonUI
              type="submit"
              children={getTranslations({
                block: 'title',
                name: signinMethods[signMethod],
              })}
            />
          </form>
          <button className={styles.extraBtn} onClick={handleChangeSignMethod}>
            {signMethod === 0 ? (
              <>
                {getTranslations({
                  block: 'title',
                  name: 'isRegistered',
                })}{' '}
                <span>
                  {getTranslations({
                    block: 'title',
                    name: signinMethods[1],
                  })}
                </span>
              </>
            ) : (
              <>
                {getTranslations({
                  block: 'title',
                  name: 'isNotRegistered',
                })}
                <span>
                  {getTranslations({
                    block: 'title',
                    name: signinMethods[0],
                  })}
                </span>
              </>
            )}
          </button>
          <div className={styles.settingsControls}>
            <ThemeButton />
            <LanguageButton />
          </div>
        </div>
      </div>
      <div className={styles.signImageContainer}>
        <div className={styles.signImagewrapper}>
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default SignPage;

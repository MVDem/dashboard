import { useContext, useState } from 'react';
import styles from './signPage.module.scss';
import { loginRequest } from '../../server/service/auth';
import { AuthContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { BiError } from 'react-icons/bi';

function SignPage() {
  const signinMethods = ['Sign in', 'Sign up'];
  const [signMethod, setSignMethod] = useState(0);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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
          <h1 className={styles.title}>{signinMethods[signMethod]}</h1>
          <h2 className={styles.subTitle}>Welcome to dashboard!</h2>
          <form className={styles.signForm} onSubmit={(e) => handlerSubmit(e)}>
            <label>
              <p>Login</p>
              <input type="text" name="username" placeholder="Username" />
            </label>
            <label>
              <p>Password</p>
              <input type="password" name="password" placeholder="Password" />
            </label>
            {error && (
              <p className={styles.error}>
                <BiError /> {error}
              </p>
            )}
            <button type="submit">{signinMethods[signMethod]}</button>
          </form>
          <div className={styles.SignExtraBtn}>
            <button onClick={handleChangeSignMethod}>
              {signMethod === 0 ? (
                <>
                  {`Don't have an account?`} <span>{signinMethods[1]}</span>
                </>
              ) : (
                <>
                  {`Do have an account?`} <span>{signinMethods[0]}</span>
                </>
              )}
            </button>
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

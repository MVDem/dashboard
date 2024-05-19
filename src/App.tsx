import Routing from './routes/routes';
import AuthProvider from './context';
import TranslateProvider from './tranclations/context';
import languages from './tranclations/translations-data';

function App() {
  return (
    <AuthProvider>
      <TranslateProvider languages={languages} userLanguage={'EN'}>
        <Routing />
      </TranslateProvider>
    </AuthProvider>
  );
}

export default App;

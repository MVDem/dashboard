import Routing from './routes/routes';
import AuthProvider from './context';

function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
}

export default App;

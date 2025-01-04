import AppRouter from './router/AppRouter';
import { Amplify } from 'aws-amplify';
import outputs from './aws-exports';
import { AuthProvider } from './context/auth/authContext';

Amplify.configure(outputs);

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <main role="main">
            <AppRouter data-testid="app-router" />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;

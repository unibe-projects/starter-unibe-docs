import AppRouter from './router/AppRouter';
import { Amplify } from 'aws-amplify';
import outputs from './aws-exports';
import { AuthProvider } from './context/auth/authContext';
import { FormValuesProvider } from './context/formValues/formValuesContext';

Amplify.configure(outputs);

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <main role="main">
          <FormValuesProvider>
            <AppRouter data-testid="app-router" />
          </FormValuesProvider>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;

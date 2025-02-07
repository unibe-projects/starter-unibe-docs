import AppRouter from './router/AppRouter';
import { Amplify } from 'aws-amplify';
import outputs from './aws-exports';
import { AuthProvider } from './context/auth/authContext';
import { FormValuesProvider } from './context/formValues/formValuesContext';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: outputs.aws_appsync_graphqlEndpoint,
  headers: {
    'x-api-key': outputs.aws_appsync_apiKey,
  },
  cache: new InMemoryCache(),
});

Amplify.configure(outputs);

function App() {
  console.warn('%c¡Detente!', 'color: red; font-size: 20px; font-weight: bold;');
  console.warn(
    "Esta función del navegador está pensada para desarrolladores. Si alguien te ha indicado que copiaras y pegaras algo aquí para habilitar una función  o para 'hackear', se trata de un fraude."
  );

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <main role="main">
            <FormValuesProvider>
              <AppRouter data-testid="app-router" />
            </FormValuesProvider>
          </main>
        </div>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;

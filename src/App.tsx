import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="App">
      <main role="main">
        <AppRouter data-testid="app-router" />
      </main>
    </div>
  );
}

export default App;

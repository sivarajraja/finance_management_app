import './App.css';
import { Provider } from 'react-redux';
import { store } from './Store';
import { Navigator } from './components/Navigator';

function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;

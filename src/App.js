import { Provider } from 'react-redux';
import './App.css';
import TodoList from './TodoList';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <TodoList />
      </Provider>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.scss';
import TodoList from './components/TodoList/index.jsx';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Learn react js' },
    { id: 2, title: 'Build project' },
    { id: 3, title: 'Learn guitar' }
  ]);

  function handleTodoList(todo) {
    console.log(todo);
    //if x.id === to.id, index will be equal this index
    //if x.id !== to.id, index will be equal -1
    const index = todoList.findIndex(x => x.id === todo.id);

    if (index < 0) return; //do not something

    //Clone todoList before update
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1); //Remove todo
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h3>Todo List</h3>
      <TodoList todos={todoList}
        onTodoClick={handleTodoList} />
    </div>
  );
}

export default App;

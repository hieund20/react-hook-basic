import './App.scss';
import TodoList from './components/TodoList/index.jsx';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import PostFilterForm from './components/PostFilterForm';
import Clock from './components/Clock';
import UpDownNumber from './components/UpDownNumber';
import ScreenMode from './components/DarkLightMode';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Learn react js' },
    { id: 2, title: 'Build project' },
    { id: 3, title: 'Learn guitar' }
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  })

  useEffect(() => {
    async function fetchPostList() {
      try {
        //parse object to: _limit=10&_page=1
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage
    })
  }

  function handleFilterChange(newFilters) {
    console.log(newFilters);
    setFilters({
      ...filters,
      _page: 1, //set page return first page
      title_like: newFilters.searchTerm
    });
  }

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

  function handleTodoFormSubmit(formValue) {
    console.log(formValue);
    //add new todo to current todo list
    const newTodo = {
      id: todoList.length + 1,
      ...formValue //get all props value from formValue
      //or title: formValue
    }

    //Clone todoList before update
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h3>React hook - useContext- Dark / Light mode</h3>
      {/* <TodoForm
        onSubmit={handleTodoFormSubmit}
      />
      <TodoList
        todos={todoList}
        onTodoClick={handleTodoList}
      /> */}
      {/* <PostFilterForm
        onSubmit={handleFilterChange}
      />
      <PostList
        posts={postList}
      />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      /> */}
      {/* <Clock /> */}
      {/* <UpDownNumber /> */}
      <ScreenMode />
    </div>
  );
}

export default App;

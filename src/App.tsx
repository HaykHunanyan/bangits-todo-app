import React from 'react';
import TodoList from './components/organisms/TodoList/TodoList';
import TodoForm from './components/organisms/TodoForm';

const App: React.FC = () => {
  return (
    <div>
      <h1>Todo List App</h1>
      <TodoForm />
      <TodoList /> 
    </div>
  );
};

export default App;


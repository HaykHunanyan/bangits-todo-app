import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import TaskItem from '../TaskItem';
import './TodolistWrapper.scss';

const TodoList: React.FC = () => {
  const [openSection, setOpenSection] = useState(1);
  const {pending,removed,completed,overdue} = useSelector((state: RootState) => state.todo.tasks);

  const handleSectionClick = (sectionNumber:number) => {
    setOpenSection(sectionNumber)
  };
  
  return (
    <div className='todo_container'>
      <div className={`todo_list_row ${openSection === 1 ? 'open_section':'close_section'}`} onClick={() => window.innerWidth < 760 && handleSectionClick(1)}>
        <nav className='todo_list_title'>Pending</nav>
        {pending.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      <div className={`todo_list_row ${openSection === 2 ? 'open_section':'close_section'}`} onClick={() => window.innerWidth < 760 && handleSectionClick(2)}>
        <nav className='todo_list_title'>Completed</nav>
        {completed.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      <div className={`todo_list_row ${openSection === 3 ? 'open_section':'close_section'}`} onClick={() => window.innerWidth < 760 && handleSectionClick(3)}>
        <nav className='todo_list_title'>Removed</nav>
        {removed.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      <div className={`todo_list_row ${openSection === 4 ? 'open_section':'close_section'}`} onClick={() => window.innerWidth < 760 && handleSectionClick(4)}>
        <nav className='todo_list_title'>Overdue</nav>
        {overdue.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

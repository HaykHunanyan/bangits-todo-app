import React, { useEffect } from 'react';
import {Row} from 'antd'
import { useDispatch } from 'react-redux';
import { Task } from '../../types';
import {  removeTask, markAsComplete,markAsOverdue } from '../../store/todoSlice';
import moment from 'moment';
import { Button } from '../atoms';
import EditableForm from '../molecules/EditableForm/EditableForm'

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  
  const checkOverdue = (overdueTask: Task) => {
    if(overdueTask?.deadline && moment(overdueTask?.deadline).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
      dispatch(markAsOverdue(overdueTask));
    }
  }
  const handleRemove = () => {
    // Dispatch remove task action
    dispatch(removeTask(task));
  };

  useEffect(()=>{
    checkOverdue(task)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleMarkAsComplete = () => {
    // Dispatch mark as complete action
    dispatch(markAsComplete(task.id));
  };
  interface ActionList {
    completed: () => JSX.Element;
    pending: () => JSX.Element;
    overdue: () => JSX.Element;
    removed: () => JSX.Element;
  }
  const generateButton = (type: 'remove' | 'edit' | 'accept', onClick: () => void, label: string, extraProps: object = {}) => (
    <Button type={type} height={30} mb={5} onClick={onClick} {...extraProps}>
      {label}
    </Button>
  );

  const actionList: ActionList = {
    completed: () => (
      <>
      {generateButton('remove', handleRemove, 'Remove')}
      </>
    ),
    pending: () => (
      <>
        {generateButton('remove', handleRemove, 'Remove')}
        {generateButton('accept', handleMarkAsComplete, 'Mark as Complete')}
      </>
    ),
    overdue: () => (
      <>
      </>
    ),
    removed: () => (
      <>
      </>
    ),
  };

  const statusColor = {
    completed: '#00dace',
    overdue: '#689F38',
    removed: '#fc5e7a',
    pending:'#36784d'
  }

  return (
    <div>
      <div>
        {
          task.status === 'pending'?
            <>
              <EditableForm task={task} checkOverdue={(overdueTask:Task)=>checkOverdue(overdueTask)}/>
            </>
          :
            <>
                <div className='overflow_wrap'>Title: {task.title}</div>
                <div className='overflow_wrap'>Description: {task.description}</div>
                <div className='overflow_wrap'>Deadline: {task?.deadline ? moment(task.deadline).format('YYYY-MM-DD') : new Date().toLocaleDateString()}</div>
            </>  
        }
        </div>
      <div>Status: <span style={{color:statusColor[task.status]}}>{task.status.toUpperCase()}</span></div>
      <Row justify="space-around">
        {actionList[task.status]()}
      </Row>
    </div>
  );
};

export default TaskItem;
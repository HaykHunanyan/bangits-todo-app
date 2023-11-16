import React,{useState} from 'react';
import { Row,Popover } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Task } from '../../../types';
import { editTask } from '../../../store/todoSlice';
import { Input,StyledDatePicker } from '../../atoms';
import moment from 'moment';

interface TaskItemProps {
  task: Task;
  checkOverdue: (overdueTask: Task) => void;
}

const EditableForm: React.FC<TaskItemProps> = ({ task,checkOverdue }) => {
  const [editMode, setEditMode] = useState({title:'',description:'',deadline:''});
  const dispatch = useDispatch();

  const handleEdit = (editedTask: Task,editType: string) => {
    setEditMode({...editMode,[editType]:''});
    checkOverdue(editedTask);
    dispatch(editTask(editedTask));

  }; 

  const { TextArea } = Input;
  const content = 'Click if you want to change content!'

  return (
    <>
      <div>
        <Row>
          <span>Title: </span>
          {editMode.title ? (
              <Input
                value={editMode.title || task.title}
                onChange={(e)=> setEditMode({...editMode,title:e.target.value})}
                onBlur={(e)=>handleEdit({ ...task, title: e.target.value },'title')}
                autoFocus
              />
          ) : (
            <Popover content={content} className='overflow_wrap'>
                <Row onClick={() => task.status === 'pending' && setEditMode({...editMode,title:task.title})}>
                    <span>{task.title}</span>
                    <EditOutlined/>
                </Row>
            </Popover>
          )}
        </Row>
      </div>
      <div>
        <Row>
          <span>Description: </span>
            {editMode.description ? (
              <TextArea
                showCount 
                maxLength={300}
                autoSize={{ minRows: 3, maxRows: 8 }}
                value={editMode.description || task.description}
                onChange={(e)=> setEditMode({...editMode,description:e.target.value})}
                onBlur={(e)=> handleEdit({ ...task, description: e.target.value },'description') }
                autoFocus
              />
            ) : (
              <Popover content={content} className='overflow_wrap'>
                <Row onClick={() => task.status === 'pending' && setEditMode({...editMode,description:task.description||''})}>
                    <span>{task.description}</span>
                    <EditOutlined/>
                 </Row>
              </Popover>
            )}
        </Row>
      </div>
      <div>
        <Row>
          <span>Deadline: </span>
            {editMode.deadline ? (
                <StyledDatePicker
                    style={{ width: '200px' }}
                    onChange={(date, dateString) => handleEdit({ ...task, deadline: dateString },'deadline')}
                    onBlur={()=> handleEdit({ ...task, deadline: new Date().toLocaleDateString() },'deadline') }
                    autoFocus
                />
            ) : (
                <Popover content={content} className='overflow_wrap'>
                    <Row onClick={() => task.status === 'pending' && setEditMode({...editMode,deadline:moment(task.deadline).format('YYYY-MM-DD')})}>
                        <span>
                            {task?.deadline ? moment(task.deadline).format('YYYY-MM-DD') : new Date().toLocaleDateString()}
                        </span>
                        <EditOutlined/>
                    </Row>
               </Popover>
            )}
        </Row>
      </div>
    </>
  );
};

export default EditableForm;
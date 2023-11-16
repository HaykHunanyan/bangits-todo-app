import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/todoSlice';
import {Input,Button,StyledDatePicker} from '../atoms'
import {Row,Col} from 'antd';
import moment from 'moment'; 

const TodoForm: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      deadline: undefined,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: (values) => {
      dispatch(addTask({ ...values, status: 'pending', id: Date.now() }));
      formik.resetForm();
    },
  });
  const { TextArea } = Input;
  return (
    <form onSubmit={formik.handleSubmit}>
      <Row>
       <Col span={24}>
        <label>
          Title:
          <Input type="text" name="title" onChange={formik.handleChange} value={formik.values.title} />
        </label>
        {formik.touched.title && formik.errors.title ? <div style={{color:'red'}}>{formik.errors.title}</div> : null}
       </Col>
       <Col span={24}>
        <label>
          Description:
          <TextArea
            showCount 
            maxLength={300}
            autoSize={{ minRows: 3, maxRows: 8 }}
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </label>
       </Col>
       <Col span={24}>
          <label>
            <div>
              Deadline:
            </div>
            <StyledDatePicker
              name="deadline"
              style={{ width: '200px' }}
              onChange={(date, dateString) => formik.setFieldValue('deadline', dateString)}
              value={formik.values.deadline && moment(formik.values.deadline)}
            />
          </label>
        </Col>
        <Button type="outline" size='large' htmlType="submit" mt={10} width='200px'>Add Task</Button>
      </Row>
    </form>
  );
};

export default TodoForm;

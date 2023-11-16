import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';

interface TodoState {
  tasks: {
    completed: Task[];
    pending: Task[];
    removed: Task[];
    overdue: Task[];
  };
}

const initialState: TodoState = {
  tasks: {
    completed: [],
    pending: [],
    removed: [],
    overdue: [],
  },
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.pending.push(action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const editedTask = action.payload;
      const index = state.tasks.pending.findIndex((task) => task.id === editedTask.id);
      if (index !== -1) {
        state.tasks.pending[index] = editedTask;
      }
    },
    removeTask: (state, action: PayloadAction<Task>) => {
      const selectedTask = action.payload;
      const taskIndex = state.tasks[selectedTask.status].findIndex((t) => t.id === selectedTask.id);
      if (taskIndex !== -1) {
        const task = state.tasks[selectedTask.status][taskIndex];
        state.tasks[selectedTask.status].splice(taskIndex, 1);
        task.status = 'removed';
        state.tasks.removed.push(task);
      }
    },
    markAsComplete: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      const taskIndex = state.tasks.pending.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        const task = state.tasks.pending[taskIndex];
        state.tasks.pending.splice(taskIndex, 1);
        task.status = 'completed';
        state.tasks.completed.push(task);
      }
    },
    markAsOverdue: (state, action: PayloadAction<Task>) => {
      const selectedTask = action.payload;
      const taskIndex = state.tasks[selectedTask.status].findIndex((t) => t.id === selectedTask.id);
      if (taskIndex !== -1) {
        const task = state.tasks[selectedTask.status][taskIndex];
        state.tasks[selectedTask.status].splice(taskIndex, 1);
        task.status = 'overdue';
        state.tasks.overdue.push(task);
      }
    },
  },
});

export const { addTask, removeTask,editTask, markAsComplete,markAsOverdue } = todoSlice.actions;

export default todoSlice.reducer;

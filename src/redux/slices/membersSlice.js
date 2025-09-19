import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialMembers = [
  { id: 'm1', name: 'Alice Johnson', status: 'Offline', attendance: 'Absent', tasks: [] },
  { id: 'm2', name: 'Bob Smith', status: 'Break', attendance: 'Present', tasks: [
      { id: 't1', title: 'Fix login bug', dueDate: '2025-09-25', progress: 20, completed:false }
    ] },
  { id: 'm3', name: 'Clara Lee', status: 'Meeting', attendance: 'Late', tasks: [] },
  { id: 'm4', name: 'David Kim', status: 'Offline', attendance: 'On Leave', tasks: [] },
];

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    list: initialMembers
  },
  reducers:{
    assignTask: {
      reducer(state, action){
        const { memberId, task } = action.payload;
        const m = state.list.find(x => x.id === memberId);
        if(m) m.tasks.push(task);
      },
      prepare(memberId, title, dueDate){
        return { payload: { memberId, task: { id: nanoid(), title, dueDate, progress:0, completed:false } } };
      }
    },
    updateStatus(state, action){
      const { memberId, status } = action.payload;
      const m = state.list.find(x => x.id === memberId);
      if(m) m.status = status;
    },
    updateAttendance(state, action){
      const { memberId, attendance } = action.payload;
      const m = state.list.find(x => x.id === memberId);
      if(m) m.attendance = attendance;
    },
    applyLeave(state, action){
      const { memberId, days } = action.payload;
      const m = state.list.find(x => x.id === memberId);
      if(m) m.attendance = 'On Leave';
    },
    incrementProgress(state, action){
      const { memberId, taskId } = action.payload;
      const m = state.list.find(x => x.id === memberId);
      if(!m) return;
      const t = m.tasks.find(tt => tt.id === taskId);
      if(!t || t.completed) return;
      t.progress = Math.min(100, t.progress + 10);
      if(t.progress >= 100){ t.completed = true; t.progress = 100; }
    },
    decrementProgress(state, action){
      const { memberId, taskId } = action.payload;
      const m = state.list.find(x => x.id === memberId);
      if(!m) return;
      const t = m.tasks.find(tt => tt.id === taskId);
      if(!t) return;
      t.progress = Math.max(0, t.progress - 10);
      if(t.progress < 100) t.completed = false;
    },
    addMember(state, action){
      state.list.push({ id: nanoid(), name: action.payload.name, status: 'Offline', attendance: 'Absent', tasks: [] });
    }
  }
});

export const { assignTask, updateStatus, updateAttendance, applyLeave, incrementProgress, decrementProgress, addMember } = membersSlice.actions;
export default membersSlice.reducer;

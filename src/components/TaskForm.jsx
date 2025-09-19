import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';

export default function TaskForm({ members }){
  const dispatch = useDispatch();
  const [memberId, setMemberId] = useState(members[0]?.id || '');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if(!memberId || !title || !dueDate) return alert('Fill all fields');
    dispatch(assignTask(memberId, title, dueDate));
    setTitle(''); setDueDate('');
    alert('Task assigned');
  };

  return (
    <form onSubmit={submit}>
      <div className="form-row">
        <select value={memberId} onChange={e=>setMemberId(e.target.value)}>
          {members.map(m=> <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" />
        <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        <button type="submit">Assign</button>
      </div>
    </form>
  );
}

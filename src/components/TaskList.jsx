import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementProgress, decrementProgress } from '../redux/slices/membersSlice';

export default function TaskList(){
  const dispatch = useDispatch();
  const user = useSelector(s=>s.role.currentUser);
  const members = useSelector(s=>s.members.list);
  const member = members.find(m=>m.name === user) || members[0];

  if(!member) return <div className="small">No member found</div>;
  return (
    <div>
      <div className="small">Tasks for <strong>{member.name}</strong></div>
      <div className="task-list">
        {member.tasks.length === 0 && <div className="small">No tasks assigned.</div>}
        {member.tasks.map(t=>(
          <div key={t.id} className="card" style={{marginBottom:8}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:700}}>{t.title}</div>
                <div className="small">Due: {t.dueDate}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:160}} className="progress-bar" aria-hidden>
                  <div className="progress-fill" style={{width: t.progress + '%'}} />
                </div>
                <div className="small">{t.progress}%</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  <button onClick={()=>dispatch(incrementProgress({ memberId: member.id, taskId: t.id }))}>+</button>
                  <button onClick={()=>dispatch(decrementProgress({ memberId: member.id, taskId: t.id }))}>-</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

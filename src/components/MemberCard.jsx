import React from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus, updateAttendance } from '../redux/slices/membersSlice';

export default function MemberCard({ member }){
  const dispatch = useDispatch();
  const initials = member.name.split(' ').map(n=>n[0]).slice(0,2).join('');
  return (
    <div className="member-card">
      <div className="member-left">
        <div className="avatar">{initials}</div>
        <div className="member-info">
          <div className="member-name">{member.name}</div>
          <div className="member-meta">{member.tasks.filter(t=>!t.completed).length} active tasks · <span className="small">Attendance: {member.attendance}</span></div>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div className={"status-badge status-" + member.status}>{member.status}</div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <button className="icon-btn" title="Working" onClick={()=>dispatch(updateStatus({ memberId: member.id, status: 'Working' }))}>W</button>
          <button className="icon-btn" title="Break" onClick={()=>dispatch(updateStatus({ memberId: member.id, status: 'Break' }))}>B</button>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:6,marginLeft:12}}>
          <select value={member.attendance} onChange={e=>dispatch(updateAttendance({ memberId: member.id, attendance: e.target.value }))}>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import AttendanceSummary from '../components/AttendanceSummary';
import ChartsPanel from '../components/ChartsPanel';
import { switchRole } from '../redux/slices/roleSlice';

export default function Dashboard(){
  const dispatch = useDispatch();
  const role = useSelector(s => s.role.currentRole);
  const user = useSelector(s => s.role.currentUser);
  const members = useSelector(s => s.members.list);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAttendance, setFilterAttendance] = useState('All');

  const counts = useMemo(()=>{
    const c = { Working:0, Break:0, Meeting:0, Offline:0, Present:0, Late:0, Absent:0, 'On Leave':0 };
    members.forEach(m => {
      c[m.status] = (c[m.status]||0)+1;
      c[m.attendance] = (c[m.attendance]||0)+1;
    });
    return c;
  },[members]);

  let visible = members.slice();
  if(filterStatus !== 'All') visible = visible.filter(m=>m.status===filterStatus);
  if(filterAttendance !== 'All') visible = visible.filter(m=>m.attendance===filterAttendance);

  return (
    <div className="app">
      <div className="header">
        <div className="title">Team Pulse Dashboard</div>
        <div className="header-right">
          <div className="pill">Logged in as <strong>{user}</strong></div>
          <div className="pill">Role: <strong>{role}</strong></div>
          <button className="icon-btn" onClick={()=>dispatch(switchRole(role==='lead'?'member':'lead'))}>Toggle Role</button>
        </div>
      </div>

      <div className="grid">
        <div>
          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <div>
                <div className="small">Total employees</div>
                <div style={{fontSize:20,fontWeight:700}}>{members.length}</div>
              </div>
              <AttendanceSummary counts={counts} />
            </div>

            <div className="filter-row">
              <label className="small">Status</label>
              <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
                <option>All</option><option>Working</option><option>Meeting</option><option>Break</option><option>Offline</option>
              </select>

              <label className="small">Attendance</label>
              <select value={filterAttendance} onChange={e=>setFilterAttendance(e.target.value)}>
                <option>All</option><option>Present</option><option>Late</option><option>Absent</option><option>On Leave</option>
              </select>
            </div>

            <div className="member-list">
              {visible.map(m=> <MemberCard key={m.id} member={m} />)}
            </div>
          </div>

          {role === 'lead' && <div className="card" style={{marginTop:12}}>
            <div style={{fontWeight:700,marginBottom:8}}>Assign Work</div>
            <TaskForm members={members} />
          </div>}
        </div>

        <div>
          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:700}}>My Area</div>
                <div className="small">User: {user}</div>
              </div>
            </div>

            {role === 'member' ? (
              <>
                <TaskList />
                <div style={{marginTop:12}}>
                  <div style={{fontWeight:700,marginBottom:8}}>Apply Leave</div>
                  <div style={{display:'flex',gap:8}}>
                    <ApplyLeave />
                  </div>
                </div>
              </>
            ) : (
              <div className="small">Switch to Team Member role to update status, attendance and view personal tasks.</div>
            )}
          </div>

          <div className="card" style={{marginTop:12}}>
            <div style={{fontWeight:700,marginBottom:8}}>Charts</div>
            <div className="charts">
              <div className="chart-card"><ChartsPanel type="attendance" /></div>
              <div className="chart-card"><ChartsPanel type="tasks" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// small ApplyLeave component inline
function ApplyLeave(){
  const dispatch = useDispatch();
  const user = useSelector(s=>s.role.currentUser);
  const members = useSelector(s=>s.members.list);
  const me = members.find(m=>m.name === user) || members[0];
  const [days, setDays] = React.useState(1);

  const apply = () => {
    if(!me) return alert('No member found');
    dispatch({ type: 'members/applyLeave', payload: { memberId: me.id, days } });
    alert('Leave applied');
  };

  return (
    <>
      <input type="number" min="1" value={days} onChange={e=>setDays(e.target.value)} style={{width:100}} />
      <button onClick={apply}>Apply</button>
    </>
  );
}

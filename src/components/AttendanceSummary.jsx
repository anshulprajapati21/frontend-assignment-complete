import React from 'react';

export default function AttendanceSummary({ counts }){
  return (
    <div style={{display:'flex',gap:8}}>
      <div className="summary-card">
        <div className="small">Present</div>
        <div style={{fontWeight:700}}>{counts.Present || 0}</div>
      </div>
      <div className="summary-card">
        <div className="small">Late</div>
        <div style={{fontWeight:700}}>{counts.Late || 0}</div>
      </div>
      <div className="summary-card">
        <div className="small">Absent</div>
        <div style={{fontWeight:700}}>{counts.Absent || 0}</div>
      </div>
      <div className="summary-card">
        <div className="small">On Leave</div>
        <div style={{fontWeight:700}}>{counts['On Leave'] || 0}</div>
      </div>
    </div>
  );
}

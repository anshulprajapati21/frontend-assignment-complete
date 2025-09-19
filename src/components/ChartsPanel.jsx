import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const COLORS = ['#22c55e','#f59e0b','#ef4444','#a78bfa'];

export default function ChartsPanel({ type }){
  const members = useSelector(s => s.members.list);
  if(type === 'attendance'){
    const data = [
      { name: 'Present', value: members.filter(m=>m.attendance==='Present').length },
      { name: 'Late', value: members.filter(m=>m.attendance==='Late').length },
      { name: 'Absent', value: members.filter(m=>m.attendance==='Absent').length },
      { name: 'On Leave', value: members.filter(m=>m.attendance==='On Leave').length },
    ];
    return (
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
            {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  } else {
    const data = members.map(m=> ({ name: m.name.split(' ')[0], tasks: m.tasks.length }));
    return (
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tasks" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

import React, { useState, useEffect } from 'react';
import { Activity, Database, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalLogs: 0, errorLogs: 0, status: 'Checking...' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/logs');
        if (!res.ok) throw new Error('Network error');
        const logs = await res.json();
        
        const errors = logs.filter(log => log.level === 'ERROR').length;
        
        setStats({
          totalLogs: logs.length,
          errorLogs: errors,
          status: 'Online'
        });
      } catch (error) {
        setStats({
          totalLogs: 0,
          errorLogs: 0,
          status: 'Offline'
        });
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: 'Application Status',
      value: stats.status,
      icon: Activity,
      color: stats.status === 'Online' ? 'text-green-500' : 'text-red-500',
      bgColor: stats.status === 'Online' ? 'bg-green-500/10' : 'bg-red-500/10',
    },
    {
      title: 'Total Logs Monitored',
      value: stats.totalLogs.toString(),
      icon: Database,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Alerts Triggered',
      value: stats.errorLogs.toString(),
      icon: AlertCircle,
      color: 'text-accentError',
      bgColor: 'bg-accentError/10',
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-white mb-8">System Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-darkCard rounded-xl p-6 shadow-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-white">{card.value}</p>
              </div>
              <div className={`p-4 rounded-full ${card.bgColor}`}>
                <card.icon className={`w-8 h-8 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-darkCard rounded-xl p-6 shadow-lg border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Welcome to LogMonitor Pro</h2>
        <p className="text-gray-400 leading-relaxed">
          This centralized dashboard provides real-time insights into your application's health. 
          Navigate to the <span className="text-primary font-medium">Logs</span> section to view detailed system events, 
          or check the <span className="text-accentError font-medium">Alerts</span> page for critical issues requiring immediate attention.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

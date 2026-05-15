import React, { useState, useEffect } from 'react';
import { Info, AlertTriangle, XCircle, Search } from 'lucide-react';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/logs');
        const data = await res.json();
        // Reverse to show newest first
        setLogs(data.reverse());
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const getLogStyle = (level) => {
    switch (level) {
      case 'INFO':
        return { icon: Info, color: 'text-accentInfo', bg: 'bg-accentInfo/10', border: 'border-accentInfo/20' };
      case 'WARN':
        return { icon: AlertTriangle, color: 'text-accentWarn', bg: 'bg-accentWarn/10', border: 'border-accentWarn/20' };
      case 'ERROR':
        return { icon: XCircle, color: 'text-accentError', bg: 'bg-accentError/10', border: 'border-accentError/30' };
      default:
        return { icon: Info, color: 'text-gray-400', bg: 'bg-gray-800', border: 'border-gray-700' };
    }
  };

  const filteredLogs = filter === 'ALL' ? logs : logs.filter(log => log.level === filter);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">System Logs</h1>
        
        {/* Filter Controls */}
        <div className="flex bg-darkCard rounded-lg p-1 border border-gray-800 shadow-inner">
          {['ALL', 'INFO', 'WARN', 'ERROR'].map(level => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === level 
                  ? 'bg-primary text-white shadow' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-darkCard rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-8 text-center text-gray-400 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            Loading logs...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center">
            <Search className="w-12 h-12 mb-3 text-gray-600" />
            No logs found for the selected filter.
          </div>
        ) : (
          <ul className="divide-y divide-gray-800 max-h-[70vh] overflow-y-auto">
            {filteredLogs.map((log) => {
              const style = getLogStyle(log.level);
              const LogIcon = style.icon;
              
              return (
                <li key={log.id} className={`p-4 hover:bg-gray-800/50 transition-colors flex items-start gap-4 border-l-4 ${style.border} ${log.level === 'ERROR' ? 'bg-red-500/5' : ''}`}>
                  <div className={`mt-1 p-2 rounded-full flex-shrink-0 ${style.bg}`}>
                    <LogIcon className={`w-5 h-5 ${style.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className={`text-sm font-bold px-2 py-0.5 rounded ${style.bg} ${style.color}`}>
                        {log.level}
                      </span>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 truncate ${log.level === 'ERROR' ? 'text-red-400 font-medium' : 'text-gray-300'}`}>
                      {log.message}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LogsPage;

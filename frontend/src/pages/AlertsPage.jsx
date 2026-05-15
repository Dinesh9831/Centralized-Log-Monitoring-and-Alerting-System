import React, { useState, useEffect } from 'react';
import { AlertTriangle, BellRing } from 'lucide-react';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/alerts');
        const data = await res.json();
        // Reverse to show newest alerts first
        setAlerts(data.reverse());
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8 text-accentError border-b border-gray-800 pb-4">
        <BellRing className="w-8 h-8" />
        <h1 className="text-3xl font-bold text-white">Active Alerts</h1>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accentError"></div>
        </div>
      ) : alerts.length === 0 ? (
        <div className="bg-darkCard rounded-xl p-12 text-center border border-gray-800 shadow-lg flex flex-col items-center">
          <div className="bg-green-500/10 p-4 rounded-full mb-4">
            <AlertTriangle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Active Alerts</h2>
          <p className="text-gray-400">Your system is healthy. There are no critical errors reported.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-darkCard rounded-xl border border-red-500/30 overflow-hidden shadow-lg shadow-red-900/20 relative"
            >
              {/* Alert indicator pulse */}
              <div className="absolute top-0 right-0 w-2 h-2 mt-3 mr-3 rounded-full bg-red-500 animate-pulse"></div>

              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-red-500/10 p-2 rounded-lg text-red-500">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">Critical Error</h3>
                    <p className="text-xs text-red-400 font-medium">Triggered by ERROR log</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded p-3 mb-4 mt-2">
                  <p className="text-gray-300 font-mono text-sm break-words">
                    {alert.message}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-3 border-t border-gray-800">
                  <span>ID: {alert.id.slice(-6)}</span>
                  <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPage;

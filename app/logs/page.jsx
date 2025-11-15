'use client';
import { useState, useEffect } from 'react';

export default function LogsViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, success, failed
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    fetchLogs();
    // Refresh logs every 5 seconds
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs');
      const data = await response.json();
      if (data.success) {
        setLogs(data.logs || []);
      } else {
        setError('Failed to fetch logs');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filter !== 'all' && (filter === 'success' ? !log.success : log.success)) {
      return false;
    }
    if (searchName && !log.name.toLowerCase().includes(searchName.toLowerCase())) {
      return false;
    }
    return true;
  });

  const successCount = logs.filter(l => l.success).length;
  const failedCount = logs.filter(l => !l.success).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🔐 Login Attempts Tracker</h1>
          <p className="text-gray-300">Monitor all login attempts from all devices and browsers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-900/40 border border-blue-500/50 rounded-lg p-4">
            <p className="text-blue-300 text-sm font-semibold">Total Attempts</p>
            <p className="text-3xl font-bold text-blue-200">{logs.length}</p>
          </div>
          <div className="bg-green-900/40 border border-green-500/50 rounded-lg p-4">
            <p className="text-green-300 text-sm font-semibold">Successful</p>
            <p className="text-3xl font-bold text-green-200">{successCount}</p>
          </div>
          <div className="bg-red-900/40 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-300 text-sm font-semibold">Failed</p>
            <p className="text-3xl font-bold text-red-200">{failedCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Filter Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Attempts</option>
                <option value="success">✅ Successful Only</option>
                <option value="failed">❌ Failed Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Search Name</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Actions</label>
              <button
                onClick={fetchLogs}
                className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors font-semibold"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-300">⚠️ {error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">Loading logs...</p>
          </div>
        )}

        {/* Logs Table */}
        {!loading && filteredLogs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700/50 border-b border-slate-600">
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Date & Time</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">IP Address</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Browser Info</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-slate-700 hover:bg-slate-700/30 transition-colors ${
                      log.success ? 'bg-green-900/10' : 'bg-red-900/10'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        log.success
                          ? 'bg-green-900/40 text-green-300'
                          : 'bg-red-900/40 text-red-300'
                      }`}>
                        {log.success ? '✅ Success' : '❌ Failed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white font-mono">{log.name}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">
                      <div>{log.date || new Date(log.timestamp).toLocaleString()}</div>
                      <div className="text-gray-500 text-xs">{log.timestamp}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-300 font-mono text-sm">{log.ip || 'N/A'}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs max-w-xs truncate" title={log.userAgent}>
                      {log.userAgent || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No logs */}
        {!loading && filteredLogs.length === 0 && logs.length > 0 && (
          <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-8 text-center">
            <p className="text-gray-300">No logs match your filters</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && logs.length === 0 && (
          <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-8 text-center">
            <p className="text-gray-300 text-lg">📋 No login attempts yet</p>
            <p className="text-gray-500">Login attempts will appear here</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-700 text-center text-gray-500 text-sm">
          <p>Auto-refresh every 5 seconds • Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

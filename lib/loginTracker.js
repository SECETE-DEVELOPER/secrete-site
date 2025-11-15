/**
 * LOGIN TRACKING UTILITIES
 * 
 * TO VIEW LOGIN LOGS:
 * 1. Open Browser DevTools (F12)
 * 2. Go to Console tab
 * 3. Run: localStorage.getItem('login_logs')
 * 4. Or run: JSON.parse(localStorage.getItem('login_logs') || '[]')
 * 5. For formatted view: console.table(JSON.parse(localStorage.getItem('login_logs') || '[]'))
 * 
 * TO EXPORT LOGS AS CSV:
 * 1. Copy the function below and run in console
 * 2. Right-click on the download link and save
 * 
 * TO CLEAR LOGS:
 * 1. Run: localStorage.removeItem('login_logs')
 */

export function getLoginLogs() {
  try {
    return JSON.parse(localStorage.getItem('login_logs') || '[]');
  } catch (e) {
    console.error('Failed to get login logs:', e);
    return [];
  }
}

export function exportLogsAsCSV() {
  try {
    const logs = getLoginLogs();
    if (logs.length === 0) {
      console.log('No logs to export');
      return;
    }

    // Create CSV header
    const headers = ['Timestamp', 'Date/Time (IST)', 'Type', 'Name', 'Success'];
    const csvContent = [
      headers.join(','),
      ...logs.map(log => [
        `"${log.timestamp}"`,
        `"${log.date}"`,
        log.attemptType,
        log.name,
        log.success ? 'YES' : 'NO'
      ].join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `login_logs_${new Date().getTime()}.csv`);
    link.click();
    URL.revokeObjectURL(url);
    
    console.log('✅ Logs exported as CSV');
  } catch (e) {
    console.error('Failed to export logs:', e);
  }
}

export function clearLoginLogs() {
  try {
    localStorage.removeItem('login_logs');
    console.log('✅ Login logs cleared');
  } catch (e) {
    console.error('Failed to clear logs:', e);
  }
}

export function printLoginStats() {
  try {
    const logs = getLoginLogs();
    const successful = logs.filter(l => l.success).length;
    const failed = logs.length - successful;
    
    console.log('📊 LOGIN STATISTICS');
    console.log('===================');
    console.log(`Total Attempts: ${logs.length}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed}`);
    console.log(`Success Rate: ${logs.length ? ((successful / logs.length) * 100).toFixed(2) + '%' : 'N/A'}`);
    
    // Show last 5 attempts
    if (logs.length > 0) {
      console.log('\n📋 Last 5 Attempts:');
      logs.slice(-5).reverse().forEach((log, idx) => {
        console.log(`${idx + 1}. [${log.date}] ${log.attemptType} - ${log.name} - ${log.success ? '✅' : '❌'}`);
      });
    }
  } catch (e) {
    console.error('Failed to print stats:', e);
  }
}

// Make functions available globally in browser console
if (typeof window !== 'undefined') {
  window.LoginTracker = {
    getLogs: getLoginLogs,
    exportCSV: exportLogsAsCSV,
    clearLogs: clearLoginLogs,
    stats: printLoginStats,
    viewAll: () => console.table(getLoginLogs())
  };
}

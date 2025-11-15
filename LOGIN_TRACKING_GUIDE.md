# 🔐 Login Tracking System

## Overview
The login system now tracks all authentication attempts in your browser's local storage. You can view, analyze, and export these logs anytime.

## 📊 What Gets Tracked

Each login attempt records:
- **Timestamp**: ISO 8601 format (UTC)
- **Date/Time**: Human-readable format in IST (Indian Standard Time)
- **Attempt Type**: 
  - `LOGIN_ATTEMPT` - Initial login attempt
  - `FAILED_NAME` - Incorrect name entered
  - `FAILED_ANSWER` - Incorrect security answer
  - `LOGIN_SUCCESS` - Successful authentication
- **Name**: The name entered (uppercase)
- **Success**: Whether authentication succeeded (YES/NO)

## 🔍 How to View Login Logs

### Method 1: Browser Console (Easiest)

1. Open the website in your browser
2. Press **F12** to open Developer Tools
3. Go to the **Console** tab
4. Run any of these commands:

```javascript
// View all logs as a table
LoginTracker.viewAll()

// Get all logs as JSON
LoginTracker.getLogs()

// View statistics
LoginTracker.stats()

// Export as CSV file
LoginTracker.exportCSV()

// Clear all logs
LoginTracker.clearLogs()
```

### Method 2: Direct Local Storage Access

1. Open Developer Tools (F12)
2. Go to **Application** or **Storage** tab
3. Click **Local Storage**
4. Select the website URL
5. Find `login_logs` entry
6. Double-click to view the full JSON data

### Method 3: Manual JSON Parse

In the Console, run:
```javascript
JSON.parse(localStorage.getItem('login_logs') || '[]')
```

## 📈 Understanding the Logs

### Example Log Entry
```json
{
  "timestamp": "2024-11-14T10:30:45.123Z",
  "date": "14/11/2024, 04:00:45 PM",
  "attemptType": "LOGIN_SUCCESS",
  "name": "ZOHA",
  "answer": "***",
  "success": true,
  "ipInfo": "Browser Local"
}
```

### Reading the Data
- **timestamp**: When the attempt was made (UTC time)
- **date**: When the attempt was made (formatted in Indian time)
- **attemptType**: Type of attempt (see What Gets Tracked above)
- **name**: Name that was entered
- **answer**: Security answer (masked with *** for privacy)
- **success**: True if login was successful, False if failed

## 📥 Exporting Logs

### Export as CSV
```javascript
LoginTracker.exportCSV()
```
This will download a CSV file with all login attempts that you can open in Excel or Google Sheets.

### Manual CSV Export
1. Run: `JSON.parse(localStorage.getItem('login_logs' || '[]'))`
2. Copy the output
3. Paste into a text editor
4. Save as `.json` file
5. Open with Excel (File → Open → select file → choose JSON)

## 📊 Viewing Statistics

Get quick stats about login attempts:
```javascript
LoginTracker.stats()
```

Output example:
```
📊 LOGIN STATISTICS
===================
Total Attempts: 15
Successful: 1
Failed: 14
Success Rate: 6.67%

📋 Last 5 Attempts:
1. [14/11/2024, 04:00:45 PM] LOGIN_SUCCESS - ZOHA - ✅
2. [14/11/2024, 03:59:30 PM] FAILED_ANSWER - ZOHA - ❌
3. [14/11/2024, 03:58:15 PM] FAILED_NAME - TEST - ❌
4. [14/11/2024, 03:57:00 PM] LOGIN_ATTEMPT - OTHER - ❌
5. [14/11/2024, 03:55:45 PM] FAILED_ANSWER - ZOHA - ❌
```

## 🛡️ Security Notes

- **Local Only**: Logs are stored in browser's local storage (not sent to any server)
- **Device Specific**: Each device has its own login logs
- **Answers Masked**: Security answers are masked as `***` for safety
- **Privacy**: No sensitive data is logged beyond what's necessary for tracking

## 🧹 Clearing Logs

To delete all login history:
```javascript
LoginTracker.clearLogs()
```

⚠️ **Warning**: This cannot be undone!

## 💡 Tips & Tricks

### See only successful logins
```javascript
LoginTracker.getLogs().filter(log => log.success)
```

### See only failed attempts
```javascript
LoginTracker.getLogs().filter(log => !log.success)
```

### Get login count today
```javascript
const today = new Date().toLocaleDateString('en-IN');
LoginTracker.getLogs().filter(log => log.date.includes(today)).length
```

### Get last successful login timestamp
```javascript
const successful = LoginTracker.getLogs().filter(log => log.success);
successful.length ? successful[successful.length - 1].date : 'Never'
```

## 🆘 Troubleshooting

### "LoginTracker is not defined"
- Make sure you're in the browser console on the website
- The tracking only works in browser, not in Node.js

### Logs not showing up
- Check browser DevTools → Application → Local Storage
- Make sure localStorage is enabled in your browser
- Try refreshing the page and attempting login again

### Want logs in real-time?
- Keep DevTools open and run `LoginTracker.stats()` after each attempt
- Or open multiple browser tabs to see live updates

## 📝 Log Storage Details

- **Storage Location**: Browser Local Storage
- **Key Name**: `login_logs`
- **Data Type**: JSON Array
- **Persistence**: Remains until manually cleared or browser data is deleted
- **Max Size**: Typically 5-10MB per domain (won't be exceeded with login logs)

---

✅ **Setup Complete!** Your login tracking system is now active and monitoring all authentication attempts.

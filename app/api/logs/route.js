import { promises as fs } from 'fs';
import path from 'path';

const LOGS_DIR = path.join(process.cwd(), 'public', 'logs');
const LOGS_FILE = path.join(LOGS_DIR, 'login_attempts.json');

async function ensureLogsFile() {
  try {
    await fs.mkdir(LOGS_DIR, { recursive: true });
    try {
      await fs.access(LOGS_FILE);
    } catch {
      await fs.writeFile(LOGS_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Error ensuring logs file:', error);
  }
}

export async function GET() {
  try {
    await ensureLogsFile();
    const data = await fs.readFile(LOGS_FILE, 'utf-8');
    const logs = JSON.parse(data);
    
    return new Response(
      JSON.stringify({
        success: true,
        totalAttempts: logs.length,
        logs: logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error reading logs:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  try {
    await ensureLogsFile();
    const logEntry = await request.json();

    // Validate required fields
    if (!logEntry.timestamp || !logEntry.name) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Add additional metadata
    const enrichedLog = {
      ...logEntry,
      ip: ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
      receivedAt: new Date().toISOString()
    };

    // Read existing logs
    const data = await fs.readFile(LOGS_FILE, 'utf-8');
    const logs = JSON.parse(data);

    // Add new log
    logs.push(enrichedLog);

    // Keep only last 1000 logs to prevent file from getting too large
    if (logs.length > 1000) {
      logs.shift();
    }

    // Write updated logs
    await fs.writeFile(LOGS_FILE, JSON.stringify(logs, null, 2));

    console.log('✅ Login attempt logged:', enrichedLog);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Log recorded',
        totalAttempts: logs.length
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error saving log:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

// Use temp directory in production (Vercel), public in development
const CHAT_DIR = process.env.NODE_ENV === 'production' 
  ? path.join(os.tmpdir(), 'chat')
  : path.join(process.cwd(), 'public', 'chat');

const CHAT_FILE = path.join(CHAT_DIR, 'messages.json');

async function ensureChatFile() {
  try {
    await fs.mkdir(CHAT_DIR, { recursive: true });
    try {
      await fs.access(CHAT_FILE);
    } catch {
      await fs.writeFile(CHAT_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Error ensuring chat file:', error);
  }
}

export async function GET() {
  try {
    await ensureChatFile();
    const data = await fs.readFile(CHAT_FILE, 'utf-8');
    const messages = JSON.parse(data);
    
    return new Response(
      JSON.stringify({
        success: true,
        messages: messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error reading chat:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  try {
    await ensureChatFile();
    const messageData = await request.json();

    // Validate required fields
    if (!messageData.sender || !messageData.message || !messageData.timestamp) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Allow messages from authenticated users, guests, or ZOHA
    const allowedSenders = ['ZOHA', 'SECRET_DEV'];
    const isGuest = messageData.isGuest === true;
    
    // Validate sender - guests and authenticated users both allowed
    if (!isGuest && !allowedSenders.includes(messageData.sender)) {
      console.log('Message from:', messageData.sender, 'isGuest:', isGuest);
    }

    const enrichedMessage = {
      ...messageData,
      receivedAt: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };

    // Read existing messages
    const data = await fs.readFile(CHAT_FILE, 'utf-8');
    const messages = JSON.parse(data);

    // Add new message
    messages.push(enrichedMessage);

    // Keep only last 500 messages
    if (messages.length > 500) {
      messages.shift();
    }

    // Write updated messages
    await fs.writeFile(CHAT_FILE, JSON.stringify(messages, null, 2));

    console.log('💬 Message saved:', enrichedMessage);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message saved',
        totalMessages: messages.length
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error saving message:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

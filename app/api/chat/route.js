import { getMessagesCollection } from '@/lib/mongodb';

export async function GET() {
  try {
    const collection = await getMessagesCollection();
    console.log('📖 Fetching messages from MongoDB');
    
    const messages = await collection
      .find({})
      .sort({ timestamp: 1 })
      .limit(500)
      .toArray();
    
    console.log('📖 Found messages:', messages.length);
    
    return new Response(
      JSON.stringify({
        success: true,
        messages: messages
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('❌ Error reading chat:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  try {
    console.log('📨 Chat POST received');
    const collection = await getMessagesCollection();
    console.log('✅ MongoDB collection accessed');
    
    const messageData = await request.json();
    console.log('📋 Message data:', messageData);

    // Validate required fields
    if (!messageData.sender || !messageData.message || !messageData.timestamp) {
      console.error('❌ Chat validation failed:', { sender: messageData.sender, message: messageData.message, timestamp: messageData.timestamp });
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
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      createdAt: new Date()
    };

    // Insert message into MongoDB
    const result = await collection.insertOne(enrichedMessage);
    console.log('✅ Message inserted:', result.insertedId);

    // Keep only last 500 messages
    const count = await collection.countDocuments({});
    if (count > 500) {
      const toDelete = count - 500;
      const oldMessages = await collection
        .find({})
        .sort({ timestamp: 1 })
        .limit(toDelete)
        .toArray();
      
      for (const msg of oldMessages) {
        await collection.deleteOne({ _id: msg._id });
      }
    }

    console.log('💬 Message saved to MongoDB');
    console.log('💬 Total messages:', count);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message saved',
        totalMessages: count,
        messageId: result.insertedId
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Error saving message:', error);
    console.error('❌ Error stack:', error.stack);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

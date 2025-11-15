import { getLogsCollection } from '@/lib/mongodb';

export async function GET() {
  try {
    const collection = await getLogsCollection();
    console.log('📖 Fetching logs from MongoDB');
    
    const logs = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(1000)
      .toArray();
    
    console.log('📖 Found logs:', logs.length);
    
    return new Response(
      JSON.stringify({
        success: true,
        totalAttempts: logs.length,
        logs: logs
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('❌ Error reading logs:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  try {
    const collection = await getLogsCollection();
    const logEntry = await request.json();

    // Validate required fields
    if (!logEntry.timestamp || !logEntry.name) {
      console.error('❌ Log validation failed:', { timestamp: logEntry.timestamp, name: logEntry.name });
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
      receivedAt: new Date().toISOString(),
      createdAt: new Date()
    };

    // Insert log into MongoDB
    const result = await collection.insertOne(enrichedLog);

    // Keep only last 1000 logs
    const count = await collection.countDocuments({});
    if (count > 1000) {
      const toDelete = count - 1000;
      const oldLogs = await collection
        .find({})
        .sort({ timestamp: 1 })
        .limit(toDelete)
        .toArray();
      
      for (const log of oldLogs) {
        await collection.deleteOne({ _id: log._id });
      }
    }

    console.log('✅ Login attempt logged to MongoDB');
    console.log('✅ Log entry:', enrichedLog);
    console.log('✅ Total logs:', count);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Log recorded',
        totalAttempts: count,
        logId: result.insertedId
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Error saving log:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

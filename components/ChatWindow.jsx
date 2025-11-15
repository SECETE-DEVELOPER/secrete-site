'use client';
import { useState, useEffect, useRef } from 'react';
import MessageNotification from './MessageNotification';

export default function ChatWindow({ senderName, isAuthenticated = false }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [showGuestInput, setShowGuestInput] = useState(!isAuthenticated);
  const [notification, setNotification] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const lastMessageCountRef = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset unread count when opening chat
  useEffect(() => {
    if (isVisible) {
      setUnreadCount(0);
    }
  }, [isVisible]);

  // Fetch messages on mount and every 3 seconds
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/chat');
        const data = await response.json();
        if (data.success) {
          const newMessages = data.messages || [];
          
          // Check for new messages from other senders
          if (newMessages.length > lastMessageCountRef.current) {
            const latestMessage = newMessages[newMessages.length - 1];
            
            // Show notification if message is from someone else and chat is closed
            if (latestMessage.sender !== senderName && !isVisible) {
              setNotification({
                sender: latestMessage.sender,
                message: latestMessage.message
              });
              setUnreadCount(prev => prev + 1);
            }
          }
          
          lastMessageCountRef.current = newMessages.length;
          setMessages(newMessages);
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [senderName, isVisible]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // For guests, validate guestName is entered
    if (!isAuthenticated && !guestName.trim()) {
      setError('Please enter your name first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const currentSender = isAuthenticated ? senderName : guestName.trim();
      const messageData = {
        sender: currentSender,
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }),
        isGuest: !isAuthenticated
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });

      const data = await response.json();
      if (data.success) {
        setNewMessage('');
        // Fetch updated messages
        const getResponse = await fetch('/api/chat');
        const getData = await getResponse.json();
        if (getData.success) {
          setMessages(getData.messages || []);
        }
      } else {
        setError('Failed to send message');
      }
    } catch (err) {
      setError('Error sending message');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Message Notification */}
      {notification && (
        <MessageNotification
          message={notification.message}
          sender={notification.sender}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none w-full flex flex-col items-end">
      {/* Chat Window */}
      {isVisible && (
        <div className="w-full sm:w-96 max-h-[calc(100vh-16px)] bg-gradient-to-br from-rose-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-xl rounded-t-3xl sm:rounded-3xl border-2 border-pink-500/40 shadow-2xl flex flex-col animate-in m-0 sm:m-4 sm:mb-0 pointer-events-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-pink-500/20">
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base">💕 Secret Chat</h3>
              <p className="text-pink-300/60 text-xs">Only for us</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-pink-300 hover:text-pink-200 transition-colors text-lg sm:text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-pink-300/60 text-xs sm:text-sm">No messages yet 💕</p>
              </div>
            )}
            
            {messages.map((msg, idx) => {
              // Determine if this message is from the current sender
              const isCurrentUser = isAuthenticated ? msg.sender === senderName : msg.sender === guestName;
              
              return (
                <div
                  key={idx}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-3 sm:px-4 py-2 rounded-lg max-w-xs text-xs sm:text-sm ${
                      isCurrentUser
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                        : 'bg-pink-900/40 text-pink-100'
                    }`}
                  >
                    <p className="text-xs opacity-70 mb-1">
                      {msg.sender} • {new Date(msg.timestamp).toLocaleTimeString('en-IN')}
                    </p>
                    <p>{msg.message}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-pink-500/20 p-3 sm:p-3 space-y-2">
            {error && (
              <p className="text-red-300 text-xs mb-2">{error}</p>
            )}
            
            {/* Guest Name Input - if not authenticated */}
            {showGuestInput && !isAuthenticated && (
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-2 sm:px-3 py-2 bg-black/40 border border-pink-500/30 rounded-lg text-pink-50 placeholder-pink-300/40 focus:outline-none focus:border-pink-500/70 text-xs sm:text-sm"
                disabled={isLoading}
              />
            )}
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type message..."
                className="flex-1 px-2 sm:px-3 py-2 bg-black/40 border border-pink-500/30 rounded-lg text-pink-50 placeholder-pink-300/40 focus:outline-none focus:border-pink-500/70 text-xs sm:text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !newMessage.trim()}
                className="px-2 sm:px-3 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 text-white rounded-lg transition-all text-xs sm:text-sm font-semibold"
              >
                {isLoading ? '⏳' : '📤'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Widget Button - Only button when closed */}
      {!isVisible && (
        <div className="w-full sm:w-auto p-4 sm:p-6 flex flex-col items-end gap-2 pointer-events-auto">
          <div className="relative bg-gradient-to-r from-rose-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-xl rounded-2xl border border-pink-500/40 p-3 sm:p-4 shadow-xl max-w-sm">
            {/* Unread Badge */}
            {unreadCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
            <p className="text-pink-200 text-xs sm:text-sm font-semibold mb-2">💬 Want to chat with secret dev?</p>
            <button
              onClick={() => setIsVisible(true)}
              className="w-full px-3 sm:px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white rounded-lg transition-all text-xs sm:text-sm font-semibold hover:scale-105"
            >
              Open Chat 💕
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

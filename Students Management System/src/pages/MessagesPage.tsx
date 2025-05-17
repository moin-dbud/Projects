import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Send, Search, Plus, Users } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Jane Smith',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'Teacher',
      lastSeen: 'Just now',
    },
    lastMessage: {
      text: 'Good morning! I wanted to discuss the upcoming parent-teacher conference.',
      timestamp: new Date(2023, 5, 10, 9, 32),
      read: true,
    },
    unread: 0,
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Michael Johnson',
      avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'Student',
      lastSeen: '10 min ago',
    },
    lastMessage: {
      text: 'I have a question about today\'s homework assignment. Can you help?',
      timestamp: new Date(2023, 5, 10, 14, 15),
      read: false,
    },
    unread: 2,
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Robert Williams',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'Parent',
      lastSeen: '2 hours ago',
    },
    lastMessage: {
      text: 'Thank you for the update on John\'s progress. We\'ll work on those areas at home.',
      timestamp: new Date(2023, 5, 9, 18, 45),
      read: true,
    },
    unread: 0,
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'Sarah Thompson',
      avatar: 'https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'Teacher',
      lastSeen: '1 day ago',
    },
    lastMessage: {
      text: 'Could you share the presentation slides from yesterday\'s staff meeting?',
      timestamp: new Date(2023, 5, 9, 11, 20),
      read: true,
    },
    unread: 0,
  },
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: 'm1',
    text: 'Good morning! I wanted to discuss the upcoming parent-teacher conference.',
    sender: 'u1',
    timestamp: new Date(2023, 5, 10, 9, 32),
  },
  {
    id: 'm2',
    text: 'Hi there! Yes, I\'m available to discuss. What details do you need?',
    sender: 'me',
    timestamp: new Date(2023, 5, 10, 9, 35),
  },
  {
    id: 'm3',
    text: 'I was thinking we could go over the agenda and which teachers will be presenting.',
    sender: 'u1',
    timestamp: new Date(2023, 5, 10, 9, 38),
  },
  {
    id: 'm4',
    text: 'That sounds like a good plan. I\'ve prepared a draft schedule. Would you like me to share it?',
    sender: 'me',
    timestamp: new Date(2023, 5, 10, 9, 40),
  },
  {
    id: 'm5',
    text: 'Yes, please! That would be very helpful. Also, do you think we should invite the school counselor to discuss available resources?',
    sender: 'u1',
    timestamp: new Date(2023, 5, 10, 9, 45),
  },
];

export const MessagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const { user } = useAuthStore();
  
  // Filter conversations based on search query
  const filteredConversations = mockConversations.filter(conversation =>
    conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatConversationTime = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return formatMessageTime(date);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: `m${messages.length + 1}`,
      text: newMessage,
      sender: 'me',
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  return (
    <PageLayout title="Messages">
      <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-4">
        {/* Conversation list */}
        <Card className="w-full md:w-1/3 lg:w-1/4 flex flex-col overflow-hidden">
          <CardHeader className="flex-shrink-0 border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Messages</h2>
              <Button size="sm" variant="outline" leftIcon={<Plus size={16} />}>
                New
              </Button>
            </div>
            <div className="mt-2">
              <Input
                placeholder="Search conversations"
                leftIcon={<Search size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <div className="flex-grow overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-150 ${
                  activeConversation.id === conversation.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex items-start">
                  <div className="relative">
                    <Avatar
                      src={conversation.user.avatar}
                      name={conversation.user.name}
                      size="md"
                    />
                    {conversation.unread > 0 && (
                      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  <div className="ml-3 flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.user.name}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatConversationTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-600 truncate max-w-[150px]">
                        {conversation.lastMessage.text}
                      </p>
                      <span className="text-xs text-gray-500 ml-2">{conversation.user.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Message area */}
        <Card className="flex-grow flex flex-col overflow-hidden">
          {activeConversation ? (
            <>
              <CardHeader className="flex-shrink-0 border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar
                      src={activeConversation.user.avatar}
                      name={activeConversation.user.name}
                      size="md"
                    />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {activeConversation.user.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {activeConversation.user.role} · {activeConversation.user.lastSeen}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" leftIcon={<Users size={16} />}>
                    Profile
                  </Button>
                </div>
              </CardHeader>
              
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === 'me'
                          ? 'bg-blue-800 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm break-words">{message.text}</p>
                      <p
                        className={`text-xs mt-1 text-right ${
                          message.sender === 'me' ? 'text-blue-200' : 'text-gray-500'
                        }`}
                      >
                        {formatMessageTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex-shrink-0 border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    leftIcon={<Send size={16} />}
                  >
                    Send
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto flex items-center justify-center">
                  <Send className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No conversation selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a conversation from the list or start a new one
                </p>
                <Button
                  variant="primary"
                  className="mt-4"
                  leftIcon={<Plus size={16} />}
                >
                  New Conversation
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageLayout>
  );
};
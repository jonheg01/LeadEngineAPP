'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useMobile } from '@/hooks/useMobile';
import { Icon, Button, Input, Card, Badge } from './design-system';

interface Message {
  role: 'bot' | 'user';
  text: string;
  time: Date;
}

const ChatWidget = () => {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize the welcome message on client only to prevent hydration mismatch
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 0) {
        return [{
          role: 'bot',
          text: "Hi! I'm your AI home assistant. I can help you find properties, estimate home values, or answer questions about the Phoenix metro area. What can I help with?",
          time: new Date(),
        }];
      }
      return prev;
    });
  }, []);
  const [inputValue, setInputValue] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick action chips for initial message
  const quickActions = [
    "Find homes under $500K",
    "What's my home worth?",
    "Best neighborhoods for families",
    "Schedule a showing",
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Show lead form after 3 messages
  useEffect(() => {
    if (messages.length === 4 && !showLeadForm && !leadSubmitted) {
      setShowLeadForm(true);
    }
  }, [messages.length, showLeadForm, leadSubmitted]);

  // Update unread count when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const userMessages = messages.filter((m) => m.role === 'user').length;
      setUnreadCount(userMessages);
    }
  }, [isOpen, messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes('price') ||
      lowerMessage.includes('under') ||
      lowerMessage.includes('budget')
    ) {
      return 'I can help you search for homes within your budget! We have listings under $500K, $750K, and more. Would you like me to take you to our search page where you can filter by price? <a href="/search">Search homes by price</a>';
    }

    if (
      lowerMessage.includes('worth') ||
      lowerMessage.includes('value') ||
      lowerMessage.includes('sell')
    ) {
      return "That's a great question! Our home valuation tool can give you an instant estimate of your home's current market value in the Phoenix area. <a href=\"/home-value\">Get your home valued</a>";
    }

    if (
      lowerMessage.includes('neighborhood') ||
      lowerMessage.includes('area') ||
      lowerMessage.includes('family')
    ) {
      return "The Phoenix metro has some fantastic neighborhoods! I can recommend areas based on your lifestyle preferences. Check out our neighborhoods guide to explore top areas for families, professionals, and more. <a href=\"/neighborhoods\">Explore neighborhoods</a>";
    }

    if (
      lowerMessage.includes('showing') ||
      lowerMessage.includes('schedule') ||
      lowerMessage.includes('tour')
    ) {
      return 'I can help you schedule a showing! To get started, I\'ll need your contact information. What\'s the best way to reach you?';
    }

    return 'Great question! Let me connect you with Jon who can help with that. Would you like to leave your contact info so he can reach out?';
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      text: inputValue,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setUnreadCount(0);

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        role: 'bot',
        text: generateBotResponse(inputValue),
        time: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    const userMessage: Message = {
      role: 'user',
      text: action,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUnreadCount(0);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        role: 'bot',
        text: generateBotResponse(action),
        time: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleLeadSubmit = () => {
    if (leadName.trim() && leadEmail.trim()) {
      setLeadSubmitted(true);
      setShowLeadForm(false);
      const confirmMessage: Message = {
        role: 'bot',
        text: `Perfect, ${leadName}! I've saved your email and will send personalized home matches to ${leadEmail}. Jon will also reach out shortly with tailored recommendations for you.`,
        time: new Date(),
      };
      setMessages((prev) => [...prev, confirmMessage]);
      setLeadName('');
      setLeadEmail('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Styles
  const fabStyle: React.CSSProperties = {
    position: 'fixed',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: '50%',
    backgroundColor: 'var(--le-gold)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    boxShadow: 'var(--le-shadow-xl)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const fabHoverStyle: React.CSSProperties = {
    ...fabStyle,
    transform: 'scale(1.1)',
  };

  const pulseAnimationStyle: React.CSSProperties = {
    animation: isOpen ? 'none' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  };

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    right: 24,
    bottom: 104,
    width: isMobile ? 'calc(100% - 16px)' : 380,
    maxWidth: isMobile ? 'calc(100vw - 16px)' : 380,
    height: 520,
    borderRadius: 'var(--le-radius-xl)',
    boxShadow: 'var(--le-shadow-xl)',
    backgroundColor: 'var(--le-bg-app)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9998,
    transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    left: isMobile ? 8 : 'auto',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'var(--le-sidebar-bg)',
    color: 'white',
    padding: '16px 20px',
    borderRadius: 'var(--le-radius-xl) var(--le-radius-xl) 0 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const headerContentStyle: React.CSSProperties = {
    flex: 1,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    margin: '0 0 4px 0',
    color: 'white',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
  };

  const messagesContainerStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: 'var(--le-bg-app)',
  };

  const messageBubbleStyle = (role: 'bot' | 'user'): React.CSSProperties => ({
    maxWidth: '85%',
    padding: '12px 16px',
    borderRadius: 'var(--le-radius-lg)',
    wordWrap: 'break-word',
    alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
    backgroundColor: role === 'user' ? 'var(--le-gold)' : 'var(--le-surface-bg)',
    color: role === 'user' ? 'var(--le-sidebar-bg)' : 'var(--le-text-primary)',
    fontSize: 14,
    lineHeight: 1.4,
  });

  const messageTimeStyle: React.CSSProperties = {
    fontSize: 11,
    color: 'var(--le-text-secondary)',
    marginTop: '4px',
  };

  const quickActionsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px',
  };

  const chipStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: 'var(--le-radius-md)',
    border: '1px solid var(--le-border-color)',
    backgroundColor: 'var(--le-surface-bg)',
    cursor: 'pointer',
    fontSize: 13,
    transition: 'all 0.2s ease',
    textAlign: 'left',
    color: 'var(--le-text-primary)',
  };

  const typingIndicatorStyle: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: 'var(--le-radius-lg)',
    backgroundColor: 'var(--le-surface-bg)',
    width: 'fit-content',
  };

  const dotStyle: React.CSSProperties = {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'var(--le-text-secondary)',
    animation: 'bounce 1.4s infinite',
  };

  const inputAreaStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderTop: '1px solid var(--le-border-color)',
    backgroundColor: 'white',
    display: 'flex',
    gap: '8px',
    borderRadius: '0 0 var(--le-radius-xl) var(--le-radius-xl)',
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: 20,
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const leadFormStyle: React.CSSProperties = {
    padding: '12px 16px',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 'var(--le-radius-md)',
    marginBottom: '8px',
    border: '1px solid var(--le-gold)',
  };

  const leadFormTitleStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--le-text-primary)',
    marginBottom: '8px',
  };

  const formInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 'var(--le-radius-md)',
    border: '1px solid var(--le-border-color)',
    fontSize: 13,
    marginBottom: '8px',
    fontFamily: 'inherit',
  };

  const submitButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: 'var(--le-gold)',
    color: 'var(--le-sidebar-bg)',
    border: 'none',
    borderRadius: 'var(--le-radius-md)',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    transition: 'opacity 0.2s ease',
  };

  const unreadBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ef4444',
    color: 'white',
    width: 24,
    height: 24,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 600,
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(1);
          }
          40% {
            transform: scale(1.2);
          }
        }

        .chat-widget-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .chat-widget-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-widget-scrollbar::-webkit-scrollbar-thumb {
          background: var(--le-border-color);
          border-radius: 3px;
        }

        .chat-widget-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--le-text-secondary);
        }

        a {
          color: var(--le-gold);
          text-decoration: none;
          font-weight: 500;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* FAB Button */}
      <button
        style={{
          ...(isOpen ? fabHoverStyle : fabStyle),
          ...pulseAnimationStyle,
        }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.transform = 'scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'white' }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        {!isOpen && unreadCount > 0 && (
          <div style={unreadBadgeStyle}>{unreadCount}</div>
        )}
      </button>

      {/* Chat Panel */}
      <div style={panelStyle} className="chat-widget-scrollbar">
        {/* Header */}
        <div style={headerStyle}>
          <div style={headerContentStyle}>
            <h2 style={titleStyle}>AI Home Assistant</h2>
            <p style={subtitleStyle}>Typically replies instantly</p>
          </div>
          <button
            style={closeButtonStyle}
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        {/* Messages Area */}
        <div style={messagesContainerStyle} className="chat-widget-scrollbar">
          {messages.map((message, index) => (
            <div key={index} style={{ alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={messageBubbleStyle(message.role)}>
                {message.role === 'bot' ? (
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                ) : (
                  <>{message.text}</>
                )}
              </div>
              <div
                style={{
                  ...messageTimeStyle,
                  textAlign: message.role === 'user' ? 'right' : 'left',
                }}
              >
                {message.time.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              {/* Quick Actions after first message */}
              {index === 0 && (
                <div style={quickActionsStyle}>
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      style={chipStyle}
                      onClick={() => handleQuickAction(action)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--le-border-color)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--le-surface-bg)';
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div style={typingIndicatorStyle}>
              <div style={{ ...dotStyle, animationDelay: '0s' }}></div>
              <div style={{ ...dotStyle, animationDelay: '0.2s' }}></div>
              <div style={{ ...dotStyle, animationDelay: '0.4s' }}></div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Lead Form */}
        {showLeadForm && !leadSubmitted && (
          <div style={leadFormStyle}>
            <div style={leadFormTitleStyle}>
              Want personalized recommendations? Share your email!
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              style={formInputStyle}
            />
            <input
              type="email"
              placeholder="Your email"
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              style={formInputStyle}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleLeadSubmit();
              }}
            />
            <button
              style={submitButtonStyle}
              onClick={handleLeadSubmit}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Get Recommendations
            </button>
          </div>
        )}

        {/* Input Area */}
        <div style={inputAreaStyle}>
          <input
            type="text"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              border: '1px solid var(--le-border-color)',
              borderRadius: 'var(--le-radius-md)',
              padding: '8px 12px',
              fontSize: 14,
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--le-gold)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--le-border-color)';
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              backgroundColor: 'var(--le-gold)',
              color: 'var(--le-sidebar-bg)',
              border: 'none',
              borderRadius: 'var(--le-radius-md)',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;

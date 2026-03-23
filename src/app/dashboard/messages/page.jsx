'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import Link from 'next/link';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/my-messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setMessages(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    const map = {
      unread: 'border-yellow-500 text-yellow-500 bg-yellow-500/10',
      read: 'border-blue-500 text-blue-500 bg-blue-500/10',
      replied: 'border-green-500 text-green-500 bg-green-500/10'
    };
    return map[status] || '';
  };

  const statusLabel = { unread: 'SENT', read: 'SEEN', replied: 'REPLIED' };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader title="MY MESSAGES" description="Your contact messages and admin replies" />

      <div className="flex-1 overflow-y-auto p-6">
        {/* Send New Message CTA */}
        <div className="mb-6 p-4 border border-black/20 dark:border-white/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-bold text-sm tracking-wider">{'>'} SEND A NEW MESSAGE</p>
            <p className="text-xs opacity-60 mt-1">Have a question or inquiry? Contact our team.</p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold tracking-wider hover:opacity-80 transition-opacity shrink-0"
          >
            [CONTACT US]
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 opacity-60 animate-pulse">[LOADING...]</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="opacity-60">[NO MESSAGES YET]</p>
            <p className="text-sm opacity-40">Messages you send via the contact form will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg._id} className="border border-black/20 dark:border-white/20 bg-white dark:bg-black">
                {/* Card Header */}
                <button
                  onClick={() => setExpandedId(expandedId === msg._id ? null : msg._id)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className="font-bold text-sm tracking-wider truncate">{'>'} {msg.subject}</span>
                      <span className={`text-xs px-2 py-0.5 border font-bold tracking-wider shrink-0 ${statusBadge(msg.status)}`}>
                        {statusLabel[msg.status] || msg.status.toUpperCase()}
                      </span>
                      {msg.reply && (
                        <span className="text-xs px-2 py-0.5 border border-green-500 text-green-500 bg-green-500/10 font-bold tracking-wider shrink-0">
                          HAS REPLY
                        </span>
                      )}
                    </div>
                    <p className="text-xs opacity-60">
                      Sent on {new Date(msg.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <span className="text-lg opacity-60 shrink-0">{expandedId === msg._id ? '▲' : '▼'}</span>
                </button>

                {/* Expanded Content */}
                {expandedId === msg._id && (
                  <div className="border-t border-black/10 dark:border-white/10 p-5 space-y-4">
                    {/* Your Message */}
                    <div>
                      <p className="text-xs font-bold tracking-wider opacity-60 mb-3">YOUR MESSAGE:</p>
                      <div className="border-l-2 border-black/40 dark:border-white/40 pl-4">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>

                    {/* Admin Reply */}
                    {msg.reply ? (
                      <div>
                        <p className="text-xs font-bold tracking-wider text-green-500 mb-3">
                          ADMIN REPLY — {new Date(msg.repliedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <div className="border-l-2 border-green-500 pl-4 bg-green-500/5 py-3 pr-3">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.reply}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-black/10 dark:border-white/10 p-4 text-center">
                        <p className="text-xs opacity-40 tracking-wider">[AWAITING REPLY FROM ADMIN]</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;

'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

const AsksPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const query = filter !== 'all' ? `?status=${filter}` : '';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact${query}`, {
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

  const markRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(prev => prev.map(m => m._id === id && m.status === 'unread' ? { ...m, status: 'read' } : m));
    } catch (err) { console.error(err); }
  };

  const handleExpand = (id) => {
    if (expandedId !== id) {
      setExpandedId(id);
      const msg = messages.find(m => m._id === id);
      if (msg && msg.status === 'unread') markRead(id);
    } else {
      setExpandedId(null);
    }
  };

  const handleReply = async (id) => {
    if (!replyText.trim()) return;
    setReplyLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}/reply`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replyText })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => prev.map(m => m._id === id ? data.data : m));
        setReplyingTo(null);
        setReplyText('');
      }
    } catch (err) { console.error(err); }
    finally { setReplyLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(prev => prev.filter(m => m._id !== id));
    } catch (err) { console.error(err); }
  };

  const statusBadge = (status) => {
    const map = {
      unread: 'border-yellow-500 text-yellow-500 bg-yellow-500/10',
      read: 'border-blue-500 text-blue-500 bg-blue-500/10',
      replied: 'border-green-500 text-green-500 bg-green-500/10'
    };
    return map[status] || '';
  };

  const filters = ['all', 'unread', 'read', 'replied'];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader title="CUSTOMER ASKS" description="Manage incoming messages and inquiries" />

      <div className="flex-1 overflow-y-auto p-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); setLoading(true); }}
              className={`px-4 py-2 text-xs font-bold tracking-wider border transition-colors ${
                filter === f
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                  : 'border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white'
              }`}
            >
              [{f.toUpperCase()}]
            </button>
          ))}
          <span className="ml-auto text-xs opacity-60 self-center">{messages.length} message{messages.length !== 1 ? 's' : ''}</span>
        </div>

        {loading ? (
          <div className="text-center py-20 opacity-60 animate-pulse">[LOADING...]</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 opacity-60">[NO MESSAGES FOUND]</div>
        ) : (
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg._id} className="border border-black/20 dark:border-white/20 bg-white dark:bg-black">
                {/* Card Header */}
                <button
                  onClick={() => handleExpand(msg._id)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className="font-bold tracking-wider">{msg.name}</span>
                      <span className="opacity-60 text-xs">{msg.email}</span>
                      <span className={`text-xs px-2 py-0.5 border font-bold tracking-wider ${statusBadge(msg.status)}`}>
                        {msg.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-bold text-sm tracking-wider truncate">{'>'} {msg.subject}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {new Date(msg.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <span className="text-lg opacity-60 shrink-0">{expandedId === msg._id ? '▲' : '▼'}</span>
                </button>

                {/* Expanded Content */}
                {expandedId === msg._id && (
                  <div className="border-t border-black/10 dark:border-white/10 p-5 space-y-4">
                    {/* Original Message */}
                    <div className="border-l-2 border-black/40 dark:border-white/40 pl-4">
                      <p className="text-xs font-bold tracking-wider opacity-60 mb-2">MESSAGE:</p>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>

                    {/* Reply (if exists) */}
                    {msg.reply && (
                      <div className="border-l-2 border-green-500 pl-4 bg-green-500/5 py-3 pr-3">
                        <p className="text-xs font-bold tracking-wider text-green-500 mb-2">
                          ADMIN REPLY — {new Date(msg.repliedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.reply}</p>
                      </div>
                    )}

                    {/* Reply Form */}
                    {replyingTo === msg._id ? (
                      <div className="space-y-3">
                        <textarea
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          rows={4}
                          placeholder="Type your reply..."
                          className="w-full bg-transparent border border-black/20 dark:border-white/20 px-4 py-3 text-sm focus:border-black dark:focus:border-white focus:outline-none resize-none font-mono"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleReply(msg._id)}
                            disabled={replyLoading || !replyText.trim()}
                            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold tracking-wider hover:opacity-80 transition-opacity disabled:opacity-40"
                          >
                            {replyLoading ? '[SENDING...]' : '[SEND REPLY]'}
                          </button>
                          <button
                            onClick={() => { setReplyingTo(null); setReplyText(''); }}
                            className="px-5 py-2 border border-black/20 dark:border-white/20 text-xs font-bold tracking-wider hover:border-black dark:hover:border-white transition-colors"
                          >
                            [CANCEL]
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 flex-wrap">
                        <button
                          onClick={() => { setReplyingTo(msg._id); setReplyText(msg.reply || ''); }}
                          className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold tracking-wider hover:opacity-80 transition-opacity"
                        >
                          {msg.reply ? '[EDIT REPLY]' : '[REPLY]'}
                        </button>
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="px-5 py-2 border border-red-500 text-red-500 text-xs font-bold tracking-wider hover:bg-red-500 hover:text-white transition-colors"
                        >
                          [DELETE]
                        </button>
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

export default AsksPage;

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Phone } from 'lucide-react';
import { findAnswer, quickPrompts } from '@/lib/chatKnowledge';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  action?: { label: string; href: string };
};

const WELCOME: Message = {
  id: 0,
  role: 'assistant',
  text: "Hi! I'm the E&M assistant. Ask me about services, pricing, booking, service areas, or anything else. How can I help?",
};

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageId = useRef(1);
  const typingTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, displayedText, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    if (sessionStorage.getItem('em-chat-shown')) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('em-chat-shown', '1');
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const typeResponse = (text: string, action?: { label: string; href: string }) => {
    setTyping(true);
    setDisplayedText('');
    let i = 0;
    if (typingTimer.current) clearInterval(typingTimer.current);
    typingTimer.current = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i += 2;
      } else {
        if (typingTimer.current) clearInterval(typingTimer.current);
        setTyping(false);
        setMessages(prev => [...prev, { id: messageId.current++, role: 'assistant', text, action }]);
        setDisplayedText('');
      }
    }, 15);
  };

  const send = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed || typing) return;
    setMessages(prev => [...prev, { id: messageId.current++, role: 'user', text: trimmed }]);
    setInput('');
    setTimeout(() => {
      const result = findAnswer(trimmed);
      typeResponse(result.response, result.action);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const showQuickPrompts = messages.length <= 1 && !typing;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-[70] w-14 h-14 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-600/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        aria-label="Open chat assistant"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20" />
        {open ? <X className="w-6 h-6 relative" /> : <MessageCircle className="w-6 h-6 relative" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">1</span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-[70] w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
          style={{ animation: 'scaleIn 0.25s ease-out', height: 'min(560px, 70vh)' }}
        >
          {/* Header */}
          <div className="bg-slate-950 px-5 py-4 flex items-center gap-3 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.3) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="relative">
              <div className="text-white font-bold text-sm">E&M Assistant</div>
              <div className="flex items-center gap-1.5 text-blue-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Online now
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="relative ml-auto text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md shadow-sm'
                    }`}
                    style={{ animation: 'fadeInUp 0.3s ease-out' }}
                  >
                    {msg.text}
                  </div>
                  {msg.action && (
                    <a
                      href={msg.action.href}
                      onClick={() => {
                        if (msg.action?.href.startsWith('#')) return;
                        setOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-all hover:scale-105"
                    >
                      {msg.action.href.startsWith('tel:') && <Phone className="w-3 h-3" />}
                      {msg.action.label}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator with streaming text */}
            {typing && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="max-w-[80%]">
                  <div className="rounded-2xl rounded-bl-md px-4 py-2.5 text-sm bg-white text-slate-700 border border-slate-200 shadow-sm">
                    {displayedText ? (
                      <span>{displayedText}<span className="inline-block w-1.5 h-4 bg-blue-500 ml-0.5 align-middle animate-pulse" /></span>
                    ) : (
                      <div className="flex gap-1 items-center py-1">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick prompts */}
            {showQuickPrompts && (
              <div className="pt-2" style={{ animation: 'fadeInUp 0.5s ease-out 0.3s backwards' }}>
                <p className="text-xs text-slate-400 font-semibold mb-2 px-1">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => send(prompt)}
                      className="text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-full transition-all hover:scale-105"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-sm outline-none text-slate-700 placeholder-slate-400"
                disabled={typing}
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

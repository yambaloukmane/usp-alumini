"use client";

import { useState, useEffect, useRef } from "react";
import { Send, User, Search, MessageSquare, Clock, ShieldCheck, Sparkles, Filter, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { dataService } from "@/lib/dataService";

interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  text: string;
  time: string;
  isMine: boolean;
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  promo: string;
  job: string;
  avatar?: string;
  lastMessage?: string;
  lastTime?: string;
  isOnline?: boolean;
  unreadCount?: number;
}

export default function Messages() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load User and Contacts
  const loadUI = () => {
    const currentUser = dataService.getCurrentUser();
    if (!currentUser) {
      if (typeof window !== "undefined") router.push("/login");
      return;
    }
    setUser(currentUser);

    const members = dataService.getMembers() || [];
    const allMsgs = dataService.getMessages() || [];
    
    const mappedContacts = members
      .filter((m: any) => m && m.email !== currentUser.email)
      .map((m: any) => {
        const conversation = allMsgs.filter((msg: any) => 
          msg && (
            (msg.senderId === currentUser.email && msg.receiverId === m.email) ||
            (msg.senderId === m.email && msg.receiverId === currentUser.email)
          )
        );
        const lastMsg = conversation.length > 0 ? conversation[conversation.length - 1] : null;
        const unreadForThisContact = conversation.filter((msg: any) => msg.receiverId === currentUser.email && !msg.isRead).length;
        
        return {
          id: m.email,
          firstName: m.firstName || "Inconnu",
          lastName: m.lastName || "",
          promo: m.promo || "N/A",
          job: m.job || "Membre",
          avatar: m.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.lastName || m.email}`,
          lastMessage: lastMsg ? lastMsg.text : "Démarrer une discussion...",
          lastTime: lastMsg ? lastMsg.time : "",
          isOnline: Math.random() > 0.4,
          unreadCount: unreadForThisContact
        };
      })
      .sort((a: any, b: any) => (b.lastTime || "").localeCompare(a.lastTime || ""));
    
    setContacts(mappedContacts);
  };

  useEffect(() => {
    loadUI();
    window.addEventListener("storage", loadUI);
    return () => window.removeEventListener("storage", loadUI);
  }, [router]);

  // Load conversation when contact is selected
  useEffect(() => {
    if (selectedContact && user) {
      dataService.markAsRead(user.email, selectedContact.id);
      const chat = dataService.getConversation(user.email, selectedContact.id);
      setMessages(chat.map((m: any) => ({
        ...m,
        isMine: m.senderId === user.email
      })));
      setIsMobileView(true);
    }
  }, [selectedContact, user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact || !user) return;

    const msg = {
      id: Date.now(),
      senderId: user.email,
      receiverId: selectedContact.id,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    dataService.saveMessage(msg);
    setNewMessage("");
    loadUI(); // Refresh sidebar
  };

  const filteredContacts = contacts.filter(c => 
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.promo.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-[calc(100vh-160px)] min-h-[600px]">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 flex h-full overflow-hidden">
        
        {/* Sidebar Contacts */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col bg-gray-50/50 ${isMobileView && selectedContact ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <MessageSquare className="text-sky-500" size={28} />
              Messages
            </h2>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto px-4 pb-8 space-y-2">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all group ${selectedContact?.id === contact.id ? 'bg-sky-500 text-white shadow-xl shadow-sky-500/20' : 'hover:bg-white'}`}
                >
                  <div className="relative flex-shrink-0">
                    <img src={contact.avatar} alt="" className="w-12 h-12 rounded-2xl object-cover bg-white shadow-md" />
                    {contact.isOnline && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="text-left flex-grow min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="font-black text-sm truncate">{contact.firstName} {contact.lastName}</h4>
                      <span className={`text-[10px] font-bold ${selectedContact?.id === contact.id ? 'text-sky-100' : 'text-gray-400'}`}>{contact.lastTime}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className={`text-xs truncate font-medium ${selectedContact?.id === contact.id ? 'text-sky-100' : 'text-gray-500'}`}>{contact.lastMessage}</p>
                      {contact.unreadCount && contact.unreadCount > 0 && selectedContact?.id !== contact.id && (
                        <span className="flex-shrink-0 w-5 h-5 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full shadow-lg shadow-red-500/20">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Filter size={40} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold">Aucun membre</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-grow flex flex-col bg-white ${isMobileView && selectedContact ? 'flex' : 'hidden md:flex'}`}>
          {selectedContact ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsMobileView(false)}
                    className="md:hidden p-2 text-gray-400 hover:text-sky-500"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <img src={selectedContact.avatar} alt="" className="w-12 h-12 rounded-2xl shadow-md" />
                  <div>
                    <h3 className="font-black text-gray-900">{selectedContact.firstName} {selectedContact.lastName}</h3>
                    <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest">
                      Promo {selectedContact.promo} • {selectedContact.job}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex gap-2">
                  <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-sky-50 hover:text-sky-500 transition-all shadow-sm">
                    <ShieldCheck size={20} />
                  </button>
                </div>
              </div>

              {/* Messages History */}
              <div 
                ref={scrollRef}
                className="flex-grow overflow-y-auto p-8 space-y-10 bg-gray-50/30"
              >
                {messages.length > 0 ? messages.map((msg) => (
                  <div key={msg.id} className={`flex items-end gap-3 ${msg.isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar next to message */}
                    <div className="flex-shrink-0 mb-1">
                      <img 
                        src={msg.isMine ? (user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.lastName || 'user'}`) : (selectedContact?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContact?.lastName || 'contact'}`)} 
                        alt="" 
                        className="w-8 h-8 rounded-xl object-cover shadow-sm bg-white"
                      />
                    </div>

                    <div className={`max-w-[80%] md:max-w-[60%] p-5 rounded-[2rem] shadow-sm relative ${msg.isMine ? 'bg-sky-500 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-900 rounded-bl-none'}`}>
                      <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                      <span className={`text-[9px] font-black absolute -bottom-6 ${msg.isMine ? 'right-2 text-sky-400' : 'left-2 text-gray-300'} uppercase tracking-widest whitespace-nowrap`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-4 opacity-50">
                    <Sparkles size={48} />
                    <p className="font-black uppercase tracking-widest text-xs">C'est le début d'une belle histoire...</p>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-100">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    className="w-full pl-6 pr-20 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-sm"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-sky-500 text-white rounded-2xl hover:bg-sky-600 shadow-xl shadow-sky-500/20 transition-all transform active:scale-90"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-400 p-12 text-center">
              <div className="w-24 h-24 bg-sky-50 rounded-[2.5rem] flex items-center justify-center text-sky-200 mb-8 animate-pulse">
                <MessageSquare size={48} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Votre Messagerie</h3>
              <p className="max-w-xs font-bold text-sm leading-relaxed">
                Sélectionnez un membre dans la liste de gauche pour démarrer une conversation privée.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

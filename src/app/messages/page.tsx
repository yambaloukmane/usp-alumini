"use client";

import { useState, useEffect, useRef } from "react";
import { Send, User, Search, MessageSquare, Clock, ShieldCheck, Sparkles, Filter, ChevronLeft, Mic, Phone, Video, X, Play, Pause, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { dataService } from "@/lib/dataService";

// Declare Jitsi on window for TypeScript
declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  time: string;
  isMine: boolean;
}

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
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
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showCallUI, setShowCallUI] = useState<any>(null); // { type: 'audio' | 'video', status: 'calling' | 'active', roomName: string }
  const [isJitsiLoaded, setIsJitsiLoaded] = useState(false);
  
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const lastMsgIdRef = useRef<string | null>(null);
  const justSentRef = useRef(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      // User is at bottom if they are within 50px of the end
      const nearBottom = scrollHeight - scrollTop - clientHeight < 50;
      setIsAtBottom(nearBottom);
    }
  };

  const toggleAudio = (audioData: string, msgId: string) => {
    try {
      if (isPlayingAudio === msgId) {
        if (audioPlayer.current) {
          audioPlayer.current.pause();
          setIsPlayingAudio(null);
        }
      } else {
        if (audioPlayer.current) {
          audioPlayer.current.pause();
        }
        const dataUrl = audioData.replace('[AUDIO]', '');
        audioPlayer.current = new Audio(dataUrl);
        audioPlayer.current.play().catch(e => console.error("Play failed", e));
        setIsPlayingAudio(msgId);
        audioPlayer.current.onended = () => setIsPlayingAudio(null);
        audioPlayer.current.onerror = () => {
          alert("Erreur lors de la lecture du message vocal.");
          setIsPlayingAudio(null);
        };
      }
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  // Poll for new messages and update UI
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      try {
        // Poll for contacts list and last messages
        const members = await dataService.getMembers() || [];
        const allMsgs = await dataService.getMessages() || [];
        
        const mappedContacts = members
          .filter((m: any) => m && m.email !== user.email)
          .map((m: any) => {
            const conversation = allMsgs.filter((msg: any) => 
              msg && (
                (msg.sender_id === user.email && msg.receiver_id === m.email) ||
                (msg.sender_id === m.email && msg.receiver_id === user.email)
              )
            );
            const lastMsg = conversation.length > 0 ? conversation[conversation.length - 1] : null;
            const unreadForThisContact = conversation.filter((msg: any) => 
              (msg.receiver_id === user.email) && !msg.is_read
            ).length;
            
            return {
              id: m.email,
              first_name: m.first_name || "Inconnu",
              last_name: m.last_name || "",
              promo: m.promo || "N/A",
              job: m.job || "Membre",
              avatar: m.avatar || "",
              lastMessage: lastMsg ? (
                lastMsg.text.startsWith('[AUDIO]') ? "🎤 Message vocal" : 
                lastMsg.text.startsWith('[CALL]') ? "📞 Appel" : 
                lastMsg.text
              ) : "Démarrer une discussion...",
              lastTime: lastMsg ? lastMsg.time : "",
              isOnline: true,
              unreadCount: unreadForThisContact
            };
          })
          .sort((a: any, b: any) => (b.lastTime || "").localeCompare(a.lastTime || ""));
        
        setContacts(prev => {
          if (JSON.stringify(prev) === JSON.stringify(mappedContacts)) return prev;
          return mappedContacts;
        });

        // If a contact is selected, update messages
        if (selectedContact) {
          const conversation = allMsgs.filter((msg: any) => 
            msg && (
              (msg.sender_id === user.email && msg.receiver_id === selectedContact.id) ||
              (msg.sender_id === selectedContact.id && msg.receiver_id === user.email)
            )
          );
          const mappedMessages = conversation.map(m => ({
            id: m.id,
            senderId: m.sender_id,
            receiverId: m.receiver_id,
            text: m.text,
            time: m.time,
            isMine: m.sender_id === user.email
          }));

          setMessages(prev => {
            if (prev.length === mappedMessages.length && prev[prev.length - 1]?.id === mappedMessages[mappedMessages.length - 1]?.id) {
              return prev;
            }
            return mappedMessages;
          });
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [user, selectedContact]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerInterval = useRef<any>(null);
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApi = useRef<any>(null);

  // Load Jitsi Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => setIsJitsiLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (jitsiApi.current) jitsiApi.current.dispose();
      if (document.body && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Load User and Contacts
  const loadUI = async () => {
    const currentUser = dataService.getCurrentUser();
    if (!currentUser) {
      if (typeof window !== "undefined") router.push("/login");
      return;
    }
    setUser(currentUser);

    const members = await dataService.getMembers() || [];
    const allMsgs = await dataService.getMessages() || [];
    
    const mappedContacts = members
      .filter((m: any) => m && m.email !== currentUser.email)
      .map((m: any) => {
        const conversation = allMsgs.filter((msg: any) => 
          msg && (
            (msg.sender_id === currentUser.email) && 
            (msg.receiver_id === m.email) ||
            (msg.sender_id === m.email) && 
            (msg.receiver_id === currentUser.email)
          )
        );
        const lastMsg = conversation.length > 0 ? conversation[conversation.length - 1] : null;
        const unreadForThisContact = conversation.filter((msg: any) => 
          (msg.receiver_id === currentUser.email) && !msg.is_read
        ).length;
        
        return {
          id: m.email,
          first_name: m.first_name || "Inconnu",
          last_name: m.last_name || "",
          promo: m.promo || "N/A",
          job: m.job || "Membre",
          avatar: m.avatar || "",
          lastMessage: lastMsg ? (lastMsg.text.startsWith('[AUDIO]') ? "🎤 Message vocal" : lastMsg.text) : "Démarrer une discussion...",
          lastTime: lastMsg ? lastMsg.time : "",
          isOnline: true,
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
    const fetchChat = async () => {
      if (selectedContact && user) {
        lastMsgIdRef.current = null; // Reset for new contact
        await dataService.markAsRead(user.email, selectedContact.id);
        const chat = await dataService.getConversation(user.email, selectedContact.id);
        setMessages(chat.map((m: any) => ({
          ...m,
          isMine: (m.senderId || m.sender_id) === user.email
        })));
        setIsMobileView(true);
      }
    };
    fetchChat();
  }, [selectedContact, user]);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      // Check if this is really a new message
      if (lastMessage.id !== lastMsgIdRef.current) {
        // Scroll only if:
        // 1. First load (null)
        // 2. We just sent it
        // 3. User is already following the conversation at the bottom
        if (lastMsgIdRef.current === null || justSentRef.current || isAtBottom) {
          const target = scrollRef.current;
          // Use requestAnimationFrame for smoother and more reliable scroll
          requestAnimationFrame(() => {
            target.scrollTop = target.scrollHeight;
          });
          justSentRef.current = false;
        }
        lastMsgIdRef.current = lastMessage.id.toString();
      }
    }
  }, [messages, isAtBottom]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !selectedContact || !user) return;

    const msg: Message = {
      id: Date.now().toString(),
      senderId: user.email,
      receiverId: selectedContact.id,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };

    // Optimistic Update
    justSentRef.current = true;
    setMessages(prev => [...prev, msg]);
    setNewMessage("");

    await dataService.saveMessage({
      senderId: msg.senderId,
      receiverId: msg.receiverId,
      text: msg.text,
      time: msg.time
    });
    // loadUI() call removed as polling handles it very fast now
  };

  // Voice Recording Logic
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          handleSendVoiceMessage(base64Audio);
        };
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Mic access denied", err);
      alert("Accès au micro refusé.");
    }
  };

  const stopRecording = (cancel = false) => {
    if (mediaRecorder.current && isRecording) {
      if (cancel) {
        mediaRecorder.current.onstop = null;
      }
      mediaRecorder.current.stop();
      setIsRecording(false);
      clearInterval(timerInterval.current);
    }
  };

  const handleSendVoiceMessage = async (audioData: string) => {
    if (!selectedContact || !user) return;
    const msg: Message = {
      id: Date.now().toString(),
      senderId: user.email,
      receiverId: selectedContact.id,
      text: `[AUDIO]${audioData}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };
    
    // Optimistic Update
    justSentRef.current = true;
    setMessages(prev => [...prev, msg]);

    await dataService.saveMessage({
      senderId: msg.senderId,
      receiverId: msg.receiverId,
      text: msg.text,
      time: msg.time
    });
  };

  const startCall = async (type: 'audio' | 'video') => {
    if (!selectedContact || !user) return;
    
    // Create a unique room name based on both user emails
    const ids = [user.email, selectedContact.id].sort();
    const roomName = `USP-ALUMNI-${ids[0]}-${ids[1]}`.replace(/[^a-zA-Z0-9-]/g, '-');
    
    // Send a signaling message
    const msg = {
      senderId: user.email,
      receiverId: selectedContact.id,
      text: `[CALL]${type}:${roomName}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    await dataService.saveMessage(msg);

    setShowCallUI({ type, status: 'active', roomName });
  };

  const joinCall = (callData: string) => {
    const [type, roomName] = callData.replace('[CALL]', '').split(':');
    setShowCallUI({ type: type as any, status: 'active', roomName });
  };

  // Initialize Jitsi when status becomes active
  useEffect(() => {
    if (showCallUI?.status === 'active' && isJitsiLoaded && jitsiContainerRef.current) {
      if (jitsiApi.current) jitsiApi.current.dispose();

      const options = {
        roomName: showCallUI.roomName,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: showCallUI.type === 'audio',
          prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
          TILE_VIEW_MAX_COLUMNS: 2,
        },
        userInfo: {
          displayName: `${user.first_name} ${user.last_name}`,
          email: user.email
        }
      };

      jitsiApi.current = new window.JitsiMeetExternalAPI("meet.jit.si", options);
      
      jitsiApi.current.addEventListeners({
        readyToClose: () => {
          setShowCallUI(null);
          if (jitsiApi.current) jitsiApi.current.dispose();
        },
        videoConferenceLeft: () => {
          setShowCallUI(null);
          if (jitsiApi.current) jitsiApi.current.dispose();
        }
      });
    }
  }, [showCallUI?.status, isJitsiLoaded, user]);

  const filteredContacts = contacts.filter(c => 
    `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.promo.includes(searchQuery)
  );

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto h-[80vh] bg-white rounded-[3rem] shadow-2xl shadow-sky-900/5 border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar: Contacts List */}
        <div className={`w-full md:w-96 border-r border-gray-100 flex flex-col bg-white ${isMobileView && selectedContact ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-black flex items-center gap-3 tracking-tight">
                Messages
                {contacts.reduce((acc, c) => acc + (c.unreadCount || 0), 0) > 0 && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                    {contacts.reduce((acc, c) => acc + (c.unreadCount || 0), 0)}
                  </span>
                )}
              </h2>
              <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-sky-50 hover:text-sky-500 transition-all shadow-sm">
                <Filter size={20} />
              </button>
            </div>
            
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Rechercher un membre..."
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto px-3 pb-6 space-y-2">
            {filteredContacts.length > 0 ? filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-4 rounded-[2rem] flex items-center gap-4 transition-all group ${
                  selectedContact?.id === contact.id 
                  ? 'bg-sky-500 text-white shadow-xl shadow-sky-500/20' 
                  : 'hover:bg-gray-50 text-gray-900'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center ${selectedContact?.id === contact.id ? 'text-sky-500' : 'text-sky-400'}`}>
                    <User size={24} />
                  </div>
                  {contact.isOnline && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-grow text-left overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`font-black truncate text-sm ${selectedContact?.id === contact.id ? 'text-white' : 'text-gray-900'}`}>
                      {contact.first_name} {contact.last_name}
                    </h4>
                    <span className={`text-[10px] font-bold whitespace-nowrap ${selectedContact?.id === contact.id ? 'text-sky-100' : 'text-gray-400'}`}>
                      {contact.lastTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-xs truncate font-medium ${selectedContact?.id === contact.id ? 'text-sky-100' : 'text-gray-500'}`}>
                      {contact.lastMessage}
                    </p>
                    {contact.unreadCount ? contact.unreadCount > 0 && (
                      <span className={`min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-black px-1 ${
                        selectedContact?.id === contact.id ? 'bg-white text-sky-500' : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                      }`}>
                        {contact.unreadCount}
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            )) : (
              <div className="py-10 text-center space-y-4 opacity-30">
                <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto">
                  <User size={32} />
                </div>
                <p className="text-xs font-black uppercase tracking-widest">Aucun membre trouvé</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-grow flex flex-col bg-white min-h-0 ${isMobileView && selectedContact ? 'flex' : 'hidden md:flex'}`}>
          {selectedContact ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsMobileView(false)}
                    className="md:hidden p-2 text-gray-400 hover:text-sky-500 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="w-12 h-12 rounded-2xl shadow-md bg-sky-50 flex items-center justify-center text-sky-500">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">{selectedContact.first_name} {selectedContact.last_name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedContact.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></span>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {selectedContact.isOnline ? 'En ligne' : 'Hors ligne'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4">
                  <button 
                    onClick={() => startCall('audio')}
                    className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-500 transition-all shadow-sm"
                  >
                    <Phone size={20} />
                  </button>
                  <button 
                    onClick={() => startCall('video')}
                    className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-sky-50 hover:text-sky-500 transition-all shadow-sm"
                  >
                    <Video size={20} />
                  </button>
                </div>
              </div>

              {/* Call UI Overlay */}
              {showCallUI && (
                <div className="absolute inset-0 z-50 bg-sky-500/95 backdrop-blur-xl flex flex-col items-center justify-center text-white p-4 animate-in fade-in duration-300">
                  {showCallUI.status === 'active' ? (
                    <div className="w-full h-full flex flex-col relative bg-black rounded-[2rem] overflow-hidden shadow-2xl">
                      {/* Jitsi Meeting Container */}
                      <div ref={jitsiContainerRef} className="w-full h-full"></div>
                      
                      {/* Control Overlays (Custom buttons) */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-[60]">
                        <button 
                          onClick={() => {
                            if (jitsiApi.current) jitsiApi.current.dispose();
                            setShowCallUI(null);
                          }}
                          className="w-16 h-16 bg-red-500 rounded-3xl flex items-center justify-center shadow-2xl hover:bg-red-600 transition-all transform active:scale-90"
                        >
                          <X size={28} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center animate-in zoom-in duration-500">
                      <div className="w-32 h-32 bg-white/20 rounded-[3rem] flex items-center justify-center mb-8 relative">
                        <User size={64} className="text-white" />
                        <div className="absolute -inset-4 border-2 border-white/30 rounded-[3.5rem] animate-ping opacity-20"></div>
                      </div>
                      <h2 className="text-3xl font-black mb-2">{selectedContact.first_name} {selectedContact.last_name}</h2>
                      <p className="font-bold text-sky-100 mb-12 uppercase tracking-[0.2em] text-sm">
                        Appel en cours...
                      </p>
                      <button 
                        onClick={() => setShowCallUI(null)}
                        className="w-16 h-16 bg-red-500 rounded-3xl flex items-center justify-center shadow-2xl hover:bg-red-600 transition-all transform active:scale-90"
                      >
                        <X size={28} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Messages History */}
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-grow overflow-y-auto p-8 space-y-10 bg-gray-50/30 min-h-0"
              >
                {messages.length > 0 ? messages.map((msg) => (
                  <div key={msg.id} className={`flex items-end gap-3 ${msg.isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="flex-shrink-0 mb-1">
                      <div className="w-8 h-8 rounded-xl shadow-sm bg-white flex items-center justify-center text-sky-400">
                        <User size={16} />
                      </div>
                    </div>

                    <div className={`max-w-[80%] md:max-w-[60%] p-5 rounded-[2rem] shadow-sm relative ${msg.isMine ? 'bg-sky-500 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-900 rounded-bl-none'}`}>
                      {msg.text.startsWith('[AUDIO]') ? (
                        <div className="flex items-center gap-4 py-1 min-w-[200px]">
                          <button 
                            onClick={() => toggleAudio(msg.text, msg.id.toString())}
                            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${msg.isMine ? 'bg-white text-sky-500' : 'bg-sky-500 text-white'}`}
                          >
                            {isPlayingAudio === msg.id.toString() ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                          </button>
                          <div className="flex-grow space-y-2">
                            <div className={`h-1.5 rounded-full relative overflow-hidden ${msg.isMine ? 'bg-sky-400' : 'bg-gray-100'}`}>
                              <div className={`absolute left-0 top-0 bottom-0 ${isPlayingAudio === msg.id.toString() ? 'w-full transition-all duration-[10s]' : 'w-0'} ${msg.isMine ? 'bg-white' : 'bg-sky-500'}`}></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-black opacity-60">
                              <span>🎤 Message vocal</span>
                              <span>{isPlayingAudio === msg.id.toString() ? "Lecture..." : "Prêt"}</span>
                            </div>
                          </div>
                        </div>
                      ) : msg.text.startsWith('[CALL]') ? (
                        <div className="flex items-center gap-4 py-1 min-w-[200px]">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.isMine ? 'bg-sky-400' : 'bg-sky-100'}`}>
                            {msg.text.includes('video') ? <Video size={18} /> : <Phone size={18} />}
                          </div>
                          <div className="flex-grow">
                            <p className="text-xs font-black uppercase tracking-widest mb-2">Appel {msg.text.includes('video') ? 'Vidéo' : 'Audio'}</p>
                            {!msg.isMine && (
                              <button 
                                onClick={() => joinCall(msg.text)}
                                className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                              >
                                Rejoindre
                              </button>
                            )}
                            {msg.isMine && <p className="text-[10px] font-bold opacity-60">Appel lancé</p>}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                      )}
                      <span className={`text-[9px] font-black absolute -bottom-6 ${msg.isMine ? 'right-2 text-sky-400' : 'left-2 text-gray-300'} uppercase tracking-widest whitespace-nowrap`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-4 opacity-50">
                    <Sparkles size={48} />
                    <p className="font-black uppercase tracking-widest text-xs">C&apos;est le début d&apos;une belle histoire...</p>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-gray-100">
                {isRecording ? (
                  <div className="flex items-center gap-4 bg-sky-50 p-4 rounded-[2rem] animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-3 flex-grow pl-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-sm shadow-red-500/50"></div>
                      <span className="font-black text-sky-500 text-sm tracking-widest">{formatTime(recordingTime)}</span>
                      <div className="flex-grow h-1.5 bg-sky-200 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 animate-shimmer" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <button 
                      onClick={() => stopRecording(true)}
                      className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button 
                      onClick={() => stopRecording()}
                      className="p-4 bg-sky-500 text-white rounded-2xl shadow-xl shadow-sky-500/20 transform active:scale-90"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <button 
                      type="button"
                      onClick={startRecording}
                      className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-sky-50 hover:text-sky-500 transition-all transform active:scale-90"
                    >
                      <Mic size={22} />
                    </button>
                    <div className="relative flex-grow group">
                      <input
                        type="text"
                        placeholder="Écrivez votre message..."
                        className="w-full pl-6 pr-14 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-sm"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                      />
                      <button 
                        type="submit"
                        disabled={!newMessage.trim()}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-4 rounded-2xl transition-all transform active:scale-90 ${newMessage.trim() ? 'bg-sky-500 text-white shadow-xl shadow-sky-500/20' : 'text-gray-300'}`}
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
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

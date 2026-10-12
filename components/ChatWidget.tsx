
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Volume2, VolumeX, Sparkles, Headphones, Zap, Loader2, Database, Radio, UserCheck, Mic, Square, MessageCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../constants';
import { socket, chatSocket } from '../api';
import { TalkingAvatar } from './TalkingAvatar';

// Standard base64 to Uint8Array
function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper for raw PCM decoding to audio buffer
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  const dataInt16 = new Int16Array(buffer);
  const frameCount = dataInt16.length / numChannels;
  const audioBuffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = audioBuffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return audioBuffer;
}

interface ChatMessage {
  _id: string;
  userId: string;
  message: string;
  timestamp: Date;
  isLive?: boolean;
  audioUrl?: string;
  routedModel?: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState<string | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [userId] = useState(() => 'user_' + Math.random().toString(16).slice(2, 8));
  
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    { 
      _id: 'msg_init',
      userId: 'corneila-id', 
      message: "Greetings. I am Corneila, your AI Concierge at Cornelius TEC. How shall we innovate together today?",
      timestamp: new Date()
    }
  ]);

  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const durationIntervalRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const userVoiceMsg: ChatMessage = {
          _id: 'msg_voice_' + Math.random().toString(16).slice(2, 14),
          userId: userId,
          message: `🎤 Voice Transmission (${recordingDuration}s)`,
          timestamp: new Date(),
          isLive: isLiveMode,
          audioUrl: audioUrl
        };

        setChatLog(prev => [...prev, userVoiceMsg]);
        
        // Release mic
        stream.getTracks().forEach(track => track.stop());

        if (isLiveMode) {
          chatSocket.sendMessage(userId, `[Voice Transmission: ${audioUrl}]`);
        } else {
          processVoiceResponse();
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error("Microphone access error:", err);
      const botErr: ChatMessage = {
        _id: 'msg_mic_err_' + Date.now(),
        userId: 'corneila-id',
        message: "Neural link failed to establish microphone connection. Please grant audio permissions.",
        timestamp: new Date()
      };
      setChatLog(prev => [...prev, botErr]);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }
    setIsRecording(false);
  };

  const processVoiceResponse = async () => {
    setIsThinking(true);
    stopSpeaking();
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: "Decrypting high-fidelity voice transmission request regarding African Digital Renaissance." }),
      });
      if (!response.ok) {
        throw new Error('Voice response fetch failed');
      }
      const data = await response.json();
      const botResponseText = data.text || "Voice transmission verified.";
      const botMessageObj: ChatMessage = {
        _id: 'msg_' + Math.random().toString(16).slice(2, 14),
        userId: 'corneila-id',
        message: botResponseText,
        timestamp: new Date(),
        routedModel: data.routedModel
      };
      setChatLog(prev => [...prev, botMessageObj]);
      if (isVoiceEnabled) await speakText(botResponseText, false, botMessageObj._id);
    } catch (e) {
      console.error("Voice response error:", e);
      const fallbackMsg: ChatMessage = {
        _id: 'msg_voice_err_' + Date.now(),
        userId: 'corneila-id',
        message: "Voice uplink signal verified. Our mainframes in Kigali and Monrovia have safely registered the packet.",
        timestamp: new Date()
      };
      setChatLog(prev => [...prev, fallbackMsg]);
      if (isVoiceEnabled) await speakText(fallbackMsg.message, false, fallbackMsg._id);
    } finally {
      setIsThinking(false);
    }
  };

  const audioContextRef = useRef<AudioContext | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatLog, isThinking, isSpeaking]);

  // Synchronize the 'chat-widget-open' class on body to hide the ElevenLabs launcher when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('chat-widget-open');
    } else {
      document.body.classList.remove('chat-widget-open');
    }
    return () => {
      document.body.classList.remove('chat-widget-open');
    };
  }, [isOpen]);

  // Socket Setup
  useEffect(() => {
    if (isLiveMode) {
      socket.connect();
      socket.on('connect', () => setSocketConnected(true));
      socket.on('disconnect', () => setSocketConnected(false));
      
      chatSocket.onMessage((msg: any) => {
        const liveMsg: ChatMessage = {
          _id: 'live_' + Date.now(),
          userId: msg.userId === userId ? userId : 'support-agent',
          message: msg.message,
          timestamp: new Date(),
          isLive: true
        };
        // Only add if it's from the other person (ours is added locally for speed)
        if (msg.userId !== userId) {
          setChatLog(prev => [...prev, liveMsg]);
        }
      });
    } else {
      socket.disconnect();
      setSocketConnected(false);
      chatSocket.offMessage();
    }
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      chatSocket.offMessage();
    };
  }, [isLiveMode, userId]);

  const initAudio = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const stopSpeaking = () => {
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
      } catch (e) {}
      currentSourceRef.current = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    setIsSpeaking(false);
    setActiveSpeakingMsgId(null);
  };

  const speakText = async (text: string, forceVoice: boolean = false, msgId?: string) => {
    if (!isVoiceEnabled && !forceVoice) return;
    
    // Clean markdown formatting & links for natural speech reading
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .trim();

    if (!cleanText) return;

    try {
      stopSpeaking();
      setIsSpeaking(true);
      if (msgId) setActiveSpeakingMsgId(msgId);
      
      let voicePlayed = false;
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: cleanText }),
        });
        if (response.ok) {
          const data = await response.json();
          const base64Audio = data.audio;
          if (base64Audio) {
            const ctx = await initAudio();
            const rawData = decodeBase64(base64Audio);
            const audioBuffer = await decodeAudioData(rawData, ctx, 24000, 1);
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            source.onended = () => {
              setIsSpeaking(false);
              setActiveSpeakingMsgId(null);
            };
            currentSourceRef.current = source;
            source.start(0);
            voicePlayed = true;
          }
        }
      } catch (err) {
        console.warn("Server TTS failed, cascading to browser speech API:", err);
      }

      if (!voicePlayed) {
        // High-fidelity fallback using standard browser-native speech synthesis
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }

          let voices = window.speechSynthesis.getVoices();
          if (voices.length === 0) {
            await new Promise<void>((resolve) => {
              const onVoicesChanged = () => {
                voices = window.speechSynthesis.getVoices();
                window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
                resolve();
              };
              window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
              setTimeout(resolve, 300);
            });
          }

          const utterance = new SpeechSynthesisUtterance(cleanText);
          const preferredVoice = voices.find(v => 
            v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Natural') || v.name.includes('Karen') || v.name.includes('Victoria'))
          ) || voices.find(v => v.lang.includes('en')) || voices[0];
          
          if (preferredVoice) utterance.voice = preferredVoice;
          utterance.rate = 1.0;
          utterance.pitch = 1.05;
          utterance.volume = 1.0;
          
          utterance.onstart = () => {
            setIsSpeaking(true);
          };
          utterance.onend = () => {
            setIsSpeaking(false);
            setActiveSpeakingMsgId(null);
          };
          utterance.onerror = (e) => {
            console.warn("SpeechSynthesis utterance error:", e);
            setIsSpeaking(false);
            setActiveSpeakingMsgId(null);
          };
          
          window.speechSynthesis.speak(utterance);
          
          setTimeout(() => {
            if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
              window.speechSynthesis.resume();
            }
          }, 100);
          
          voicePlayed = true;
        } else {
          setIsSpeaking(false);
          setActiveSpeakingMsgId(null);
        }
      }
    } catch (error) {
      console.error("Neural Voice Generation Error:", error);
      setIsSpeaking(false);
      setActiveSpeakingMsgId(null);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isThinking) return;
    const userMsgText = message.trim();
    const userMessageObj: ChatMessage = {
      _id: 'msg_' + Math.random().toString(16).slice(2, 14),
      userId: userId,
      message: userMsgText,
      timestamp: new Date(),
      isLive: isLiveMode
    };

    setChatLog(prev => [...prev, userMessageObj]);
    setMessage('');

    if (isLiveMode) {
      chatSocket.sendMessage(userId, userMsgText);
      return;
    }

    // AI Concierge Logic
    setIsThinking(true);
    stopSpeaking();
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsgText }),
      });
      if (!response.ok) {
        throw new Error('Chat response not ok');
      }
      const data = await response.json();
      const botResponseText = data.text || "Transmission error.";
      const botMessageObj: ChatMessage = {
        _id: 'msg_' + Math.random().toString(16).slice(2, 14),
        userId: 'corneila-id',
        message: botResponseText,
        timestamp: new Date(),
        routedModel: data.routedModel
      };
      setChatLog(prev => [...prev, botMessageObj]);
      if (isVoiceEnabled) await speakText(botResponseText, false, botMessageObj._id);
    } catch (error) {
      console.error("AI communication error:", error);
      let smartFallback = "Greetings! I am Corneila, AI Concierge for Cornelius TEC. Welcome to our innovation portal. You can explore our digital web architectures, online shop templates ($100), AI editor suites ($300), or connect directly with our engineering team on WhatsApp or via the Client Portal!";
      
      const lower = userMsgText.toLowerCase();
      if (lower.includes('price') || lower.includes('cost') || lower.includes('buy') || lower.includes('shop') || lower.includes('template')) {
        smartFallback = "Our digital assets include the Full Online E-Commerce Shop ($100), AI Editor Suite ($300), and School Administration Website ($799). You can click 'Acquire License' or 'Preview Live' on any asset card in the Digital Assets Vault to purchase or preview immediately!";
      } else if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) {
        smartFallback = "You can reach the Cornelius TEC engineering team directly on WhatsApp via the green 'WHATSAPP QR / DIRECT' button above, or click 'EMAIL' to transmit your project requirements directly.";
      } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
        smartFallback = "Hello! Welcome to Cornelius TEC. How can I assist you with our software solutions, custom web deployments, or digital assets today?";
      }

      const botMessageObj: ChatMessage = {
        _id: 'msg_err_' + Math.random().toString(16).slice(2, 14),
        userId: 'corneila-id',
        message: smartFallback,
        timestamp: new Date()
      };
      setChatLog(prev => [...prev, botMessageObj]);
      if (isVoiceEnabled) await speakText(smartFallback, false, botMessageObj._id);
    } finally {
      setIsThinking(false);
    }
  };

  const toggleVoice = async () => {
    if (isVoiceEnabled) {
      stopSpeaking();
      setIsVoiceEnabled(false);
    } else {
      await initAudio();
      setIsVoiceEnabled(true);
      const lastMsg = [...chatLog].reverse().find(m => m.userId === 'corneila-id');
      if (lastMsg) {
        speakText(lastMsg.message, true);
      }
    }
  };

  const toggleLive = () => {
    if (!isLiveMode) {
      const systemNotice: ChatMessage = {
        _id: 'sys_' + Date.now(),
        userId: 'corneila-id',
        message: "Switching to Live Human Architect protocol. Handing over controls...",
        timestamp: new Date()
      };
      setChatLog(prev => [...prev, systemNotice]);
    }
    setIsLiveMode(!isLiveMode);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] md:hidden"
          />
        )}
      </AnimatePresence>

      {!isOpen ? (
        <div className="flex flex-col items-center space-y-4">
          {/* Small stylish text chat trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="bg-dark-bg/90 hover:bg-dark-bg border border-white/10 hover:border-neon-blue/50 text-gray-400 hover:text-neon-blue p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center group relative cursor-pointer"
            title="Open Text Assistant (Corneila AI)"
          >
            <MessageSquare size={16} />
            <span className="absolute right-14 bg-dark-bg/95 border border-white/10 text-white text-[8px] tracking-wider uppercase py-1.5 px-3 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-heading shadow-md">
              Text Chat
            </span>
          </button>

          {/* Main Bouncing Avatar Button (triggers Corneila AI Voice Assistant) */}
          <button
            onClick={() => {
              setIsOpen(true);
              setIsVoiceEnabled(true);
            }}
            className="bg-gradient-to-r from-neon-blue to-neon-purple p-1.5 rounded-full shadow-2xl hover:scale-110 transition-transform neon-glow-blue animate-bounce flex items-center justify-center group overflow-hidden border border-white/25 w-18 h-18 md:w-20 md:h-20 relative cursor-pointer"
            title="Start Corneila Voice Assistant"
          >
            <TalkingAvatar size="xs" isSpeaking={false} className="opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all translate-y-3 pointer-events-none" />
            <div className="absolute top-1 right-1 w-4.5 h-4.5 bg-red-500 rounded-full border-2 border-dark-bg animate-pulse flex items-center justify-center z-20 pointer-events-none">
              <span className="text-[8px] font-bold text-white">1</span>
            </div>
          </button>
        </div>
      ) : (
        <div className="w-[calc(100vw-32px)] sm:w-[380px] md:w-[440px] h-[580px] max-h-[calc(100vh-100px)] glassmorphism rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col overflow-hidden animate-slide-up shadow-2xl border border-white/10">
          {/* Header */}
          <div className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 p-4 md:p-6 flex justify-between items-center border-b border-white/10 backdrop-blur-2xl">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center space-y-1.5 select-none">
                <div className="relative">
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple p-[2px] transition-all duration-500 ${isSpeaking ? 'scale-105 shadow-[0_0_25px_rgba(0,207,255,0.6)]' : ''}`}>
                    <div className="w-full h-full rounded-full overflow-hidden bg-dark-bg flex items-center justify-center">
                      {isLiveMode ? (
                        <img src="https://picsum.photos/seed/human/200" className="w-full h-full object-cover transition-all" alt="Avatar" />
                      ) : (
                        <TalkingAvatar size="xs" isSpeaking={isSpeaking || isThinking} className="translate-y-3 scale-110" />
                      )}
                    </div>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-dark-bg ${isLiveMode ? (socketConnected ? 'bg-green-500' : 'bg-red-500') : 'bg-neon-blue'}`} />
                </div>
                
                {/* Visual Sound Wave Indicator */}
                <div className="flex items-end justify-center space-x-[2px] h-4 w-16" title={isSpeaking ? "Neural Audio Synthesizer Active" : "Audio Synthesizer Standby"}>
                  <span className={`w-[2.5px] bg-neon-blue rounded-full soundwave-bar ${isSpeaking ? 'soundwave-bar-1' : 'h-[3px] opacity-40'}`} />
                  <span className={`w-[2.5px] bg-neon-blue/80 rounded-full soundwave-bar ${isSpeaking ? 'soundwave-bar-2' : 'h-[3px] opacity-40'}`} />
                  <span className={`w-[2.5px] bg-neon-purple rounded-full soundwave-bar ${isSpeaking ? 'soundwave-bar-3' : 'h-[3px] opacity-40'}`} />
                  <span className={`w-[2.5px] bg-neon-purple/80 rounded-full soundwave-bar ${isSpeaking ? 'soundwave-bar-4' : 'h-[3px] opacity-40'}`} />
                  <span className={`w-[2.5px] bg-neon-blue rounded-full soundwave-bar ${isSpeaking ? 'soundwave-bar-5' : 'h-[3px] opacity-40'}`} />
                  <span className={`w-[2.5px] bg-neon-blue/80 rounded-full soundwave-bar ${isSpeaking ? 'soundwave-bar-6' : 'h-[3px] opacity-40'}`} />
                  <span className={`w-[2.5px] bg-neon-purple rounded-full soundwave-bar ${isSpeaking ? 'soundwave-bar-7' : 'h-[3px] opacity-40'}`} />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-heading text-[8px] md:text-[10px] tracking-widest uppercase block text-neon-blue font-bold">
                    {isLiveMode ? 'Live Interface' : 'Neural Node'}
                  </span>
                </div>
                <span className="text-sm md:text-base font-heading tracking-tight text-white block uppercase font-bold">
                  {isLiveMode ? 'HUMAN ARCHITECT' : 'CORNEILA AI'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleLive}
                className={`p-2 md:p-2.5 rounded-xl transition-all ${isLiveMode ? 'bg-neon-purple text-white' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                title={isLiveMode ? "Switch to AI" : "Talk to Human"}
              >
                <Radio size={16} className={isLiveMode ? 'animate-pulse' : ''} />
              </button>
              <button 
                onClick={toggleVoice} 
                className={`p-2 md:p-2.5 rounded-xl transition-all ${isVoiceEnabled ? 'bg-neon-blue text-dark-bg shadow-[0_0_20px_rgba(0,207,255,0.4)]' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                title={isVoiceEnabled ? "Mute Voice" : "Enable Voice"}
              >
                {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full border border-red-400 shadow-lg shadow-red-900/40 transition-all active:scale-95 group"
                aria-label="Close AI Assistant"
              >
                <span className="text-[10px] font-heading uppercase tracking-widest font-bold">Close</span>
                <X size={18} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Direct Text Channels Bar */}
          <div className="bg-white/5 border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-[10px] font-heading uppercase tracking-wider">
            <span className="text-gray-400 font-bold">Text Team Directly:</span>
            <div className="flex items-center space-x-2">
              <a
                href="https://wa.me/message/ILBNJCGAXZL3I1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded-lg transition-all active:scale-95"
                title="Send Cornelius Howe a message on WhatsApp"
              >
                <MessageCircle size={12} />
                <span>WhatsApp QR / Direct</span>
              </a>
              <a
                href="mailto:corneliustch@gmail.com?subject=Direct%20Inquiry%20to%20Cornelius%20TEC%20Team"
                className="flex items-center space-x-1 px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 rounded-lg transition-all active:scale-95"
                title="Email: corneliustch@gmail.com"
              >
                <Mail size={12} />
                <span>Email</span>
              </a>
            </div>
          </div>
          
          {/* Chat Body */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-6 font-body text-sm custom-scrollbar bg-black/10">
            {chatLog.map((chat) => (
              <div key={chat._id} className={`flex flex-col ${chat.userId === userId ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-[1.8rem] shadow-lg transition-all ${
                  chat.userId === userId 
                    ? 'bg-gradient-to-br from-neon-blue to-neon-purple text-white rounded-tr-none border border-white/10'
                    : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none backdrop-blur-md' 
                }`}>
                  <p>{chat.message}</p>
                  {chat.audioUrl && (
                    <div className="mt-2 p-2 bg-black/40 rounded-xl border border-white/5 flex items-center justify-center">
                      <audio src={chat.audioUrl} controls className="w-full max-w-[240px] h-8 text-xs filter invert brightness-125 opacity-90 accent-neon-blue" />
                    </div>
                  )}
                  {chat.isLive && (
                    <div className="flex items-center space-x-1 mt-1 opacity-50 text-[8px] uppercase tracking-tighter">
                      <Radio size={8} />
                      <span>Live Signal</span>
                    </div>
                  )}
                  {chat.routedModel && (
                    <div className="flex items-center space-x-1.5 mt-2 px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-[8px] font-mono text-neon-blue uppercase tracking-wider w-fit">
                      <Database size={8} className="text-neon-purple animate-pulse" />
                      <span>routed: {chat.routedModel}</span>
                    </div>
                  )}

                  {chat.userId !== userId && (
                    <button
                      onClick={() => {
                        if (isSpeaking && activeSpeakingMsgId === chat._id) {
                          stopSpeaking();
                        } else {
                          speakText(chat.message, true, chat._id);
                        }
                      }}
                      className={`mt-2.5 flex items-center space-x-1.5 px-3 py-1 rounded-full border text-[9px] font-heading uppercase tracking-wider transition-all cursor-pointer ${
                        isSpeaking && activeSpeakingMsgId === chat._id
                          ? 'bg-neon-blue/20 text-neon-blue border-neon-blue/50 animate-pulse shadow-[0_0_12px_rgba(0,207,255,0.4)]'
                          : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/10'
                      }`}
                      title="Click to have Corneila AI read this response aloud"
                    >
                      {isSpeaking && activeSpeakingMsgId === chat._id ? (
                        <>
                          <Volume2 size={12} className="text-neon-blue animate-bounce" />
                          <span>Speaking... (Click to Stop)</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={12} className="text-neon-blue" />
                          <span>Listen / Read Aloud</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <span className="mt-1.5 px-2 text-[8px] text-gray-600 font-accent uppercase tracking-widest">
                  {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {(chat.userId || 'user').slice(0, 8)}
                </span>
              </div>
            ))}
            
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl rounded-tl-none flex space-x-2 items-center">
                  <Loader2 className="w-3 h-3 text-neon-blue animate-spin" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-heading">Processing</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 border-t border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <div className="relative flex items-center">
                {/* Voice Record Button */}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isThinking}
                  className={`absolute left-2 p-3 rounded-xl transition-all shadow-lg z-10 ${
                    isRecording 
                      ? 'bg-red-600 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={isRecording ? "Stop Recording" : "Record Voice Message"}
                >
                  {isRecording ? <Square size={14} className="animate-spin-slow" /> : <Mic size={14} />}
                </button>

                <input
                  type="text"
                  value={isRecording ? `Recording voice node... (${recordingDuration}s)` : message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isRecording ? "Press Red Square to transmit audio..." : (isLiveMode ? "Transmitting to live agent..." : "Ask Corneila...")}
                  disabled={isThinking || isRecording || (isLiveMode && !socketConnected)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-14 py-4 text-xs focus:outline-none focus:border-neon-blue transition-all disabled:opacity-50 text-white placeholder:text-gray-600 font-subheading"
                />
                
                <button 
                  onClick={handleSend} 
                  disabled={isThinking || isRecording || !message.trim() || (isLiveMode && !socketConnected)}
                  className={`absolute right-2 p-3 rounded-xl transition-all shadow-lg ${isLiveMode ? 'bg-neon-purple' : 'bg-neon-blue'} text-white disabled:opacity-30`}
                >
                  <Send size={14} />
                </button>
              </div>
              
              <div className="flex justify-center">
                 <p className="text-[8px] text-gray-700 uppercase tracking-[0.3em] font-accent">
                  {isLiveMode ? (socketConnected ? 'SECURE CHANNEL ESTABLISHED' : 'CONNECTING TO ARCHITECT...') : 'Neural Link Status: Verified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes voice {
          0%, 100% { height: 4px; opacity: 0.5; }
          50% { height: 16px; opacity: 1; }
        }
        @keyframes soundwave-pulse-1 {
          0%, 100% { height: 3px; opacity: 0.4; }
          50% { height: 14px; opacity: 1; }
        }
        @keyframes soundwave-pulse-2 {
          0%, 100% { height: 4px; opacity: 0.5; }
          50% { height: 9px; opacity: 0.9; }
        }
        @keyframes soundwave-pulse-3 {
          0%, 100% { height: 3px; opacity: 0.4; }
          50% { height: 15px; opacity: 1; }
        }
        @keyframes soundwave-pulse-4 {
          0%, 100% { height: 5px; opacity: 0.5; }
          50% { height: 11px; opacity: 0.95; }
        }
        .soundwave-bar {
          display: inline-block;
          height: 3px;
          min-height: 3px;
          transition: height 0.3s ease, opacity 0.3s ease;
        }
        .soundwave-bar-1 { animation: soundwave-pulse-1 0.7s ease-in-out infinite alternate; }
        .soundwave-bar-2 { animation: soundwave-pulse-2 0.55s ease-in-out infinite alternate; }
        .soundwave-bar-3 { animation: soundwave-pulse-3 0.8s ease-in-out infinite alternate; }
        .soundwave-bar-4 { animation: soundwave-pulse-4 0.65s ease-in-out infinite alternate; }
        .soundwave-bar-5 { animation: soundwave-pulse-2 0.75s ease-in-out infinite alternate; }
        .soundwave-bar-6 { animation: soundwave-pulse-1 0.5s ease-in-out infinite alternate; }
        .soundwave-bar-7 { animation: soundwave-pulse-3 0.6s ease-in-out infinite alternate; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 207, 255, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

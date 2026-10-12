import React, { useState } from 'react';
import { MessageCircle, Mail, Send, CheckCircle2, Copy, Sparkles, ExternalLink, QrCode, Phone } from 'lucide-react';

interface DirectContactCardProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export const DirectContactCard: React.FC<DirectContactCardProps> = ({
  title = "Direct Messaging to Cornelius TEC Team",
  subtitle = "Connected as an authenticated member. Text Cornelius Howe on WhatsApp or email our team directly.",
  compact = false
}) => {
  const [customMessage, setCustomMessage] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const phone = "+250796569416";
  const email = "corneliustch@gmail.com";
  const whatsappDirectLink = "https://wa.me/message/ILBNJCGAXZL3I1";
  const qrCodeImageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://wa.me/message/ILBNJCGAXZL3I1";

  const handleWhatsAppClick = () => {
    if (customMessage.trim()) {
      const text = encodeURIComponent(customMessage.trim());
      window.open(`https://wa.me/250796569416?text=${text}`, '_blank');
    } else {
      window.open(whatsappDirectLink, '_blank');
    }
  };

  const [emailStatusMessage, setEmailStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleEmailClick = () => {
    setEmailStatusMessage(null);
    const timestamp = new Date().toISOString();
    console.log(`[Email Dispatch Logger] [${timestamp}] Triggering mailto client dispatch for: ${email}`);

    try {
      const subject = encodeURIComponent("Direct Message from Cornelius TEC Member");
      const body = customMessage.trim()
        ? encodeURIComponent(customMessage)
        : encodeURIComponent("Hello Cornelius TEC team,\n\nI am contacting you directly as a registered member.\n\nBest regards,");
      
      const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
      
      // Attempt window launch
      const newWin = window.open(mailtoUrl, '_blank');
      
      if (!newWin && typeof window.location !== 'undefined') {
        // Pop-up blocked or not opened in new window, fallback to location href
        console.warn(`[Email Dispatch Logger] [${timestamp}] Window pop-up prevented by browser policy. Falling back to window.location.href`);
        window.location.href = mailtoUrl;
      }
      
      console.log(`[Email Dispatch Logger] [${timestamp}] Mail dispatch signal triggered successfully.`);
      setEmailStatusMessage({ type: 'success', text: 'Email client launched! If no window appeared, copy the address directly below.' });
    } catch (err: any) {
      console.error(`[Email Dispatch Logger] [${timestamp}] ERROR: Failed to launch email client.`, {
        errorName: err?.name,
        errorMessage: err?.message,
        targetEmail: email
      });
      setEmailStatusMessage({ 
        type: 'error', 
        text: `Unable to open default email client (${err?.message || 'Blocked'}). Address copied to clipboard instead!` 
      });
      copyToClipboard(email, 'email');
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className={`glassmorphism rounded-3xl p-6 md:p-8 border border-neon-blue/30 relative overflow-hidden bg-gradient-to-br from-dark-bg/90 via-purple-950/20 to-dark-bg ${compact ? 'max-w-xl' : 'w-full'}`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 text-neon-blue text-xs font-heading uppercase tracking-widest mb-1">
            <Sparkles size={14} className="animate-pulse" />
            <span>Direct Team Access</span>
          </div>
          <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight">{title}</h3>
          <p className="text-gray-400 text-xs md:text-sm font-body mt-1">{subtitle}</p>
        </div>
      </div>

      {/* WhatsApp Scan & Direct Link Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-black/80 to-emerald-950/60 border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative group cursor-pointer" onClick={() => setShowQrModal(true)}>
            <img 
              src={qrCodeImageUrl} 
              alt="WhatsApp QR Code - Cornelius Howe" 
              className="w-20 h-20 rounded-xl border-2 border-emerald-400 bg-white p-1 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <QrCode size={20} className="text-emerald-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-[10px] font-heading uppercase tracking-wider">
              <QrCode size={12} />
              <span>Scan or Click QR Code</span>
            </div>
            <h4 className="text-sm font-heading font-bold text-white mt-0.5">Send Cornelius Howe a message on WhatsApp</h4>
            <p className="text-xs text-gray-400 font-mono mt-0.5">{whatsappDirectLink}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <a
            href={whatsappDirectLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 md:flex-initial py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
          >
            <MessageCircle size={15} />
            <span>Open WhatsApp</span>
            <ExternalLink size={13} />
          </a>
          <button
            onClick={() => setShowQrModal(!showQrModal)}
            className="p-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl transition-colors"
            title="Enlarge QR Code"
          >
            <QrCode size={18} />
          </button>
        </div>
      </div>

      {/* QR Code Lightbox Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setShowQrModal(false)}>
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-[0_0_50px_rgba(16,185,129,0.3)]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-heading uppercase tracking-widest text-emerald-400">WhatsApp QR Code</span>
              <button onClick={() => setShowQrModal(false)} className="text-gray-400 hover:text-white text-lg font-bold">✕</button>
            </div>
            <div className="bg-white p-4 rounded-2xl border-4 border-emerald-500 inline-block">
              <img src={qrCodeImageUrl} alt="WhatsApp QR Code" className="w-56 h-56 mx-auto" />
            </div>
            <p className="text-xs text-gray-300 font-body">Scan with your phone camera to send Cornelius Howe a message on WhatsApp directly.</p>
            <a
              href={whatsappDirectLink}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <span>Open Direct Link</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}

      {emailStatusMessage && (
        <div className={`mb-4 p-3 rounded-xl border text-xs font-body flex items-center justify-between ${
          emailStatusMessage.type === 'error' 
            ? 'bg-red-950/80 border-red-500/50 text-red-200' 
            : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
        }`}>
          <span>{emailStatusMessage.text}</span>
          <button onClick={() => setEmailStatusMessage(null)} className="ml-2 font-bold hover:text-white">✕</button>
        </div>
      )}

      {/* Direct Communication Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* WhatsApp Channel */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-400/60 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <MessageCircle size={22} />
              </div>
              <div>
                <span className="text-[10px] font-heading uppercase tracking-widest text-emerald-400 block">WhatsApp Direct</span>
                <span className="text-sm font-mono text-white font-bold">{phone}</span>
              </div>
            </div>
            <button 
              onClick={() => copyToClipboard(phone, 'phone')}
              className="text-gray-400 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-emerald-500/10 transition-colors"
              title="Copy WhatsApp Number"
            >
              {copiedField === 'phone' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>
          <button
            onClick={handleWhatsAppClick}
            className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95"
          >
            <span>Text on WhatsApp</span>
            <ExternalLink size={14} />
          </button>
        </div>

        {/* Email Channel */}
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400/60 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Mail size={22} />
              </div>
              <div>
                <span className="text-[10px] font-heading uppercase tracking-widest text-cyan-400 block">Email Direct</span>
                <span className="text-xs font-mono text-white font-bold truncate max-w-[150px] sm:max-w-[180px] block">{email}</span>
              </div>
            </div>
            <button 
              onClick={() => copyToClipboard(email, 'email')}
              className="text-gray-400 hover:text-cyan-400 p-1.5 rounded-lg hover:bg-cyan-500/10 transition-colors"
              title="Copy Email Address"
            >
              {copiedField === 'email' ? <CheckCircle2 size={16} className="text-cyan-400" /> : <Copy size={16} />}
            </button>
          </div>
          <button
            onClick={handleEmailClick}
            className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-95"
          >
            <span>Send Email Direct</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Quick Custom Message Composer */}
      <div className="space-y-3 pt-2 border-t border-white/10">
        <label className="text-[10px] font-heading uppercase tracking-widest text-gray-400 block">
          Compose Direct Message to Cornelius TEC Team:
        </label>
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Type your message here... e.g. Hello Cornelius TEC, I'd like to ask about your services or collaborate!"
          rows={3}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-all resize-none font-body"
        />
        
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-heading text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 border border-emerald-400/30"
          >
            <MessageCircle size={15} />
            <span>Send via WhatsApp (+250796569416)</span>
          </button>

          <button
            onClick={handleEmailClick}
            className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-heading text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 border border-purple-400/30"
          >
            <Mail size={15} />
            <span>Send via Email (corneliustch@gmail.com)</span>
          </button>
        </div>
      </div>
    </div>
  );
};


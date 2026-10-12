import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Image as ImageIcon, 
  Loader2, 
  History, 
  Terminal as TerminalIcon, 
  Trash2, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Camera, 
  Layers, 
  Maximize2, 
  X,
  AlertTriangle,
  Zap,
  RefreshCw
} from 'lucide-react';
import { designLabAPI } from '../api';

interface VisionArchive {
  id: string;
  prompt: string;
  enhancedPrompt?: string;
  geminiRefinedPrompt?: string;
  url: string;
  style: string;
  aspectRatio: string;
  routedModel: string;
  timestamp: Date;
}

export const DesignLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<string>('photorealistic');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [engine, setEngine] = useState<string>('gemini-flash');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<VisionArchive | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const [archive, setArchive] = useState<VisionArchive[]>([]);
  const [logs, setLogs] = useState<string[]>([
    "Gemini 2.5 Realism Engine initialized.",
    "Connected to Google Gemini & Nano Banana Flux Cluster.",
    "Ready for high-fidelity photorealistic image synthesis."
  ]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 15));
  };

  const stylePresets = [
    { id: 'photorealistic', name: 'Photorealistic 8K', icon: '📸', desc: 'Hasselblad 85mm lens, natural daylight & 8K skin clarity' },
    { id: 'studio-portrait', name: 'Studio Portrait', icon: '👤', desc: 'Softbox diffuser, rim light, ultra-sharp facial focus' },
    { id: 'cinematic', name: 'Cinematic Movie', icon: '🎬', desc: '35mm anamorphic lens, volumetric lighting, film grade' },
    { id: 'afro-futuristic', name: 'Afro-Futuristic', icon: '🌌', desc: 'Glowing metallic patterns & futuristic African elegance' },
    { id: 'architectural', name: '8K Architecture', icon: '🏛️', desc: 'Ray-traced glass facades, golden hour sunlight' },
    { id: 'digital-art', name: 'Digital Concept', icon: '🎨', desc: 'Octane render style, rich vibrant color palette' },
  ];

  const aspectRatios = [
    { id: '16:9', label: '16:9', desc: 'Landscape / HD Banner' },
    { id: '1:1', label: '1:1', desc: 'Square / Social' },
    { id: '9:16', label: '9:16', desc: 'Portrait / Mobile' },
    { id: '4:3', label: '4:3', desc: 'Studio Display' },
    { id: '21:9', label: '21:9', desc: 'Ultrawide Cinema' },
  ];

  const samplePrompts = [
    "A young African boy walking along a cobblestone Kigali street in golden hour sunlight, detailed jacket, photorealistic 8k portrait",
    "Afro-futuristic glass skyscraper with glowing gold lattice pattern overlooking a sunset city skyline",
    "Studio portrait of a graceful African queen in royal indigo and gold attire with soft rim lighting",
    "Cyberpunk electric sports car driving on a rain-slick Monrovia boulevard with neon reflections"
  ];

  // Prompt enhancer for realistic prompt expansion
  const enhancePromptForRealism = () => {
    if (!prompt.trim()) {
      setError("Please enter a basic prompt first to enhance.");
      return;
    }

    const current = prompt.trim();
    let enhancedText = current;

    if (style === 'photorealistic') {
      enhancedText = `A photorealistic 8k master photograph of ${current}, captured on Hasselblad H6D-100c with 85mm f/1.4 lens, natural golden hour lighting, skin subsurface scattering, realistic pore texture, cinematic depth of field, award-winning National Geographic style clarity.`;
    } else if (style === 'studio-portrait') {
      enhancedText = `Ultra-detailed 8k professional studio portrait of ${current}, dramatic softbox lighting, crisp rim light backlight, tack-sharp eye clarity, realistic facial skin texture, shallow f/1.8 depth of field, Vogue cover photography style.`;
    } else if (style === 'cinematic') {
      enhancedText = `Cinematic 35mm movie still screenshot of ${current}, anamorphic lens flare, volumetric haze lighting, rich dark cinematic color grade, 8k resolution, photorealistic film grain, Panavision camera quality.`;
    } else if (style === 'afro-futuristic') {
      enhancedText = `Afro-futuristic masterpiece of ${current}, regal African architectural & fashion motifs, glowing metallic gold geometry, vibrant neon lighting, photorealistic 8k ray-tracing, rich ambient occlusion.`;
    } else if (style === 'architectural') {
      enhancedText = `Photorealistic 8k architectural photograph of ${current}, golden hour sunlight, glass facades with ray-traced reflections, lush surrounding landscape, Architectural Digest cover quality, ultra-sharp detail.`;
    } else {
      enhancedText = `Hyper-realistic 8k visual concept of ${current}, cinematic volumetric lighting, octane render, vivid color saturation, ray-traced ambient lighting, flawless detail.`;
    }

    setPrompt(enhancedText);
    addLog("✨ Enhanced prompt with Gemini Realism parameters.");
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Input Error: Prompt cannot be empty.");
      return;
    }

    const cleanPrompt = prompt.trim();
    setIsGenerating(true);
    setError(null);
    addLog(`Initiating Image Synthesis | Engine: ${engine} | Style: ${style} | Ratio: ${aspectRatio}`);

    try {
      const response = await designLabAPI.generate(cleanPrompt, {
        style,
        aspectRatio,
        engine,
        enhanced: true
      });

      const data = response.data;
      if (!data || !data.success || !data.url) {
        throw new Error(data?.error || "Image generation engine failed to return image data.");
      }

      const newArchiveItem: VisionArchive = {
        id: Date.now().toString(),
        prompt: cleanPrompt,
        enhancedPrompt: data.enhancedPrompt,
        geminiRefinedPrompt: data.geminiRefinedPrompt,
        url: data.url,
        style: data.style || style,
        aspectRatio: data.aspectRatio || aspectRatio,
        routedModel: data.routedModel || 'Gemini 2.5 Vision AI',
        timestamp: new Date()
      };

      setGeneratedImage(newArchiveItem);
      setArchive(prev => [newArchiveItem, ...prev]);
      addLog(`Image synthesis complete | Model: ${data.routedModel}`);
    } catch (err: any) {
      console.error("[Design Lab Error]", err);
      const msg = err?.response?.data?.error || err?.message || "Generation error. Please check your prompt parameters.";
      setError(msg);
      addLog(`ERROR: ${msg}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPromptToClipboard = () => {
    if (generatedImage?.prompt) {
      navigator.clipboard.writeText(generatedImage.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addLog("Downloaded high-resolution image asset.");
  };

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-4">
      {/* Lightbox Preview Modal */}
      {lightboxUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxUrl(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-all"
            >
              <X size={20} />
            </button>
            <img 
              src={lightboxUrl} 
              alt="Enlarged Vision" 
              className="max-h-[80vh] w-auto object-contain rounded-2xl border border-white/20 shadow-2xl" 
            />
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => downloadImage(lightboxUrl, `gemini-vision-${Date.now()}.png`)}
                className="px-6 py-2.5 bg-neon-blue text-dark-bg font-heading text-xs uppercase tracking-wider rounded-xl font-bold flex items-center space-x-2 hover:scale-105 transition-all"
              >
                <Download size={16} />
                <span>Download Full 8K Image</span>
              </button>
              <a
                href={lightboxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-white/10 text-white font-heading text-xs uppercase tracking-wider rounded-xl border border-white/20 flex items-center space-x-2 hover:bg-white/20 transition-all"
              >
                <ExternalLink size={16} />
                <span>Open Raw Image</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Control Column */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-28 space-y-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 glassmorphism border border-neon-blue/30 rounded-full mb-3">
              <Zap size={14} className="text-neon-blue animate-pulse" />
              <span className="text-neon-blue font-heading text-[10px] tracking-[0.3em] uppercase">Gemini 2.5 Realism Engine v3.5</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl tracking-tight">
              AI <span className="text-neon-purple text-shadow-purple">VISION</span> LAB
            </h1>
            <p className="text-gray-400 text-xs mt-2">
              Generate ultra-realistic 8K photorealistic imagery, studio portraits, and architectural concepts.
            </p>
          </div>

          <div className="glassmorphism p-6 sm:p-7 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-5">
            {/* Style Selector */}
            <div>
              <label className="block text-[10px] font-heading text-gray-300 uppercase tracking-widest mb-2 flex items-center space-x-1.5">
                <Camera size={13} className="text-neon-blue" />
                <span>Photographic Style Preset</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {stylePresets.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      style === s.id
                        ? 'bg-neon-blue/15 border-neon-blue text-white shadow-[0_0_15px_rgba(0,207,255,0.25)]'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1">
                      <span className="text-sm">{s.icon}</span>
                      <span className="text-xs font-heading font-semibold tracking-wide text-white">{s.name}</span>
                    </div>
                    <span className="text-[9px] text-gray-400 line-clamp-1">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-[10px] font-heading text-gray-300 uppercase tracking-widest mb-2 flex items-center space-x-1.5">
                <Layers size={13} className="text-amber-400" />
                <span>Aspect Ratio Format</span>
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {aspectRatios.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAspectRatio(a.id)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                      aspectRatio === a.id
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-mono block">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Engine Model Selection */}
            <div>
              <label className="block text-[9px] font-heading text-gray-400 uppercase tracking-widest mb-1.5">
                AI Synthesis Engine
              </label>
              <select
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neon-blue"
              >
                <option value="gemini-flash">Google Gemini 2.5 Flash Vision (Hyper-Realistic)</option>
                <option value="banana-pro">Nano Banana Flux AI 8K Generator</option>
              </select>
            </div>

            {/* Prompt Input Area */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-heading text-gray-300 uppercase tracking-widest">
                  Prompt Details
                </label>
                <button
                  type="button"
                  onClick={enhancePromptForRealism}
                  className="text-[10px] text-neon-blue hover:text-amber-300 font-mono flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <Sparkles size={12} />
                  <span>✨ Enhance Prompt for Realism</span>
                </button>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Describe your vision (e.g., A young boy walking down a cobblestone street in golden hour sunlight...)"
                className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-xs font-body text-white focus:outline-none focus:border-neon-blue transition-all min-h-[110px] resize-none shadow-inner"
              />
              <div className="flex justify-between items-center mt-1 text-[10px] text-gray-500 font-mono">
                <span>Supports natural language & detailed camera angles</span>
                <span>{prompt.length}/2000</span>
              </div>
            </div>

            {/* Quick Prompt Suggestions */}
            <div>
              <span className="text-[9px] font-heading text-gray-400 uppercase tracking-widest block mb-1.5">
                Sample Realism Prompts
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((sp, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(sp);
                      if (error) setError(null);
                    }}
                    className="text-[10px] text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg text-left truncate max-w-[200px] transition-colors"
                  >
                    "{sp.slice(0, 25)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2 animate-fade-in">
                <AlertTriangle size={15} className="text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full font-heading py-4 bg-gradient-to-r from-neon-blue via-blue-500 to-neon-purple text-dark-bg font-bold rounded-2xl flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_25px_rgba(0,207,255,0.4)] disabled:opacity-30 cursor-pointer text-xs uppercase tracking-widest"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>SYNTHESIZING 8K REALISM VISION...</span>
                </>
              ) : (
                <>
                  <Wand2 size={18} />
                  <span>GENERATE REALISTIC IMAGE</span>
                </>
              )}
            </button>
          </div>

          {/* Telemetry Log */}
          <div className="glassmorphism p-4 rounded-2xl border border-white/5 bg-black/60 font-mono text-[10px]">
             <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 text-gray-400">
                  <TerminalIcon size={12} className="text-neon-blue" />
                  <span className="uppercase tracking-widest font-bold">Neural Engine Status</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
             </div>
             <div className="space-y-1 max-h-28 overflow-y-auto custom-scrollbar">
                {logs.map((log, i) => (
                  <div key={i} className="text-gray-300 leading-tight">
                    <span className="text-neon-blue mr-1">&gt;</span>{log}
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Output Column */}
        <div className="w-full lg:w-7/12 space-y-8">
          {/* Main Visual Display Stage */}
          <div className="relative min-h-[500px] glassmorphism rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl bg-black/60 flex flex-col justify-between">
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-8 text-center bg-black/80 z-20">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-4 border-neon-blue/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-neon-blue rounded-full animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto text-amber-400 animate-pulse" size={28} />
                </div>
                <p className="font-heading text-xs text-neon-blue tracking-[0.4em] uppercase animate-pulse">
                  Rendering 8K Gemini Photorealism
                </p>
                <p className="text-[11px] text-gray-400 font-mono max-w-sm">
                  Calculating Hasselblad lens physics, subsurface light scattering & ray-tracing details...
                </p>
              </div>
            ) : null}

            {generatedImage ? (
              <div className="relative w-full h-full flex flex-col group">
                {/* Header Metadata Bar */}
                <div className="p-4 bg-black/80 border-b border-white/10 flex justify-between items-center text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-neon-blue font-bold uppercase">{generatedImage.routedModel}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-amber-400">{generatedImage.aspectRatio}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-300 capitalize">{generatedImage.style}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setLightboxUrl(generatedImage.url)}
                      className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center space-x-1 text-[10px]"
                      title="Inspect Full Screen"
                    >
                      <Maximize2 size={13} />
                      <span className="hidden sm:inline">Inspect</span>
                    </button>
                  </div>
                </div>

                {/* Main Rendered Image */}
                <div className="relative w-full min-h-[420px] bg-black flex items-center justify-center overflow-hidden">
                  <img 
                    src={generatedImage.url} 
                    alt={generatedImage.prompt} 
                    className="w-full h-full object-contain max-h-[600px] cursor-pointer hover:scale-[1.01] transition-transform duration-300" 
                    onClick={() => setLightboxUrl(generatedImage.url)}
                  />
                </div>

                {/* Footer Controls & Prompt Details */}
                <div className="p-5 bg-black/90 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div>
                        <span className="text-[9px] font-heading text-neon-blue uppercase tracking-widest block mb-0.5">
                          Original User Prompt
                        </span>
                        <p className="text-xs text-gray-200 font-body leading-relaxed">
                          {generatedImage.prompt}
                        </p>
                      </div>

                      {generatedImage.geminiRefinedPrompt && (
                        <div className="p-2.5 rounded-xl bg-neon-blue/10 border border-neon-blue/20">
                          <span className="text-[9px] font-heading text-amber-300 uppercase tracking-widest block mb-0.5 flex items-center space-x-1">
                            <Sparkles size={11} className="text-amber-400" />
                            <span>Gemini Photorealistic Camera Direction</span>
                          </span>
                          <p className="text-[11px] text-gray-300 font-mono italic leading-relaxed">
                            "{generatedImage.geminiRefinedPrompt}"
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={copyPromptToClipboard}
                        className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl transition-all flex items-center space-x-1.5 border border-white/10"
                        title="Copy Prompt"
                      >
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        <span className="font-mono text-[10px]">{copied ? "Copied" : "Copy"}</span>
                      </button>

                      <button
                        onClick={() => downloadImage(generatedImage.url, `gemini-vision-${Date.now()}.png`)}
                        className="px-4 py-2 bg-neon-blue text-dark-bg font-heading text-xs uppercase tracking-wider rounded-xl font-bold flex items-center space-x-1.5 hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,207,255,0.4)]"
                      >
                        <Download size={14} />
                        <span>Download 8K</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Standby State */
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-40">
                <ImageIcon size={64} className="text-neon-blue mb-4 animate-pulse" />
                <h3 className="font-heading text-sm uppercase tracking-widest text-white mb-2">AI Studio Realism Canvas Standby</h3>
                <p className="text-xs font-mono text-gray-400 max-w-md leading-relaxed">
                  Enter your prompt in the control panel, choose a photographic style preset and aspect ratio, then click Generate to create ultra-realistic visual assets.
                </p>
              </div>
            )}
          </div>

          {/* Neural Archive History */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <History size={18} className="text-neon-purple" />
                <h3 className="font-heading text-xl uppercase tracking-widest">Vision Archive</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
                  {archive.length} assets saved
                </span>
              </div>

              {archive.length > 0 && (
                <button 
                  onClick={() => {
                    setArchive([]);
                    addLog("Vision archive cleared.");
                  }} 
                  className="text-gray-500 hover:text-red-400 transition-colors flex items-center space-x-1 text-xs font-mono uppercase"
                >
                  <Trash2 size={13} />
                  <span>Clear History</span>
                </button>
              )}
            </div>

            {archive.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {archive.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => {
                      setGeneratedImage(entry);
                      setPrompt(entry.prompt);
                      setStyle(entry.style);
                      setAspectRatio(entry.aspectRatio);
                    }}
                    className="group relative aspect-video glassmorphism rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-neon-blue/60 transition-all p-1.5"
                  >
                    <img 
                      src={entry.url} 
                      alt={entry.prompt} 
                      className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" 
                    />
                    
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/80 backdrop-blur-md text-amber-400 border border-amber-400/30 text-[9px] font-mono font-bold rounded uppercase">
                      {entry.aspectRatio}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                      <p className="text-[10px] text-white font-body truncate uppercase tracking-wider">{entry.prompt}</p>
                      <span className="text-neon-blue text-[9px] font-heading mt-0.5">RECALL VISION</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center glassmorphism rounded-2xl border border-white/5 text-gray-500 text-xs font-mono">
                No archived vision renders yet. Generated images will automatically store here.
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 207, 255, 0.3); border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default DesignLab;

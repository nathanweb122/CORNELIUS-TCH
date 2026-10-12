import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Layout, Terminal, CreditCard, UserPlus } from 'lucide-react';

const AETHER_HOME_HTML = `<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>AetherAI Editor Suite | Architecting the Future of Content</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                "tertiary-container": "#8be7ff",
                "primary": "#dbfcff",
                "secondary-fixed": "#e9ddff",
                "secondary": "#d0bcff",
                "on-primary": "#00363a",
                "surface": "#0b1326",
                "primary-fixed-dim": "#00dbe9",
                "on-error-container": "#ffdad6",
                "on-primary-fixed-variant": "#004f54",
                "on-background": "#dae2fd",
                "surface-container-low": "#131b2e",
                "surface-dim": "#0b1326",
                "secondary-container": "#571bc1",
                "secondary-fixed-dim": "#d0bcff",
                "tertiary-fixed-dim": "#4cd7f6",
                "surface-container-lowest": "#060e20",
                "surface-tint": "#00dbe9",
                "surface-bright": "#31394d",
                "on-tertiary-fixed-variant": "#004e5c",
                "outline-variant": "#3b494b",
                "on-secondary-fixed-variant": "#5516be",
                "error": "#ffb4ab",
                "outline": "#849495",
                "on-surface": "#dae2fd",
                "on-error": "#690005",
                "surface-variant": "#2d3449",
                "surface-container-high": "#222a3d",
                "inverse-surface": "#dae2fd",
                "error-container": "#93000a",
                "background": "#0b1326",
                "on-secondary-container": "#c4abff",
                "primary-container": "#00f0ff",
                "on-secondary": "#3c0091",
                "on-tertiary-fixed": "#001f26",
                "primary-fixed": "#7df4ff",
                "on-tertiary-container": "#00687a",
                "on-primary-container": "#006970",
                "on-tertiary": "#003640",
                "surface-container": "#171f33",
                "tertiary": "#e7f9ff",
                "inverse-on-surface": "#283044"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "unit": "4px",
                "margin-mobile": "16px",
                "bento-gap": "12px",
                "gutter": "24px",
                "margin-desktop": "40px"
            },
            "fontFamily": {
                "headline-md": ["Space Grotesk"],
                "body-lg": ["Inter"],
                "display-lg": ["Space Grotesk"],
                "body-md": ["Inter"],
                "display-lg-mobile": ["Space Grotesk"],
                "label-sm": ["JetBrains Mono"]
            },
            "fontSize": {
                "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500"}]
            }
          }
        }
      }
    </script>
<style>
        body {
            background-color: #020617;
            color: #dae2fd;
            overflow-x: hidden;
            font-family: 'Inter', sans-serif;
        }
        .surface_glass {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .data-glow-primary {
            box-shadow: 0 0 20px rgba(0, 219, 233, 0.15);
        }
        .data-glow-secondary {
            box-shadow: 0 0 20px rgba(208, 188, 255, 0.15);
        }
        .neon-underglow:hover {
            box-shadow: 0 10px 30px -10px rgba(0, 219, 233, 0.3);
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
        }
        .ai-pulse {
            animation: pulse-slow 3s infinite ease-in-out;
        }
        .gradient-text {
            background: linear-gradient(135deg, #dbfcff 0%, #d0bcff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .gradient-button {
            background: linear-gradient(135deg, #00dbe9 0%, #571bc1 100%);
        }
    </style>
</head>
<body class="font-body-md text-on-background selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
<!-- Top Navigation Bar -->
<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,219,233,0.1)]">
<nav class="flex justify-between items-center h-16 px-margin-desktop max-w-screen-2xl mx-auto">
<div class="flex items-center gap-2 cursor-pointer" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'home'}, '*')">
<span class="material-symbols-outlined text-primary text-3xl" style="font-variation-settings: 'FILL' 1;">cloud_done</span>
<span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">AetherAI</span>
</div>
<div class="hidden md:flex items-center gap-8 font-body-md text-body-md">
<a class="text-primary border-b-2 border-primary pb-1" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">Tools</a>
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">Features</a>
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'pricing'}, '*'); return false;">Pricing</a>
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'home'}, '*'); return false;">About</a>
</div>
<div class="flex items-center gap-4">
<button class="hidden sm:block text-on-surface-variant hover:text-primary font-body-md transition-colors active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Log In</button>
<button class="gradient-button text-on-primary px-6 py-2 rounded-full font-bold shadow-lg transition-transform active:scale-95 hover:brightness-110" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Get Started</button>
</div>
</nav>
</header>
<main class="relative pt-16">
<!-- Hero Section -->
<section class="relative min-h-[921px] flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop">
<!-- Animated Background -->
<div class="absolute inset-0 z-0">

</div>
<div class="relative z-10 text-center max-w-4xl mx-auto">
<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-6">
<span class="w-2 h-2 rounded-full bg-primary-fixed-dim ai-pulse"></span>
<span class="font-label-sm text-label-sm text-primary uppercase tracking-widest">Next-Gen Intelligence Active</span>
</div>
<h1 class="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
                    Architecting the <span class="gradient-text">Future of Content</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
                    AetherAI is the professional command center for digital creators. Seamlessly orchestrate text, image, video, and code within a single, unified computational environment.
                </p>
<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
<button class="gradient-button text-on-primary px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 shadow-[0_0_30px_rgba(0,219,233,0.3)] transition-all hover:-translate-y-1 active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">
                        Start Creating Free
                        <span class="material-symbols-outlined">bolt</span>
</button>
<button class="surface_glass text-on-surface px-8 py-4 rounded-xl font-medium flex items-center gap-2 border border-white/10 hover:bg-white/10 transition-all active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*')">
                        View Showreel
                        <span class="material-symbols-outlined">play_circle</span>
</button>
</div>
</div>
</section>
<!-- Bento Grid Feature Showcase -->
<section class="py-24 px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto">
<div class="grid grid-cols-1 md:grid-cols-12 gap-bento-gap auto-rows-[280px]">
<!-- Main Tools: Text -->
<div class="md:col-span-8 surface_glass rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative cursor-pointer" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*')">
<div class="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all duration-500"></div>
<div>
<div class="flex items-center gap-3 mb-4">
<div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined">edit_note</span>
</div>
<span class="font-label-sm text-label-sm text-primary uppercase tracking-wider">Linguistic Engine</span>
</div>
<h3 class="font-headline-md text-headline-md mb-2">Omniscient Text Editor</h3>
<p class="text-on-surface-variant max-w-md">Rewrite, expand, and structure complex narratives with real-time semantic analysis and recursive logic checks.</p>
</div>
<div class="flex items-center gap-4">
<span class="px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-400 font-label-sm text-[10px]">CREATIVE</span>
<span class="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 font-label-sm text-[10px]">SEMANTIC</span>
</div>
</div>
<!-- Main Tools: Code -->
<div class="md:col-span-4 surface_glass rounded-3xl p-8 flex flex-col justify-between hover:border-primary/40 transition-all group cursor-pointer" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*')">
<div class="flex items-center gap-3 mb-4">
<div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined">terminal</span>
</div>
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Logic Suite</span>
</div>
<h3 class="font-headline-md text-headline-md mb-2">Neural Code</h3>
<p class="text-on-surface-variant">Instant debugging and architectural mapping for modern frameworks.</p>
<div class="mt-4 pt-4 border-t border-white/5">
<div class="flex justify-between items-center text-on-surface-variant font-label-sm text-[11px]">
<span>Syntax Accuracy</span>
<span class="text-secondary">99.8%</span>
</div>
<div class="w-full bg-white/5 h-1 mt-2 rounded-full overflow-hidden">
<div class="bg-secondary h-full w-[99%]"></div>
</div>
</div>
</div>
<!-- Main Tools: Image -->
<div class="md:col-span-4 surface_glass rounded-3xl overflow-hidden relative group cursor-pointer" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*')">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCVW4-_-E0aTQJNU2x4xcyAkYVmwHnDSRlY3SGSWGeocyxey12Ys9g07GBj6UfV8-AA7lYfwsOQ6wmpUR1vVvnBL5YYNZV_UF3ovIDcfqLdMkJ_rH1AUdAhnUCCGMc-ackAN2p2dTafa-rPJEVQzYoyuQhMlV-7depbzfG_s9_5yavbEUxdyZR6kbpwRxIkoik6PGjmEubExlRVgczqcDvBHEuTn0DbO7w_jjABlTTf5-lnlcGBRQUOH5wAQkROM8swDDF5WhRYNmo')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80"></div>
<div class="absolute inset-0 p-8 flex flex-col justify-end">
<div class="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-4">
<span class="material-symbols-outlined">palette</span>
</div>
<h3 class="font-headline-md text-headline-md mb-2 text-white">Visual Synthesizer</h3>
<p class="text-white/70 font-body-md text-sm">Text-to-render pipeline with spatial consistency control.</p>
</div>
</div>
<!-- Main Tools: Video -->
<div class="md:col-span-8 surface_glass rounded-3xl p-8 flex items-center justify-between group cursor-pointer" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*')">
<div class="max-w-md">
<div class="flex items-center gap-3 mb-4">
<div class="w-10 h-10 rounded-lg bg-primary-fixed-dim/10 flex items-center justify-center text-primary-fixed-dim">
<span class="material-symbols-outlined">movie_filter</span>
</div>
<span class="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider">Temporal Studio</span>
</div>
<h3 class="font-headline-md text-headline-md mb-2">Temporal Director</h3>
<p class="text-on-surface-variant">Direct cinematic sequences with zero-shot frame interpolation. Control lighting, camera movement, and character consistency through precise prompt sculpting.</p>
<button class="mt-6 flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                            Explore Video Suite
                            <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<div class="hidden lg:block w-1/3 aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
<div class="absolute inset-0 flex items-center justify-center bg-black/40">
<span class="material-symbols-outlined text-white text-4xl">play_arrow</span>
</div>
</div>
</div>
</div>
</section>
<!-- Dynamic Workspace Preview -->
<section class="py-24 bg-surface-container-lowest/50 relative overflow-hidden">
<div class="max-w-screen-2xl mx-auto px-margin-mobile md:px-margin-desktop">
<div class="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
<div class="max-w-2xl">
<h2 class="font-display-lg text-display-lg-mobile md:text-display-lg mb-4">One Unified <span class="gradient-text">Command Center</span></h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">No more jumping between tabs. Our workspace stacks your tools into a single coherent flow, powered by a unified AI context that knows exactly what you're building.</p>
</div>
<div class="flex gap-4">
<div class="p-4 rounded-2xl surface_glass text-center min-w-[120px]">
<div class="text-primary font-headline-md text-2xl">500+</div>
<div class="text-on-surface-variant font-label-sm">INTEGRATIONS</div>
</div>
<div class="p-4 rounded-2xl surface_glass text-center min-w-[120px]">
<div class="text-secondary font-headline-md text-2xl">0.2s</div>
<div class="text-on-surface-variant font-label-sm">LATENCY</div>
</div>
</div>
</div>
<!-- Interface Mockup (Glassmorphic) -->
<div class="w-full aspect-[16/9] surface_glass rounded-3xl border border-white/10 shadow-2xl p-4 md:p-8 overflow-hidden relative">
<div class="flex gap-4 h-full">
<!-- Sidebar -->
<div class="hidden md:flex flex-col gap-6 w-16 items-center py-4 border-r border-white/5">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">grid_view</span>
<span class="material-symbols-outlined text-on-surface-variant">layers</span>
<span class="material-symbols-outlined text-on-surface-variant">auto_fix_high</span>
<span class="material-symbols-outlined text-on-surface-variant">database</span>
<div class="mt-auto">
<span class="material-symbols-outlined text-on-surface-variant">settings</span>
</div>
</div>
<!-- Canvas area -->
<div class="flex-1 flex flex-col gap-6">
<div class="flex items-center justify-between">
<div class="flex items-center gap-4">
<span class="font-label-sm text-on-surface">PROJECT_AETHER_V4</span>
<span class="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">LIVE</span>
</div>
<div class="flex items-center gap-2">
<div class="w-24 h-2 bg-white/10 rounded-full">
<div class="h-full w-2/3 bg-primary rounded-full"></div>
</div>
<span class="font-label-sm text-[10px] text-on-surface-variant">PROCESSING</span>
</div>
</div>
<div class="flex-1 grid grid-cols-12 gap-4">
<div class="col-span-8 bg-surface-container/50 rounded-xl border border-white/5 relative overflow-hidden">
<div class="absolute bottom-4 left-4 right-4 h-12 surface_glass rounded-lg flex items-center px-4 gap-4">
<span class="material-symbols-outlined text-primary text-sm">magic_button</span>
<div class="text-xs text-primary/50 font-label-sm">Prompt: Enhance cinematic lighting and add atmospheric fog...</div>
</div>
</div>
<div class="col-span-4 flex flex-col gap-4">
<div class="flex-1 bg-surface-container/50 rounded-xl border border-white/5 p-4">
<div class="font-label-sm text-xs text-on-surface-variant mb-4 flex items-center justify-between">
                                            CONSOLE
                                            <span class="material-symbols-outlined text-[14px]">expand_content</span>
</div>
<div class="space-y-2">
<div class="h-3 w-3/4 bg-white/5 rounded"></div>
<div class="h-3 w-1/2 bg-white/5 rounded"></div>
<div class="h-3 w-5/6 bg-white/10 rounded"></div>
<div class="h-3 w-2/3 bg-white/5 rounded"></div>
</div>
</div>
<div class="h-32 bg-secondary/5 rounded-xl border border-secondary/20 p-4">
<div class="flex items-center gap-2 text-secondary mb-2">
<span class="material-symbols-outlined text-sm">bolt</span>
<span class="font-label-sm text-xs">AI SUGGESTION</span>
</div>
<p class="text-[10px] text-secondary/80">Optimization found in line 442. Shift to asynchronous loading?</p>
<button class="mt-2 w-full py-1.5 rounded bg-secondary text-on-secondary font-label-sm text-[10px] font-bold">APPLY PATCH</button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Final CTA -->
<section class="py-32 px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden">
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
<div class="relative z-10 max-w-2xl mx-auto">
<h2 class="font-display-lg text-display-lg-mobile md:text-display-lg mb-6">Ready to <span class="gradient-text">Architect?</span></h2>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-10">Join 50,000+ creators building the next generation of digital assets with AetherAI.</p>
<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
<button class="gradient-button text-on-primary px-10 py-4 rounded-xl font-bold text-xl shadow-[0_0_30px_rgba(0,219,233,0.3)] hover:scale-105 transition-all active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Get Started Now</button>
<button class="px-10 py-4 rounded-xl font-bold text-xl border border-white/10 hover:bg-white/5 transition-all" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'pricing'}, '*')">Talk to Sales</button>
</div>
<p class="mt-8 font-label-sm text-label-sm text-on-surface-variant/60">No credit card required. Free tier includes 100 neural credits/mo.</p>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface-container-lowest border-t border-white/5 w-full py-12">
<div class="grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-desktop max-w-screen-2xl mx-auto">
<div class="col-span-2 md:col-span-1 flex flex-col gap-4">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings: 'FILL' 1;">cloud_done</span>
<span class="font-headline-md text-headline-md font-bold text-primary">AetherAI</span>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant max-w-xs">
                    The next-generation editor suite for high-performance creative workflows.
                </p>
</div>
<div>
<h4 class="font-label-sm text-primary mb-4 uppercase tracking-widest">Platform</h4>
<ul class="space-y-2 font-label-sm text-on-surface-variant">
<li><a class="hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">Documentation</a></li>
<li><a class="hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">API Reference</a></li>
<li><a class="hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'pricing'}, '*'); return false;">Pricing Matrix</a></li>
</ul>
</div>
<div>
<h4 class="font-label-sm text-primary mb-4 uppercase tracking-widest">Legal</h4>
<ul class="space-y-2 font-label-sm text-on-surface-variant">
<li><a class="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
</ul>
</div>
<div>
<h4 class="font-label-sm text-primary mb-4 uppercase tracking-widest">Connect</h4>
<ul class="space-y-2 font-label-sm text-on-surface-variant">
<li><a class="hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*'); return false;">Join Beta Community</a></li>
</ul>
</div>
</div>
<div class="max-w-screen-2xl mx-auto px-margin-desktop mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 font-label-sm text-label-sm text-on-surface-variant/50">
<span>© 2026 AetherAI Editor Suite. All rights reserved.</span>
<div class="flex gap-6">
<span>Designed for the Future.</span>
<span class="flex items-center gap-1">System Load: <span class="text-green-500">Optimal</span></span>
</div>
</div>
</footer>
</body></html>`;

const AETHER_OVERVIEW_HTML = `<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>AetherAI | Product Overview</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<style>
        :root {
            --surface-glass: rgba(11, 19, 38, 0.6);
            --border-glass: rgba(255, 255, 255, 0.1);
        }
        body {
            background-color: #020617;
            color: #dae2fd;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        .glass-card {
            background: var(--surface-glass);
            backdrop-filter: blur(12px);
            border: 1px solid var(--border-glass);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
            border-color: rgba(219, 252, 255, 0.3);
            box-shadow: 0 0 30px rgba(87, 27, 193, 0.15);
        }
        .text-gradient-primary {
            background: linear-gradient(135deg, #dbfcff 0%, #d0bcff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .bento-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 24px;
        }
        @keyframes pulse-violet {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
        }
        .ai-pulse {
            animation: pulse-violet 3s infinite ease-in-out;
        }
    </style>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-container": "#8be7ff",
                    "primary": "#dbfcff",
                    "secondary-fixed": "#e9ddff",
                    "secondary": "#d0bcff",
                    "on-primary": "#00363a",
                    "surface": "#0b1326",
                    "primary-fixed-dim": "#00dbe9",
                    "on-error-container": "#ffdad6",
                    "on-primary-fixed-variant": "#004f54",
                    "on-background": "#dae2fd",
                    "surface-container-low": "#131b2e",
                    "surface-dim": "#0b1326",
                    "secondary-container": "#571bc1",
                    "secondary-fixed-dim": "#d0bcff",
                    "tertiary-fixed-dim": "#4cd7f6",
                    "surface-container-lowest": "#060e20",
                    "surface-tint": "#00dbe9",
                    "surface-bright": "#31394d",
                    "on-tertiary-fixed-variant": "#004e5c",
                    "outline-variant": "#3b494b",
                    "on-secondary-fixed-variant": "#5516be",
                    "error": "#ffb4ab",
                    "outline": "#849495",
                    "on-surface": "#dae2fd",
                    "on-error": "#690005",
                    "surface-variant": "#2d3449",
                    "surface-container-high": "#222a3d",
                    "inverse-surface": "#dae2fd",
                    "error-container": "#93000a",
                    "background": "#0b1326",
                    "on-secondary-container": "#c4abff",
                    "primary-container": "#00f0ff",
                    "on-secondary": "#3c0091",
                    "on-tertiary-fixed": "#001f26",
                    "primary-fixed": "#7df4ff",
                    "on-tertiary-container": "#00687a",
                    "on-primary-container": "#006970",
                    "on-tertiary": "#003640",
                    "surface-container": "#171f33",
                    "tertiary": "#e7f9ff",
                    "inverse-on-surface": "#283044"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "unit": "4px",
                    "margin-mobile": "16px",
                    "bento-gap": "12px",
                    "gutter": "24px",
                    "margin-desktop": "40px"
            },
            "fontFamily": {
                    "headline-md": ["Space Grotesk"],
                    "body-lg": ["Inter"],
                    "display-lg": ["Space Grotesk"],
                    "body-md": ["Inter"],
                    "display-lg-mobile": ["Space Grotesk"],
                    "label-sm": ["JetBrains Mono"]
            },
            "fontSize": {
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500"}]
            }
          }
        }
      }
    </script>
</head>
<body class="bg-background text-on-surface">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,219,233,0.1)]">
<div class="flex justify-between items-center h-16 px-margin-desktop max-w-screen-2xl mx-auto">
<div class="flex items-center gap-2 cursor-pointer" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'home'}, '*')">
<span class="material-symbols-outlined text-primary text-3xl" style="font-variation-settings: 'FILL' 1;">layers</span>
<span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">AetherAI</span>
</div>
<div class="hidden md:flex items-center gap-8">
<a class="font-body-md text-body-md text-primary border-b-2 border-primary pb-1" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">Tools</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">Features</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'pricing'}, '*'); return false;">Pricing</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'home'}, '*'); return false;">About</a>
</div>
<div class="flex items-center gap-4">
<button class="px-6 py-2 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-white/5 transition-all active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Log In</button>
<button class="px-6 py-2 rounded-lg font-label-sm text-label-sm bg-gradient-to-r from-primary to-secondary text-on-primary font-bold shadow-lg shadow-secondary/20 hover:brightness-110 transition-all active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Get Started</button>
</div>
</div>
</nav>
<main class="pt-24 pb-20 px-margin-desktop max-w-screen-2xl mx-auto">
<!-- Hero Section -->
<header class="mb-16 text-center md:text-left max-w-3xl">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 border border-secondary/20 mb-6">
<span class="w-2 h-2 rounded-full bg-secondary ai-pulse"></span>
<span class="font-label-sm text-label-sm text-secondary tracking-widest uppercase">Editor Suite v4.0</span>
</div>
<h1 class="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
                Computational Elegance for <span class="text-gradient-primary">Digital Creators</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                AetherAI integrates multi-modal neural networks into a unified workspace. Precision tools designed for the next generation of technical editors.
            </p>
</header>
<!-- Bento Grid Tools Breakdown -->
<div class="bento-grid">
<!-- Code Editor (Large) -->
<div class="glass-card col-span-12 md:col-span-8 rounded-xl p-8 relative overflow-hidden group">
<div class="relative z-10">
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">terminal</span>
<h2 class="font-headline-md text-headline-md">Code Editor</h2>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">
                        Real-time debugging and predictive completion. Our LLM-integrated kernel understands complex dependencies across your entire codebase.
                    </p>
<div class="flex flex-wrap gap-2 mb-8">
<span class="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-sm text-label-sm">Live Debugging</span>
<span class="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-label-sm text-label-sm">Contextual Sync</span>
</div>
</div>
<div class="absolute right-0 bottom-0 w-2/3 h-full opacity-40 group-hover:opacity-60 transition-opacity">
<div class="w-full h-full glass-card border-none rounded-tl-3xl p-4 overflow-hidden">
<pre class="font-label-sm text-label-sm text-primary/70 leading-relaxed"><span class="text-secondary">async function</span> <span class="text-primary">aetherSync</span>() {
  <span class="text-on-surface-variant">// Initializing AI core</span>
  <span class="text-secondary">const</span> response = <span class="text-secondary">await</span> ai.compute({
    model: <span class="text-primary-fixed-dim">'Aether-v4'</span>,
    stream: <span class="text-primary-fixed-dim">true</span>
  });
  
  <span class="text-on-surface-variant">// Predicting logic flow...</span>
  <span class="bg-primary/20 text-primary rounded px-1">return response.map(t => t.refactor());</span>
}</pre>
</div>
</div>
</div>
<!-- Text Editor (Medium) -->
<div class="glass-card col-span-12 md:col-span-4 rounded-xl p-8 flex flex-col justify-between">
<div>
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-secondary">edit_note</span>
<h2 class="font-headline-md text-headline-md">Text Editor</h2>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-4">
                        Context-aware generation that adapts to your unique voice and narrative arc.
                    </p>
</div>
<div class="mt-4 p-4 rounded bg-surface-container-low border border-white/5 italic font-body-md text-body-md text-on-surface/80">
                    "The silence of the machine was not empty, it was a profound <span class="text-secondary border-b border-secondary">resonance of potential..."</span>
</div>
</div>
<!-- Image Editor (Medium) -->
<div class="glass-card col-span-12 md:col-span-5 rounded-xl p-8 group flex flex-col justify-between">
<div>
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-primary-fixed-dim">image</span>
<h2 class="font-headline-md text-headline-md">Image Editor</h2>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">
                        Generative fill and neural upscaling. Seamlessly expand canvases or enhance resolution with zero artifacting.
                    </p>
</div>
<div class="mt-8 relative aspect-video rounded-lg overflow-hidden border border-white/10">
<img class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApFq7z7VE0jEZNlx0oQIJk291AfvdA0IgLrdYiHwicGqx_ptfPQZn73h20hrDnHSl4WhdgUB6iH4bZynnynflIab3EEdhQkwqNI6DcrE05TCXRr-7jA80--MvMH0hr7qJHSLaEnQckdg6MmyksH-hrM8ugqRkheRtckCDyhnVurbfJiGo69FpJsHoRApORcsB9NMjzd3M1e-FU42wz16-SHXAlTOkfEvtAUDmf4EWb2k-GEc-jsqI828QP3peYzHN8CIndQjrqzwA"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
<div class="absolute bottom-4 left-4 flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-primary/20 backdrop-blur flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-sm">auto_fix_high</span>
</div>
<span class="font-label-sm text-label-sm text-primary">AI Fill Active</span>
</div>
</div>
</div>
<!-- Video Editor (Large) -->
<div class="glass-card col-span-12 md:col-span-7 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden">
<div class="flex-1">
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-secondary">movie_edit</span>
<h2 class="font-headline-md text-headline-md">Video Editor</h2>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-6">
                        Automated clipping and transitions. Our engine analyzes footage for emotional beats and rhythmic patterns to create perfect edits.
                    </p>
<ul class="space-y-3">
<li class="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
<span class="material-symbols-outlined text-secondary text-sm">check_circle</span>
                            Beat-synced transitions
                        </li>
<li class="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
<span class="material-symbols-outlined text-secondary text-sm">check_circle</span>
                            Auto-captioning (99% accuracy)
                        </li>
<li class="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
<span class="material-symbols-outlined text-secondary text-sm">check_circle</span>
                            Semantic clip searching
                        </li>
</ul>
</div>
<div class="flex-1 w-full relative">
<div class="grid grid-cols-3 gap-2">
<div class="h-32 rounded bg-surface-container-high border border-white/5 overflow-hidden">
<img class="object-cover w-full h-full opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWymOX4ezSq88AVXHlQz3AghE4yOi1TqPjol_ZeW15sDIEONHMaVafOit8UptX0-p89_4oPh_XRZdp-vjqZayHtYcMOxBWDuMx6X7PIL7FR_Lj1StOhiBULFZBSAbWJDX3OvkLgEmei3ZBAY5ch6VYToFmlQPqmcbuIbY5B0BysMwDOnU_aOcC-PDl5tpC0b4VmSRjHqDWkA-MNWTuf2N2AikueqxeUNOjLPse_kw5XExvZXytjm90uC-Zb6KQxCyCqfIaivQTqeE"/>
</div>
<div class="h-32 rounded bg-surface-container-high border border-white/5 overflow-hidden">
<img class="object-cover w-full h-full opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUv0tEWqDrhFscO0Tlw5L_k1XV1dKKI3FobUjcpfijRDugC75yvFu4Pcu0ckXhUUPp9ALdkTNDoof820pBaEmDGBLBl3SBlLscnhlGH0-CNhzx0NZmiahsjCZhWUH4avScotq7KAMTpFWhAulx-lencVx5Y87sHf_0tWxXfQurz8XXfUhadpNATp8YhLmbLn9a9f7vErBQFK5eteRTtWbvJXVeNodsw7HCCNwA-yL-GqB2m17u_AmJbLQMbXyrd8cXmr27MDfhVPc"/>
</div>
<div class="h-32 rounded bg-surface-container-high border border-white/5 overflow-hidden">
<img class="object-cover w-full h-full opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8T6FCcbRKJeSG07yrGmM2TOA6cjhNhD9_xgjjyvkEhfai8cIjiv33k-dz3Ayj0HKG1ZFYcjpj8-WVfzkUwER80RdnNtQf0gZfes8EMHIeW0WZcd7DHk5Wf5JVtRkmHI558AqP37Hxdensqc6I3earyAMvMv4Li2Y_nDJ4Heo6tXIrUkVRqs-TcDnfwDf5VXzkOUURVVKfXDN5SlDMKZCSftAkzn5S4bpRfl3GY87ojN1cbsloXYaaI-liXPKZfD_QaqWyg4-lH1E"/>
</div>
<div class="col-span-3 h-2 w-full bg-secondary-container/20 rounded-full overflow-hidden mt-4">
<div class="h-full bg-gradient-to-r from-secondary to-primary w-2/3 shadow-[0_0_10px_rgba(208,188,255,0.5)]"></div>
</div>
</div>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="w-full py-12 bg-surface-container-lowest border-t border-white/5">
<div class="grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-desktop max-w-screen-2xl mx-auto">
<div class="col-span-2 md:col-span-1">
<div class="flex items-center gap-2 mb-4 cursor-pointer" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'home'}, '*')">
<span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings: 'FILL' 1;">layers</span>
<span class="font-headline-md text-headline-md font-bold text-primary">AetherAI</span>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant mb-6">
                    Building the future of computational creativity.
                </p>
</div>
<div class="flex flex-col gap-4">
<h4 class="font-label-sm text-label-sm text-primary uppercase tracking-widest">Resources</h4>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">Documentation</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'pricing'}, '*'); return false;">Pricing</a>
</div>
<div class="flex flex-col gap-4">
<h4 class="font-label-sm text-label-sm text-primary uppercase tracking-widest">Legal</h4>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
</div>
<div class="flex flex-col gap-4">
<h4 class="font-label-sm text-label-sm text-primary uppercase tracking-widest">System</h4>
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-green-400"></span>
<span class="font-label-sm text-label-sm text-on-surface-variant">All Systems Operational</span>
</div>
</div>
</div>
<div class="mt-12 px-margin-desktop max-w-screen-2xl mx-auto border-t border-white/5 pt-8 text-center md:text-left">
<p class="font-label-sm text-label-sm text-on-surface-variant">© 2026 AetherAI Editor Suite. All rights reserved.</p>
</div>
</footer>
</body></html>`;

const AETHER_PRICING_HTML = `<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Pricing | AetherAI Editor Suite</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@300..700&family=JetBrains+Mono:wght@400..700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<style>
        :root {
            --glass-border: rgba(255, 255, 255, 0.1);
            --glow-primary: rgba(0, 219, 233, 0.15);
        }
        body {
            background-color: #0b1326;
            color: #dae2fd;
            font-family: 'Inter', sans-serif;
        }
        .surface_glass {
            background: rgba(11, 19, 38, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
        }
        .neon-underglow {
            box-shadow: 0 20px 40px -10px var(--glow-primary);
        }
        .primary-gradient {
            background: linear-gradient(135deg, #00dbe9 0%, #571bc1 100%);
        }
        .pricing-card:hover {
            transform: translateY(-4px);
            border-color: #00dbe9;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "tertiary-container": "#8be7ff",
                        "primary": "#dbfcff",
                        "secondary-fixed": "#e9ddff",
                        "secondary": "#d0bcff",
                        "on-primary": "#00363a",
                        "surface": "#0b1326",
                        "primary-fixed-dim": "#00dbe9",
                        "on-error-container": "#ffdad6",
                        "on-primary-fixed-variant": "#004f54",
                        "on-background": "#dae2fd",
                        "surface-container-low": "#131b2e",
                        "surface-dim": "#0b1326",
                        "secondary-container": "#571bc1",
                        "secondary-fixed-dim": "#d0bcff",
                        "tertiary-fixed-dim": "#4cd7f6",
                        "surface-container-lowest": "#060e20",
                        "surface-tint": "#00dbe9",
                        "surface-bright": "#31394d",
                        "on-tertiary-fixed-variant": "#004e5c",
                        "outline-variant": "#3b494b",
                        "on-secondary-fixed-variant": "#5516be",
                        "error": "#ffb4ab",
                        "outline": "#849495",
                        "on-surface": "#dae2fd",
                        "on-error": "#690005",
                        "surface-variant": "#2d3449",
                        "surface-container-high": "#222a3d",
                        "inverse-surface": "#dae2fd",
                        "error-container": "#93000a",
                        "background": "#0b1326",
                        "on-secondary-container": "#c4abff",
                        "primary-container": "#00f0ff",
                        "on-secondary": "#3c0091",
                        "on-tertiary-fixed": "#001f26",
                        "primary-fixed": "#7df4ff",
                        "on-tertiary-container": "#00687a",
                        "on-primary-container": "#006970",
                        "on-tertiary": "#003640",
                        "surface-container": "#171f33",
                        "tertiary": "#e7f9ff",
                        "inverse-on-surface": "#283044"
                    }
                }
            }
        }
    </script>
</head>
<body class="overflow-x-hidden">
<!-- TopNavBar -->
<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,219,233,0.1)]">
<div class="flex justify-between items-center h-16 px-margin-desktop max-w-screen-2xl mx-auto">
<div class="flex items-center gap-2 cursor-pointer" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'home'}, '*')">
<span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">AetherAI</span>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">Tools</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">Features</a>
<a class="font-body-md text-body-md text-primary border-b-2 border-primary pb-1" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'pricing'}, '*'); return false;">Pricing</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'home'}, '*'); return false;">About</a>
</nav>
<div class="flex items-center gap-4">
<button class="hidden md:block font-body-md text-body-md text-on-surface-variant hover:bg-white/5 px-4 py-2 rounded-lg transition-all duration-300 active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Log In</button>
<button class="primary-gradient font-body-md text-body-md text-on-primary font-bold px-6 py-2 rounded-lg transition-transform active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Get Started</button>
</div>
</div>
</header>
<main class="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto relative">
<!-- Header Section -->
<section class="text-center mb-20">
<h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Computational Precision. Transparent Pricing.</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Choose the perfect tier for your AI-enhanced creative workflow. Scale as you evolve.</p>
</section>
<!-- Pricing Cards -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-32">
<!-- Starter -->
<div class="pricing-card surface_glass p-8 rounded-xl flex flex-col h-full relative overflow-hidden">
<div class="mb-8">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-2 block">Level 01</span>
<h3 class="font-headline-md text-headline-md text-on-surface mb-2">Starter</h3>
<div class="flex items-baseline gap-1">
<span class="font-display-lg text-display-lg-mobile text-primary">Free</span>
</div>
</div>
<ul class="space-y-4 mb-12 flex-grow">
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
<span class="material-symbols-outlined text-primary text-xl">check_circle</span> 100 AI Generations/mo
                    </li>
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
<span class="material-symbols-outlined text-primary text-xl">check_circle</span> Basic Prompt Templates
                    </li>
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
<span class="material-symbols-outlined text-primary text-xl">check_circle</span> Public Workspace
                    </li>
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant/50">
<span class="material-symbols-outlined text-on-surface-variant/30 text-xl">cancel</span> Priority Rendering
                    </li>
</ul>
<button class="w-full py-3 rounded-lg font-bold border border-primary/30 text-primary hover:bg-primary/10 transition-colors active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Get Started</button>
</div>
<!-- Pro -->
<div class="pricing-card surface_glass p-8 rounded-xl flex flex-col h-full relative overflow-hidden neon-underglow border-primary/50">
<div class="absolute top-0 right-0 primary-gradient px-4 py-1 rounded-bl-lg">
<span class="font-label-sm text-label-sm text-on-primary font-bold">MOST POPULAR</span>
</div>
<div class="mb-8">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-2 block">Level 02</span>
<h3 class="font-headline-md text-headline-md text-on-surface mb-2">Pro</h3>
<div class="flex items-baseline gap-1">
<span class="font-display-lg text-display-lg-mobile text-primary">$29</span>
<span class="font-body-md text-body-md text-on-surface-variant">/mo</span>
</div>
</div>
<ul class="space-y-4 mb-12 flex-grow">
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface">
<span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span> Unlimited AI Generations
                    </li>
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface">
<span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span> Full API Access
                    </li>
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface">
<span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span> Private Cloud Storage
                    </li>
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface">
<span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span> 24/7 Priority Support
                    </li>
</ul>
<button class="w-full py-3 rounded-lg font-bold primary-gradient text-on-primary shadow-lg shadow-primary/20 active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Upgrade to Pro</button>
</div>
<!-- Enterprise -->
<div class="pricing-card surface_glass p-8 rounded-xl flex flex-col h-full relative overflow-hidden">
<div class="mb-8">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed-dim mb-2 block">Level 03</span>
<h3 class="font-headline-md text-headline-md text-on-surface mb-2">Enterprise</h3>
<div class="flex items-baseline gap-1">
<span class="font-display-lg text-display-lg-mobile text-primary">Custom</span>
</div>
</div>
<ul class="space-y-4 mb-12 flex-grow">
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
<span class="material-symbols-outlined text-primary text-xl">check_circle</span> Custom Model Training
                    </li>
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
<span class="material-symbols-outlined text-primary text-xl">check_circle</span> Multi-seat License
                    </li>
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
<span class="material-symbols-outlined text-primary text-xl">check_circle</span> Dedicated Success Manager
                    </li>
<li class="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
<span class="material-symbols-outlined text-primary text-xl">check_circle</span> On-premise Deployment
                    </li>
</ul>
<button class="w-full py-3 rounded-lg font-bold border border-on-surface-variant text-on-surface-variant hover:bg-white/5 transition-colors active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Contact Sales</button>
</div>
</section>
<!-- Comparison Table -->
<section class="mb-32">
<div class="text-center mb-12">
<h2 class="font-headline-md text-headline-md text-primary mb-4">Feature Matrix</h2>
<p class="font-body-md text-body-md text-on-surface-variant">The technical details behind every compute level.</p>
</div>
<div class="surface_glass rounded-xl overflow-hidden custom-scrollbar overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-white/5 border-b border-white/10">
<th class="p-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Features</th>
<th class="p-6 font-label-sm text-label-sm text-primary uppercase tracking-wider">Starter</th>
<th class="p-6 font-label-sm text-label-sm text-primary uppercase tracking-wider">Pro</th>
<th class="p-6 font-label-sm text-label-sm text-primary uppercase tracking-wider">Enterprise</th>
</tr>
</thead>
<tbody class="divide-y divide-white/5">
<tr class="hover:bg-white/5 transition-colors">
<td class="p-6 font-body-md text-body-md text-on-surface">Monthly Generations</td>
<td class="p-6 font-label-sm text-label-sm">100 Credits</td>
<td class="p-6 font-label-sm text-label-sm text-primary font-bold">Unlimited</td>
<td class="p-6 font-label-sm text-label-sm">Unlimited + High Priority</td>
</tr>
<tr class="hover:bg-white/5 transition-colors">
<td class="p-6 font-body-md text-body-md text-on-surface">API Rate Limits</td>
<td class="p-6 font-label-sm text-label-sm">None</td>
<td class="p-6 font-label-sm text-label-sm">10,000 req/mo</td>
<td class="p-6 font-label-sm text-label-sm text-primary font-bold">Unlimited Custom</td>
</tr>
<tr class="hover:bg-white/5 transition-colors">
<td class="p-6 font-body-md text-body-md text-on-surface">Data Privacy</td>
<td class="p-6 font-label-sm text-label-sm">Shared Training</td>
<td class="p-6 font-label-sm text-label-sm text-primary font-bold">Opt-out Training</td>
<td class="p-6 font-label-sm text-label-sm">Isolated Environment</td>
</tr>
<tr class="hover:bg-white/5 transition-colors">
<td class="p-6 font-body-md text-body-md text-on-surface">Processing Priority</td>
<td class="p-6 font-label-sm text-label-sm">Standard</td>
<td class="p-6 font-label-sm text-label-sm">High</td>
<td class="p-6 font-label-sm text-label-sm text-primary font-bold">Ultra-Low Latency</td>
</tr>
<tr class="hover:bg-white/5 transition-colors">
<td class="p-6 font-body-md text-body-md text-on-surface">Support</td>
<td class="p-6 font-label-sm text-label-sm">Community</td>
<td class="p-6 font-label-sm text-label-sm">24h Response</td>
<td class="p-6 font-label-sm text-label-sm text-primary font-bold">Instant Dedicated</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- Bento FAQ -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<div class="md:col-span-2 surface_glass p-8 rounded-xl flex flex-col justify-center">
<h3 class="font-headline-md text-headline-md text-primary mb-4">Can I change my plan anytime?</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Absolutely. Upgrades are immediate, and downgrades take effect at the end of your current billing cycle. We believe in total fluidity for creative minds.</p>
</div>
<div class="surface_glass p-8 rounded-xl flex flex-col justify-center border-l-4 border-primary">
<h3 class="font-headline-md text-headline-md text-primary mb-4">Security</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Enterprise-grade encryption for every prompt and asset generated.</p>
</div>
<div class="surface_glass p-8 rounded-xl flex flex-col justify-center">
<h3 class="font-headline-md text-headline-md text-primary mb-4">Academic Discount?</h3>
<p class="font-body-md text-body-md text-on-surface-variant">We offer 50% off for verified students and researchers.</p>
</div>
<div class="md:col-span-2 surface_glass p-8 rounded-xl flex items-center justify-between gap-8">
<div>
<h3 class="font-headline-md text-headline-md text-primary mb-2">Ready to evolve?</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Join 50k+ creators scaling their vision with AetherAI.</p>
</div>
<button class="primary-gradient text-on-primary font-bold px-8 py-3 rounded-lg whitespace-nowrap active:scale-95" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'join'}, '*')">Get Started Now</button>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface-container-lowest border-t border-white/5 py-12">
<div class="grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-desktop max-w-screen-2xl mx-auto">
<div class="col-span-2 md:col-span-1">
<span class="font-headline-md text-headline-md font-bold text-primary mb-4 block cursor-pointer" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'home'}, '*')">AetherAI</span>
<p class="font-label-sm text-label-sm text-on-surface-variant max-w-xs">Forging the next generation of computational creativity through advanced neural architecture.</p>
</div>
<div>
<h4 class="font-label-sm text-label-sm text-on-surface font-bold uppercase mb-4">Product</h4>
<nav class="flex flex-col gap-2">
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">Documentation</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors" href="#" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'overview'}, '*'); return false;">API Reference</a>
</nav>
</div>
<div>
<h4 class="font-label-sm text-label-sm text-on-surface font-bold uppercase mb-4">Legal</h4>
<nav class="flex flex-col gap-2">
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors" href="#">Privacy Policy</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors" href="#">Terms of Service</a>
</nav>
</div>
<div>
<h4 class="font-label-sm text-label-sm text-on-surface font-bold uppercase mb-4">Social</h4>
<div class="flex gap-4">
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">share</span>
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">terminal</span>
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">language</span>
</div>
</div>
</div>
<div class="mt-12 text-center px-margin-desktop max-w-screen-2xl mx-auto">
<p class="font-label-sm text-label-sm text-on-surface-variant">© 2026 AetherAI Editor Suite. All rights reserved.</p>
</div>
</footer>
</body></html>`;

const AETHER_JOIN_HTML = `<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Join AetherAI | The Future of AI Editing</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-container": "#8be7ff",
                    "primary": "#dbfcff",
                    "secondary-fixed": "#e9ddff",
                    "secondary": "#d0bcff",
                    "on-primary": "#00363a",
                    "surface": "#0b1326",
                    "primary-fixed-dim": "#00dbe9",
                    "on-error-container": "#ffdad6",
                    "on-primary-fixed-variant": "#004f54",
                    "on-background": "#dae2fd",
                    "surface-container-low": "#131b2e",
                    "surface-dim": "#0b1326",
                    "secondary-container": "#571bc1",
                    "secondary-fixed-dim": "#d0bcff",
                    "tertiary-fixed-dim": "#4cd7f6",
                    "surface-container-lowest": "#060e20",
                    "surface-tint": "#00dbe9",
                    "surface-bright": "#31394d",
                    "on-tertiary-fixed-variant": "#004e5c",
                    "outline-variant": "#3b494b",
                    "on-secondary-fixed-variant": "#5516be",
                    "error": "#ffb4ab",
                    "outline": "#849495",
                    "on-surface": "#dae2fd",
                    "on-error": "#690005",
                    "surface-variant": "#2d3449",
                    "surface-container-high": "#222a3d",
                    "inverse-surface": "#dae2fd",
                    "error-container": "#93000a",
                    "background": "#0b1326",
                    "on-secondary-container": "#c4abff",
                    "primary-container": "#00f0ff",
                    "on-secondary": "#3c0091",
                    "on-tertiary-fixed": "#001f26",
                    "primary-fixed": "#7df4ff",
                    "on-tertiary-container": "#00687a",
                    "on-primary-container": "#006970",
                    "on-tertiary": "#003640",
                    "surface-container": "#171f33",
                    "tertiary": "#e7f9ff",
                    "inverse-on-surface": "#283044"
            }
          }
        }
      }
    </script>
<style>
        body {
            background-color: #0b1326;
            color: #dae2fd;
            overflow-x: hidden;
            font-family: 'Inter', sans-serif;
        }
        .glass-panel {
            background: rgba(19, 27, 46, 0.6);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(219, 252, 255, 0.1);
        }
        .ai-glow {
            box-shadow: 0 0 40px rgba(0, 219, 233, 0.15);
        }
        .input-glow:focus-within {
            box-shadow: 0 4px 20px rgba(0, 219, 233, 0.1);
            border-bottom-color: #00dbe9;
        }
        @keyframes pulse-soft {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.7; }
        }
        .animate-pulse-soft {
            animation: pulse-soft 4s ease-in-out infinite;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container">
<!-- Header -->
<header class="relative z-10 w-full h-20 flex items-center justify-between px-margin-desktop max-w-screen-2xl mx-auto">
<div class="font-headline-md text-headline-md font-bold text-primary tracking-tight flex items-center gap-2 cursor-pointer" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'home'}, '*')">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
            AetherAI
</div>
<div class="flex items-center gap-4">
<button class="px-4 py-2 rounded-lg text-xs font-mono text-cyan-300 hover:text-white transition-colors" onclick="window.parent.postMessage({type: 'NAVIGATE', page: 'home'}, '*')">Back to Home</button>
</div>
</header>
<main class="relative z-10 flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-12">
<div class="w-full max-w-xl">
<!-- Bento Container -->
<div class="glass-panel p-8 md:p-12 rounded-xl ai-glow flex flex-col gap-8">
<!-- Intro -->
<div class="space-y-4 text-center md:text-left">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-fixed-dim font-label-sm text-label-sm">
<span class="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse-soft"></span>
                        BETA ACCESS NOW OPENING
                    </div>
<h1 class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
                        Enter the Aether.
                    </h1>
<p class="text-on-surface-variant max-w-md">
                        Join the elite waitlist for the most advanced AI-powered editor suite ever built. Experience computational elegance.
                    </p>
</div>
<!-- Form -->
<form class="space-y-6" onsubmit="event.preventDefault(); alert('Access Request Submitted! Welcome to AetherAI Beta.');">
<div class="grid grid-cols-1 gap-6">
<!-- Name Field -->
<div class="group">
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">
                                FULL NAME
                            </label>
<div class="relative input-glow border-b border-white/10 transition-all duration-300">
<input class="w-full bg-transparent border-none py-3 px-0 focus:ring-0 text-on-surface placeholder:text-surface-variant font-body-lg text-body-lg" placeholder="Turing Lovelace" type="text" required />
</div>
</div>
<!-- Email Field -->
<div class="group">
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">
                                WORK EMAIL
                            </label>
<div class="relative input-glow border-b border-white/10 transition-all duration-300">
<input class="w-full bg-transparent border-none py-3 px-0 focus:ring-0 text-on-surface placeholder:text-surface-variant font-body-lg text-body-lg" placeholder="name@domain.ai" type="email" required />
</div>
</div>
</div>
<!-- CTA Button -->
<button type="submit" class="w-full py-4 rounded-lg bg-gradient-to-r from-primary-fixed-dim to-secondary-fixed-dim text-on-primary font-bold tracking-wide shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                        REQUEST ACCESS
                        <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</form>
<!-- Social Sign-On -->
<div class="space-y-6">
<div class="relative flex items-center">
<div class="flex-grow border-t border-white/5"></div>
<span class="flex-shrink mx-4 font-label-sm text-label-sm text-surface-variant">OR JOIN WITH</span>
<div class="flex-grow border-t border-white/5"></div>
</div>
<div class="grid grid-cols-2 gap-4">
<button class="flex items-center justify-center gap-3 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all font-label-sm text-label-sm text-on-surface" onclick="alert('Google Authentication Initiated...')">
<svg class="w-5 h-5" viewbox="0 0 24 24">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"></path>
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="currentColor"></path>
</svg>
                            GOOGLE
                        </button>
<button class="flex items-center justify-center gap-3 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all font-label-sm text-label-sm text-on-surface" onclick="alert('GitHub Authentication Initiated...')">
<svg class="w-5 h-5" viewbox="0 0 24 24">
<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.403 22 12.017 22 6.484 17.522 2 12 2z" fill="currentColor"></path>
</svg>
                            GITHUB
                        </button>
</div>
</div>
</div>
</div>
</main>
<footer class="relative z-10 w-full py-8 border-t border-white/5 bg-surface-container-lowest text-center font-mono text-xs text-slate-400">
© 2026 AetherAI Editor Suite. All rights reserved.
</footer>
</body></html>`;

type PageKey = 'home' | 'overview' | 'pricing' | 'join';

export const AIEditorDemo: React.FC<{ onBuyNow?: () => void }> = ({ onBuyNow }) => {
  const [activeTab, setActiveTab] = useState<PageKey>('home');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'NAVIGATE' && event.data.page) {
        if (['home', 'overview', 'pricing', 'join'].includes(event.data.page)) {
          setActiveTab(event.data.page as PageKey);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const getPageHtml = (key: PageKey) => {
    switch (key) {
      case 'overview':
        return AETHER_OVERVIEW_HTML;
      case 'pricing':
        return AETHER_PRICING_HTML;
      case 'join':
        return AETHER_JOIN_HTML;
      case 'home':
      default:
        return AETHER_HOME_HTML;
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-slate-950 flex flex-col">
      {/* Marketplace Top Navigation / Demo Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between sticky top-0 z-50 shadow-md gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">AetherAI Demo</span>
          </div>
          <div className="hidden sm:flex items-center space-x-1 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded-full">
            <span className="text-amber-400 font-bold text-xs">⚡ 100 NEURAL CREDITS</span>
          </div>
        </div>

        {/* Page Switcher Tabs */}
        <div className="flex items-center space-x-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'home'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layout size={13} />
            <span>Home Page</span>
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'overview'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Terminal size={13} />
            <span>Tools & Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'pricing'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <CreditCard size={13} />
            <span>Pricing</span>
          </button>
          <button
            onClick={() => setActiveTab('join')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'join'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <UserPlus size={13} />
            <span>Join Beta</span>
          </button>
        </div>

        {onBuyNow && (
          <button
            onClick={onBuyNow}
            className="px-4 py-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center space-x-2"
          >
            <ShoppingBag size={14} />
            <span>Buy Website Template ($300)</span>
          </button>
        )}
      </div>

      {/* Render Active Page via Iframe */}
      <iframe
        key={activeTab}
        srcDoc={getPageHtml(activeTab)}
        title={`AetherAI Editor Suite - ${activeTab}`}
        className="w-full flex-grow border-none min-h-[90vh]"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
};

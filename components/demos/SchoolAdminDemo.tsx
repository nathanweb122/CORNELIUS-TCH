import React, { useState } from 'react';
import { Sparkles, ShoppingBag, GraduationCap, Users, HeartHandshake, Bot } from 'lucide-react';

const STUDENT_PORTAL_HTML = `<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>EduAdmin Student Portal</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "inverse-on-surface": "#eff1f4",
                    "on-secondary": "#ffffff",
                    "on-surface": "#191c1e",
                    "primary": "#000666",
                    "on-tertiary-fixed-variant": "#005313",
                    "tertiary-container": "#00390a",
                    "primary-container": "#1a237e",
                    "outline-variant": "#c6c5d4",
                    "on-primary-fixed-variant": "#343d96",
                    "on-primary-fixed": "#000767",
                    "surface-container-highest": "#e0e3e6",
                    "surface-tint": "#4c56af",
                    "on-primary-container": "#8690ee",
                    "error-container": "#ffdad6",
                    "on-surface-variant": "#454652",
                    "on-secondary-fixed-variant": "#5c4300",
                    "primary-fixed": "#e0e0ff",
                    "surface-container-lowest": "#ffffff",
                    "surface": "#f7f9fc",
                    "secondary": "#795900",
                    "on-error-container": "#93000a",
                    "on-error": "#ffffff",
                    "surface-container": "#eceef1",
                    "surface-variant": "#e0e3e6",
                    "tertiary-fixed-dim": "#7ddc7a",
                    "on-background": "#191c1e",
                    "secondary-fixed-dim": "#f8bd2a",
                    "on-tertiary-fixed": "#002204",
                    "surface-container-high": "#e6e8eb",
                    "primary-fixed-dim": "#bdc2ff",
                    "inverse-surface": "#2d3133",
                    "inverse-primary": "#bdc2ff",
                    "surface-bright": "#f7f9fc",
                    "background": "#f7f9fc",
                    "tertiary": "#002104",
                    "on-tertiary-container": "#4eab50",
                    "on-primary": "#ffffff",
                    "on-secondary-container": "#6f5100",
                    "on-secondary-fixed": "#261a00",
                    "surface-dim": "#d8dadd",
                    "secondary-container": "#fec330",
                    "tertiary-fixed": "#98f994",
                    "error": "#ba1a1a",
                    "outline": "#767683",
                    "secondary-fixed": "#ffdfa0",
                    "on-tertiary": "#ffffff",
                    "surface-container-low": "#f2f4f7"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "gutter": "24px",
                    "xl": "32px",
                    "lg": "24px",
                    "xs": "4px",
                    "base": "4px",
                    "margin-desktop": "48px",
                    "margin-mobile": "16px",
                    "sm": "8px",
                    "md": "16px"
            },
            "fontFamily": {
                    "body-lg": ["Inter"],
                    "label-md": ["Inter"],
                    "headline-md": ["Inter"],
                    "headline-lg-mobile": ["Inter"],
                    "body-md": ["Inter"],
                    "label-lg": ["Inter"],
                    "headline-sm": ["Inter"],
                    "headline-lg": ["Inter"]
            },
            "fontSize": {
                    "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                    "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "label-lg": ["14px", {"lineHeight": "20px", "fontWeight": "600"}],
                    "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .ai-glow {
            box-shadow: 0 0 20px rgba(254, 195, 48, 0.3);
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.4);
        }
        body {
            min-height: max(884px, 100dvh);
        }
    </style>
</head>
<body class="bg-background text-on-surface font-body-md min-h-screen pb-24">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface dark:bg-on-background">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
<img class="w-full h-full object-cover" data-alt="Student profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlvZooJtBZpImUSn5s2GZ7FiGhCUu3y06x852LxGLL5p0zAd-S5eHU56lpxtdXhOMvKsO2OAtswpCfd6ZEfgxYceic21GFE_roxmI10Pzi67XVV1hF_xyGme7Xbmf9SsuKy_F0hifbunwyazQn-FVcws3H5YQqvCbi9MRKMy9JXOABLeNVEPGDJ1OsKYw_G9fOJtBeHbODy7Flah3zMtn4S9E-WgWeCcFH8ZYrpnzvWnJ5dz_gzEBxGfJA2-GGAwMGzGTM2tDTdg0"/>
</div>
<span class="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed">EduAdmin</span>
</div>
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container dark:hover:bg-inverse-surface transition-colors">
<span class="material-symbols-outlined text-primary dark:text-primary-fixed">notifications</span>
</button>
</header>
<main class="pt-20 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
<!-- Hero Welcome -->
<section class="mb-lg">
<h1 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-xs">Welcome back, Alex</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">You have 3 assignments due this week and 1 new note from Dr. Smith.</p>
</section>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- Ask AI Widget (Feature Spotlight) -->
<div class="md:col-span-8 bg-primary-container rounded-xl p-lg text-on-primary-container ai-glow relative overflow-hidden group">
<div class="relative z-10">
<div class="flex items-center gap-2 mb-md">
<span class="material-symbols-outlined text-secondary-container" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
<h2 class="font-headline-sm text-headline-sm text-white">Ask AI Assistant</h2>
</div>
<p class="font-body-md text-body-md mb-lg text-primary-fixed opacity-90 max-w-md">Stuck on a concept? Explain a topic, solve a math problem, or summarize your readings instantly.</p>
<div class="flex gap-2 bg-white/10 p-1.5 rounded-full border border-white/20 focus-within:border-white/50 transition-all">
<input class="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/40 flex-grow px-4 font-body-md" placeholder="Explain Quantum Entanglement like I'm 10..." type="text"/>
<button class="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-label-lg hover:scale-105 transition-transform">
                            Ask AI
                        </button>
</div>
</div>
<!-- Abstract visual element -->
<div class="absolute -right-10 -bottom-10 opacity-20 group-hover:opacity-30 transition-opacity">
<span class="material-symbols-outlined text-[180px]" style="font-variation-settings: 'wght' 100;">neurology</span>
</div>
</div>
<!-- Recent Grades & Notes (Compact View) -->
<div class="md:col-span-4 bg-surface-container rounded-xl p-lg shadow-sm">
<div class="flex justify-between items-center mb-md">
<h2 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">Recent Feedback</h2>
<span class="material-symbols-outlined text-primary">analytics</span>
</div>
<div class="space-y-md">
<!-- Grade Item -->
<div class="bg-surface-container-low p-md rounded-lg border border-outline-variant/30">
<div class="flex justify-between items-start mb-xs">
<span class="font-label-md text-label-md text-on-surface-variant">Calculus III</span>
<span class="text-on-tertiary-container font-bold">92%</span>
</div>
<p class="text-body-md font-body-md text-on-surface line-clamp-2 italic">"Excellent work on the derivatives section. See note on graph 4."</p>
</div>
<!-- Grade Item -->
<div class="bg-surface-container-low p-md rounded-lg border border-outline-variant/30">
<div class="flex justify-between items-start mb-xs">
<span class="font-label-md text-label-md text-on-surface-variant">Art History</span>
<span class="text-secondary font-bold">85%</span>
</div>
<p class="text-body-md font-body-md text-on-surface line-clamp-2">"Great use of historical context in your essay. Keep exploring the Baroque period."</p>
</div>
</div>
<button class="w-full mt-md py-2 text-primary font-label-lg border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">View All Grades</button>
</div>
<!-- Upcoming Assignments (Main List) -->
<div class="md:col-span-12">
<div class="flex justify-between items-end mb-md">
<h2 class="font-headline-sm text-headline-sm text-primary">Upcoming Assignments</h2>
<button class="text-primary font-label-lg flex items-center gap-1">
                        Calendar View <span class="material-symbols-outlined text-sm">calendar_month</span>
</button>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-md">
<!-- Assignment Card 1 -->
<div class="bg-white p-lg rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow flex flex-col justify-between">
<div>
<div class="flex justify-between items-start mb-md">
<span class="px-2 py-1 bg-error-container text-on-error-container text-[10px] uppercase font-bold rounded">Due in 2 days</span>
<span class="material-symbols-outlined text-outline">history_edu</span>
</div>
<h3 class="font-label-lg text-label-lg text-on-surface mb-xs">Modern Philosophy Essay</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-lg">Write a 2000-word critique on Existentialism vs. Nihilism.</p>
</div>
<div class="flex items-center justify-between border-t border-outline-variant/10 pt-md mt-md">
<button class="flex items-center gap-2 text-primary-container font-label-md hover:underline decoration-secondary-container decoration-2 underline-offset-4">
<span class="material-symbols-outlined text-secondary-container" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
                                AI Help
                            </button>
<button class="bg-primary text-white px-4 py-2 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all">Submit</button>
</div>
</div>
<!-- Assignment Card 2 -->
<div class="bg-white p-lg rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow flex flex-col justify-between">
<div>
<div class="flex justify-between items-start mb-md">
<span class="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] uppercase font-bold rounded">Due in 5 days</span>
<span class="material-symbols-outlined text-outline">biotech</span>
</div>
<h3 class="font-label-lg text-label-lg text-on-surface mb-xs">Organic Chem Lab Report</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-lg">Complete synthesis analysis and submit structural diagrams.</p>
</div>
<div class="flex items-center justify-between border-t border-outline-variant/10 pt-md mt-md">
<button class="flex items-center gap-2 text-primary-container font-label-md hover:underline decoration-secondary-container decoration-2 underline-offset-4">
<span class="material-symbols-outlined text-secondary-container" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
                                AI Help
                            </button>
<button class="bg-primary text-white px-4 py-2 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all">Submit</button>
</div>
</div>
<!-- Assignment Card 3 -->
<div class="bg-white p-lg rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow flex flex-col justify-between">
<div>
<div class="flex justify-between items-start mb-md">
<span class="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] uppercase font-bold rounded">Due in 1 week</span>
<span class="material-symbols-outlined text-outline">calculate</span>
</div>
<h3 class="font-label-lg text-label-lg text-on-surface mb-xs">Linear Algebra Problem Set</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-lg">Vectors, matrices, and linear transformations assignment.</p>
</div>
<div class="flex items-center justify-between border-t border-outline-variant/10 pt-md mt-md">
<button class="flex items-center gap-2 text-primary-container font-label-md hover:underline decoration-secondary-container decoration-2 underline-offset-4">
<span class="material-symbols-outlined text-secondary-container" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
                                AI Help
                            </button>
<button class="bg-primary text-white px-4 py-2 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all">Submit</button>
</div>
</div>
</div>
</div>
</div>
</main>
<!-- Bottom Navigation -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface-container dark:bg-surface-dim shadow-lg rounded-t-xl">
<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-95" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-label-md text-label-md">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-95" href="#">
<span class="material-symbols-outlined">assignment</span>
<span class="font-label-md text-label-md">Tasks</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary rounded-xl px-4 py-1 active:scale-95 transition-transform duration-150 shadow-md" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
<span class="font-label-md text-label-md">AI Assistant</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-95" href="#">
<span class="material-symbols-outlined">grade</span>
<span class="font-label-md text-label-md">Grades</span>
</a>
</nav>
<script>
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if(this.innerText.includes('AI')) {
                    this.classList.add('animate-pulse');
                    setTimeout(() => this.classList.remove('animate-pulse'), 1000);
                }
            });
        });
    </script>
</body></html>`;

const TEACHER_DASHBOARD_HTML = `<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>EduAdmin | Teacher Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "inverse-on-surface": "#eff1f4",
                    "on-secondary": "#ffffff",
                    "on-surface": "#191c1e",
                    "primary": "#000666",
                    "on-tertiary-fixed-variant": "#005313",
                    "tertiary-container": "#00390a",
                    "primary-container": "#1a237e",
                    "outline-variant": "#c6c5d4",
                    "on-primary-fixed-variant": "#343d96",
                    "on-primary-fixed": "#000767",
                    "surface-container-highest": "#e0e3e6",
                    "surface-tint": "#4c56af",
                    "on-primary-container": "#8690ee",
                    "error-container": "#ffdad6",
                    "on-surface-variant": "#454652",
                    "on-secondary-fixed-variant": "#5c4300",
                    "primary-fixed": "#e0e0ff",
                    "surface-container-lowest": "#ffffff",
                    "surface": "#f7f9fc",
                    "secondary": "#795900",
                    "on-error-container": "#93000a",
                    "on-error": "#ffffff",
                    "surface-container": "#eceef1",
                    "surface-variant": "#e0e3e6",
                    "tertiary-fixed-dim": "#7ddc7a",
                    "on-background": "#191c1e",
                    "secondary-fixed-dim": "#f8bd2a",
                    "on-tertiary-fixed": "#002204",
                    "surface-container-high": "#e6e8eb",
                    "primary-fixed-dim": "#bdc2ff",
                    "inverse-surface": "#2d3133",
                    "inverse-primary": "#bdc2ff",
                    "surface-bright": "#f7f9fc",
                    "background": "#f7f9fc",
                    "tertiary": "#002104",
                    "on-tertiary-container": "#4eab50",
                    "on-primary": "#ffffff",
                    "on-secondary-container": "#6f5100",
                    "on-secondary-fixed": "#261a00",
                    "surface-dim": "#d8dadd",
                    "secondary-container": "#fec330",
                    "tertiary-fixed": "#98f994",
                    "error": "#ba1a1a",
                    "outline": "#767683",
                    "secondary-fixed": "#ffdfa0",
                    "on-tertiary": "#ffffff",
                    "surface-container-low": "#f2f4f7"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "gutter": "24px",
                    "xl": "32px",
                    "lg": "24px",
                    "xs": "4px",
                    "base": "4px",
                    "margin-desktop": "48px",
                    "margin-mobile": "16px",
                    "sm": "8px",
                    "md": "16px"
            },
            "fontFamily": {
                    "body-lg": ["Inter"],
                    "label-md": ["Inter"],
                    "headline-md": ["Inter"],
                    "headline-lg-mobile": ["Inter"],
                    "body-md": ["Inter"],
                    "label-lg": ["Inter"],
                    "headline-sm": ["Inter"],
                    "headline-lg": ["Inter"]
            },
            "fontSize": {
                    "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                    "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "label-lg": ["14px", {"lineHeight": "20px", "fontWeight": "600"}],
                    "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .card-shadow {
            box-shadow: 0px 4px 12px rgba(0,0,0,0.05);
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f7f9fc;
            min-height: max(884px, 100dvh);
        }
        .ai-gradient {
            background: linear-gradient(135deg, #000666 0%, #1a237e 100%);
        }
    </style>
</head>
<body class="bg-background text-on-surface">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface dark:bg-on-background">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="Teacher photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxww4MYCt9kl3DBuPZvYrilzfxSJELYEsZlEu72Mq6JFuGQgR0FuP048bMDgxf14jTAbcmyg2dHANNLGQL7wTbeClurgtubbX3jhcXT-AvQtKARZGIIEfa-q7sFj9JgumznBMx8XpKZKqZi8cl2PhPVqRLYq-H0eh6Do735WkBUfl7n0-mUsUONF14MX_KT_v2PXZjRrNQaR3H450iTpqyuyJxBRrAMra6eqH-zRIjvgrpcOZZDoHTLHfRduJEVyXJ6Mfw2agthVg"/>
</div>
<h1 class="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed">EduAdmin</h1>
</div>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors">notifications</button>
<nav class="hidden md:flex items-center gap-6">
<a class="text-primary dark:text-primary-fixed font-label-lg text-label-lg border-b-2 border-primary" href="#">Dashboard</a>
<a class="text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded font-label-lg text-label-lg" href="#">Curriculum</a>
<a class="text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded font-label-lg text-label-lg" href="#">Reports</a>
</nav>
</div>
</header>
<main class="pt-24 pb-24 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
<!-- Welcome Section -->
<section class="mb-lg">
<h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-xs">Good morning, Prof. Henderson</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">Here is what's happening with your Grade 11 Physics classes today.</p>
</section>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- AI Lesson Assistant (Large Card) -->
<div class="md:col-span-8 bg-white rounded-xl card-shadow overflow-hidden flex flex-col md:flex-row">
<div class="p-lg md:w-3/5">
<div class="flex items-center gap-2 mb-md">
<span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
<h3 class="font-headline-sm text-headline-sm text-primary">AI Lesson Assistant</h3>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-lg">
                        I've analyzed yesterday's quiz. 65% of students struggled with "Angular Momentum." Should I generate simplified study notes and a visual aid for today's session?
                    </p>
<div class="flex flex-wrap gap-md">
<button class="bg-primary text-white font-label-lg text-label-lg px-lg py-sm rounded-lg hover:opacity-90 transition-opacity">Generate Notes</button>
<button class="border border-outline text-primary font-label-lg text-label-lg px-lg py-sm rounded-lg hover:bg-surface-container transition-colors">Review Lesson Plan</button>
</div>
</div>
<div class="md:w-2/5 bg-primary-container relative min-h-[200px]">

<div class="absolute inset-0 flex items-center justify-center p-md">
<div class="bg-white/10 backdrop-blur-md rounded-xl p-md border border-white/20 w-full">
<div class="flex justify-between items-center mb-xs">
<span class="text-white text-label-md font-label-md">Current Draft</span>
<span class="text-secondary-fixed-dim text-label-md font-label-md">Ready</span>
</div>
<div class="h-2 w-full bg-white/20 rounded-full overflow-hidden">
<div class="h-full bg-secondary-fixed-dim w-3/4"></div>
</div>
<p class="text-white/80 text-xs mt-sm">Unit 4: Kinetic Energy &amp; Momentum (v2)</p>
</div>
</div>
</div>
</div>
<!-- Quick Action: Send to All -->
<div class="md:col-span-4 flex flex-col gap-gutter">
<div class="bg-secondary-container text-on-secondary-container p-lg rounded-xl card-shadow flex flex-col justify-between h-full group hover:scale-[1.02] transition-transform cursor-pointer">
<div>
<div class="material-symbols-outlined text-3xl mb-md">send_to_mobile</div>
<h3 class="font-headline-sm text-headline-sm mb-xs">Send to All</h3>
<p class="font-body-md text-body-md opacity-90">Distribute current lesson materials to all students instantly via mobile app.</p>
</div>
<div class="mt-lg flex justify-end">
<span class="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
</div>
</div>
</div>
<!-- Class Engagement Overview -->
<div class="md:col-span-7 bg-white p-lg rounded-xl card-shadow">
<div class="flex justify-between items-center mb-lg">
<h3 class="font-headline-sm text-headline-sm text-primary">Student Engagement</h3>
<select class="bg-surface-container border-none rounded-lg text-label-md font-label-md px-md py-xs">
<option>This Week</option>
<option>Last Week</option>
</select>
</div>
<div class="space-y-md">
<!-- Engagement Item -->
<div class="flex items-center gap-md">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">A</div>
<div class="flex-1">
<div class="flex justify-between mb-xs">
<span class="text-body-md font-label-lg">Attendance</span>
<span class="text-on-tertiary-container font-label-lg">94%</span>
</div>
<div class="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-on-tertiary-container w-[94%]"></div>
</div>
</div>
</div>
<!-- Engagement Item -->
<div class="flex items-center gap-md">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">P</div>
<div class="flex-1">
<div class="flex justify-between mb-xs">
<span class="text-body-md font-label-lg">Participation</span>
<span class="text-secondary font-label-lg">72%</span>
</div>
<div class="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-secondary w-[72%]"></div>
</div>
</div>
</div>
<!-- Engagement Item -->
<div class="flex items-center gap-md">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">S</div>
<div class="flex-1">
<div class="flex justify-between mb-xs">
<span class="text-body-md font-label-lg">Submission Rate</span>
<span class="text-on-tertiary-container font-label-lg">88%</span>
</div>
<div class="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-on-tertiary-container w-[88%]"></div>
</div>
</div>
</div>
</div>
</div>
<!-- Quick Grade Section -->
<div class="md:col-span-5 bg-white p-lg rounded-xl card-shadow">
<div class="flex items-center gap-2 mb-lg">
<span class="material-symbols-outlined text-primary">bolt</span>
<h3 class="font-headline-sm text-headline-sm text-primary">Quick Grade</h3>
</div>
<div class="space-y-sm mb-lg">
<p class="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Pending Updates</p>
<div class="flex items-center justify-between p-sm hover:bg-surface-container rounded-lg transition-colors cursor-pointer border border-outline-variant">
<div class="flex items-center gap-md">
<div class="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold">JD</div>
<span class="text-body-md">Jane Doe - Physics Quiz</span>
</div>
<span class="text-secondary font-bold">A-</span>
</div>
<div class="flex items-center justify-between p-sm hover:bg-surface-container rounded-lg transition-colors cursor-pointer border border-outline-variant">
<div class="flex items-center gap-md">
<div class="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold">MS</div>
<span class="text-body-md">Marc Smith - Lab Report</span>
</div>
<span class="text-error font-bold">C+</span>
</div>
</div>
<button class="w-full bg-surface-container text-primary font-label-lg text-label-lg py-sm rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-sm">mail</span>
                    Notify Parents
                </button>
</div>
</div>
<!-- Recent Lesson Materials (Asymmetric Grid) -->
<section class="mt-xl">
<h3 class="font-headline-sm text-headline-sm text-primary mb-lg">Recently Distributed</h3>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
<div class="bg-white p-md rounded-xl card-shadow border-t-4 border-primary">
<span class="text-label-md font-label-md text-on-surface-variant block mb-xs">Today, 09:15 AM</span>
<h4 class="font-label-lg text-label-lg mb-sm">Angular Momentum Slides</h4>
<div class="flex items-center gap-2 text-on-tertiary-container">
<span class="material-symbols-outlined text-sm">check_circle</span>
<span class="text-label-md">Sent to 32 students</span>
</div>
</div>
<div class="bg-white p-md rounded-xl card-shadow border-t-4 border-secondary">
<span class="text-label-md font-label-md text-on-surface-variant block mb-xs">Yesterday, 02:30 PM</span>
<h4 class="font-label-lg text-label-lg mb-sm">Work-Energy Theorem Quiz</h4>
<div class="flex items-center gap-2 text-on-tertiary-container">
<span class="material-symbols-outlined text-sm">check_circle</span>
<span class="text-label-md">Graded &amp; Released</span>
</div>
</div>
<div class="bg-white p-md rounded-xl card-shadow border-t-4 border-outline-variant opacity-70">
<span class="text-label-md font-label-md text-on-surface-variant block mb-xs">2 days ago</span>
<h4 class="font-label-lg text-label-lg mb-sm">Project: Newton's 3rd Law</h4>
<div class="flex items-center gap-2 text-on-surface-variant">
<span class="material-symbols-outlined text-sm">history</span>
<span class="text-label-md">Archived</span>
</div>
</div>
<div class="bg-surface-container-low border-2 border-dashed border-outline-variant p-md rounded-xl flex flex-col items-center justify-center text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-3xl mb-xs">add_circle</span>
<span class="font-label-lg text-label-lg">Add New Resource</span>
</div>
</div>
</section>
</main>
<!-- Floating AI Assistant Button -->
<button class="hidden md:flex fixed bottom-8 right-8 ai-gradient text-white w-16 h-16 rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
<div class="absolute right-full mr-4 bg-primary text-white px-4 py-2 rounded-lg text-label-lg font-label-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
            How can I help with today's lesson?
        </div>
</button>
</body></html>`;

const PARENT_PORTAL_HTML = `<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>EduAdmin - Parent Portal</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        body { font-family: 'Inter', sans-serif; min-height: max(884px, 100dvh); }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c6c5d4;
            border-radius: 10px;
        }
    </style>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "inverse-on-surface": "#eff1f4",
                    "on-secondary": "#ffffff",
                    "on-surface": "#191c1e",
                    "primary": "#000666",
                    "on-tertiary-fixed-variant": "#005313",
                    "tertiary-container": "#00390a",
                    "primary-container": "#1a237e",
                    "outline-variant": "#c6c5d4",
                    "on-primary-fixed-variant": "#343d96",
                    "on-primary-fixed": "#000767",
                    "surface-container-highest": "#e0e3e6",
                    "surface-tint": "#4c56af",
                    "on-primary-container": "#8690ee",
                    "error-container": "#ffdad6",
                    "on-surface-variant": "#454652",
                    "on-secondary-fixed-variant": "#5c4300",
                    "primary-fixed": "#e0e0ff",
                    "surface-container-lowest": "#ffffff",
                    "surface": "#f7f9fc",
                    "secondary": "#795900",
                    "on-error-container": "#93000a",
                    "on-error": "#ffffff",
                    "surface-container": "#eceef1",
                    "surface-variant": "#e0e3e6",
                    "tertiary-fixed-dim": "#7ddc7a",
                    "on-background": "#191c1e",
                    "secondary-fixed-dim": "#f8bd2a",
                    "on-tertiary-fixed": "#002204",
                    "surface-container-high": "#e6e8eb",
                    "primary-fixed-dim": "#bdc2ff",
                    "inverse-surface": "#2d3133",
                    "inverse-primary": "#bdc2ff",
                    "surface-bright": "#f7f9fc",
                    "background": "#f7f9fc",
                    "tertiary": "#002104",
                    "on-tertiary-container": "#4eab50",
                    "on-primary": "#ffffff",
                    "on-secondary-container": "#6f5100",
                    "on-secondary-fixed": "#261a00",
                    "surface-dim": "#d8dadd",
                    "secondary-container": "#fec330",
                    "tertiary-fixed": "#98f994",
                    "error": "#ba1a1a",
                    "outline": "#767683",
                    "secondary-fixed": "#ffdfa0",
                    "on-tertiary": "#ffffff",
                    "surface-container-low": "#f2f4f7"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "gutter": "24px",
                    "xl": "32px",
                    "lg": "24px",
                    "xs": "4px",
                    "base": "4px",
                    "margin-desktop": "48px",
                    "margin-mobile": "16px",
                    "sm": "8px",
                    "md": "16px"
            },
            "fontFamily": {
                    "body-lg": ["Inter"],
                    "label-md": ["Inter"],
                    "headline-md": ["Inter"],
                    "headline-lg-mobile": ["Inter"],
                    "body-md": ["Inter"],
                    "label-lg": ["Inter"],
                    "headline-sm": ["Inter"],
                    "headline-lg": ["Inter"]
            },
            "fontSize": {
                    "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                    "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "label-lg": ["14px", {"lineHeight": "20px", "fontWeight": "600"}],
                    "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}]
            }
          },
        },
      }
    </script>
</head>
<body class="bg-surface text-on-surface min-h-screen">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface dark:bg-on-background">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Parent avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZZPjDuo5vcVWxqONjvH7J4HuyHCDt4d5mrqsPHwxsExT87_1vysFlevtj7pn6O6IqMRkcSuwdcZu4qK9hwJpoSlzRZbqiqQMPY9mILf5o9EaKzpo9kMakde_ffWgGPEhfB1oNkqSKBcTrztDooV8A6LxLcHytpw1OqfEmPiRbvmJFBMZM5bLAzaHNgHu3tsECtQy-0LUxNMw1snCKI1fX4hqfRFvfvGkjQdddeG45UrdU3_Z8zwrf-xA8SummakIeg7ePrNtY70w"/>
</div>
<span class="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed">EduAdmin</span>
</div>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-primary dark:text-primary-fixed hover:bg-surface-container dark:hover:bg-inverse-surface transition-colors p-2 rounded-full">notifications</button>
</div>
</header>
<!-- Main Content -->
<main class="pt-20 pb-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
<!-- Welcome Section -->
<section class="mb-lg">
<h1 class="font-headline-lg text-headline-lg text-on-surface">Weekly Progress</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">Reviewing updates for Leo Anderson</p>
</section>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-lg">
<!-- Attendance & Grade Summary (Quick Stats) -->
<div class="md:col-span-4 grid grid-cols-1 gap-md">
<!-- Grade Average Card -->
<div class="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant flex flex-col justify-between">
<div>
<h3 class="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">Current Grade Average</h3>
<div class="flex items-baseline gap-2 mt-2">
<span class="font-headline-lg text-headline-lg text-primary">A-</span>
<span class="font-body-md text-body-md text-on-tertiary-container">(92.4%)</span>
</div>
</div>
<div class="mt-4">
<div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div class="bg-on-tertiary-container h-full w-[92.4%]"></div>
</div>
<p class="font-label-md text-label-md mt-2 text-on-surface-variant">+2.1% from last month</p>
</div>
</div>
<!-- Attendance Card -->
<div class="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant">
<h3 class="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">Attendance Rate</h3>
<div class="flex items-center gap-4 mt-4">
<div class="relative w-20 h-20">
<svg class="w-full h-full transform -rotate-90">
<circle class="text-surface-container" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" stroke-width="8"></circle>
<circle class="text-primary" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" stroke-dasharray="226.2" stroke-dashoffset="4.5" stroke-width="8"></circle>
</svg>
<div class="absolute inset-0 flex items-center justify-center font-bold text-primary">98%</div>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md text-on-surface">36 of 37 days</span>
<span class="font-label-md text-label-md text-on-tertiary-container">Excellent Standing</span>
</div>
</div>
</div>
</div>
<!-- Progress Charts (Middle Large) -->
<div class="md:col-span-8 bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant">
<div class="flex justify-between items-center mb-lg">
<h2 class="font-headline-sm text-headline-sm text-primary">Performance Trend</h2>
<select class="bg-surface-container border-none text-label-lg rounded-lg px-3 py-1 focus:ring-primary">
<option>Last 3 Months</option>
<option>Full Semester</option>
</select>
</div>
<div class="h-64 flex items-end justify-between gap-2 px-2">
<!-- Faux Chart Bars -->
<div class="flex flex-col items-center flex-1">
<div class="w-full bg-primary-container/20 rounded-t-lg relative" style="height: 70%;">
<div class="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-700" style="height: 85%;"></div>
</div>
<span class="text-label-md font-label-md mt-2">Math</span>
</div>
<div class="flex flex-col items-center flex-1">
<div class="w-full bg-primary-container/20 rounded-t-lg relative" style="height: 70%;">
<div class="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-700" style="height: 95%;"></div>
</div>
<span class="text-label-md font-label-md mt-2">Sci</span>
</div>
<div class="flex flex-col items-center flex-1">
<div class="w-full bg-primary-container/20 rounded-t-lg relative" style="height: 70%;">
<div class="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-700" style="height: 78%;"></div>
</div>
<span class="text-label-md font-label-md mt-2">Hist</span>
</div>
<div class="flex flex-col items-center flex-1">
<div class="w-full bg-primary-container/20 rounded-t-lg relative" style="height: 70%;">
<div class="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-700" style="height: 92%;"></div>
</div>
<span class="text-label-md font-label-md mt-2">Eng</span>
</div>
<div class="flex flex-col items-center flex-1">
<div class="w-full bg-primary-container/20 rounded-t-lg relative" style="height: 70%;">
<div class="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-700" style="height: 88%;"></div>
</div>
<span class="text-label-md font-label-md mt-2">Art</span>
</div>
</div>
</div>
<!-- AI Summary (Left Narrow) -->
<div class="md:col-span-5 bg-primary-container text-on-primary-container p-lg rounded-xl shadow-lg relative overflow-hidden group">
<div class="relative z-10">
<div class="flex items-center gap-2 mb-md">
<span class="material-symbols-outlined text-secondary-container">auto_awesome</span>
<h2 class="font-headline-sm text-headline-sm text-white">AI Learning Insights</h2>
</div>
<p class="font-body-md text-body-md text-primary-fixed leading-relaxed mb-lg">
                        Leo is showing exceptional focus in <strong>Quantum Mechanics</strong>. His participation in peer discussions has increased by 40% this week. Suggested focus: Review <em>Algebraic Functions</em> before the upcoming mid-terms to maintain his current upward trajectory in Math.
                    </p>
<button class="bg-secondary-container text-on-secondary-container font-label-lg text-label-lg px-6 py-2 rounded-full hover:scale-105 transition-transform">
                        Chat with Assistant
                    </button>
</div>
<div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
</div>
<!-- Notification Feed (Right Wide) -->
<div class="md:col-span-7 bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant">
<div class="flex justify-between items-center mb-md">
<h2 class="font-headline-sm text-headline-sm text-primary">Recent Updates</h2>
<button class="text-label-lg text-primary hover:underline">View All</button>
</div>
<div class="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
<!-- Notification Item -->
<div class="flex gap-4 p-3 rounded-lg hover:bg-surface-container transition-colors cursor-pointer border-l-4 border-on-tertiary-container">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-on-tertiary-fixed text-[20px]">grade</span>
</div>
<div>
<p class="font-label-lg text-label-lg text-on-surface">New Grade: Advanced Chemistry</p>
<p class="font-body-md text-body-md text-on-surface-variant">Leo scored 98% on "Covalent Bonds" quiz.</p>
<span class="font-label-md text-label-md text-outline mt-1 block">2 hours ago</span>
</div>
</div>
<!-- Notification Item -->
<div class="flex gap-4 p-3 rounded-lg hover:bg-surface-container transition-colors cursor-pointer border-l-4 border-primary">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary-fixed text-[20px]">chat_bubble</span>
</div>
<div>
<p class="font-label-lg text-label-lg text-on-surface">Note from Dr. Smith</p>
<p class="font-body-md text-body-md text-on-surface-variant">"Excellent project presentation today. Leo led the group well."</p>
<span class="font-label-md text-label-md text-outline mt-1 block">Yesterday</span>
</div>
</div>
<!-- Notification Item -->
<div class="flex gap-4 p-3 rounded-lg hover:bg-surface-container transition-colors cursor-pointer border-l-4 border-secondary">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-on-secondary-fixed text-[20px]">assignment</span>
</div>
<div>
<p class="font-label-lg text-label-lg text-on-surface">Upcoming Deadline</p>
<p class="font-body-md text-body-md text-on-surface-variant">English Essay due in 3 days.</p>
<span class="font-label-md text-label-md text-outline mt-1 block">1 day ago</span>
</div>
</div>
</div>
</div>
</div>
</main>
<button class="fixed right-6 bottom-20 md:bottom-10 z-40 w-14 h-14 bg-secondary-container text-on-secondary-container rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95">
<span class="material-symbols-outlined">chat</span>
</button>
</body></html>`;

const AI_ASSISTANT_HTML = `<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>EduAdmin AI Assistant</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "inverse-on-surface": "#eff1f4",
                    "on-secondary": "#ffffff",
                    "on-surface": "#191c1e",
                    "primary": "#000666",
                    "on-tertiary-fixed-variant": "#005313",
                    "tertiary-container": "#00390a",
                    "primary-container": "#1a237e",
                    "outline-variant": "#c6c5d4",
                    "on-primary-fixed-variant": "#343d96",
                    "on-primary-fixed": "#000767",
                    "surface-container-highest": "#e0e3e6",
                    "surface-tint": "#4c56af",
                    "on-primary-container": "#8690ee",
                    "error-container": "#ffdad6",
                    "on-surface-variant": "#454652",
                    "on-secondary-fixed-variant": "#5c4300",
                    "primary-fixed": "#e0e0ff",
                    "surface-container-lowest": "#ffffff",
                    "surface": "#f7f9fc",
                    "secondary": "#795900",
                    "on-error-container": "#93000a",
                    "on-error": "#ffffff",
                    "surface-container": "#eceef1",
                    "surface-variant": "#e0e3e6",
                    "tertiary-fixed-dim": "#7ddc7a",
                    "on-background": "#191c1e",
                    "secondary-fixed-dim": "#f8bd2a",
                    "on-tertiary-fixed": "#002204",
                    "surface-container-high": "#e6e8eb",
                    "primary-fixed-dim": "#bdc2ff",
                    "inverse-surface": "#2d3133",
                    "inverse-primary": "#bdc2ff",
                    "surface-bright": "#f7f9fc",
                    "background": "#f7f9fc",
                    "tertiary": "#002104",
                    "on-tertiary-container": "#4eab50",
                    "on-primary": "#ffffff",
                    "on-secondary-container": "#6f5100",
                    "on-secondary-fixed": "#261a00",
                    "surface-dim": "#d8dadd",
                    "secondary-container": "#fec330",
                    "tertiary-fixed": "#98f994",
                    "error": "#ba1a1a",
                    "outline": "#767683",
                    "secondary-fixed": "#ffdfa0",
                    "on-tertiary": "#ffffff",
                    "surface-container-low": "#f2f4f7"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "gutter": "24px",
                    "xl": "32px",
                    "lg": "24px",
                    "xs": "4px",
                    "base": "4px",
                    "margin-desktop": "48px",
                    "margin-mobile": "16px",
                    "sm": "8px",
                    "md": "16px"
            },
            "fontFamily": {
                    "body-lg": ["Inter"],
                    "label-md": ["Inter"],
                    "headline-md": ["Inter"],
                    "headline-lg-mobile": ["Inter"],
                    "body-md": ["Inter"],
                    "label-lg": ["Inter"],
                    "headline-sm": ["Inter"],
                    "headline-lg": ["Inter"]
            },
            "fontSize": {
                    "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                    "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "label-lg": ["14px", {"lineHeight": "20px", "fontWeight": "600"}],
                    "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}]
            }
          },
        },
      }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; background-color: #f7f9fc; min-height: max(884px, 100dvh); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .chat-container::-webkit-scrollbar { width: 6px; }
        .chat-container::-webkit-scrollbar-thumb { background: #c6c5d4; border-radius: 10px; }
        .glass-card { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
    </style>
</head>
<body class="bg-background text-on-surface overflow-hidden h-screen flex flex-col">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface dark:bg-on-background">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
<img class="w-full h-full object-cover" data-alt="Student photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0pP2new1bZLGwvKLfS-HjkRk_GH7r4cs1uJ3oBuljLKVNF1UNy-azUoHndUX4WKBA4kKeQpfIlc7q-ibPis0CkkElicADp3_SNNo5PT6RrkKmEjJcwjnx2cGbV5E1hGuXCEYPj5iLUX2p_3gPjVfb0Lah64z1sPHZzjINTkb-_2XdNMiiz2euc9PKxBVb9ZLYyGAd9PmeyZf5OYsAvIaiNHCzvscOaoS4zUsWznoQ4VVYHGAzBAv8yXNnn8Uly-BKUyS_rVuXXOE"/>
</div>
<h1 class="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed">EduAdmin</h1>
</div>
<div class="flex items-center gap-md">
<button class="material-symbols-outlined p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors">notifications</button>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-1 mt-16 mb-20 md:mb-0 flex overflow-hidden">
<!-- Sidebar: Curriculum Context -->
<aside class="hidden lg:flex flex-col w-80 p-lg border-r border-outline-variant bg-surface-container-low overflow-y-auto">
<div class="flex items-center gap-sm mb-lg">
<span class="material-symbols-outlined text-primary">school</span>
<h2 class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">Current Module</h2>
</div>
<!-- Curriculum Card -->
<div class="glass-card rounded-xl p-md shadow-sm mb-lg border-l-4 border-primary">
<p class="font-label-md text-label-md text-primary mb-1">Advanced Physics</p>
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-2">Quantum Mechanics</h3>
<div class="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div class="bg-primary h-full w-[65%]"></div>
</div>
<p class="font-label-md text-label-md text-on-surface-variant mt-2">65% Course Completion</p>
</div>
<!-- Key Topics -->
<div class="space-y-md">
<h4 class="font-label-lg text-label-lg text-on-surface-variant">Quick Explainers</h4>
<button class="w-full text-left p-md rounded-xl bg-surface hover:bg-primary-fixed transition-all group border border-outline-variant">
<div class="flex justify-between items-center">
<span class="font-body-md text-body-md">Wave-Particle Duality</span>
<span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</button>
<button class="w-full text-left p-md rounded-xl bg-surface hover:bg-primary-fixed transition-all group border border-outline-variant">
<div class="flex justify-between items-center">
<span class="font-body-md text-body-md">Schrödinger's Equation</span>
<span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</button>
<button class="w-full text-left p-md rounded-xl bg-surface hover:bg-primary-fixed transition-all group border border-outline-variant">
<div class="flex justify-between items-center">
<span class="font-body-md text-body-md">Quantum Entanglement</span>
<span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</button>
</div>
</aside>
<!-- Chat Area -->
<section class="flex-1 flex flex-col bg-surface-bright relative">
<!-- AI Welcome Banner -->
<div class="p-lg bg-primary text-white flex items-center justify-between shadow-md">
<div class="flex items-center gap-md">
<div class="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center animate-float">
<span class="material-symbols-outlined text-on-secondary-container text-3xl">smart_toy</span>
</div>
<div>
<h2 class="font-headline-sm text-headline-sm">Learning Assistant</h2>
<p class="font-body-md text-body-md opacity-90">Ready to simplify complex concepts for you.</p>
</div>
</div>
<button class="hidden sm:flex items-center gap-sm bg-white/20 hover:bg-white/30 px-lg py-sm rounded-full transition-colors border border-white/20">
<span class="material-symbols-outlined text-sm">history</span>
<span class="font-label-md text-label-md">Recent Sessions</span>
</button>
</div>
<!-- Chat Container -->
<div class="flex-1 overflow-y-auto chat-container p-lg space-y-lg flex flex-col" id="chat-container">
<!-- Received Message (AI) -->
<div class="flex gap-md max-w-2xl">
<div class="w-8 h-8 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center">
<span class="material-symbols-outlined text-xs text-on-secondary-container" data-weight="fill">smart_toy</span>
</div>
<div class="flex flex-col gap-sm">
<div class="bg-surface-container rounded-2xl rounded-tl-none p-lg text-on-surface border border-outline-variant">
<p class="font-body-md text-body-md">Hello! I see you're currently working on <strong>Quantum Mechanics</strong> in your Advanced Physics module. How can I help you today? I can explain specific topics, solve practice problems, or summarize your latest lecture notes.</p>
</div>
<span class="font-label-md text-label-md text-on-surface-variant ml-2">Just now</span>
</div>
</div>
<!-- Sent Message (User) -->
<div class="flex gap-md max-w-2xl self-end flex-row-reverse">
<div class="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
<span class="material-symbols-outlined text-xs text-white">person</span>
</div>
<div class="flex flex-col gap-sm items-end">
<div class="bg-primary-container text-on-primary-container rounded-2xl rounded-tr-none p-lg">
<p class="font-body-md text-body-md">Can you explain Wave-Particle Duality in simple terms? I'm finding it hard to visualize.</p>
</div>
<span class="font-label-md text-label-md text-on-surface-variant mr-2">Sent 1m ago</span>
</div>
</div>
<!-- Received Message (AI - Detailed Response) -->
<div class="flex gap-md max-w-3xl">
<div class="w-8 h-8 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center">
<span class="material-symbols-outlined text-xs text-on-secondary-container" data-weight="fill">smart_toy</span>
</div>
<div class="flex flex-col gap-sm">
<div class="bg-white rounded-2xl rounded-tl-none p-lg shadow-sm border border-outline-variant space-y-md">
<h3 class="font-label-lg text-label-lg text-primary">Explain this Topic: Wave-Particle Duality</h3>
<p class="font-body-md text-body-md">Imagine a <strong>duck</strong> on a pond. It's a "particle" (a physical thing with a location). But as it swims, it creates <strong>ripples</strong> (waves that spread out). In the quantum world, tiny things like electrons are both the duck and the ripples at the same time.</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-md p-md bg-surface rounded-xl border border-dashed border-primary/30">
<div class="flex items-start gap-sm">
<span class="material-symbols-outlined text-primary">lens</span>
<div>
<p class="font-label-md text-label-md font-bold">As a Particle</p>
<p class="font-label-md text-label-md opacity-80">It has a fixed position and hits like a tiny ball.</p>
</div>
</div>
<div class="flex items-start gap-sm">
<span class="material-symbols-outlined text-primary">waves</span>
<div>
<p class="font-label-md text-label-md font-bold">As a Wave</p>
<p class="font-label-md text-label-md opacity-80">It can interfere with itself and exist in multiple places.</p>
</div>
</div>
</div>
<div class="p-md bg-tertiary-container/10 border-l-4 border-on-tertiary-container rounded-r-lg">
<p class="font-label-md text-label-md text-on-tertiary-fixed-variant"><strong>Supportive Tip:</strong> Don't worry if this feels counter-intuitive. Richard Feynman, a Nobel Prize winner, once said: "I think I can safely say that nobody understands quantum mechanics." You're doing great!</p>
</div>
</div>
<div class="flex gap-sm">
<button class="bg-surface-container-high px-md py-1 rounded-full text-label-md font-label-md hover:bg-surface-container-highest transition-colors">👍 Helpful</button>
<button class="bg-surface-container-high px-md py-1 rounded-full text-label-md font-label-md hover:bg-surface-container-highest transition-colors">👎 More details</button>
</div>
</div>
</div>
</div>
<!-- Input Area -->
<div class="p-lg bg-surface border-t border-outline-variant">
<div class="max-w-4xl mx-auto flex items-end gap-md relative">
<div class="flex-1 relative">
<textarea class="w-full p-lg pr-12 rounded-2xl border-outline focus:ring-2 focus:ring-primary focus:border-primary resize-none bg-white font-body-md text-body-md" placeholder="Ask a question about your curriculum..." rows="1"></textarea>
<button class="absolute right-4 bottom-4 material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">attach_file</button>
</div>
<button class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:shadow-lg active:scale-95 transition-all">
<span class="material-symbols-outlined">send</span>
</button>
</div>
<div class="max-w-4xl mx-auto flex flex-wrap gap-sm mt-md">
<button class="px-md py-sm bg-secondary-fixed text-on-secondary-fixed rounded-lg text-label-md font-label-md hover:brightness-95 transition-all flex items-center gap-xs">
<span class="material-symbols-outlined text-sm">psychology</span> Explain this Topic
                    </button>
<button class="px-md py-sm bg-surface-container-high text-on-surface-variant rounded-lg text-label-md font-label-md hover:bg-surface-container-highest transition-all">
                        Summarize Lecture
                    </button>
<button class="px-md py-sm bg-surface-container-high text-on-surface-variant rounded-lg text-label-md font-label-md hover:bg-surface-container-highest transition-all">
                        Practice Quiz
                    </button>
</div>
</div>
</section>
<!-- Right Side: Learning Bento -->
<aside class="hidden xl:flex flex-col w-96 p-lg border-l border-outline-variant bg-surface-container-low gap-lg">
<h2 class="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">Academic Insights</h2>
<div class="grid grid-cols-2 gap-md">
<div class="bg-white p-md rounded-xl shadow-sm border border-outline-variant flex flex-col items-center justify-center">
<span class="material-symbols-outlined text-secondary text-3xl mb-1">bolt</span>
<span class="font-headline-sm text-headline-sm text-on-surface">12</span>
<span class="font-label-md text-label-md text-on-surface-variant">Day Streak</span>
</div>
<div class="bg-white p-md rounded-xl shadow-sm border border-outline-variant flex flex-col items-center justify-center">
<span class="material-symbols-outlined text-on-tertiary-container text-3xl mb-1">check_circle</span>
<span class="font-headline-sm text-headline-sm text-on-surface">88%</span>
<span class="font-label-md text-label-md text-on-surface-variant">Avg Grade</span>
</div>
</div>
<div class="bg-white p-md rounded-xl shadow-sm border border-outline-variant relative overflow-hidden h-48">
<div class="relative z-10">
<p class="font-label-lg text-label-lg font-bold text-primary">Concept Map</p>
<p class="font-body-md text-body-md opacity-80">Visualizing Physics connections...</p>
</div>
</div>
<div class="bg-primary-container/10 p-lg rounded-xl border border-primary-container">
<h4 class="font-label-lg text-label-lg text-primary mb-md">Recommended Review</h4>
<ul class="space-y-md">
<li class="flex items-center gap-sm">
<span class="w-2 h-2 rounded-full bg-primary"></span>
<p class="font-body-md text-body-md">Review Newton's Laws (Prerequisite)</p>
</li>
<li class="flex items-center gap-sm">
<span class="w-2 h-2 rounded-full bg-primary"></span>
<p class="font-body-md text-body-md">Chapter 4 Practice Questions</p>
</li>
</ul>
<button class="w-full mt-lg py-sm bg-primary text-white rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-all">Start Session</button>
</div>
</aside>
</main>
</body></html>`;

type PortalTab = 'student' | 'teacher' | 'parent' | 'ai';

export const SchoolAdminDemo: React.FC<{ onBuyNow?: () => void }> = ({ onBuyNow }) => {
  const [activePortal, setActivePortal] = useState<PortalTab>('student');

  const activeHtml = {
    student: STUDENT_PORTAL_HTML,
    teacher: TEACHER_DASHBOARD_HTML,
    parent: PARENT_PORTAL_HTML,
    ai: AI_ASSISTANT_HTML,
  }[activePortal];

  return (
    <div className="w-full h-full min-h-screen bg-slate-950 flex flex-col">
      {/* Marketplace Top Navigation / Portal Selector Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Live Website Demo</span>
          </div>
          <span className="text-slate-300 text-xs font-mono hidden md:inline">EduAdmin School Portal Suite</span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl space-x-1">
          <button
            onClick={() => setActivePortal('student')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center space-x-1.5 ${
              activePortal === 'student'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap size={14} />
            <span>Student Portal</span>
          </button>

          <button
            onClick={() => setActivePortal('teacher')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center space-x-1.5 ${
              activePortal === 'teacher'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users size={14} />
            <span>Teacher Dashboard</span>
          </button>

          <button
            onClick={() => setActivePortal('parent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center space-x-1.5 ${
              activePortal === 'parent'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HeartHandshake size={14} />
            <span>Parent Portal</span>
          </button>

          <button
            onClick={() => setActivePortal('ai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center space-x-1.5 ${
              activePortal === 'ai'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot size={14} />
            <span>AI Assistant</span>
          </button>
        </div>

        {onBuyNow && (
          <button
            onClick={onBuyNow}
            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center space-x-2"
          >
            <ShoppingBag size={14} />
            <span>Buy Website Template ($799)</span>
          </button>
        )}
      </div>

      {/* Render Active View in Frame */}
      <iframe
        key={activePortal}
        srcDoc={activeHtml}
        title="EduAdmin School Portal"
        className="w-full flex-grow border-none min-h-[90vh]"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
};

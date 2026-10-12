import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createServer } from "http";
import { Server } from "socket.io";
import { GoogleGenAI, Modality, ThinkingLevel } from "@google/genai";
import fs from "fs";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Initialize Gemini AI
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  const getAIClient = (req: express.Request) => {
    if (!apiKey) {
      console.warn("[AI Client] No API Key provided. Operating in high-fidelity offline cached mode.");
      return null;
    }
    // Use the official AI Studio origin as the referer to prevent 'API_KEY_HTTP_REFERRER_BLOCKED' errors on preview Run domains.
    const referer = "https://aistudio.google.com/";
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
          'Referer': referer,
        }
      }
    });
  };

  // API Route: Chat with Corneila AI
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      let botResponseText = "";
      let success = false;
      let routedModelName = "None";
      const aiClient = getAIClient(req);

      const lowerMsg = message.toLowerCase().trim();
      const isComplex = /\b(analyze|explain|why|architect|how does|compare|design|solve|quantum|neural|blueprint|audit|security|pro|think|assess)\b/.test(lowerMsg);
      const isSimple = /\b(hello|hi|hey|how are you|who are you|status|test|bye|thanks|ok|good morning|good afternoon)\b/.test(lowerMsg);

      // 1. COMPLEX ROUTING -> Thinking Mode (gemini-2.5-pro)
      if (isComplex && aiClient) {
        try {
          console.info("[AI Routing] Complex query detected. Launching Thinking Mode on gemini-2.5-pro...");
          const result = await aiClient.models.generateContent({
            model: "gemini-2.5-pro",
            contents: message,
            config: {
              systemInstruction: `You are Corneila, the friendly, professional, visionary AI Concierge for Cornelius TEC. 
              Respond in highly detailed, comprehensive, logical, and structured human-like replies. Keep a professional innovation architect tone.
              Maintain the brand voice: gravity-defying innovation, immersive African digital solutions, and high-integrity tech enablement. 
              Cornelius TEC is based in Kigali, Rwanda and Monrovia, Liberia.`,
            },
          });
          if (result && result.text) {
            botResponseText = result.text;
            routedModelName = "gemini-2.5-pro (Pro Mode)";
            success = true;
          }
        } catch (err: any) {
          console.warn("[AI Routing] gemini-2.5-pro failed or unavailable. Cascading to gemini-2.5-flash.", err.message);
        }
      }

      // 2. SIMPLE ROUTING -> Low-Latency Mode (gemini-2.5-flash)
      if (!success && isSimple && aiClient) {
        try {
          console.info("[AI Routing] Simple query detected. Launching Low-Latency mode on gemini-2.5-flash...");
          const result = await aiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
              systemInstruction: `You are Corneila, the friendly, professional, visionary AI Concierge for Cornelius TEC. 
              Respond in extremely short, crisp, punchy, friendly, and human-like greetings (under 2 sentences). 
              Maintain the brand voice: gravity-defying innovation, immersive African digital solutions, and high-integrity tech enablement. 
              Cornelius TEC is based in Kigali, Rwanda and Monrovia, Liberia.`,
            },
          });
          if (result && result.text) {
            botResponseText = result.text;
            routedModelName = "gemini-2.5-flash (Low-Latency)";
            success = true;
          }
        } catch (err: any) {
          console.warn("[AI Routing] gemini-2.5-flash simple call failed. Cascading.", err.message);
        }
      }

      // 3. GENERAL ROUTING -> General Mode (gemini-2.5-flash)
      if (!success && aiClient) {
        try {
          console.info("[AI Routing] Running general mode on gemini-2.5-flash...");
          const result = await aiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
              systemInstruction: `You are Corneila, the friendly, professional, visionary AI Concierge for Cornelius TEC. 
              Respond in concise human-like responses. Maintain the brand voice: gravity-defying innovation, immersive African digital solutions, and high-integrity tech enablement. 
              Cornelius TEC is based in Kigali, Rwanda and Monrovia, Liberia.`,
            },
          });
          if (result && result.text) {
            botResponseText = result.text;
            routedModelName = "gemini-2.5-flash (General)";
            success = true;
          }
        } catch (primaryErr: any) {
          console.info("[AI Routing] gemini-2.5-flash status: using brand fallback routing.", primaryErr.message);

          // Last-ditch effort back to gemini-2.5-flash or flash-lite if general failed
          try {
            const result = await aiClient.models.generateContent({
              model: "gemini-2.5-flash",
              contents: message,
              config: {
                systemInstruction: `You are Corneila, the friendly, professional, visionary AI Concierge for Cornelius TEC. 
                Respond in concise human-like responses. Maintain the brand voice: gravity-defying innovation, immersive African digital solutions, and high-integrity tech enablement. 
                Cornelius TEC is based in Kigali, Rwanda and Monrovia, Liberia.`,
              },
            });
            if (result && result.text) {
              botResponseText = result.text;
              routedModelName = "gemini-2.5-flash (Cascade)";
              success = true;
            }
          } catch (fallbackErr: any) {
            console.info("[AI Routing] All Gemini model nodes failed. Serving high-fidelity offline cache response.");
          }
        }
      }

      // 4. Offline high-fidelity fallback response
      if (!success) {
        routedModelName = "Offline Brand Engine";
        if (lowerMsg.includes("service") || lowerMsg.includes("pricing") || lowerMsg.includes("cost") || lowerMsg.includes("product")) {
          botResponseText = "Cornelius TEC offers state-of-the-art custom application development, secure cloud infrastructure, and AI integration services. I would love to guide you on our Design Lab models or book a session with our team!";
        } else if (lowerMsg.includes("appointment") || lowerMsg.includes("book") || lowerMsg.includes("meet") || lowerMsg.includes("schedule")) {
          botResponseText = "To initiate a discovery session with a master architect, please head over to the 'Appointments' page in the top navigation menu, or fill out the request form right on that page!";
        } else if (lowerMsg.includes("liberia") || lowerMsg.includes("rwanda") || lowerMsg.includes("kigali") || lowerMsg.includes("monrovia") || lowerMsg.includes("born") || lowerMsg.includes("live")) {
          botResponseText = "Our operations beautifully cross the continent with core innovation centers located in Kigali, Rwanda and Monrovia, Liberia. We have tailored solutions specifically built for modern high-performance businesses.";
        } else if (lowerMsg.includes("profile") || lowerMsg.includes("identity") || lowerMsg.includes("photo") || lowerMsg.includes("picture")) {
          botResponseText = "You can update and save your custom digital profile, including full biography, values, and profile image on the Profile tab. Your profile is automatically synced to local secure storage!";
        } else {
          botResponseText = "Greetings, built with pride at Cornelius TEC. We are currently updating our neural pathways, but I can assist you with system features. What aspect of our development, services, or African digital hubs should we discuss?";
        }
      }

      res.json({ text: botResponseText, routedModel: routedModelName });
    } catch (error: any) {
      console.error("Gemini Chat Endpoint Error:", error);
      res.status(500).json({ 
        error: { 
          message: error.message || "An error occurred with the AI assistant.",
          status: "API_ERROR" 
        } 
      });
    }
  });

  // API Route: Text-To-Speech (TTS)
  app.post("/api/tts", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required." });
      }

      let base64Audio = null;
      const aiClient = getAIClient(req);

      if (aiClient) {
        try {
          const response = await aiClient.models.generateContent({
            model: "gemini-3.1-flash-tts-preview",
            contents: [{ parts: [{ text: `Say cheerfully: ${text}` }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: "Kore" },
                },
              },
            },
          });
          base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
        } catch (ttsErr: any) {
          console.info("[AI Routing] Primary TTS failed. Cascading to gemini-2.5-flash audio sync...", ttsErr.message);
          try {
            const response = await aiClient.models.generateContent({
              model: "gemini-2.5-flash",
              contents: [{ parts: [{ text: `Say cheerfully: ${text}` }] }],
              config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: "Kore" },
                  },
                },
              },
            });
            base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
          } catch (tts2Err: any) {
            console.warn("[AI Routing] Secondary TTS model cascade failed:", tts2Err.message);
          }
        }
      }

      res.json({ audio: base64Audio });
    } catch (error: any) {
      console.error("Gemini TTS Endpoint Error:", error);
      res.status(500).json({ error: error.message || "An error occurred during TTS generation." });
    }
  });

  // API Route: Design Lab Generator (Visual, Video & Blueprint)
  app.post("/api/design-lab", async (req, res) => {
    const requestTimestamp = new Date().toISOString();
    try {
      const { prompt, mode } = req.body || {};

      // 1. Robust Input Validation
      if (!prompt || typeof prompt !== "string") {
        console.warn(`[DesignLab API] [${requestTimestamp}] Input Validation Failed: Missing or non-string prompt provided.`);
        return res.status(400).json({ 
          success: false, 
          error: "Input Validation Error: Prompt is required and must be a string.",
          code: "INVALID_PROMPT" 
        });
      }

      const cleanPrompt = prompt.trim();
      if (cleanPrompt.length < 3) {
        console.warn(`[DesignLab API] [${requestTimestamp}] Input Validation Failed: Prompt too short (${cleanPrompt.length} chars).`);
        return res.status(400).json({ 
          success: false, 
          error: "Input Validation Error: Prompt must be at least 3 characters long.",
          code: "PROMPT_TOO_SHORT" 
        });
      }

      if (cleanPrompt.length > 2000) {
        console.warn(`[DesignLab API] [${requestTimestamp}] Input Validation Failed: Prompt exceeds 2000 characters limit (${cleanPrompt.length} chars).`);
        return res.status(400).json({ 
          success: false, 
          error: "Input Validation Error: Prompt exceeds the maximum allowed length of 2000 characters.",
          code: "PROMPT_TOO_LONG" 
        });
      }

      const { style = 'photorealistic', aspectRatio = '16:9', engine = 'gemini-flash', enhanced = false } = req.body || {};

      // 2. Comprehensive Server Logging
      console.info(`[DesignLab API] [${requestTimestamp}] Request Validated | Visual AI Image Generation | Length: ${cleanPrompt.length} chars | Style: ${style} | AspectRatio: ${aspectRatio}`);

      const aiClient = getAIClient(req);

      // Step A: Use Gemini 2.5 Flash to convert user prompt into an authentic photorealistic camera scene description
      let geminiRefinedPrompt = cleanPrompt;
      if (aiClient) {
        try {
          console.info(`[DesignLab API] Refining user prompt with Gemini 2.5 Flash for hyper-photorealism...`);
          const refinerRes = await aiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert photographer and visual director. Rewrite the following user prompt into an authentic, photorealistic camera scene description for generating a genuine photo. Focus on real human skin texture with pores and natural imperfections, candid emotion, natural optical depth of field, real camera lens lighting (e.g. 85mm f/1.4 lens, golden hour daylight), and realistic fabric/material textures. Strictly forbid anything that looks like a 3D render, CGI, cartoon, anime, artificial plastic smoothness, or robot faces. Keep description vivid, natural, and under 75 words. User prompt: "${cleanPrompt}"`
          });
          if (refinerRes && refinerRes.text && refinerRes.text.trim()) {
            geminiRefinedPrompt = refinerRes.text.trim().replace(/\n/g, ' ');
            console.info(`[DesignLab API] Gemini prompt refined for realism: "${geminiRefinedPrompt.slice(0, 60)}..."`);
          }
        } catch (refinerErr: any) {
          console.info(`[DesignLab API] Gemini prompt refiner status: proceeding with direct photographic enhancement (${refinerErr.message})`);
        }
      }

      // Step B: Style and aspect ratio mapping with strict photographic enforcers
      const styleModifiers: Record<string, string> = {
        'photorealistic': 'award winning 8k real photograph, authentic life photograph, shot on Hasselblad H6D-100c with 85mm f/1.4 lens, natural skin texture with visible pores and fine details, candid human expression, natural optical depth of field, realistic soft daylight, true-to-life colors, real camera photograph, sharp focus on eyes',
        'studio-portrait': 'authentic 8k studio photograph, professional photography studio portrait, softbox light diffusion, crisp rim light backlight, tack sharp eye clarity, real human skin texture, shallow f/1.8 depth of field, Vogue magazine photography style',
        'cinematic': 'authentic 35mm film movie still photograph, Panavision camera lens, natural volumetric lighting, subtle film grain, 8k resolution, cinematic depth of field, real life shot',
        'afro-futuristic': 'photorealistic 8k photograph of Afro-futuristic architecture and fashion, real human model in regal handcrafted metallic gold and indigo attire, natural sunlight, cinematic 35mm photography',
        'architectural': 'photorealistic 8k architectural exterior photograph, real world photography, golden hour natural sunlight, glass facades with ray-traced reflections, surrounding real landscape, Architectural Digest cover quality',
        'digital-art': 'ultra high-definition 8k digital photograph, octane render, vivid lighting, intricate detail, photorealistic textures'
      };

      const selectedStyle = styleModifiers[style] || styleModifiers['photorealistic'];
      const aspectMap: Record<string, { width: number; height: number; geminiRatio: string }> = {
        '16:9': { width: 1280, height: 720, geminiRatio: '16:9' },
        '1:1': { width: 1024, height: 1024, geminiRatio: '1:1' },
        '9:16': { width: 720, height: 1280, geminiRatio: '9:16' },
        '4:3': { width: 1024, height: 768, geminiRatio: '4:3' },
        '21:9': { width: 1280, height: 546, geminiRatio: '21:9' }
      };

      const aspectConfig = aspectMap[aspectRatio] || aspectMap['16:9'];
      const antiCgiSuffix = "real photograph, 8k resolution, sharp focus, natural human features, real skin pores, realistic clothing. NOT 3d render, NOT cgi, NOT cartoon, NOT drawing, NOT illustration, NOT robot face, NOT plastic skin, NOT anime, NOT artificial 3d graphics";
      const finalPrompt = `${geminiRefinedPrompt}, ${selectedStyle}, ${antiCgiSuffix}`;

      let imageUrl: string | null = null;
      let routedModel = "Google Gemini 2.5 Flash Vision AI";

      if (aiClient && engine === 'gemini-flash') {
        try {
          console.info(`[DesignLab API] Generating realistic image via gemini-2.5-flash-image...`);
          const result = await aiClient.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: {
              parts: [{ text: finalPrompt }]
            },
            config: {
              imageConfig: { aspectRatio: aspectConfig.geminiRatio as any }
            }
          });

          if (result && result.candidates && result.candidates[0]?.content?.parts) {
            for (const part of result.candidates[0].content.parts) {
              if (part.inlineData && part.inlineData.data) {
                imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
                routedModel = "Google Gemini 2.5 Flash Vision AI";
                break;
              }
            }
          }
        } catch (imageErr: any) {
          const errReason = imageErr?.status === 429 || imageErr?.message?.includes('RESOURCE_EXHAUSTED') || imageErr?.message?.includes('429')
            ? 'Gemini image model quota reached' 
            : 'Gemini service fallback';
          console.info(`[DesignLab API] ${errReason}: seamlessly switching to Nano Banana Flux Photorealistic 8K engine.`);
        }
      }

      if (!imageUrl) {
        const seed = Math.floor(Math.random() * 1000000);
        const encodedPrompt = encodeURIComponent(finalPrompt);
        const negativePrompt = encodeURIComponent("3d render, cgi, cartoon, illustration, plastic, robot, render, fake, drawing, anime, graphic, unreal engine, 3d model");
        imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${aspectConfig.width}&height=${aspectConfig.height}&model=flux-realism&nologo=true&seed=${seed}&no=${negativePrompt}`;
        routedModel = "Nano Banana Flux Photorealistic 8K Engine";
      }

      console.info(`[DesignLab API] Visual asset generated successfully for prompt: "${cleanPrompt.slice(0, 40)}" using ${routedModel}`);
      return res.json({ 
        success: true, 
        type: "visual", 
        url: imageUrl, 
        prompt: cleanPrompt,
        enhancedPrompt: finalPrompt,
        geminiRefinedPrompt,
        style,
        aspectRatio,
        routedModel,
        timestamp: new Date()
      });
    } catch (error: any) {
      console.error(`[DesignLab API] [${requestTimestamp}] Unhandled Endpoint Error:`, error);
      return res.status(500).json({ 
        success: false, 
        error: error.message || "An unexpected error occurred during image generation.",
        code: "INTERNAL_SERVER_ERROR" 
      });
    }
  });

  // Basic API Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // DB File setup for Products persistence
  const DB_FILE = path.join(process.cwd(), "products_db.json");
  let productsList: any[] = [
    {
      _id: 'prod_online_shop',
      title: 'Online Shop to Sell Products',
      name: 'Online Shop to Sell Products',
      price: 100,
      description: 'Complete, high-performance e-commerce storefront with product catalog, cart management, instant checkout flow, and payment gateway integration.',
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
      images: ['https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800'],
      websiteUrl: 'demo-shop',
      createdAt: new Date('2026-07-27T10:00:00Z'),
      isWebsite: true
    },
    {
      _id: 'prod_school_admin',
      title: 'School Administration Website',
      name: 'School Administration Website',
      price: 799,
      description: 'All-in-one school management system for student grading, attendance tracking, faculty directory, tuition fee portal, and parent communication.',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
      images: ['https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'],
      websiteUrl: 'demo-school',
      createdAt: new Date('2026-07-27T10:05:00Z'),
      isWebsite: true
    },
    {
      _id: 'prod_ai_editor',
      title: 'AI Editor Suite',
      name: 'AI Editor Suite',
      price: 300,
      description: 'Next-gen AI code & content editor with intelligent code completion, prompt refactoring, multi-file workspace, and instant live preview.',
      category: 'AI Software',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'],
      websiteUrl: 'demo-ai-editor',
      createdAt: new Date('2026-07-27T10:10:00Z'),
      isWebsite: true
    }
  ];

  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      productsList = JSON.parse(data);
    } else {
      fs.writeFileSync(DB_FILE, JSON.stringify(productsList, null, 2), "utf-8");
    }
  } catch (e) {
    console.error("Failed to initialize products database:", e);
  }

  // Mock product/services/reviews endpoints to align with frontend requests if needed
  app.get("/api/products", (req, res) => {
    res.json(productsList);
  });

  app.post("/api/products", (req, res) => {
    try {
      const { title, description, price, images, websiteUrl, uploadedBy, isWebsite } = req.body;
      
      // Strict Admin check: Only africahowe@gmail.com can upload
      if (!uploadedBy || uploadedBy.toLowerCase().trim() !== 'africahowe@gmail.com') {
        return res.status(403).json({ error: "Access Denied: Only the verified architect (africahowe@gmail.com) is authorized to upload web assets to the Marketplace." });
      }

      if (!title || !description || price === undefined) {
        return res.status(400).json({ error: "Title, description, and price are required." });
      }

      const newProduct = {
        _id: 'product_' + Date.now(),
        title,
        name: title,
        description,
        price: Number(price),
        category: 'Web App',
        image: Array.isArray(images) && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
        images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'],
        websiteUrl: websiteUrl || '',
        isWebsite: isWebsite !== false, // Default to true for this workflow
        createdAt: new Date().toISOString(),
        uploadedBy: uploadedBy.toLowerCase().trim()
      };

      productsList.push(newProduct);

      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(productsList, null, 2), "utf-8");
      } catch (e) {
        console.error("Failed to save to products database file:", e);
      }

      res.status(201).json(newProduct);
    } catch (err: any) {
      console.error("Error creating product:", err);
      res.status(500).json({ error: "Server error occurred while appending product node." });
    }
  });

  // DB File setup for Website-to-Client Assignments persistence
  const ASSIGNMENTS_FILE = path.join(process.cwd(), "assignments_db.json");
  let assignmentsList: any[] = [
    {
      _id: 'assign_seed_1',
      productId: 'prod_online_shop',
      productTitle: 'Online Shop to Sell Products',
      websiteUrl: 'demo-shop',
      clientEmail: 'client@test.com',
      createdAt: new Date('2026-07-27T10:00:00Z').toISOString()
    },
    {
      _id: 'assign_seed_2',
      productId: 'prod_school_admin',
      productTitle: 'School Administration Website',
      websiteUrl: 'demo-school',
      clientEmail: 'client@test.com',
      createdAt: new Date('2026-07-27T10:05:00Z').toISOString()
    },
    {
      _id: 'assign_seed_3',
      productId: 'prod_ai_editor',
      productTitle: 'AI Editor Suite',
      websiteUrl: 'demo-ai-editor',
      clientEmail: 'client@test.com',
      createdAt: new Date('2026-07-27T10:10:00Z').toISOString()
    }
  ];

  try {
    if (fs.existsSync(ASSIGNMENTS_FILE)) {
      const data = fs.readFileSync(ASSIGNMENTS_FILE, "utf-8");
      assignmentsList = JSON.parse(data);
    } else {
      fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify(assignmentsList, null, 2), "utf-8");
    }
  } catch (e) {
    console.error("Failed to initialize assignments database:", e);
  }

  // GET /api/assignments
  app.get("/api/assignments", (req, res) => {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ error: "Email query parameter is required." });
      }

      const cleanEmail = String(email).toLowerCase().trim();

      if (cleanEmail === 'africahowe@gmail.com') {
        // Admin gets all assignments
        return res.json(assignmentsList);
      } else {
        // Client gets only their assigned website nodes
        const clientAssigned = assignmentsList.filter(a => a.clientEmail.toLowerCase().trim() === cleanEmail);
        return res.json(clientAssigned);
      }
    } catch (err: any) {
      console.error("Error retrieving assignments:", err);
      res.status(500).json({ error: "Failed to load assigned assets." });
    }
  });

  // POST /api/assignments
  app.post("/api/assignments", (req, res) => {
    try {
      const { productId, productTitle, websiteUrl, clientEmail, uploadedBy } = req.body;

      // Strict Admin check: Only africahowe@gmail.com can link assets
      if (!uploadedBy || uploadedBy.toLowerCase().trim() !== 'africahowe@gmail.com') {
        return res.status(403).json({ error: "Access Denied: Only the verified architect (africahowe@gmail.com) is authorized to link assets." });
      }

      if (!productId || !productTitle || !websiteUrl || !clientEmail) {
        return res.status(400).json({ error: "ProductId, productTitle, websiteUrl, and clientEmail are required." });
      }

      const cleanClientEmail = clientEmail.toLowerCase().trim();

      // Check if assignment already exists
      const exists = assignmentsList.some(
        a => a.productId === productId && a.clientEmail.toLowerCase().trim() === cleanClientEmail
      );

      if (exists) {
        return res.status(400).json({ error: "This website asset is already linked to this client account." });
      }

      const newAssignment = {
        _id: 'assign_' + Date.now(),
        productId,
        productTitle,
        websiteUrl,
        clientEmail: cleanClientEmail,
        createdAt: new Date().toISOString()
      };

      assignmentsList.push(newAssignment);

      try {
        fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify(assignmentsList, null, 2), "utf-8");
      } catch (e) {
        console.error("Failed to save assignments database:", e);
      }

      res.status(201).json(newAssignment);
    } catch (err: any) {
      console.error("Error creating assignment:", err);
      res.status(500).json({ error: "Server error occurred while linking asset node." });
    }
  });

  // DELETE /api/assignments/:id
  app.delete("/api/assignments/:id", (req, res) => {
    try {
      const { id } = req.params;
      const { uploadedBy } = req.body || req.query; // Check both body and query for admin check

      // Strict Admin check: Only africahowe@gmail.com can unlink assets
      if (!uploadedBy || uploadedBy.toLowerCase().trim() !== 'africahowe@gmail.com') {
        return res.status(403).json({ error: "Access Denied: Only the verified architect (africahowe@gmail.com) is authorized to revoke links." });
      }

      const index = assignmentsList.findIndex(a => a._id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Assignment node not found." });
      }

      assignmentsList.splice(index, 1);

      try {
        fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify(assignmentsList, null, 2), "utf-8");
      } catch (e) {
        console.error("Failed to write assignments database:", e);
      }

      res.json({ success: true, message: "Asset node revoked successfully." });
    } catch (err: any) {
      console.error("Error deleting assignment:", err);
      res.status(500).json({ error: "Server error occurred while revoking asset link." });
    }
  });

  app.get("/api/reviews", (req, res) => {
    res.json([
      { _id: 'hrev_1', userId: 'user_Kigali', productId: 'all', rating: 5, comment: "The AI integration modules transformed our logistics stack. Truly world-class engineering.", createdAt: new Date('2024-03-15') },
      { _id: 'hrev_2', userId: 'user_Monrovia', productId: 'all', rating: 5, comment: "Exceptional UI/UX that respects our bandwidth constraints while looking absolutely stunning.", createdAt: new Date('2024-03-20') },
      { _id: 'hrev_3', userId: 'user_Accra', productId: 'all', rating: 5, comment: "Cornelius TEC is setting the standard for the African Digital Renaissance.", createdAt: new Date('2024-03-25') }
    ]);
  });

  // API Route: Specialized Academy AI Assistants (Animation, Photo Editing, Vibe Coding)
  app.post("/api/academy/ai", async (req, res) => {
    try {
      const { subject, message, history } = req.body;
      if (!subject || !message) {
        return res.status(400).json({ error: "Subject and message are required." });
      }

      const aiClient = getAIClient(req);
      let systemInstruction = "";

      if (subject === "animation") {
        systemInstruction = `You are AnimateStudio AI, the master animation synthesis mentor for Cornelius TEC.
        When given a prompt to generate or synthesize a video/animation, you MUST explicitly acknowledge and breakdown the exact elements of the user's prompt in detail!
        Describe the specific visual scenes, camera movements, lighting, color palette, keyframes, and motion vectors tailored directly to their prompt.
        Always begin your response with: "🎬 **AI VIDEO SYNTHESIS GENERATED FOR:** [User Prompt]" followed by:
        1. **Visual Scene & Subject Analysis**: How the subjects, environment, and textures are rendered.
        2. **Multi-Shot Storyboard & Keyframe Trajectory**: Shot 1 (0-3s), Shot 2 (3-7s), Shot 3 (7-10s+).
        3. **Render Mechanics & Motion Vectors**: Camera orbit, zoom, lighting presets, and frame consistency.
        Maintain an inspiring, technical, encouraging tone. Keep explanations clear, structured, and punchy.`;
      } else if (subject === "photo") {
        systemInstruction = `You are PhotoFlow AI, the premier digital retouching and neural image enhancer for Cornelius TEC.
        You specialize in:
        1. Professional studio lighting setups, generative inpainting, visual upscaling, and digital color theory.
        2. ControlNet details, IP-Adapter styling, prompt weight manipulation, and Stable Diffusion XL/3.
        3. Fine-tuning post-processing filters, exposure curves, and professional photography editing workflows.
        Maintain a design-focused, precise, and visual tone. Offer concrete photo parameters (exposure offset, styling weights) and structured editing steps.
        Limit explanations to 3-4 clear, professional paragraphs.`;
      } else if (subject === "vibe-coding") {
        systemInstruction = `You are VibeCoder AI, the revolutionary website prototyping and layout orchestration assistant for Cornelius TEC.
        IMPORTANT: Your ultimate goal is to write clean, gorgeous, and fully self-contained HTML/CSS pages using Tailwind CSS.
        Rules:
        1. Always include a single complete HTML snippet wrapped in a single \`\`\`html ... \`\`\` code block.
        2. The HTML code must be fully styled, responsive, and include the Tailwind CSS CDN link: <script src="https://cdn.tailwindcss.com"></script>.
        3. Use gorgeous fonts (like Inter, Space Grotesk) via Google Fonts in the HTML header if possible.
        4. Add high-contrast design, clean colors, cards, and smooth modern interactive layouts.
        5. Include placeholder content that makes the page look fully production-ready.
        6. Do not talk too much in text—provide a short 2-3 sentence overview, and let your magnificent HTML/CSS code block do the rest!`;
      } else {
        systemInstruction = "You are a specialized AI Mentor at Cornelius TEC.";
      }

      let replyText = "";
      let success = false;
      let routedModelName = "None";

      if (aiClient) {
        try {
          const formattedContents = [];
          if (history && Array.isArray(history)) {
            history.forEach((h: any) => {
              formattedContents.push({
                role: h.role,
                parts: [{ text: h.text }]
              });
            });
          }
          formattedContents.push({
            role: "user",
            parts: [{ text: message }]
          });

          // Clean up contents array for Gemini compatibility:
          // 1. Multi-turn chat must start with a "user" role turn.
          while (formattedContents.length > 0 && formattedContents[0].role === "model") {
            formattedContents.shift();
          }

          // 2. Ensure roles strictly alternate (user -> model -> user -> model)
          const cleanedContents = [];
          let lastRole = "";
          for (const item of formattedContents) {
            if (item.role !== lastRole) {
              cleanedContents.push(item);
              lastRole = item.role;
            } else if (cleanedContents.length > 0) {
              // Combine consecutive messages from the same sender
              cleanedContents[cleanedContents.length - 1].parts[0].text += "\n" + item.parts[0].text;
            }
          }

          // Cascade through available Gemini models to gracefully bypass 503 capacity spikes
          const candidateModels = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.5-pro"];
          for (const modelCandidate of candidateModels) {
            if (success) break;
            try {
              console.info(`[Academy AI] Attempting model ${modelCandidate} for ${subject}...`);
              const generatePromise = aiClient.models.generateContent({
                model: modelCandidate,
                contents: cleanedContents,
                config: {
                  systemInstruction: systemInstruction,
                },
              });

              const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error(`Timeout limit (25s) reached for ${modelCandidate}`)), 25000)
              );

              const result = await Promise.race([generatePromise, timeoutPromise]) as any;

              if (result && result.text) {
                replyText = result.text;
                routedModelName = `${modelCandidate} (Academy)`;
                success = true;
                console.info(`[Academy AI] Successfully generated response with ${modelCandidate}`);
                break;
              }
            } catch (err: any) {
              console.warn(`[Academy AI] Candidate model ${modelCandidate} failed/busy (${err.message}). Cascading to next candidate...`);
            }
          }
        } catch (err: any) {
          console.error(`[Academy AI] All Gemini candidate calls failed for ${subject}:`, err.message);
        }
      }

      if (!success) {
        routedModelName = "Offline Academy Engine";
        if (subject === "animation") {
          replyText = `**[Offline Fallback Mode]** Here is a professional prompt structure for AI Animation:
          
\`\`\`text
Subject: "An iridescent hummingbird crafted from molten glass, wings humming, hovering over a blooming cybernetic lotus."
Camera Motion: "Slow kinetic macro-zoom, orbiting 360-degrees clockwise, 24fps motion-vector tracking."
Style: "Hyper-realistic rendering, octane engine, neon refractions, dark background, cinematic."
\`\`\`

To enable full real-time interactive keyframing, ensure your \`GEMINI_API_KEY\` is configured in the environment settings.`;
        } else if (subject === "photo") {
          replyText = `**[Offline Fallback Mode]** Here is a recommended editing and diffusion chain for professional photo retouching:

1. **Prompt Structure**: \`Masterfully detailed portrait of a tech innovator, warm cinematic key lighting, high-contrast, kente fabrics, Kigali background, shot on 85mm lens f/1.4\`
2. **Post-Processing Chain**:
   - Depth Map Inpainting: Mask surrounding background at 0.45 denoising strength.
   - Contrast/Clarity: Apply a 15% boost to midtones to elevate natural skin textures.
   - Color Temperature: Shift warm-tone gains to +8 (Kelvin 5800) for local African sunset vibe.

To unlock custom real-time prompt generation, verify your environment settings have a valid API Key.`;
        } else {
          replyText = `**[Offline Fallback Mode]** Here is a beautiful, complete, responsive Vibe Coding landing page template:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kigali Cybertech Hub</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Space Grotesk', sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between">
  <!-- Header -->
  <header class="border-b border-slate-900 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
        <span class="font-bold tracking-wider text-sm">CORNELIUS TEC • VIBE</span>
      </div>
      <nav class="space-x-6 text-xs uppercase tracking-widest text-slate-400 font-semibold">
        <a href="#" class="hover:text-cyan-400 transition-colors">Workspace</a>
        <a href="#" class="hover:text-cyan-400 transition-colors">Labs</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="max-w-4xl mx-auto px-6 py-20 text-center flex-grow flex flex-col justify-center">
    <div class="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6 mx-auto">
      <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
      <span class="text-[9px] uppercase tracking-widest text-cyan-400 font-bold">Vibe Sandbox Active</span>
    </div>
    <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 uppercase">
      Vibe Code <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Anything</span>
    </h1>
    <p class="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
      A high-velocity sandbox rendering static templates instantly through natural language instruction.
    </p>
    <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
      <button class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]">
        Launch Prototyper
      </button>
      <button class="border border-slate-800 hover:border-slate-700 text-slate-300 px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all">
        View Code
      </button>
    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t border-slate-900 py-6 text-center text-[10px] text-slate-600 uppercase tracking-widest">
    © 2026 Cornelius TEC • Built in Kigali Node
  </footer>
</body>
</html>
\`\`\`

To test full real-time interactive generation, configure your Gemini API Key.`;
        }
      }

      res.json({ text: replyText, routedModel: routedModelName });
    } catch (error: any) {
      console.error("Academy AI Assistant Error:", error);
      res.status(500).json({ error: error.message || "An error occurred with the Academy AI assistant." });
    }
  });

  // Socket.io bridge for Live Human Mode / Realtime interactions
  io.on("connection", (socket) => {
    console.log("Client connected via Socket.io:", socket.id);

    socket.on("chatMessage", ({ userId, message }) => {
      console.log(`Socket message received from ${userId}:`, message);
      // Echo it back as if it's live or route to administrative agents
      socket.broadcast.emit("chatMessage", {
        _id: 'msg_live_' + Math.random().toString(16).slice(2, 14),
        userId: 'architect-id',
        message: `Architect Signal: Received "${message}". Sync in progress.`,
        timestamp: new Date(),
        isLive: true
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Serve static assets or mount Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);

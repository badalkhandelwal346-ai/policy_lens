import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// Initialize Gemini SDK with telemetry headers
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper to check if AI is initialized
function getAIClient() {
  if (!ai) {
    throw new Error("Gemini API key is missing or not configured.");
  }
  return ai;
}

// 1. Policy Explainer Endpoint
app.post("/api/explain", async (req, res) => {
  try {
    const { policy, query, persona = "Standard" } = req.body;
    const client = getAIClient();

    let personaInstruction = "Explain this policy clearly, accurately, and objectively.";
    if (persona === "15yo") {
      personaInstruction = "Explain like I'm 15 years old. Use simple language, engaging analogies, and zero complex jargon.";
    } else if (persona === "Economic") {
      personaInstruction = "Provide an in-depth economic analysis. Focus on inflation, market outcomes, tax impact, public finance, and GDP growth.";
    } else if (persona === "Stakeholder") {
      personaInstruction = "Analyze this policy from multiple stakeholder perspectives. Highlight who wins, who loses, and the conflicts of interest.";
    }

    const prompt = `Policy context: "${policy}". User question/request: "${query}". \n\nInstruction: ${personaInstruction}`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert policy analyst and neutral educator for PolicyLens. Provide high-quality, comprehensive, and engaging policy breakdowns using structured markdown.",
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/explain:", error);
    res.status(500).json({ error: error.message || "Failed to generate policy explanation." });
  }
});

// 2. Policy Simulator Endpoint
app.post("/api/simulate", async (req, res) => {
  try {
    const { policy, sliders } = req.body;
    const client = getAIClient();

    const { budget, taxes, education, healthcare, inflation } = sliders;

    const prompt = `
      Please simulate the macro and micro outcomes of adjusting parameters on the policy: "${policy}".
      
      Simulated Sliders:
      - Budget allocation change: ${budget}%
      - Tax rate adjustment: ${taxes}%
      - Education spending change: ${education}%
      - Healthcare support change: ${healthcare}%
      - Target inflation pressure: ${inflation}%

      Analyze these changes and return a JSON object with:
      1. 'economicIndicator': (number between -100 and 100 representing positive or negative economic outlook)
      2. 'socialWellbeing': (number between -100 and 100 representing social benefit)
      3. 'publicApproval': (number between -100 and 100 representing public sentiment)
      4. 'fiscalDeficitImpact': (number between -100 and 100 representing effect on national budget deficit)
      5. 'shortSummary': (A single-sentence high-impact overview of this specific scenario)
      6. 'analysisText': (A structured detailed summary of the main trade-offs, likely consequences, and winners/losers under this combination of values. Limit to 3 short bullet points in markdown.)

      Ensure you return ONLY a valid JSON object matching this schema. No wrappers, no markdown code blocks.
    `;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/simulate:", error);
    res.status(500).json({ error: error.message || "Failed to run simulation." });
  }
});

// 3. AI Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const client = getAIClient();

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid message history provided." });
    }

    // Format message history for the Gemini API
    const formattedContents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: "You are the PolicyLens AI Guide. You assist users in understanding complex government policies, legislative bills, and economic reforms. Be educational, perfectly neutral, polite, and explain using formatting, bullet points, and clear explanations. If a user asks something unrelated to policies or governance, politely guide them back to policy-related questions.",
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Failed to get chat response." });
  }
});

// Vite Integration Middleware
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

initializeServer().catch((err) => {
  console.error("Failed to start server:", err);
});

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, "client", "dist")));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/api", (_, res) => {
  res.status(200).json({ message: "API is Healthy" });
});

app.post("/api/refine", async (req, res) => {
  const { text, type, perspective } = req.body;

  if (!text || !type || !perspective) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = `
You are a professional business copywriter.

Rewrite the following ${type.toLowerCase()} statement to be more polished, persuasive, and professional — tailored for a ${perspective.toLowerCase()} audience, in less than 1000 characters.

Focus on clarity, tone, and value delivery.

Do NOT include labels like "Improved Version" or quotes — just return the rewritten content.

Original:
${text}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const refined = result.response.text();

    res.status(200).json({ improved: refined });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to refine with Gemini" });
  }
});

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});

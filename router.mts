// // import dotenv from "dotenv";
// // dotenv.config();
// // import fs from "fs";
// // import { execSync } from "child_process";
// // import OpenAI from "openai";
// // import axios from "axios";
// // import play from "play-sound";

// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
// // const SERPAPI_KEY = process.env.SERPAPI_KEY;
// // const INPUT_FILE = "Lets Talk About Education [TubeRipper.com].mp3";
// // const OUTPUT_AUDIO = "out.wav";
// // const LOG_FILE = "conversation.txt";
// // const player = play({});

// // async function transcribeAudio(): Promise<string> {
// //   try {
// //     const transcription = await openai.audio.transcriptions.create({
// //       file: fs.createReadStream(INPUT_FILE),
// //       model: "whisper-1",
// //     });
// //     const text = transcription?.text?.trim() ?? "";
// //     console.log("📝 Client:", text);
// //     return text;
// //   } catch (err) {
// //     console.error("❌ Transcription error:", err);
// //     return "";
// //   }
// // }

// // async function getAIResponse(clientText: string): Promise<{ audioBuffer: Buffer, aiText: string }> {
// //       const systemPrompt = `You are the voice assistant for **Latifoğlu Logistics**, a transportation and dispatch company serving North Cyprus and mainland Turkey.
// //     Your job is to help callers by understanding their intent, responding appropriately in **English, Turkish, or Arabic**, and escalating to a dispatcher when needed.
// //     You will answer only relevant questions about logistics, transportation, and dispatching.
// //     If the caller asks about other topics, politely redirect them to the appropriate department or suggest they should ask relevant questions.
    
// //     ---
    
// //     ## 🌐 Language Handling Logic:
    
// //     - If the caller **speaks in English**, continue in English mode.
// //     - If the caller **speaks in Turkish**, continue in Turkish mode.
// //     - If the caller **speaks in Arabic**, continue in Arabic mode.
// //     - If unclear, ask:
    
// //     > “Would you like to continue in English, Turkish, or Arabic?”  
// //     > “İngilizce mi, Türkçe mi, Arapça mı devam edelim istersiniz?”  
// //     > "هل تود المتابعة بالإنجليزية أم التركية أم العربية؟"
    
// //     ---
    
// //     ## 🇬🇧 ENGLISH MODE (International Caller)
    
// //     **Greeting**:  
// //     “Hello, this is Latifoğlu Logistics. How can I assist you today?”
    
// //     **Common Use Cases**:
    
// //     | Caller Asks                             | Agent Responds                                                                 |
// //     |----------------------------------------|-------------------------------------------------------------------------------|
// //     | “Do you have trucks available?”        | “Yes, we have flatbeds and refrigerated units. Where’s the cargo going?”     |
// //     | “What documents do I need?”            | “Invoice and packing list are standard. For Turkey, you’ll also need a customs declaration.” |
// //     | “Can I track my shipment?”             | “Absolutely. Do you have the reference number or truck plate?”               |
// //     | “How much does it cost?”               | “It depends on the route and load type. I can transfer you to dispatch for a quote.” |
    
// //     **Fallback (English)**:  
// //     > “It seems this topic requires further assistance. Let me connect you to our operations team right away. Please hold…”
    
// //     ---
    
// //     ## 🇹🇷 TURKISH MODE (Local Caller)
    
// //     **Greeting**:  
// //     “Selamünaleyküm, Latifoğlu Lojistik’tesiniz. Buyrun canım, nasıl yardımcı olayım?”
    
// //     **Yaygın Durumlar**:
    
// //     | Arayan Sorarsa                      | Asistan Cevaplar                                                             |
// //     |------------------------------------|------------------------------------------------------------------------------|
// //     | “Araç var mı?”                     | “Evet canım, hem flatbed hem soğutmalı araçlarımız var. Nereye sevkiyat düşünüyorsunuz?” |
// //     | “Evraklar ne lazım?”               | “Fatura ve paketleme listesi. Türkiye için beyanname de gerekir.”          |
// //     | “Yük nerede?”                      | “Yük numarası ya da plaka verirsen hemen kontrol edebilirim.”              |
// //     | “Fiyat ne kadar?”                  | “Mesafeye ve yük türüne göre değişiyor. İstersen seni sevkiyata bağlayayım.” |
    
// //     **Fallback (Turkish)**:  
// //     > “Canım bu konu biraz detaylı oldu galiba. En iyisi seni yetkiliye aktarayım. Bir saniye hatta kal lütfen…”
    
// //     ---
    
// //     ## 🇸🇦 ARABIC MODE (Arabic-speaking Caller)
    
// //     **Greeting**:  
// //     “مرحبًا بك في شركة لوجستيات لطيف أوغلو. كيف يمكنني مساعدتك؟”
    
// //     **الحالات الشائعة**:
    
// //     | يسأل العميل                         | يرد المساعد                                                                      |
// //     |-----------------------------------|----------------------------------------------------------------------------------|
// //     | “هل لديكم شاحنات متوفرة؟”         | “نعم، لدينا شاحنات مسطحة ومبردة. إلى أين يتم إرسال الحمولة؟”                   |
// //     | “ما هي الأوراق المطلوبة؟”          | “فاتورة وقائمة تغليف مطلوبة دائمًا. ولتركيا نحتاج أيضًا إلى بيان جمركي.”       |
// //     | “هل يمكنني تتبع شحنتي؟”           | “بالطبع. هل لديك رقم التتبع أو لوحة الشاحنة؟”                                   |
// //     | “كم السعر؟”                        | “يعتمد على المسار ونوع الحمولة. يمكنني تحويلك إلى قسم النقل للحصول على عرض.”     |
    
// //     **Fallback (Arabic)**:  
// //     > “يبدو أن هذا الموضوع يحتاج إلى مساعدة إضافية. سأقوم بتحويلك إلى فريق العمليات. من فضلك انتظر لحظة…”
// //     `.trim();
    
// //       try {
// //         const response = await openai.chat.completions.create({
// //           model: "gpt-4o-audio-preview",
// //           modalities: ["text", "audio"],
// //           audio: { voice: "alloy", format: "wav" },
// //           messages: [
// //             { role: "system", content: systemPrompt },
// //             { role: "user", content: clientText },
// //           ],
// //         });
// //         let aiText = (response.choices?.[0]?.message?.audio?.transcript ?? "").trim();
// //         let audioBuffer = Buffer.from(response.choices?.[0]?.message?.audio?.data ?? "", "base64");
    
// //         if (/^SEARCH_AGENT_NEEDED$/i.test(aiText)) {
// //           console.log("🌐 SEARCH_AGENT triggered: querying Google...");
// //           const googleAnswer = await searchGoogle(clientText);
    
// //           const gptWithSearch = await openai.chat.completions.create({
// //             model: "gpt-4o-audio-preview",
// //             modalities: ["text", "audio"],
// //             audio: { voice: "alloy", format: "wav" },
// //             messages: [
// //               { role: "system", content: systemPrompt },
// //               {
// //                 role: "user",
// //                 content: `The user asked: "${clientText}". Here are real-time search results:\n${googleAnswer}\n\nUsing this info, answer the user naturally, conversationally, and in a human style.`,
// //               },
// //             ],
// //           });
          
// //           console.log(gptWithSearch)
// //           aiText = (gptWithSearch.choices?.[0]?.message?.content ?? "").trim();
// //           audioBuffer = Buffer.from(gptWithSearch.choices?.[0]?.message?.audio?.data ?? "", "base64");
// //         }
    
// //         return { audioBuffer, aiText };
// //       } catch (err) {
// //         console.error("❌ AI Response Error:", err);
// //         return { audioBuffer: Buffer.alloc(0), aiText: "Sorry, there was an error processing your request." };
// //       }
// //     }

// // async function searchGoogle(query: string): Promise<string> {
// //   if (!SERPAPI_KEY) return "No SERPAPI_KEY configured.";
// //   try {
// //     const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=en&api_key=${SERPAPI_KEY}`;
// //     const resp = await axios.get(url);
// //     const organicResults = resp.data.organic_results || [];
// //     if (organicResults.length === 0) return "No search results found.";
// //     const snippets = organicResults.slice(0, 3)
// //       .map((r, idx) => `${idx + 1}. ${r.snippet || r.title || ''}`).join("\n");
// //     return `Top search results:\n${snippets}`;
// //   } catch (err) {
// //     console.error("Search agent error:", err);
// //     return "Sorry, couldn't fetch search results.";
// //   }
// // }

// // async function playAudio(buffer: Buffer): Promise<void> {
// //   if (!buffer || !buffer.length) {
// //     console.warn("⚠️ No audio to play.");
// //     return;
// //   }
// //   fs.writeFileSync(OUTPUT_AUDIO, buffer);
// //   await new Promise<void>((resolve, reject) => {
// //     player.play(OUTPUT_AUDIO, (err: any) => {
// //       if (err) reject(err);
// //       else resolve();
// //     });
// //   });
// // }

// // async function logConversation(clientText: string, aiText: string): Promise<void> {
// //   const logEntry = `Client: ${clientText}\nAI: ${aiText}\n\n`;
// //   fs.appendFileSync(LOG_FILE, logEntry);
// // }

// // async function main(): Promise<void> {
// //   console.log("🎙️ Starting transcription and AI interaction...");
// //   const clientText = await transcribeAudio();
// //   if (!clientText) return;
// //   const { audioBuffer, aiText } = await getAIResponse(clientText);
// //   console.log("🤖 AI:", aiText);
// //   await playAudio(audioBuffer);
// //   await logConversation(clientText, aiText);
// //   console.log("✅ Finished.");
// // }

// // main().catch(console.error);



// import express from "express";
// import dotenv from "dotenv";
// import fs from "fs";
// import { execSync } from "child_process";
// import OpenAI from "openai";
// import axios from "axios";
// import play from "play-sound";
// import cors from "cors";

// dotenv.config();

// const app = express();
// const PORT = 3000;
// app.use(cors());

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
// const SERPAPI_KEY = process.env.SERPAPI_KEY;
// const INPUT_FILE = "Lets Talk About Education [TubeRipper.com].mp3";
// const OUTPUT_AUDIO = "out.wav";
// const LOG_FILE = "conversation.txt";
// const player = play({});

// async function transcribeAudio(): Promise<string> {
//   try {
//     const transcription = await openai.audio.transcriptions.create({
//       file: fs.createReadStream(INPUT_FILE),
//       model: "whisper-1",
//     });
//     const text = transcription?.text?.trim() ?? "";
//     console.log("📝 Client:", text);
//     return text;
//   } catch (err) {
//     console.error("❌ Transcription error:", err);
//     return "";
//   }
// }

// async function getAIResponse(clientText: string): Promise<{ audioBuffer: Buffer, aiText: string }> {
//   const systemPrompt = `You are the voice assistant for **Latifoğlu Logistics**, a transportation and dispatch company serving North Cyprus and mainland Turkey.
// Your job is to help callers by understanding their intent, responding appropriately in **English, Turkish, or Arabic**, and escalating to a dispatcher when needed.
// You will answer only relevant questions about logistics, transportation, and dispatching.
// If the caller asks about other topics, politely redirect them to the appropriate department or suggest they should ask relevant questions.

// ---

// ## 🌐 Language Handling Logic:

// - If the caller **speaks in English**, continue in English mode.
// - If the caller **speaks in Turkish**, continue in Turkish mode.
// - If the caller **speaks in Arabic**, continue in Arabic mode.
// - If unclear, ask:

// > “Would you like to continue in English, Turkish, or Arabic?”  
// > “İngilizce mi, Türkçe mi, Arapça mı devam edelim istersiniz?”  
// > "هل تود المتابعة بالإنجليزية أم التركية أم العربية؟"

// ---

// ## 🇬🇧 ENGLISH MODE (International Caller)

// **Greeting**:  
// “Hello, this is Latifoğlu Logistics. How can I assist you today?”

// **Common Use Cases**:

// | Caller Asks                             | Agent Responds                                                                 |
// |----------------------------------------|-------------------------------------------------------------------------------|
// | “Do you have trucks available?”        | “Yes, we have flatbeds and refrigerated units. Where’s the cargo going?”     |
// | “What documents do I need?”            | “Invoice and packing list are standard. For Turkey, you’ll also need a customs declaration.” |
// | “Can I track my shipment?”             | “Absolutely. Do you have the reference number or truck plate?”               |
// | “How much does it cost?”               | “It depends on the route and load type. I can transfer you to dispatch for a quote.” |

// **Fallback (English)**:  
// > “It seems this topic requires further assistance. Let me connect you to our operations team right away. Please hold…”

// ---

// ## 🇹🇷 TURKISH MODE (Local Caller)

// **Greeting**:  
// “Selamünaleyküm, Latifoğlu Lojistik’tesiniz. Buyrun canım, nasıl yardımcı olayım?”

// **Yaygın Durumlar**:

// | Arayan Sorarsa                      | Asistan Cevaplar                                                             |
// |------------------------------------|------------------------------------------------------------------------------|
// | “Araç var mı?”                     | “Evet canım, hem flatbed hem soğutmalı araçlarımız var. Nereye sevkiyat düşünüyorsunuz?” |
// | “Evraklar ne lazım?”               | “Fatura ve paketleme listesi. Türkiye için beyanname de gerekir.”          |
// | “Yük nerede?”                      | “Yük numarası ya da plaka verirsen hemen kontrol edebilirim.”              |
// | “Fiyat ne kadar?”                  | “Mesafeye ve yük türüne göre değişiyor. İstersen seni sevkiyata bağlayayım.” |

// **Fallback (Turkish)**:  
// > “Canım bu konu biraz detaylı oldu galiba. En iyisi seni yetkiliye aktarayım. Bir saniye hatta kal lütfen…”

// ---

// ## 🇸🇦 ARABIC MODE (Arabic-speaking Caller)

// **Greeting**:  
// “مرحبًا بك في شركة لوجستيات لطيف أوغلو. كيف يمكنني مساعدتك؟”

// **الحالات الشائعة**:

// | يسأل العميل                         | يرد المساعد                                                                      |
// |-----------------------------------|----------------------------------------------------------------------------------|
// | “هل لديكم شاحنات متوفرة؟”         | “نعم، لدينا شاحنات مسطحة ومبردة. إلى أين يتم إرسال الحمولة؟”                   |
// | “ما هي الأوراق المطلوبة؟”          | “فاتورة وقائمة تغليف مطلوبة دائمًا. ولتركيا نحتاج أيضًا إلى بيان جمركي.”       |
// | “هل يمكنني تتبع شحنتي؟”           | “بالطبع. هل لديك رقم التتبع أو لوحة الشاحنة؟”                                   |
// | “كم السعر؟”                        | “يعتمد على المسار ونوع الحمولة. يمكنني تحويلك إلى قسم النقل للحصول على عرض.”     |

// **Fallback (Arabic)**:  
// > “يبدو أن هذا الموضوع يحتاج إلى مساعدة إضافية. سأقوم بتحويلك إلى فريق العمليات. من فضلك انتظر لحظة…”
// `.trim();

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-audio-preview",
//       modalities: ["text", "audio"],
//       audio: { voice: "alloy", format: "wav" },
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: clientText },
//       ],
//     });

//     let aiText = (response.choices?.[0]?.message?.audio?.transcript ?? "").trim();
//     let audioBuffer = Buffer.from(response.choices?.[0]?.message?.audio?.data ?? "", "base64");

//     if (/^SEARCH_AGENT_NEEDED$/i.test(aiText)) {
//       const googleAnswer = await searchGoogle(clientText);
//       const gptWithSearch = await openai.chat.completions.create({
//         model: "gpt-4o-audio-preview",
//         modalities: ["text", "audio"],
//         audio: { voice: "alloy", format: "wav" },
//         messages: [
//           { role: "system", content: systemPrompt },
//           {
//             role: "user",
//             content: `The user asked: "${clientText}". Here are real-time search results:\n${googleAnswer}\n\nUsing this info, answer the user naturally, conversationally, and in a human style.`,
//           },
//         ],
//       });
//       aiText = (gptWithSearch.choices?.[0]?.message?.content ?? "").trim();
//       audioBuffer = Buffer.from(gptWithSearch.choices?.[0]?.message?.audio?.data ?? "", "base64");
//     }

//     return { audioBuffer, aiText };
//   } catch (err) {
//     console.error("❌ AI Response Error:", err);
//     return { audioBuffer: Buffer.alloc(0), aiText: "Sorry, there was an error processing your request." };
//   }
// }

// async function searchGoogle(query: string): Promise<string> {
//   if (!SERPAPI_KEY) return "No SERPAPI_KEY configured.";
//   try {
//     const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=en&api_key=${SERPAPI_KEY}`;
//     const resp = await axios.get(url);
//     const organicResults = resp.data.organic_results || [];
//     if (organicResults.length === 0) return "No search results found.";
//     const snippets = organicResults.slice(0, 3)
//       .map((r, idx) => `${idx + 1}. ${r.snippet || r.title || ''}`).join("\n");
//     return `Top search results:\n${snippets}`;
//   } catch (err) {
//     console.error("Search agent error:", err);
//     return "Sorry, couldn't fetch search results.";
//   }
// }

// async function playAudio(buffer: Buffer): Promise<void> {
//   if (!buffer || !buffer.length) {
//     console.warn("⚠️ No audio to play.");
//     return;
//   }
//   fs.writeFileSync(OUTPUT_AUDIO, buffer);
//   await new Promise<void>((resolve, reject) => {
//     player.play(OUTPUT_AUDIO, (err: any) => {
//       if (err) reject(err);
//       else resolve();
//     });
//   });
// }

// async function logConversation(clientText: string, aiText: string): Promise<void> {
//   const logEntry = `Client: ${clientText}\nAI: ${aiText}\n\n`;
//   fs.appendFileSync(LOG_FILE, logEntry);
// }

// // 🧠 API Endpoint: GET /startcall
// app.get("/startcall", async (req, res) => {
//   try {
//     const clientText = await transcribeAudio();
//     if (!clientText) return res.status(500).json({ error: "Transcription failed." });

//     const { audioBuffer, aiText } = await getAIResponse(clientText);
//     await logConversation(clientText, aiText);
//     fs.writeFileSync(OUTPUT_AUDIO, audioBuffer); // optional

//     res.json({
//       clientText,
//       aiText,
//       audioBase64: audioBuffer.toString("base64"),
//     });

//     await playAudio(audioBuffer); // optional
//   } catch (err) {
//     console.error("❌ Endpoint Error:", err);
//     res.status(500).json({ error: "Internal server error." });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });






import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";
import multer from "multer";
import OpenAI from "openai";
import axios from "axios";
import play from "play-sound";

dotenv.config();

const app = express();
const PORT = 3000;
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const SERPAPI_KEY = process.env.SERPAPI_KEY;
const OUTPUT_AUDIO = "out.wav";
const LOG_FILE = "conversation.txt";
const player = play({});

const upload = multer({ dest: "uploads/" });

// 🧠 Transcribe Audio
async function transcribeAudio(filePath: string): Promise<string> {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });
    const text = transcription?.text?.trim() ?? "";
    console.log("📝 Client:", text);
    return text;
  } catch (err) {
    console.error("❌ Transcription error:", err);
    return "";
  }
}

// 🎤 Generate AI Response
async function getAIResponse(clientText: string): Promise<{ audioBuffer: Buffer, aiText: string }> {
  const systemPrompt = `You are the voice assistant for **Latifoğlu Logistics**...`.trim(); // (truncated here for brevity, keep your full prompt)

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-audio-preview",
      modalities: ["text", "audio"],
      audio: { voice: "alloy", format: "wav" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: clientText },
      ],
    });

    let aiText = (response.choices?.[0]?.message?.audio?.transcript ?? "").trim();
    let audioBuffer = Buffer.from(response.choices?.[0]?.message?.audio?.data ?? "", "base64");

    if (/^SEARCH_AGENT_NEEDED$/i.test(aiText)) {
      const googleAnswer = await searchGoogle(clientText);
      const gptWithSearch = await openai.chat.completions.create({
        model: "gpt-4o-audio-preview",
        modalities: ["text", "audio"],
        audio: { voice: "alloy", format: "wav" },
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `The user asked: "${clientText}". Here are real-time search results:\n${googleAnswer}`,
          },
        ],
      });
      aiText = (gptWithSearch.choices?.[0]?.message?.content ?? "").trim();
      audioBuffer = Buffer.from(gptWithSearch.choices?.[0]?.message?.audio?.data ?? "", "base64");
    }

    return { audioBuffer, aiText };
  } catch (err) {
    console.error("❌ AI Response Error:", err);
    return { audioBuffer: Buffer.alloc(0), aiText: "Sorry, there was an error processing your request." };
  }
}

// 🔍 Google Search Agent
async function searchGoogle(query: string): Promise<string> {
  if (!SERPAPI_KEY) return "No SERPAPI_KEY configured.";
  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=en&api_key=${SERPAPI_KEY}`;
    const resp = await axios.get(url);
    const organicResults = resp.data.organic_results || [];
    if (organicResults.length === 0) return "No search results found.";
    const snippets = organicResults.slice(0, 3)
      .map((r, idx) => `${idx + 1}. ${r.snippet || r.title || ''}`).join("\n");
    return `Top search results:\n${snippets}`;
  } catch (err) {
    console.error("Search agent error:", err);
    return "Sorry, couldn't fetch search results.";
  }
}

// 🔊 Play Audio
async function playAudio(buffer: Buffer): Promise<void> {
  if (!buffer || !buffer.length) {
    console.warn("⚠️ No audio to play.");
    return;
  }
  fs.writeFileSync(OUTPUT_AUDIO, buffer);
  await new Promise<void>((resolve, reject) => {
    player.play(OUTPUT_AUDIO, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// 📝 Log Conversation
async function logConversation(clientText: string, aiText: string): Promise<void> {
  const logEntry = `Client: ${clientText}\nAI: ${aiText}\n\n`;
  fs.appendFileSync(LOG_FILE, logEntry);
}

// 📤 Upload Endpoint
app.post("/upload-audio", upload.single("audio"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });

  // ✅ Fix format error by renaming with correct extension
  const mimeToExt: Record<string, string> = {
    "audio/wav": "wav",
    "audio/x-wav": "wav",
    "audio/mpeg": "mp3",
    "audio/mp3": "mp3",
    "audio/x-m4a": "m4a",
    "audio/mp4": "mp4",
    "audio/ogg": "ogg",
    "audio/webm": "webm",
    "audio/flac": "flac",
  };

  const originalPath = req.file.path;
  const ext = mimeToExt[req.file.mimetype];
  if (!ext) {
    fs.unlinkSync(originalPath);
    return res.status(400).json({ error: "Unsupported audio format." });
  }

  const renamedPath = `${originalPath}.${ext}`;
  fs.renameSync(originalPath, renamedPath);

  try {
    const clientText = await transcribeAudio(renamedPath);
    if (!clientText) return res.status(500).json({ error: "Transcription failed." });

    const { audioBuffer, aiText } = await getAIResponse(clientText);
    await logConversation(clientText, aiText);
    fs.writeFileSync(OUTPUT_AUDIO, audioBuffer);

    res.json({
      clientText,
      aiText,
      audioBase64: audioBuffer.toString("base64"),
    });

    await playAudio(audioBuffer);
  } catch (err) {
    console.error("❌ Upload Endpoint Error:", err);
    res.status(500).json({ error: "Internal server error." });
  } finally {
    if (fs.existsSync(renamedPath)) {
      fs.unlinkSync(renamedPath);
    }
  }
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// import express from "express";
// import fs from "fs";
// import { execSync } from "child_process";
// import OpenAI from "openai";
// import dotenv from "dotenv";
// import record from "node-record-lpcm16";
// import play from "play-sound";
// import axios from "axios";

// dotenv.config();

// const app = express();
// const PORT = 3000;

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });
// const SERPAPI_KEY = process.env.SERPAPI_KEY;

// const RECORD_DURATION = 10 * 1000;
// const RAW_FILE = "input.wav";
// const CLEAN_FILE = "processed.wav";
// const OUTPUT_AUDIO = "out.wav";
// const LOG_FILE = "conversation.txt";
// const player = play({});

// async function recordAudio(): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const file = fs.createWriteStream(RAW_FILE, { encoding: "binary" });
//     console.log("🎤 Client speaking...");

//     const recording = record
//       .record({
//         sampleRate: 16000,
//         threshold: 0.5,
//         verbose: false,
//         recordProgram: "sox",
//         silence: "1.0",
//       })
//       .stream()
//       .on("error", (err) => {
//         console.error("❌ Error during recording:", err);
//         reject(err);
//       })
//       .pipe(file);

//     setTimeout(() => {
//       recording.end();
//       console.log("⛔ Recording ended.");
//       resolve();
//     }, RECORD_DURATION);
//   });
// }

// async function convertAudio(): Promise<void> {
//   try {
//     console.log("🎛️ Converting audio with ffmpeg...");
//     execSync(`ffmpeg -y -i ${RAW_FILE} -acodec pcm_s16le -ac 1 -ar 16000 ${CLEAN_FILE}`);
//   } catch (err) {
//     console.error("❌ Audio conversion failed:", err);
//     throw err;
//   }
// }

// async function transcribeAudio(): Promise<string> {
//   try {
//     const transcription = await openai.audio.transcriptions.create({
//       file: fs.createReadStream(CLEAN_FILE),
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
//     const systemPrompt = `You are the voice assistant for **Latifoğlu Logistics**, a transportation and dispatch company serving North Cyprus and mainland Turkey.
//   Your job is to help callers by understanding their intent, responding appropriately in **English, Turkish, or Arabic**, and escalating to a dispatcher when needed.
//   You will answer only relevant questions about logistics, transportation, and dispatching.
//   If the caller asks about other topics, politely redirect them to the appropriate department or suggest they should ask relevant questions.
  
//   ---
  
//   ## 🌐 Language Handling Logic:
  
//   - If the caller **speaks in English**, continue in English mode.
//   - If the caller **speaks in Turkish**, continue in Turkish mode.
//   - If the caller **speaks in Arabic**, continue in Arabic mode.
//   - If unclear, ask:
  
//   > “Would you like to continue in English, Turkish, or Arabic?”  
//   > “İngilizce mi, Türkçe mi, Arapça mı devam edelim istersiniz?”  
//   > "هل تود المتابعة بالإنجليزية أم التركية أم العربية؟"
  
//   ---
  
//   ## 🇬🇧 ENGLISH MODE (International Caller)
  
//   **Greeting**:  
//   “Hello, this is Latifoğlu Logistics. How can I assist you today?”
  
//   **Common Use Cases**:
  
//   | Caller Asks                             | Agent Responds                                                                 |
//   |----------------------------------------|-------------------------------------------------------------------------------|
//   | “Do you have trucks available?”        | “Yes, we have flatbeds and refrigerated units. Where’s the cargo going?”     |
//   | “What documents do I need?”            | “Invoice and packing list are standard. For Turkey, you’ll also need a customs declaration.” |
//   | “Can I track my shipment?”             | “Absolutely. Do you have the reference number or truck plate?”               |
//   | “How much does it cost?”               | “It depends on the route and load type. I can transfer you to dispatch for a quote.” |
  
//   **Fallback (English)**:  
//   > “It seems this topic requires further assistance. Let me connect you to our operations team right away. Please hold…”
  
//   ---
  
//   ## 🇹🇷 TURKISH MODE (Local Caller)
  
//   **Greeting**:  
//   “Selamünaleyküm, Latifoğlu Lojistik’tesiniz. Buyrun canım, nasıl yardımcı olayım?”
  
//   **Yaygın Durumlar**:
  
//   | Arayan Sorarsa                      | Asistan Cevaplar                                                             |
//   |------------------------------------|------------------------------------------------------------------------------|
//   | “Araç var mı?”                     | “Evet canım, hem flatbed hem soğutmalı araçlarımız var. Nereye sevkiyat düşünüyorsunuz?” |
//   | “Evraklar ne lazım?”               | “Fatura ve paketleme listesi. Türkiye için beyanname de gerekir.”          |
//   | “Yük nerede?”                      | “Yük numarası ya da plaka verirsen hemen kontrol edebilirim.”              |
//   | “Fiyat ne kadar?”                  | “Mesafeye ve yük türüne göre değişiyor. İstersen seni sevkiyata bağlayayım.” |
  
//   **Fallback (Turkish)**:  
//   > “Canım bu konu biraz detaylı oldu galiba. En iyisi seni yetkiliye aktarayım. Bir saniye hatta kal lütfen…”
  
//   ---
  
//   ## 🇸🇦 ARABIC MODE (Arabic-speaking Caller)
  
//   **Greeting**:  
//   “مرحبًا بك في شركة لوجستيات لطيف أوغلو. كيف يمكنني مساعدتك؟”
  
//   **الحالات الشائعة**:
  
//   | يسأل العميل                         | يرد المساعد                                                                      |
//   |-----------------------------------|----------------------------------------------------------------------------------|
//   | “هل لديكم شاحنات متوفرة؟”         | “نعم، لدينا شاحنات مسطحة ومبردة. إلى أين يتم إرسال الحمولة؟”                   |
//   | “ما هي الأوراق المطلوبة؟”          | “فاتورة وقائمة تغليف مطلوبة دائمًا. ولتركيا نحتاج أيضًا إلى بيان جمركي.”       |
//   | “هل يمكنني تتبع شحنتي؟”           | “بالطبع. هل لديك رقم التتبع أو لوحة الشاحنة؟”                                   |
//   | “كم السعر؟”                        | “يعتمد على المسار ونوع الحمولة. يمكنني تحويلك إلى قسم النقل للحصول على عرض.”     |
  
//   **Fallback (Arabic)**:  
//   > “يبدو أن هذا الموضوع يحتاج إلى مساعدة إضافية. سأقوم بتحويلك إلى فريق العمليات. من فضلك انتظر لحظة…”
//   `.trim();
  
//     try {
//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-audio-preview",
//         modalities: ["text", "audio"],
//         audio: { voice: "alloy", format: "wav" },
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: clientText },
//         ],
//       });
      
//       let aiText = (response.choices?.[0]?.message?.content ?? "").trim();
//       let audioBuffer = Buffer.from(response.choices?.[0]?.message?.audio?.data ?? "", "base64");
  
//       if (/^SEARCH_AGENT_NEEDED$/i.test(aiText)) {
//         console.log("🌐 SEARCH_AGENT triggered: querying Google...");
//         const googleAnswer = await searchGoogle(clientText);
  
//         const gptWithSearch = await openai.chat.completions.create({
//           model: "gpt-4o-audio-preview",
//           modalities: ["text", "audio"],
//           audio: { voice: "alloy", format: "wav" },
//           messages: [
//             { role: "system", content: systemPrompt },
//             {
//               role: "user",
//               content: `The user asked: "${clientText}". Here are real-time search results:\n${googleAnswer}\n\nUsing this info, answer the user naturally, conversationally, and in a human style.`,
//             },
//           ],
//         });
        
//         console.log(gptWithSearch)
//         aiText = (gptWithSearch.choices?.[0]?.message?.content ?? "").trim();
//         audioBuffer = Buffer.from(gptWithSearch.choices?.[0]?.message?.audio?.data ?? "", "base64");
//       }
  
//       return { audioBuffer, aiText };
//     } catch (err) {
//       console.error("❌ AI Response Error:", err);
//       return { audioBuffer: Buffer.alloc(0), aiText: "Sorry, there was an error processing your request." };
//     }
//   }
  

// async function searchGoogle(query: string): Promise<string> {
//   if (!SERPAPI_KEY) return "No SERPAPI_KEY configured.";
//   try {
//     const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=en&api_key=${SERPAPI_KEY}`;
//     const resp = await axios.get(url);
//     const organicResults = resp.data.organic_results || [];
//     if (organicResults.length === 0) return "No search results found.";
//     const snippets = organicResults.slice(0, 3)
//       .map((r: any, idx: number) => `${idx + 1}. ${r.snippet || r.title || ''}`).join("\n");
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

// // ✅ This is now exposed through an API call
// async function mainLoop(turns: number = 1): Promise<string> {
//   console.log("📞 Starting voice conversation...\n");
//   let result = "";

//   for (let i = 0; i < turns; i++) {
//     console.log(`\n🔁 Turn ${i + 1}/${turns}`);
//     await recordAudio();
//     await convertAudio();
//     const clientText = await transcribeAudio();
//     if (!clientText) {
//       console.warn("⚠️ No input detected, skipping turn.");
//       continue;
//     }
//     const { audioBuffer, aiText } = await getAIResponse(clientText);
//     console.log("🤖 AI:", aiText);
//     await playAudio(audioBuffer);
//     await logConversation(clientText, aiText);
//     result = aiText;
//   }

//   console.log("\n✅ Conversation ended. Log saved.");
//   return result;
// }

// // 🌐 Expose the loop as an endpoint
// app.get("/start-call", async (req, res) => {
//   try {
//     const result = await mainLoop(1);
//     res.json({ message: "Conversation complete", ai_response: result });
//   } catch (err) {
//     console.error("❌ Server error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 API ready at http://localhost:${PORT}/start-call`);
// });





import express from "express";
import fs from "fs";
import cors from "cors";
import { execSync } from "child_process";
import OpenAI from "openai";
import dotenv from "dotenv";
import record from "node-record-lpcm16";
import play from "play-sound";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = 3000;

// ✅ Enable CORS for frontend
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
const SERPAPI_KEY = process.env.SERPAPI_KEY;

const RECORD_DURATION = 10 * 1000;
const RAW_FILE = "input.wav";
const CLEAN_FILE = "processed.wav";
const OUTPUT_AUDIO = "out.wav";
const LOG_FILE = "conversation.txt";
const player = play({});

// 🎤 Record audio
async function recordAudio(): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(RAW_FILE, { encoding: "binary" });
    console.log("🎤 Client speaking...");

    const recording = record
      .record({
        sampleRate: 16000,
        threshold: 0.5,
        verbose: false,
        recordProgram: "sox",
        silence: "1.0",
      })
      .stream()
      .on("error", (err) => {
        console.error("❌ Error during recording:", err);
        reject(err);
      })
      .pipe(file);

    setTimeout(() => {
      recording.end();
      console.log("⛔ Recording ended.");
      resolve();
    }, RECORD_DURATION);
  });
}

// 🎛️ Convert audio
async function convertAudio(): Promise<void> {
  try {
    console.log("🎛️ Converting audio with ffmpeg...");
    execSync(`ffmpeg -y -i ${RAW_FILE} -acodec pcm_s16le -ac 1 -ar 16000 ${CLEAN_FILE}`);
  } catch (err) {
    console.error("❌ Audio conversion failed:", err);
    throw err;
  }
}

// 📝 Transcribe
async function transcribeAudio(): Promise<string> {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(CLEAN_FILE),
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

async function getAIResponse(clientText: string): Promise<{ audioBuffer: Buffer, aiText: string }> {
    const systemPrompt = `You are the voice assistant for **Latifoğlu Logistics**, a transportation and dispatch company serving North Cyprus and mainland Turkey.
  Your job is to help callers by understanding their intent, responding appropriately in **English, Turkish, or Arabic**, and escalating to a dispatcher when needed.
  You will answer only relevant questions about logistics, transportation, and dispatching.
  If the caller asks about other topics, politely redirect them to the appropriate department or suggest they should ask relevant questions.
  
  ---
  
  ## 🌐 Language Handling Logic:
  
  - If the caller **speaks in English**, continue in English mode.
  - If the caller **speaks in Turkish**, continue in Turkish mode.
  - If the caller **speaks in Arabic**, continue in Arabic mode.
  - If unclear, ask:
  
  > “Would you like to continue in English, Turkish, or Arabic?”  
  > “İngilizce mi, Türkçe mi, Arapça mı devam edelim istersiniz?”  
  > "هل تود المتابعة بالإنجليزية أم التركية أم العربية؟"
  
  ---
  
  ## 🇬🇧 ENGLISH MODE (International Caller)
  
  **Greeting**:  
  “Hello, this is Latifoğlu Logistics. How can I assist you today?”
  
  **Common Use Cases**:
  
  | Caller Asks                             | Agent Responds                                                                 |
  |----------------------------------------|-------------------------------------------------------------------------------|
  | “Do you have trucks available?”        | “Yes, we have flatbeds and refrigerated units. Where’s the cargo going?”     |
  | “What documents do I need?”            | “Invoice and packing list are standard. For Turkey, you’ll also need a customs declaration.” |
  | “Can I track my shipment?”             | “Absolutely. Do you have the reference number or truck plate?”               |
  | “How much does it cost?”               | “It depends on the route and load type. I can transfer you to dispatch for a quote.” |
  
  **Fallback (English)**:  
  > “It seems this topic requires further assistance. Let me connect you to our operations team right away. Please hold…”
  
  ---
  
  ## 🇹🇷 TURKISH MODE (Local Caller)
  
  **Greeting**:  
  “Selamünaleyküm, Latifoğlu Lojistik’tesiniz. Buyrun canım, nasıl yardımcı olayım?”
  
  **Yaygın Durumlar**:
  
  | Arayan Sorarsa                      | Asistan Cevaplar                                                             |
  |------------------------------------|------------------------------------------------------------------------------|
  | “Araç var mı?”                     | “Evet canım, hem flatbed hem soğutmalı araçlarımız var. Nereye sevkiyat düşünüyorsunuz?” |
  | “Evraklar ne lazım?”               | “Fatura ve paketleme listesi. Türkiye için beyanname de gerekir.”          |
  | “Yük nerede?”                      | “Yük numarası ya da plaka verirsen hemen kontrol edebilirim.”              |
  | “Fiyat ne kadar?”                  | “Mesafeye ve yük türüne göre değişiyor. İstersen seni sevkiyata bağlayayım.” |
  
  **Fallback (Turkish)**:  
  > “Canım bu konu biraz detaylı oldu galiba. En iyisi seni yetkiliye aktarayım. Bir saniye hatta kal lütfen…”
  
  ---
  
  ## 🇸🇦 ARABIC MODE (Arabic-speaking Caller)
  
  **Greeting**:  
  “مرحبًا بك في شركة لوجستيات لطيف أوغلو. كيف يمكنني مساعدتك؟”
  
  **الحالات الشائعة**:
  
  | يسأل العميل                         | يرد المساعد                                                                      |
  |-----------------------------------|----------------------------------------------------------------------------------|
  | “هل لديكم شاحنات متوفرة؟”         | “نعم، لدينا شاحنات مسطحة ومبردة. إلى أين يتم إرسال الحمولة؟”                   |
  | “ما هي الأوراق المطلوبة؟”          | “فاتورة وقائمة تغليف مطلوبة دائمًا. ولتركيا نحتاج أيضًا إلى بيان جمركي.”       |
  | “هل يمكنني تتبع شحنتي؟”           | “بالطبع. هل لديك رقم التتبع أو لوحة الشاحنة؟”                                   |
  | “كم السعر؟”                        | “يعتمد على المسار ونوع الحمولة. يمكنني تحويلك إلى قسم النقل للحصول على عرض.”     |
  
  **Fallback (Arabic)**:  
  > “يبدو أن هذا الموضوع يحتاج إلى مساعدة إضافية. سأقوم بتحويلك إلى فريق العمليات. من فضلك انتظر لحظة…”
  `.trim();
  
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
      
      let aiText = (response.choices?.[0]?.message?.content ?? "").trim();
      let audioBuffer = Buffer.from(response.choices?.[0]?.message?.audio?.data ?? "", "base64");
  
      if (/^SEARCH_AGENT_NEEDED$/i.test(aiText)) {
        console.log("🌐 SEARCH_AGENT triggered: querying Google...");
        const googleAnswer = await searchGoogle(clientText);
  
        const gptWithSearch = await openai.chat.completions.create({
          model: "gpt-4o-audio-preview",
          modalities: ["text", "audio"],
          audio: { voice: "alloy", format: "wav" },
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `The user asked: "${clientText}". Here are real-time search results:\n${googleAnswer}\n\nUsing this info, answer the user naturally, conversationally, and in a human style.`,
            },
          ],
        });
        
        console.log(gptWithSearch)
        aiText = (gptWithSearch.choices?.[0]?.message?.content ?? "").trim();
        audioBuffer = Buffer.from(gptWithSearch.choices?.[0]?.message?.audio?.data ?? "", "base64");
      }
  
      return { audioBuffer, aiText };
    } catch (err) {
      console.error("❌ AI Response Error:", err);
      return { audioBuffer: Buffer.alloc(0), aiText: "Sorry, there was an error processing your request." };
    }
  }
  
// 🌐 Google Search fallback
async function searchGoogle(query: string): Promise<string> {
  if (!SERPAPI_KEY) return "No SERPAPI_KEY configured.";
  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=en&api_key=${SERPAPI_KEY}`;
    const resp = await axios.get(url);
    const organicResults = resp.data.organic_results || [];
    if (organicResults.length === 0) return "No search results found.";
    const snippets = organicResults.slice(0, 3)
      .map((r: any, idx: number) => `${idx + 1}. ${r.snippet || r.title || ''}`).join("\n");
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

// 📓 Log Conversation
async function logConversation(clientText: string, aiText: string): Promise<void> {
  const logEntry = `Client: ${clientText}\nAI: ${aiText}\n\n`;
  fs.appendFileSync(LOG_FILE, logEntry);
}

// 🌀 Main Loop
async function mainLoop(turns: number = 1): Promise<string> {
  console.log("📞 Starting voice conversation...\n");
  let result = "";

  for (let i = 0; i < turns; i++) {
    console.log(`\n🔁 Turn ${i + 1}/${turns}`);
    await recordAudio();
    await convertAudio();
    const clientText = await transcribeAudio();
    if (!clientText) {
      console.warn("⚠️ No input detected, skipping turn.");
      continue;
    }
    const { audioBuffer, aiText } = await getAIResponse(clientText);
    console.log("🤖 AI:", aiText);
    await playAudio(audioBuffer);
    await logConversation(clientText, aiText);
    result = aiText;
  }

  console.log("\n✅ Conversation ended. Log saved.");
  return result;
}

// 🚀 API Endpoint
app.get("/start-call", async (req, res) => {
  try {
    const result = await mainLoop(1);
    res.json({ message: "Conversation complete", ai_response: result });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🧠 Server Startup
app.listen(PORT, () => {
  console.log(`🚀 API ready at http://localhost:${PORT}/start-call`);
});

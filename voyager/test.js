// test-minimax.js
import fetch from "node-fetch"; // If using Node <18, install node-fetch: npm install node-fetch
import readline from "readline";

const API_URL = "https://api.minimaxi.com/v1/chat/completions";

function ask(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    }),
  );
}

async function main() {
  let apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    apiKey = await ask("🔑 Paste your MiniMax API key: ");
    if (!apiKey) {
      console.error("❌ No key provided. Exiting.");
      process.exit(1);
    }
  }

  const payload = {
    model: "minimax-m2.5", // or 'minimax-m2.1:free' if you want free
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: 'Say "Hello, API works!" in exactly that phrase.',
      },
    ],
    max_tokens: 50,
  };

  console.log("📡 Sending request...");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`, // MiniMax uses Bearer
        // Also try x-api-key as a fallback (some endpoints use it)
        // 'X-API-Key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log(`\n✅ Status: ${res.status} ${res.statusText}`);
    console.log("📦 Raw response:");
    console.log(text);

    if (res.ok) {
      try {
        const json = JSON.parse(text);
        console.log("\n💬 Message from API:");
        console.log(json.choices?.[0]?.message?.content || "No content");
      } catch (_) {
        // already printed raw
      }
    } else {
      console.error("❌ API returned an error.");
    }
  } catch (err) {
    console.error("💥 Network or fetch error:", err.message);
  }
}

main();

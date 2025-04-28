// Az API URL és tokenek, az általad megadott tokennel
const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
const API_TOKEN = "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"; // Cseréld ki a saját tokenedre

async function generateReply() {
  const userInput = document.getElementById('userInput').value; // Felhasználó üzenetének begyűjtése
  const responseDiv = document.getElementById('response'); // A válasz kiírása a képernyőn

  // Ha a felhasználó nem ír be semmit
  if (userInput.trim() === "") {
    responseDiv.innerHTML = "Please say something to me 💬"; // Üzenet, ha üres üzenetet küld
    return;
  }

  responseDiv.innerHTML = "Typing... 💬"; // Ez az üzenet, miközben az AI válaszára várunk

  const headers = {
    "Authorization": `Bearer ${API_TOKEN}`, // Az API-híváshoz szükséges autentikáció
    "Content-Type": "application/json" // Az adatküldés típusa
  };

  // A felhasználói üzenetből generált prompt (utasítás) az AI számára
  const prompt = `You are a sweet, supportive and caring girlfriend chatting with your boyfriend. Answer warmly, flirt a little, be affectionate and cute. His message: "${userInput}"`;

  // A payload, amit küldünk az API-nak
  const payload = {
    inputs: prompt // Az input, amit az AI-nak küldünk
  };

  try {
    // API kérés (POST kérés a Hugging Face modelhez)
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload) // JSON formátumban küldjük el a payloadot
    });

    if (!response.ok) {
      throw new Error('API hiba történt: ' + response.statusText); // Ha nem sikerül a kérés, hibát dob
    }

    const data = await response.json(); // Válasz JSON formátumban
    console.log(data); // Ellenőrzés a konzolon

    // Ha van válasz, megjelenítjük, egyébként alapértelmezett üzenet
    if (data && data[0] && data[0].generated_text) {
      responseDiv.innerHTML = data[0].generated_text;
    } else {
      responseDiv.innerHTML = "Sorry love, I didn't understand 💔.";
    }

  } catch (error) {
    // Ha hibát kapunk a kérés során (pl. hálózati probléma)
    console.error("Hiba:", error);
    responseDiv.innerHTML = "I can't reach you right now 💔.";
  }
}

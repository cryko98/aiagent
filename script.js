async function generateReply() {
  const userInput = document.getElementById('userInput').value;
  const responseDiv = document.getElementById('response');

  if (userInput.trim() === "") {
    responseDiv.innerHTML = "Please say something to me 💬";
    return;
  }

  responseDiv.innerHTML = "Typing... 💬";

  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"; 
  const API_TOKEN = "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";

  const headers = {
    "Authorization": `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json"
  };

  const prompt = `You are a sweet, supportive and caring girlfriend chatting with your boyfriend. Answer warmly, flirt a little, be affectionate and cute. His message: "${userInput}"`;

  const payload = {
    inputs: prompt
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log(data);
    responseDiv.innerHTML = data[0]?.generated_text || "Sorry love, I didn't understand 💔.";
  } catch (error) {
    responseDiv.innerHTML = "I can't reach you right now 💔.";
  }
}

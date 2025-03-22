document.addEventListener("dblclick", async () => {
  const selection = window.getSelection();
  const selectedText = selection?.toString().trim();

  if (!selectedText) return;

  const translatedText = await translateText(selectedText, "en");

  const range = selection!.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(translatedText));
});

async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
        format: "text",
      }),
    });
    const data = await response.json();
    return data.translatedText || "Error";
  } catch (error) {
    console.error("Translation error:", error);
    return "Translation failed";
  }
}
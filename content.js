function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// ~60 WPM = ~5 chars/sec → ~200ms per char (with randomness)
function getTypingDelay() {
    return 150 + Math.random() * 100; // 150–250 ms
}
function getSentencePause() {
    return 800 + Math.random() * 1200; // 0.8–2 sec pause
}
async function typeText(text) {
    const activeElement = document.activeElement;
    if (!activeElement || !(activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable)) {
        alert("Click on a text field first!");
        return;
    }
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        // Insert character
        if (activeElement.isContentEditable) {
            document.execCommand("insertText", false, char);
        } else {
            activeElement.value += char;
        }
        // Dispatch input event (important for sites like Discord, etc.)
        activeElement.dispatchEvent(new Event("input", { bubbles: true }));
        // Sentence pause
        if (char === ";" || char === "!" || char === "?" || char === '.') {
            await sleep(getSentencePause());
        } else {
            await sleep(getTypingDelay());
        }
    }
}
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "typeText") {
        setTimeout(() => {
            typeText(msg.text);
        }, msg.delay || 0);
    }
});
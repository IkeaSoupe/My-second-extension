document.getElementById("typeBtn").addEventListener("click", async () => {
    const text = document.getElementById("textInput").value;
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, {
        action: "typeText",
        text: text,
        delay: 3000 // 3 seconds to switch tabs
    });
});
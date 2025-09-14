let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const categoryFilter = document.getElementById("categoryFilter");

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function populateCategories() {
  categoryFilter.innerHTML = <option value="all">All Categories</option>;
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
  categoryFilter.value = localStorage.getItem("lastCategory") || "all";
}

function showRandomQuote() {
  let filtered = quotes;
  if (categoryFilter.value !== "all") {
    filtered = quotes.filter(q => q.category === categoryFilter.value);
  }
  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes for this category";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];
  quoteDisplay.innerHTML = <p><strong>${quote.category}:</strong> ${quote.text}</p>;
}

function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();
  if (!text || !category) return alert("Please fill both fields");
  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  newQuoteText.value = "";
  newQuoteCategory.value = "";
  alert("Quote added!");
  showRandomQuote();
}

function filterQuotes() {
  localStorage.setItem("lastCategory", categoryFilter.value);
  showRandomQuote();
}

newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
categoryFilter.addEventListener("change", filterQuotes);

populateCategories();
showRandomQuote();
// call this after quotes array defined
async function syncWithServer() {
  try {
    // get server data
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverData = await response.json();

    // simulate: convert first 5 posts to quote objects
    const serverQuotes = serverData.slice(0, 5).map(p => ({
      text: p.title,
      category: "Server"
    }));

    // Conflict strategy: server wins if duplicate text
    const texts = new Set(serverQuotes.map(q => q.text));
    quotes = [
      ...serverQuotes,
      ...quotes.filter(q => !texts.has(q.text))
    ];

    saveQuotes();
    populateCategories();
    alert("Synced with server!");
    showRandomQuote();
  } catch (err) {
    console.error("Sync failed", err);
  }
}

// Example: sync every 30 seconds
setInterval(syncWithServer, 30000);

// some quotes to display
let quotes = [
  { text: "Think outside the box.", category: "Motivation" },
  { text: "In life there is ups and down", category: "Life" },
  { text: "If you want to get positive things be positive for others.", category: "Inspiration" }
];

// Function to show a random quote on the page
function showRandomQuote() {
  // If there are no quotes, tell the user
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerText = "No quotes available. Please add one!";
    return;
  }

  // Pick a random quote from the list
  const randomNumber = Math.floor(Math.random() * quotes.length);
  const chosenQuote = quotes[randomNumber];

  // Display the chosen quote nicely
  document.getElementById("quoteDisplay").innerText = `"${chosenQuote.text}" [${chosenQuote.category}]`;
}

// Function to add a new quote from user input
function addNewQuote() {
  // Get the user's quote and category inputs
  const quoteText = document.getElementById("quoteInput").value.trim();
  const quoteCategory = document.getElementById("categoryInput").value.trim();

  // Check if both fields are filled
  if (quoteText === "" || quoteCategory === "") {
    alert("Please enter both the quote and its category before adding.");
    return;
  }

  // Create a new quote object and add it to the quotes array
  const newQuote = { text: quoteText, category: quoteCategory };
  quotes.push(newQuote);

  // Clear the input fields to make it ready for the next entry
  document.getElementById("quoteInput").value = "";
  document.getElementById("categoryInput").value = "";

  // Let the user know their quote was added
  alert("Your quote was added successfully!");
}

// Connect the functions to the buttons on the page
document.getElementById("showQuoteButton").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addNewQuote);

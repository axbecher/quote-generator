const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const copyBtn = document.getElementById('copy');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show new quote
function newQuote(){
    loading();
    // Pick a random quote from API quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with "Unknown"
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error)
    {
        // alert(error);
        // Catch Error Here
    }
}

// To tweet a quote ( tweeter )
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// To share a quote ( facebook )

function shareQuote(){
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=axbecher.com&quote=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(facebookUrl, '_blank');
}

// To copy in clipboard ( browser )
function copyQuote(){
    navigator.clipboard.writeText(`${quoteText.textContent} - ${authorText.textContent}`);
    alert("Text copied in clipboard: [ " + `${quoteText.textContent} - ${authorText.textContent}`+ " ]");
}

function MesajEroare(){
    alert("Functioneaza!");
}

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

// Event Listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
facebookBtn.addEventListener('click',shareQuote);
copyBtn.addEventListener('click',copyQuote);

// On Load
getQuotes();
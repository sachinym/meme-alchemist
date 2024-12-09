const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");
const downloadBtn = document.querySelector(".meme-generator .download-btn");

// A set to store unique meme URLs
const shownMemes = new Set();

const updateDetails = (url, title, author) => {
  memeImage.setAttribute("src", url);
  memeTitle.innerHTML = title;
  memeAuthor.innerHTML = `Meme by: ${author}`;
};

// Fetch memes from the API and ensure they are unique
const generateMeme = () => {
  fetch("https://meme-api.com/gimme")
    .then((response) => response.json())
    .then((data) => {
      if (!shownMemes.has(data.url)) {
        shownMemes.add(data.url);
        updateDetails(data.url, data.title, data.author);
      } else {
        // Limit retries to avoid indefinite recursion
        console.warn("Duplicate meme detected, retrying...");
        setTimeout(generateMeme, 100); // Retry with a small delay
      }
    })
    .catch((error) => {
      console.error("Error fetching meme:", error);
    });
};

// To download the meme
const downloadMeme = () => {
  const imageSrc = memeImage.getAttribute("src");
  const title = memeTitle.textContent;
  const author = memeAuthor.textContent.replace("Meme by: ", "");

  const downloadLink = document.createElement("a");
  downloadLink.href = imageSrc;
  downloadLink.download = `${title}_${author}_meme.jpg`;
  downloadLink.style.display = 'none';  // Hide the link
  downloadLink.target = "_blank";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

generateMemeBtn.addEventListener("click", generateMeme);
downloadBtn.addEventListener("click", downloadMeme);

// Generate an initial meme when the page loads
generateMeme();

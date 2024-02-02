const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");
const downloadBtn = document.querySelector(".meme-generator .download-btn");

const updateDetails = (url, title, author) => {
  memeImage.setAttribute("src", url);
  memeTitle.innerHTML = title;
  memeAuthor.innerHTML = `Meme by: ${author}`;
};

//fetch the memes from the below api link
const generateMeme = () => {
  fetch("https://meme-api.com/gimme")
    .then((response) => response.json())
    .then((data) => {
      updateDetails(data.url, data.title, data.author);
    });
};

//to download the memes, download button is used which on click opens related website and downloads.
const downloadMeme = () => {
  const imageSrc = memeImage.getAttribute("src");
  const title = memeTitle.innerHTML;
  const author = memeAuthor.innerHTML.replace("Meme by: ", "");


  const downloadLink = document.createElement("a");
  downloadLink.href = imageSrc;
  downloadLink.download = `${title}_${author}_meme.jpg`;
  downloadLink.target = "_blank"; // For some browsers to work
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

generateMemeBtn.addEventListener("click", generateMeme);
downloadBtn.addEventListener("click", downloadMeme);

generateMeme();

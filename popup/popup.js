const imgList = document.querySelector('#imgList');

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
  console.log(this.files); 
  for (let i = 0; i < this.files.length; i++) {
    const file = this.files[i];
    
    if (!file.type.startsWith('image/')){ continue }
    
    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    
    const imgWrap = document.createElement("div");
    const imgTitle = document.createElement("h3");
    const imgSize = document.createElement("p");

    imgWrap.setAttribute('data-index', i)
    
    imgWrap.appendChild(img);
    imgList.appendChild(imgWrap);

    imgWrap.onclick = setOverlay;
    
    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
}







// const dom = {};

// const state = {
//   currentBaseURL: null,
// };

// // chrome.storage.sync.get('color', function(data) {
// //   changeColor.style.backgroundColor = data.color;
// //   changeColor.setAttribute('value', data.color);
// // });

// const getCurrentBaseUrl = () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     state.currentBaseURL = tabs[0].url.split('/', 3).join('/');
//     console.log('baseurl', state.currentBaseURL);
//     gatherDesignImages();
//   });
// };

// const gatherDesignImages = () => {
//   for (let i = 0; i <= 11; i++) {
//     const imgEl = new Image();
//     const src = `${state.currentBaseURL}/designs/image_${i}`;
//     console.log('src', src);
//     imgEl.src = src;
//     console.log(imgEl, imgEl.width, imgEl.height);
//     // check for height/width on created image after .complete is true
//   }
// };


// document.addEventListener('DOMContentLoaded', () => {
//   getCurrentBaseUrl();
// });

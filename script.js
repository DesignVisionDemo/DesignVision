document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("image-input");
    const uploadedImage = document.getElementById("uploaded-image");
    const outputImage = document.getElementById("output-image");
    const generateBtn = document.getElementById("generate-btn");
    const clearBtn = document.getElementById("clear-btn");
    const uploadBox = document.querySelector(".upload-box");
    const outputBox = document.querySelector(".output-box");
    const modelSelect = document.getElementById("model");
  
    // Function to create a new loading indicator element
    function createLoadingIndicator() {
      const li = document.createElement("div");
      li.classList.add("loading");
      return li;
    }
  
    // Show loading indicator in target box; returns the indicator element.
    function showLoading(targetBox) {
      const loadingIndicator = createLoadingIndicator();
      targetBox.appendChild(loadingIndicator);
      loadingIndicator.style.display = "block";
      return loadingIndicator;
    }
  
    // Hide loading indicator and display image.
    function hideLoading(loadingIndicator, imgElement, imgSrc) {
      if (loadingIndicator && loadingIndicator.parentNode) {
        loadingIndicator.parentNode.removeChild(loadingIndicator);
      }
      imgElement.src = imgSrc;
      imgElement.style.display = "block";
    }
  
    // AI-generated images mapping for different models.
    // (The keys here are lower-case file names; adjust as needed.)
    const aiGeneratedImages = {
      "Modern": { "input1.png": "opmodern1.png" },
      "Minimalistic": { "input1.png": "opmin1.png" },
      "Classic": { "input1.png": "opclassic1.png" }
    };
  
    // Handle Image Upload with loading animation.
    imageInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const loadingIndicator = showLoading(uploadBox);
        // Hide the upload placeholder text.
        const uploadText = document.querySelector(".upload-text");
        if (uploadText) uploadText.style.display = "none";
  
        const reader = new FileReader();
        reader.onload = function (e) {
          setTimeout(() => {
            hideLoading(loadingIndicator, uploadedImage, e.target.result);
          }, 2000);
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Generate AI Output with loading animation.
    generateBtn.addEventListener("click", function () {
      if (uploadedImage.src) {
        const loadingIndicator = showLoading(outputBox);
        // Hide the output placeholder text.
        const outputText = document.querySelector(".output-text");
        if (outputText) outputText.style.display = "none";
  
        setTimeout(() => {
          const selectedModel = modelSelect.value;
          const fileName = imageInput.files[0]?.name.toLowerCase();
          let outputSrc = "default-output.jpg";
          if (fileName && aiGeneratedImages[selectedModel] && aiGeneratedImages[selectedModel][fileName]) {
            outputSrc = aiGeneratedImages[selectedModel][fileName];
          }
          hideLoading(loadingIndicator, outputImage, outputSrc);
        }, 2000);
      } else {
        alert("Please upload an image first!");
      }
    });
  
    // Clear Images and reset placeholders.
    clearBtn.addEventListener("click", function () {
      imageInput.value = "";
      uploadedImage.src = "";
      outputImage.src = "";
      uploadedImage.style.display = "none";
      outputImage.style.display = "none";
  
      // Show placeholder texts.
      const uploadText = document.querySelector(".upload-text");
      const outputText = document.querySelector(".output-text");
      if (uploadText) uploadText.style.display = "block";
      if (outputText) outputText.style.display = "block";
    });
      // Initialize the TwentyTwenty slider on the container.
      
          });
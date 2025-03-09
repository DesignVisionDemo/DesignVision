document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("image-input");
    const uploadedImage = document.getElementById("uploaded-image");
    const outputImage = document.getElementById("output-image");
    const generateBtn = document.getElementById("generate-btn");
    const clearBtn = document.getElementById("clear-btn");
    const uploadBox = document.querySelector(".upload-box");
    const outputBox = document.querySelector(".output-box");
    const modelSelect = document.getElementById("model");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    function createLoadingIndicator() {
        const li = document.createElement("div");
        li.classList.add("loading");
        return li;
    }
    
    function showLoading(targetBox) {
        const loadingIndicator = createLoadingIndicator();
        targetBox.appendChild(loadingIndicator);
        loadingIndicator.style.display = "block";
        return loadingIndicator;
    }
    
    function hideLoading(loadingIndicator, imgElement, imgSrc) {
        if (loadingIndicator && loadingIndicator.parentNode) {
            loadingIndicator.parentNode.removeChild(loadingIndicator);
        }
        imgElement.src = imgSrc;
        imgElement.style.display = "block";
    }
    
    const aiGeneratedImages = {
        "Modern": { 
            "input1.png": "images/opmodern1.png",
            "input2.png": "images/opmodern2.png",
            "input3.png": "images/opmodern3.png"
        },
        "Minimalistic": { 
            "input1.png": "images/opmin1.png",
            "input2.png": "images/opmin2.png",
            "input3.png": "images/opmin3.png"
        },
        "Classic": { 
            "input1.png": "images/opclassic1.png",
            "input2.png": "images/opclassic2.png",
            "input3.png": "images/opclassic3.png"
        }
    };
    
    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const loadingIndicator = showLoading(uploadBox);
            const uploadText = document.querySelector(".upload-text");
            if (uploadText) {
                uploadText.style.display = "none";
            }
            const reader = new FileReader();
            reader.onload = function (e) {
                setTimeout(() => {
                    hideLoading(loadingIndicator, uploadedImage, e.target.result);
                }, 2000);
            };
            reader.readAsDataURL(file);
        }
    });
    
    generateBtn.addEventListener("click", function () {
        if (uploadedImage.src) {
            const loadingIndicator = showLoading(outputBox);
            const outputText = document.querySelector(".output-text");
            if (outputText) {
                outputText.style.display = "none";
            }
            setTimeout(() => {
                const selectedModel = modelSelect.value;
                let fileName = imageInput.files[0]?.name.toLowerCase();
                if (!fileName && uploadedImage.src.includes("input")) {
                    const match = uploadedImage.src.match(/(input\d+\.png)/);
                    fileName = match ? match[1].toLowerCase() : "";
                }
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
    
    clearBtn.addEventListener("click", function () {
        imageInput.value = "";
        uploadedImage.src = "";
        outputImage.src = "";
        uploadedImage.style.display = "none";
        outputImage.style.display = "none";
        
        const uploadText = document.querySelector(".upload-text");
        const outputText = document.querySelector(".output-text");
        if (uploadText) {
            uploadText.style.display = "block";
        }
        if (outputText) {
            outputText.style.display = "block";
        }
    });
    
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
        localStorage.setItem("dark-mode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });
    
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }
    
    document.getElementById("home-btn").addEventListener("click", function () {
        window.location.href = "home.html";
    });

    const sampleImages = document.querySelectorAll('.sample-img');
    sampleImages.forEach(img => {
        img.addEventListener('click', function() {
            imageInput.value = "";
            uploadedImage.src = this.src;
            uploadedImage.style.display = "block";
            const uploadText = document.querySelector(".upload-text");
            if (uploadText) {
                uploadText.style.display = "none";
            }
        });
    });
});

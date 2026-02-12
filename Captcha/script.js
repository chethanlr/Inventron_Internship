const form = document.getElementById("myForm");
const captchaSection = document.getElementById("captchaSection");
const captchaText = document.getElementById("captchaText");
const captchaInput = document.getElementById("captchaInput");
const refreshBtn = document.getElementById("refreshBtn");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

let step = 1;
let generatedCaptcha = "";

function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 5; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

function setNewCaptcha() {
    generatedCaptcha = generateCaptcha();
    captchaText.textContent = generatedCaptcha;
}

refreshBtn.addEventListener("click", function () {
    setNewCaptcha();
});

form.addEventListener("submit", function (event) {
    event.preventDefault(); // No reload

    if (step === 1) {

        // Validate first two inputs
        if (input1.value.trim() === "" || input2.value.trim() === "") {
            message.style.color = "red";
            message.textContent = "Please fill both fields";
            return;
        }

        captchaSection.classList.remove("hidden");
        setNewCaptcha();
        step = 2;
        message.textContent = "";
    } 
    else if (step === 2) {

        if (captchaInput.value.trim() === "") {
            message.style.color = "red";
            message.textContent = "Please enter captcha";
            return;
        }

        // Case-insensitive comparison
        if (captchaInput.value.toUpperCase() === generatedCaptcha) {
            message.style.color = "green";
            message.textContent = "Submitted successfully";
            submitBtn.disabled = true;
            resetBtn.classList.remove("hidden");
        } else {
            message.style.color = "red";
            message.textContent = "Invalid captcha";
            setNewCaptcha();
            captchaInput.value = "";
        }
    }
});

resetBtn.addEventListener("click", function () {
    form.reset();
    captchaSection.classList.add("hidden");
    submitBtn.disabled = false;
    resetBtn.classList.add("hidden");
    message.textContent = "";
    step = 1;
});

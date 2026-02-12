function validateForm() {
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
        alert("Passwords do not match ");
        return false;
    }

    document.querySelector("button").innerText = "Registered ";
    document.querySelector("button").style.background =
        "linear-gradient(90deg, #06d6a0, #1b9aaa)";

    return false;
}

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const loginError = document.getElementById("login-error");
const successMessage = document.getElementById("success-message");

emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
loginForm.addEventListener("submit", submitForm);

function validateEmail() {
  if (!emailInput.validity.valid) {
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }
  enableSubmitButton();
}

function validatePassword() {
  if (passwordInput.value === "") {
    passwordError.style.display = "block";
  } else {
    passwordError.style.display = "none";
  }
  enableSubmitButton();
}

function enableSubmitButton() {
  if (emailInput.validity.valid && passwordInput.value !== "") {
    document.getElementById("login-btn").disabled = false;
  } else {
    document.getElementById("login-btn").disabled = true;
  }
}

function submitForm(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  fetch("http://0.0.0.0:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("El correo electrónico o la contraseña son incorrectos.");
    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem("user", JSON.stringify(data));
    console.log(localStorage.getItem("user"));
    successMessage.innerText = "Inicio de sesión exitoso. Redireccionando a chatlist.html...";
    successMessage.style.display = "block";
    window.location.href = "chatlist.html";
  })
  .catch(error => {
    loginError.innerText = error.message;
    loginError.style.display = "block";
  });
}

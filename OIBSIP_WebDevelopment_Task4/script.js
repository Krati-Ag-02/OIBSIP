const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const toggleForm = document.getElementById("toggleForm");
const message = document.getElementById("message");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

let isLogin = false;

/* PASSWORD TOGGLE */
togglePassword.addEventListener("click", () => {

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.innerHTML = '<i class="ri-eye-off-line"></i>';
  } else {
    passwordInput.type = "password";
    togglePassword.innerHTML = '<i class="ri-eye-line"></i>';
  }

});

/* TOGGLE FORM */
toggleForm.addEventListener("click", () => {

  isLogin = !isLogin;

  if (isLogin) {

    formTitle.innerText = "Welcome Back";
    submitBtn.innerText = "Login";

    nameInput.style.display = "none";

    toggleForm.innerText = "Create Account";

    document.querySelector(".toggle-text").innerHTML =
      `Don't have an account? <span id="toggleForm">Create Account</span>`;

  } else {

    formTitle.innerText = "Create Account";
    submitBtn.innerText = "Sign Up";

    nameInput.style.display = "block";

    document.querySelector(".toggle-text").innerHTML =
      `Already have an account? <span id="toggleForm">Login</span>`;

  }

  attachToggle();

});

/* ATTACH TOGGLE AGAIN */
function attachToggle() {

  document.getElementById("toggleForm")
    .addEventListener("click", () => {

      toggleForm.click();

    });

}

/* AUTH */
submitBtn.addEventListener("click", () => {

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password || (!isLogin && !name)) {
    message.innerText = "Please fill all fields";
    return;
  }

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  if (isLogin) {

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (user) {

      message.innerText = "Login successful";

    } else {

      message.innerText = "Invalid credentials";

    }

  } else {

    const exists = users.find(
      u => u.email === email
    );

    if (exists) {

      message.innerText = "User already exists";
      return;

    }

    users.push({
      name,
      email,
      password
    });

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    message.innerText = "Account created";

  }

});
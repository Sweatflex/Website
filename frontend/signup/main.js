//Variables

const error0 = document.getElementById("error 0");
const error1 = document.getElementById("error 1");
const error2 = document.getElementById("error 2");
const error3 = document.getElementById("error 3");

const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect")

/** @type {HTMLInputElement} */
const usernameElement = document.getElementById("username");
/** @type {HTMLInputElement} */
const emailElement = document.getElementById("email");
/** @type {HTMLInputElement} */
const passwordElement = document.getElementById("password");

//Functions

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function setError(Id, set) {
    const wrapper = document.getElementById(Id).closest(".input-wrapper")
    wrapper.classList.toggle("error", set);
}

//Change link if it has an redirect param

if (redirect) {
    document.getElementById("link").href = `/signin?redirect=${redirect}`;
}

//On focus lost error checkers

//Username

usernameElement.addEventListener("focusout", (e) => {
    //Get the string

    const username = usernameElement.value;

    //Reset all vars

    error0.textContent = "";
    error1.textContent = "";
    let error = false

    if (username.includes(" ")) {
        error0.textContent = "Username must not contain any spaces";
        setError("username", true);
        error = true;
    }

    if (username.length < 3 || username.length > 24) {
        error1.textContent = "Username must be between 3 and 24 characters";
        setError("username", true);
        error = true;
    }

    if (error) {
        return;
    }

    setError("username", false);
});


//Password

passwordElement.addEventListener("focusout", (e) => {
    //Get the string

    const password = document.getElementById("password").value;
    
    //Reset all vars

    error2.textContent = "";
    let error = false
    
    if (password.length < 8 || password.length > 18) {
        error2.textContent = "Password must be between 8 and 18 characters";
        setError("password", true);
        error = true;
    }
    
    if (error) {
        return;
    }
    
    setError("password", false);
});

//Email

emailElement.addEventListener("focusout", (e) => {
    //Get the string

    const email = document.getElementById("email").value;

    //Reset all vars

    error3.textContent = "";
    let error = false

    if (!validateEmail(email)) {
        error3.textContent = "Please use a valid email";
        setError("email", true);
        error = true;
    }

    if (error) {
        return;
    }

    setError("email", false);
});

//Sign up function

async function signup() {
    //Get the strings
    /** @type {string} */
    const username = usernameElement.value;
    /** @type {string} */
    const email = emailElement.value;
    /** @type {string} */
    const password = passwordElement.value;

    //Reset all vars

    error0.textContent = "";
    error1.textContent = "";
    error2.textContent = "";
    error3.textContent = "";
    setError("username", false)
    setError("email", false)
    setError("password", false)

    let error = false

    //Check values for errors

    if (username.includes(" ")) {
        error0.textContent = "Username must not contain any spaces";
        setError("username", true);
        error = true;
    }

    if (username.length < 3 || username.length > 24) {
        error1.textContent = "Username must be between 3 and 24 characters";
        setError("username", true);
        error = true;
    }

    if (password.length < 8 || password.length > 18) {
        error2.textContent = "Password must be between 8 and 18 characters";
        setError("password", true);
        error = true;
    }

    if (!validateEmail(email)) {
        error3.textContent = "Please use a valid email";
        setError("email", true);
        error = true;
    }

    if (error) {
        return;
    }

    //Send post request

    const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });
    
    const data = await response.json();

    if (response.status == 409 && data.detail == "Username already exists, and Email already exists") {
        error1.textContent = "There is already an account with the same username";
        error3.textContent = "There is already an account with the same email";
        setError("username", true);
        setError("email", true);
        return;
    }

    if (response.status == 409 && data.detail == "Username already exists") {
        error1.textContent = "There is already an account with the same username";
        setError("username", true);
        return;
    }

    if (response.status == 409 && data.detail == "Email already exists") {
        error3.textContent = "There is already an account with the same email";
        setError("email", true);
        return;
    }

    if (data.status == 201) {
        document.cookie = `cookie=${data.cookie}; path=/; SameSite=Lax`;

        if (redirect) {
            window.location.href = redirect;
        } else {
            window.location.href = "/";
        }
    }   
}
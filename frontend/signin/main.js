const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect")

if (redirect) {
    document.getElementById("link").href = `/signup?redirect=${redirect}`;
}

async function signin() {
    const error = document.getElementById("error 1")
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password })
    });

    const data = await response.json();

    if (response.status == 401) {
        error.textContent = "Wrong credentials";
        return;
    }

    if (data.status == 200) {
        document.cookie = `cookie=${data.cookie}; path=/; SameSite=Lax`;

        if (redirect) {
            window.location.href = redirect;
        } else {
            window.location.href = "/";
        }
    }
}
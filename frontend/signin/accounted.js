const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith("cookie="))
        ?.split("=")[1];

if (cookie) {
    window.location.href = "../"
}
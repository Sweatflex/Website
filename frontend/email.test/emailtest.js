let generatedCode;

document.getElementById("form").addEventListener("submit", function(e) {

  e.preventDefault();

  const email = document.getElementById("email").value;

  generatedCode = Math.floor(100000 + Math.random() * 900000);

  alert("Code sent to " + email + ": " + generatedCode);

});

function verifyCode() {

  const input = document.getElementById("codeInput").value;

  if (input == generatedCode) {

    document.getElementById("result").innerText = "Verified!";

  } else {

    document.getElementById("result").innerText = "Wrong code!";

  }

}
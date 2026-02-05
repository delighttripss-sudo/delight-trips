document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("cookie-consent");
  const accept = document.getElementById("cookie-accept");

  // Check storage
  if (!localStorage.getItem("cookies_accepted")) {
    popup.style.display = "block";
  }

  accept.onclick = function () {
    localStorage.setItem("cookies_accepted", "true");
    popup.style.display = "none";
  };
});

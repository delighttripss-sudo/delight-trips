document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("cookie-consent");
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");

  // Check if user has already made a choice
  const consent = localStorage.getItem("dt_cookie_consent");

  if (!consent) {
    // Elegant entry delay
    setTimeout(() => {
      popup.classList.add("is-visible");
      popup.setAttribute("aria-hidden", "false");
    }, 1200);
  }

  const hidePopup = (choice) => {
    localStorage.setItem("dt_cookie_consent", choice);
    popup.classList.remove("is-visible");
    popup.setAttribute("aria-hidden", "true");
  };

  acceptBtn.onclick = () => hidePopup("accepted");
  declineBtn.onclick = () => hidePopup("declined");
});

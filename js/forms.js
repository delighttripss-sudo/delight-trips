document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletterForm");
  const formStatus = document.getElementById("form-status");

  if (!newsletterForm || !formStatus) return;

  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(newsletterForm);
    const actionURL = newsletterForm.getAttribute("action");

    formStatus.textContent = "Subscribing...";
    formStatus.style.color = "#2563eb";

    try {
      const response = await fetch(actionURL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error();

      const result = await response.json();

      if (result.success) {
        formStatus.textContent =
          "🎉 Successfully subscribed! Welcome to Delight Trip.";
        formStatus.style.color = "#10b981";
        newsletterForm.reset();
      } else {
        throw new Error();
      }
    } catch {
      formStatus.textContent =
        "❌ Something went wrong. Please try again later.";
      formStatus.style.color = "#ef4444";
    }
  });
});

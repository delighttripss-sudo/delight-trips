/* ============================================
   ✅ FORMS.JS — NEWSLETTER HANDLER
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletterForm");
  const formStatus = document.getElementById("form-status");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);

      // Show loading state
      formStatus.innerHTML = "Processing...";
      formStatus.style.color = "#0077ff";

      try {
        const response = await fetch(e.target.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          // Success!
          formStatus.innerHTML = "✨ You're subscribed! Check your inbox soon.";
          formStatus.style.color = "#10b981";
          newsletterForm.reset();
        } else {
          throw new Error();
        }
      } catch (error) {
        // Error handling
        formStatus.innerHTML =
          "❌ Submission failed. Please check the Form ID.";
        formStatus.style.color = "#ef4444";
      }
    });
  }
});

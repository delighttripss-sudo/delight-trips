// ✅ WhatsApp Features (Form + Floating Button)

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     ✅ 1. FLOATING WHATSAPP CHAT BUTTON
  ========================================== */

  const chatBtn = document.getElementById("whatsappChatBtn");

  if (chatBtn) {
    chatBtn.addEventListener("click", () => {
      const phoneNumber = "917045286023";
      const message = "Hi Delight Trips, I need help planning a trip.";

      const encodedMsg = encodeURIComponent(message);

      // ✅ Detect Mobile vs Desktop
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isMobile) {
        // ✅ Mobile → Open WhatsApp App Directly
        window.location.href =
          "whatsapp://send?phone=" + phoneNumber + "&text=" + encodedMsg;
      } else {
        // ✅ Desktop → Open WhatsApp Web
        window.open(
          "https://web.whatsapp.com/send?phone=" +
            phoneNumber +
            "&text=" +
            encodedMsg,
          "_blank"
        );
      }
    });
  }

  /* ==========================================
     ✅ 2. WHATSAPP CONTACT FORM SUBMISSION
  ========================================== */

  const form = document.getElementById("whatsappForm");

  // ✅ If form doesn't exist on this page, skip safely
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // ✅ Collect Input Values
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const pax = document.getElementById("pax")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    // ✅ Simple Validation
    if (!name || !email || !phone || !pax || !message) {
      alert("⚠️ Please fill in all fields before sending.");
      return;
    }

    // ✅ WhatsApp Number
    const whatsappNumber = "917045286023";

    // ✅ Build Enquiry Message
    const finalMessage =
      `🌍 *New Travel Enquiry - Delight Trips* ✈️\n\n` +
      `👤 Name: ${name}\n` +
      `📧 Email: ${email}\n` +
      `📞 Phone: ${phone}\n` +
      `👥 Travellers (Pax): ${pax}\n\n` +
      `💬 Message:\n${message}\n\n` +
      `✅ Please assist the customer with best package options.`;

    // ✅ WhatsApp App Deep Link
    const appURL =
      "whatsapp://send?phone=" +
      whatsappNumber +
      "&text=" +
      encodeURIComponent(finalMessage);

    // ✅ WhatsApp Web Backup
    const webURL =
      "https://api.whatsapp.com/send?phone=" +
      whatsappNumber +
      "&text=" +
      encodeURIComponent(finalMessage);

    // ✅ Try WhatsApp App First
    window.location.href = appURL;

    // ✅ Backup: Open Web if App Not Responding
    setTimeout(() => {
      window.open(webURL, "_blank");
    }, 900);

    // ✅ Reset Form
    form.reset();
  });
});

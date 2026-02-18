/* ==========================================================
   🏛️ WHATSAPP ENGINE — ULTIMATE STABILITY (v9.0)
   ========================================================== */

function sendPackageToWhatsApp() {
  const whatsappNumber = "917045286023";

  // 1. Capture Values directly
  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const pax = document.getElementById("pax")?.value.trim();
  const message = document.getElementById("message")?.value.trim();

  // 2. Strict Validation
  if (!name || !email || !phone || !pax || !message) {
    alert("⚠️ Please fill in all fields before sending.");
    return;
  }

  // 3. Construct Message
  const finalMessage =
    `🌍 *New Travel Enquiry - Delight Trips* ✈️\n` +
    `---------------------------\n` +
    `👤 *Name:* ${name}\n` +
    `📧 *Email:* ${email}\n` +
    `📞 *Phone:* ${phone}\n` +
    `👥 *Travellers:* ${pax}\n` +
    `---------------------------\n` +
    `💬 *Message:* \n${message}`;

  // 4. Universal Link construction
  const finalURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage)}`;

  // 5. Open exactly one window
  window.open(finalURL, "_blank");

  // 6. Reset the form manually (check if form exists first)
  const form = document.getElementById("whatsappForm");
  if (form) form.reset();
}

// Keep the floating button logic separate
document.addEventListener("DOMContentLoaded", () => {
  const chatBtn = document.getElementById("whatsappChatBtn");

  if (chatBtn) {
    chatBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevents other scripts from stopping this click

      const whatsappNumber = "917045286023";
      const defaultText = "Hi Delight Trips, I need help planning a trip.";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultText)}`;

      console.log("WhatsApp button clicked, opening:", url);
      window.open(url, "_blank");
    });
  } else {
    console.error(
      "WhatsApp Button with ID 'whatsappChatBtn' not found in HTML.",
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "917045286023"; // Your Number

  // 1. MASTER FORM SUBMIT HANDLER (Event Delegation)
  document.body.addEventListener("submit", (e) => {
    // Only run this if the form submitted has the ID "packageForm"
    if (e.target.id === "packageForm") {
      e.preventDefault(); // Stop page reload

      const form = e.target;
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      // --- A. GET VALUES SAFELY ---
      const getValue = (id) => {
        const field = document.getElementById(id);
        return field ? field.value.trim() : "N/A";
      };

      const name = getValue("name");
      const email = getValue("email");
      const phone = getValue("phone");
      const destination = getValue("destination");
      const date = getValue("travelDate");
      const type = getValue("travelType"); // Select dropdown
      const travellers = getValue("travellers"); // Select dropdown
      const message = getValue("message"); // Textarea

      // --- B. VALIDATION ---
      if (!name || !phone) {
        alert("Please fill in your Name and Mobile Number.");
        return;
      }

      // --- C. UI FEEDBACK ---
      submitBtn.innerText = "Connecting...";
      submitBtn.disabled = true;

      // --- D. FORMAT WHATSAPP MESSAGE ---
      // Using %0a for line breaks to ensure it looks clean on phone
      const text = `*New Enquiry via Website*
--------------------------------
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
--------------------------------
📍 *Destination:* ${destination}
📅 *Date:* ${date}
✈️ *Type:* ${type}
👥 *Travellers:* ${travellers}
--------------------------------
📝 *Note:* ${message}`;

      // --- E. SEND TO WHATSAPP ---
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

      // Open in new tab
      window.open(url, "_blank");

      // --- F. CLEANUP ---
      setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
        form.reset(); // Clear the form

        // Optional: Close modal if it's open
        const modal = document.querySelector(".package-overlay");
        if (modal) modal.classList.remove("active");
        document.body.style.overflow = "";
      }, 1000);
    }
  });

  // 2. MODAL OPEN/CLOSE LOGIC (Generic Handler)
  document.body.addEventListener("click", (e) => {
    // Open Modal
    if (e.target.closest(".open-package-modal")) {
      e.preventDefault();
      const modal = document.querySelector(".package-overlay");
      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    }

    // Close Modal (Clicking outside the box)
    if (e.target.classList.contains("package-overlay")) {
      e.target.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

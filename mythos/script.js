// Ensure flip effect works for dynamically generated flip cards
document.addEventListener("click", function (e) {
  const card = e.target.closest(".flip-card");
  if (card) {
      card.querySelector(".flip-card-inner").classList.toggle("flipped");
  }
});

// DRAG & DROP for Front Letters & Answer Blocks (Power & Weakness)
document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("draggable-letter") || e.target.classList.contains("answer-block")) {
      e.dataTransfer.setData("letter", e.target.dataset.letter);
      e.dataTransfer.setData("question", e.target.dataset.question);
      e.dataTransfer.setData("answer", e.target.dataset.answer || "");
  }
});

// DRAG & DROP for Right Panel (Power Tag Slots)
const maxPowerSlots = 7;
for (let i = 1; i <= maxPowerSlots; i++) {
  const slot = document.getElementById(`slot${i}`);
  if (!slot) continue; // Ensure the slot exists before adding event listeners

  slot.addEventListener("dragover", (e) => e.preventDefault());

  slot.addEventListener("drop", (e) => {
      e.preventDefault();
      const letter = e.dataTransfer.getData("letter");
      const question = e.dataTransfer.getData("question");
      const answer = e.dataTransfer.getData("answer");

      const letterDiv = document.getElementById(`letter${i}`);
      const textDiv = document.getElementById(`text${i}`);

      textDiv.style.fontSize = "27px";
      letterDiv.textContent = letter;
      textDiv.textContent = answer;
      slot.dataset.question = question;
  });
}

// DRAG & DROP for Right Panel (Weakness Tag Slots)
const maxWeaknessSlots = 3;
for (let i = 1; i <= maxWeaknessSlots; i++) {
  const wslot = document.getElementById(`wslot${i}`);
  if (!wslot) continue;

  wslot.addEventListener("dragover", (e) => e.preventDefault());

  wslot.addEventListener("drop", (e) => {
      e.preventDefault();
      const letter = e.dataTransfer.getData("letter");
      const question = e.dataTransfer.getData("question");
      const answer = e.dataTransfer.getData("answer");

      const wletterDiv = document.getElementById(`wletter${i}`);
      const wtextDiv = document.getElementById(`wtext${i}`);

      wletterDiv.textContent = letter;
      wtextDiv.textContent = answer;
      wslot.dataset.question = question;
  });
}

// CLEAR SLOT FUNCTION for Power Tags
function clearSlot(slotElement) {
  const letterDiv = slotElement.querySelector(".tag-letter");
  const textDiv = slotElement.querySelector(".tag-text");

  if (letterDiv && textDiv) {
      letterDiv.textContent = "";
      textDiv.textContent = "";
      slotElement.dataset.question = "";
      textDiv.style.fontSize = "27px";
  }
}

// CLEAR SLOT FUNCTION for Weakness Tags
function clearWeaknessSlot(slotElement) {
  const letterDiv = slotElement.querySelector(".tag-letter");
  const textDiv = slotElement.querySelector(".tag-text");

  if (letterDiv && textDiv) {
      letterDiv.textContent = "";
      textDiv.textContent = "";
      slotElement.dataset.question = "";
      textDiv.style.fontSize = "27px";
  }
}

// TOOLTIP HANDLING
const tooltip = document.getElementById("tooltip");

document.addEventListener("mousemove", (e) => {
  if (tooltip.style.opacity === "1") {
      let x = e.clientX + 15, y = e.clientY + 15;
      if (x + tooltip.offsetWidth > window.innerWidth) x -= tooltip.offsetWidth + 30;
      if (y + tooltip.offsetHeight > window.innerHeight) y -= tooltip.offsetHeight + 30;
      tooltip.style.top = `${y}px`;
      tooltip.style.left = `${x}px`;
  }
});

document.addEventListener("mouseenter", (e) => {
  if (e.target.dataset.question) showTooltip(e.target.dataset.question);
}, true);

document.addEventListener("mouseleave", hideTooltip, true);

function showTooltip(text) {
  tooltip.textContent = text;
  tooltip.style.opacity = "1";
}

function hideTooltip() {
  tooltip.style.opacity = "0";
}

// THEME TITLE & MYSTERY HANDLING (For localStorage persistence)
document.addEventListener("DOMContentLoaded", function () {
  const themeTitleDiv = document.getElementById("themeTitle");
  const mysteryDiv = document.getElementById("mystery");

  [themeTitleDiv, mysteryDiv].forEach((div) => {
      div.addEventListener("focus", function () {
          if (this.textContent.trim() === "") this.textContent = "";
      });
      div.addEventListener("blur", function () {
          if (this.textContent.trim() === "") this.textContent = "";
      });
  });

  // SAVE AS PNG BUTTON HANDLING
  document.getElementById("saveAsPng").addEventListener("click", function () {
      const themeCard = document.querySelector(".theme-card");

      // Temporarily hide all .clear-slot buttons before capturing
      const clearSlots = document.querySelectorAll(".clear-slot");
      clearSlots.forEach((slot) => (slot.style.display = "none"));

      html2canvas(themeCard, {
          backgroundColor: null, // Keep transparency
          scale: 3, // Higher resolution
          useCORS: true, // Allow external resources
          allowTaint: false, // Prevent CORS issues
      })
          .then((canvas) => {
              // Restore the .clear-slot buttons after capture
              clearSlots.forEach((slot) => (slot.style.display = ""));

              const link = document.createElement("a");
              link.href = canvas.toDataURL("image/png");
              link.download = "theme-card.png";
              link.click();
          })
          .catch((error) => {
              console.error("Error capturing theme-card:", error);
              alert("Failed to save as PNG. Possible CORS issue with the background image.");
          });
  });
});

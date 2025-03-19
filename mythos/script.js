document.getElementById("cardA").addEventListener("click", function () {
  this.querySelector(".flip-card-inner").classList.toggle("flipped");
});
document.getElementById("cardB").addEventListener("click", function () {
  this.querySelector(".flip-card-inner").classList.toggle("flipped");
});
document.getElementById("cardWA").addEventListener("click", function () {
  this.querySelector(".flip-card-inner").classList.toggle("flipped");
});
document.getElementById("cardWB").addEventListener("click", function () {
  this.querySelector(".flip-card-inner").classList.toggle("flipped");
});

// DRAG & DROP for Front Letters (Power & Weakness)
const draggableLetterA = document.querySelector("#frontA .draggable-letter");
const draggableLetterB = document.querySelector("#frontB .draggable-letter");
const draggableLetterWA = document.querySelector("#frontWA .draggable-letter");
const draggableLetterWB = document.querySelector("#frontWB .draggable-letter");

[
  draggableLetterA,
  draggableLetterB,
  draggableLetterWA,
  draggableLetterWB,
].forEach((letterEl) => {
  letterEl.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("letter", this.dataset.letter);
    e.dataTransfer.setData("question", this.dataset.question);
    e.dataTransfer.setData("answer", "");
    e.dataTransfer.setDragImage(
      this,
      this.offsetWidth / 2,
      this.offsetHeight / 2
    );
  });
});

// DRAG & DROP for Answer Blocks on Back (Power & Weakness)
const answerBlocks = document.querySelectorAll(".answer-block");
answerBlocks.forEach((block) => {
  block.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("letter", e.target.dataset.letter);
    e.dataTransfer.setData("question", e.target.dataset.question);
    e.dataTransfer.setData("answer", e.target.dataset.answer);
  });
});

// DRAG & DROP for Right Panel (Power Tag Slots)
const maxPowerSlots = 7;
for (let i = 1; i <= maxPowerSlots; i++) {
  const slot = document.getElementById(`slot${i}`);
  const letterDiv = document.getElementById(`letter${i}`);
  const textDiv = document.getElementById(`text${i}`);

  slot.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  slot.addEventListener("drop", (e) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData("letter");
    const question = e.dataTransfer.getData("question");
    const answer = e.dataTransfer.getData("answer");
    letterDiv.textContent = letter;
    textDiv.textContent = answer;
    slot.dataset.question = question;
  });
}

// DRAG & DROP for Right Panel (Weakness Tag Slots)
const maxWeaknessSlots = 3;
for (let i = 1; i <= maxWeaknessSlots; i++) {
  const wslot = document.getElementById(`wslot${i}`);
  const wletterDiv = document.getElementById(`wletter${i}`);
  const wtextDiv = document.getElementById(`wtext${i}`);

  wslot.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  wslot.addEventListener("drop", (e) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData("letter");
    const question = e.dataTransfer.getData("question");
    const answer = e.dataTransfer.getData("answer");
    wletterDiv.textContent = letter;
    wtextDiv.textContent = answer;
    wslot.dataset.question = question;
  });
}

// CLEAR SLOT FUNCTION for Power Tags
function clearSlot(slotElement) {
  const letterDiv = slotElement.querySelector(".tag-letter");
  const textDiv = slotElement.querySelector(".tag-text");
  letterDiv.textContent = "";
  textDiv.textContent = "";
  slotElement.dataset.question = "";
  textDiv.style.fontSize = "27px";
}

// CLEAR SLOT FUNCTION for Weakness Tags
function clearWeaknessSlot(slotElement) {
  const letterDiv = slotElement.querySelector(".tag-letter");
  const textDiv = slotElement.querySelector(".tag-text");
  letterDiv.textContent = "";
  textDiv.textContent = "";
  slotElement.dataset.question = "";
  textDiv.style.fontSize = "27px";
}

// CUSTOM TOOLTIP
const tooltip = document.getElementById("tooltip");
function showTooltip(text) {
  tooltip.textContent = text;
  tooltip.style.opacity = "1";
}
function hideTooltip() {
  tooltip.style.opacity = "0";
}
document.addEventListener("mousemove", (e) => {
  if (tooltip.style.opacity === "1") {
    let x = e.clientX + 15;
    let y = e.clientY + 15;
    if (x + tooltip.offsetWidth > window.innerWidth) {
      x -= tooltip.offsetWidth + 30;
    }
    if (y + tooltip.offsetHeight > window.innerHeight) {
      y -= tooltip.offsetHeight + 30;
    }
    tooltip.style.top = y + "px";
    tooltip.style.left = x + "px";
  }
});
function handleMouseEnter() {
  const question = this.dataset.question;
  if (question) {
    showTooltip(question);
  }
}
function handleMouseLeave() {
  hideTooltip();
}

// For all answer blocks
answerBlocks.forEach((block) => {
  block.addEventListener("mouseenter", function () {
    const question = this.dataset.question;
    if (question) showTooltip(question);
  });
  block.addEventListener("mouseleave", handleMouseLeave);
});

// For all power tag slots
for (let i = 1; i <= maxPowerSlots; i++) {
  const slot = document.getElementById(`slot${i}`);
  slot.addEventListener("mouseenter", handleMouseEnter);
  slot.addEventListener("mouseleave", handleMouseLeave);
}
// For all weakness tag slots
for (let i = 1; i <= maxWeaknessSlots; i++) {
  const wslot = document.getElementById(`wslot${i}`);
  wslot.addEventListener("mouseenter", handleMouseEnter);
  wslot.addEventListener("mouseleave", handleMouseLeave);
}

// (Optional) Save THEME TITLE and MYSTERY in localStorage
document.addEventListener("DOMContentLoaded", function () {
  const themeTitleDiv = document.getElementById("themeTitle");
  const mysteryDiv = document.getElementById("mystery");

  // Remove placeholder text on focus and restore if left empty
  [themeTitleDiv, mysteryDiv].forEach((div) => {
    div.addEventListener("focus", function () {
      if (this.textContent.trim() === "") {
        this.textContent = "";
      }
    });
    div.addEventListener("blur", function () {
      if (this.textContent.trim() === "") {
        this.textContent = "";
      }
    });
  });

  document.getElementById("saveAsPng").addEventListener("click", function () {
    const themeCard = document.querySelector(".theme-card");
  
    // Temporarily hide all .clear-slot buttons before capturing
    const clearSlots = document.querySelectorAll(".clear-slot");
    clearSlots.forEach(slot => slot.style.display = "none");
  
    html2canvas(themeCard, {
      backgroundColor: null, // Keeps transparency
      scale: 3, // Higher resolution
      useCORS: true, // Allows external resources
      allowTaint: false // Prevents CORS issues
    }).then(canvas => {
      // Restore the .clear-slot buttons after capture
      clearSlots.forEach(slot => slot.style.display = "");
  
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "theme-card.png";
      link.click();
    }).catch(error => {
      console.error("Error capturing theme-card:", error);
      alert("Failed to save as PNG. Possible CORS issue with the background image.");
    });
  });
  
  
});

const powerCardsData = [
    {
        id: "A",
        question: "What quality or ability granted by your Mythos most often protects you?",
        answers: [
            "grow bone armor",
            "can’t die – already dead",
            "ghost – no physical body",
            "radiates authority",
            "regrow organs",
            "dragon scales",
        ],
    },
    {
        id: "B",
        question: "What means do you have of extending protection to others?",
        answers: [
            "a great golden shield",
            "summon ghostly guardians",
            "ward off darkness",
        ],
    },
    {
        id: "C",
        question: "What particular trait of your defense makes it useful?",
        answers: [
            "impressive, reflective surface",
            "both astral and physical",
            "unbreakable",
            "change skin texture and color",
            "absorbs life force",
        ],
    },
    {
        id: "D",
        question: "Against what type of attack or influence is your defense especially effective?",
        answers: [
            "does not breathe",
            "impervious to mortal weapons",
            "maze-like mind",
            "eternal youth",
        ],
    },
    {
        id: "E",
        question: "How can you use your defense actively?",
        answers: [
            "a body made of fire – flames lash out",
            "a great golden shield – throw shield",
            "always held in high esteem – biting retort",
        ],
    },
    {
        id: "F",
        question: "What secondary defensive effect does your defense have?",
        answers: [
            "dragon scales – resistant to fire",
            "grow bone armor – harden internal organs",
            "invulnerability – harm only makes me stronger",
        ],
    },
    {
        id: "G",
        question: "What other effect or quality, not necessarily defensive, came with your defense?",
        answers: [
            "godlike invulnerability – inhuman strength",
            "made of clay – melt into the earth",
            "dragon scales – fire breath",
            "ghost – no physical body – possess others’ bodies",
        ],
    },
    {
        id: "H",
        question: "Who or what were your powers meant to protect?",
        answers: [
            "protector of the weak",
            "guardian of Shangri-La",
            "Dulcinea (of Don Quixote)",
        ],
    },
    {
        id: "I",
        question: "When in a clinch, how can you use your defense to change the odds in your favor?",
        answers: [
            "grow bone armor – grow roots",
            "cloak of protection – glide through the air",
            "beauty that cannot be tarnished – inspire change of heart",
        ],
    },
    {
        id: "J",
        question: "What tactics do you employ when you use your defense?",
        answers: [
            "hunker down",
            "provide cover for others",
            "furious rage",
            "stampede",
            "scare tactics",
            "embrace the enemy",
        ],
    },
];

const weaknessCardsData = [
    {
        id: "A",
        question: "How do your defensive powers affect your appearance?",
        answers: [
            "monstrous",
            "corpse-like visage",
            "shining armor is easy to spot",
            "bronzen",
        ],
    },
    {
        id: "B",
        question: "What are the unwanted implications of your defense?",
        answers: [
            "cumbersome",
            "ghost – cannot touch the world",
            "blindspot",
            "wears off quickly",
        ],
    },
    {
        id: "C",
        question: "To what attacks is your defense susceptible?",
        answers: [
            "“I can’t protect them all!”",
            "holy water",
            "bludgeoning",
            "mystical weapons",
        ],
    },
    {
        id: "D",
        question: "What personality trait derived from your defense gets you into trouble?",
        answers: [
            "foolhardy",
            "paranoid",
            "cannot feel emotions",
            "savior mentality",
            "ravenous",
        ],
    },
];

function createFlipCard(card) {
  const answersHTML = card.answers
    .map(
      (answer) =>
        `<div class="answer-block" draggable="true" data-letter="${card.id}" data-question="${card.question}" data-answer="${answer}">${answer}</div>`
    )
    .join("");

  return `
      <div class="flip-card" id="card${card.id}">
        <div class="flip-card-inner">
          <div class="flip-card-front" id="front${card.id}">
            <div class="draggable-letter" draggable="true" data-letter="${card.id}" data-question="${card.question}">
              <span>${card.id}</span>
            </div>
            <div class="question-text">${card.question}</div>
          </div>
          <div class="flip-card-back">
            <div class="answer-bottom">${answersHTML}</div>
          </div>
        </div>
      </div>
    `;
}

function renderCards() {
  const powerContainer = document.getElementById("powerCardsContainer");
  const weaknessContainer = document.getElementById("weaknessCardsContainer");

  if (!powerContainer || !weaknessContainer) {
    console.error("Error: Containers for power and weakness cards not found!");
    return;
  }

  powerContainer.innerHTML = powerCardsData.map(createFlipCard).join("");
  weaknessContainer.innerHTML = weaknessCardsData.map(createFlipCard).join("");

  console.log("Power Cards Rendered:", powerContainer.innerHTML);
  console.log("Weakness Cards Rendered:", weaknessContainer.innerHTML);
}

// Make sure this script runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", renderCards);

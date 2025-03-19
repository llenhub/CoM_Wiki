const powerCardsData = [
    {
      id: "A",
      question: "What Mythos power allows you to respond differently to every situation?",
      answers: [
        "cast a magic spell",
        "lord of the tempests",
        "shapeshifting",
        "steal other people’s powers",
        "puppeteer & toymaker",
        "necromancer",
      ],
    },
    {
      id: "B",
      question: "What narrow group of effects within your Mythos’ domain have you mastered?",
      answers: [
        "transportation spells",
        "create bad weather",
        "beasts of the forest",
        "steal protective powers",
        "“My toys can speak!”",
        "zombie army",
      ],
    },
    {
      id: "C",
      question: "What specific manifestation of your Mythos is your favorite?",
      answers: [
        "a sleeping curse",
        "smite down with lightning",
        "the True Shape of the Lion",
        "leave them powerless",
        "exploding wind-up toy",
        "rotting touch",
      ],
    },
    {
      id: "D",
      question: "What circumstances enhance your ability to adapt?",
      answers: [
        "easier with a spellbook",
        "under the open sky",
        "ritual of the wild",
        "prolonged contact with victim",
        "cluttered workshop",
        "dead of the night",
      ],
    },
    {
      id: "E",
      question: "What situations do you have a quick solution for or are accustomed to?",
      answers: [
        "cushion a fall with feathers",
        "scale a barrier on a gust of wind",
        "grow gills",
        "make it look like the original",
        "“I’ll figure out this device in a jiffy...”",
        "summon the ghost of an enemy’s loved one",
      ],
    },
    {
      id: "F",
      question: "What do your powers naturally protect you from?",
      answers: [
        "counterspell",
        "impervious to all weather",
        "sniff out other shapeshifters",
        "“You cannot steal from the thief!”",
        "disable machinery",
        "banish the dead",
      ],
    },
    {
      id: "G",
      question: "What attitude or emotion lies at the core of your adaptive powers?",
      answers: [
        "knowledge over power",
        "wrath of the seas and heavens",
        "all life is one",
        "survival of the fittest",
        "necessity is the mother of invention",
        "nostalgia",
      ],
    },
    {
      id: "H",
      question: "What specific class of things or beings can you produce or summon?",
      answers: [
        "imps and fairies",
        "conjure rain elementals",
        "horns and fangs",
        "decoys of myself",
        "build child-sized puppets",
        "animate dead bodies",
      ],
    },
    {
      id: "I",
      question: "What strategy or combination of effects do you employ in battle?",
      answers: [
        "deflect & dazzle",
        "electrocute wet targets",
        "shapeshift limbs out of harm's way",
        "hit someone with their own power",
        "deploy contraptions from hiding",
        "overrun the living",
      ],
    },
    {
      id: "J",
      question: "How can you enhance or weaken others with your powers?",
      answers: [
        "enchant a weapon",
        "conjure heavy fog",
        "mass shapeshift",
        "grant someone the powers of another",
        "annoying bells and whistles",
        "suck out their life-force",
      ],
    },
  ];
  
  const weaknessCardsData = [
    {
      id: "A",
      question: "What are your powers of adaptivity dependent on?",
      answers: [
        "only works with a magic wand",
        "needs moisture in the air",
        "must maintain a connection with nature",
        "must gain the victim’s trust",
        "missing parts",
        "dead too long",
      ],
    },
    {
      id: "B",
      question: "What results are harder for your Mythos to achieve?",
      answers: [
        "dark magic is forbidden",
        "struggles to calm weather",
        "afraid of shapeshifting into aggressive animals",
        "can’t hold more than one power at a time",
        "puppets don’t really look real",
        "hard to control the swarm",
      ],
    },
    {
      id: "C",
      question: "What hinders your Mythos or limits its possibilities?",
      answers: [
        "more sensitive to areas of thick Mist",
        "blocked by shelter",
        "instinctively drawn to native forms of current location",
        "flammable toys",
        "hallowed grounds",
      ],
    },
    {
      id: "D",
      question: "What bad habits did you pick up due to your adaptive powers?",
      answers: [
        "obsessed with other sorcerers",
        "easily infuriated",
        "animalistic behaviour",
        "lost sense of self-worth",
        "constantly fidgeting with parts",
        "no regard for the living",
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

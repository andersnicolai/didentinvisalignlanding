<template>
    <div class="chatbot-container">
      <div class="chat-window">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.type]"
        >
          {{ msg.text }}
        </div>
      </div>
      <div class="chat-input" v-if="!chatEnded">
        <input
          type="text"
          v-model="userInput"
          @keyup.enter="handleUserMessage"
          placeholder="Skriv din melding her..."
        />
        <button @click="handleUserMessage">Send</button>
      </div>
      <div v-else class="chat-end">
        <p>
          Chat avsluttet. Vi håper du fikk informasjonen du var på jakt etter,
          eller at du er klar for Invisalign. Start en ny chat for mer hjelp!
        </p>
        <button @click="restartChat">Start ny chat</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChatBot",
    data() {
      return {
        messages: [
          {
            text:
              "Hei! Jeg er Didents tannlege-bot. Hvordan kan jeg hjelpe deg med Invisalign eller andre tannbehov i dag?",
            type: "bot",
          },
        ],
        userInput: "",
        questionCount: 0,
        maxQuestions: 20,
        chatEnded: false,
        // Predefinerte svar (nøkkelord: svar)
        preTrainedResponses: {
          invisalign:
            "Vi hos Dident er eksperter på Invisalign – en nesten usynlig metode for å rette opp tennene dine. Det er både komfortabelt og effektivt!",
          akutthjelp:
            "Trenger du akutt hjelp? Hos Dident har vi erfarne tannleger som kan hjelpe deg raskt og smertefritt.",
          tannlege:
            "Dident Tannlegesenter tilbyr et bredt spekter av behandlinger – fra rutinekontroller til spesialtilpassede Invisalign-behandlinger.",
          smerte:
            "Smerter i munnen er ingen spøk! Hos Dident sørger vi for rask og effektiv lindring slik at du kan smile igjen.",
          pris:
            "Vi forstår at pris er viktig. Hos Dident gir vi et estimat før behandling og sikrer at du vet hva du betaler for.",
          time:
            "Du kan enkelt bestille time hos Dident via vårt online system, eller ringe oss på +47 94 09 56 43.",
          default:
            "Det var en interessant henvendelse! Kan du fortelle meg litt mer? Hos Dident gjør vi vårt beste for å hjelpe deg med dine tannbehov – med et glimt i øyet.",
        },
      };
    },
    methods: {
      handleUserMessage() {
        if (!this.userInput.trim()) return;
  
        // Legg til brukerens melding i chatten
        this.messages.push({ text: this.userInput, type: "user" });
        this.questionCount++;
  
        // Hvis maks antall spørsmål er nådd, avbryt chatten med avsluttende melding
        if (this.questionCount >= this.maxQuestions) {
          this.messages.push({
            text:
              "Vi håper du fikk informasjonen du var på jakt etter, eller du er nå klar for Invisalign. Takk for at du tok kontakt med Dident!",
            type: "bot",
          });
          this.chatEnded = true;
          this.userInput = "";
          return;
        }
  
        // Generer bot-svar basert på brukerens melding
        const response = this.generateResponse(this.userInput);
        this.messages.push({
          text: response + " - Hilsen ditt Dident-team.",
          type: "bot",
        });
  
        // Tøm inputfeltet
        this.userInput = "";
      },
      generateResponse(message) {
        // Gjør meldingen om til små bokstaver for enklere matching
        const lowerMsg = message.toLowerCase();
        // Se etter nøkkelord i henvendelsen
        for (const keyword in this.preTrainedResponses) {
          if (keyword !== "default" && lowerMsg.includes(keyword)) {
            return this.preTrainedResponses[keyword];
          }
        }
        // Hvis ingen nøkkelord matcher, returner standard-svar
        return this.preTrainedResponses["default"];
      },
      restartChat() {
        // Start en ny chat ved å tilbakestille variablene
        this.messages = [
          {
            text:
              "Hei igjen! Jeg er Didents tannlege-bot. Hva kan jeg hjelpe deg med i dag?",
            type: "bot",
          },
        ];
        this.userInput = "";
        this.questionCount = 0;
        this.chatEnded = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .chatbot-container {
    max-width: 400px;
    margin: 20px auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1em;
    font-family: sans-serif;
    background-color: #f9f9f9;
  }
  .chat-window {
    height: 300px;
    overflow-y: auto;
    margin-bottom: 1em;
    padding: 0.5em;
    background: #fff;
    border: 1px solid #dedede;
    border-radius: 3px;
  }
  .message {
    margin-bottom: 0.5em;
    padding: 0.5em;
    border-radius: 4px;
  }
  .message.bot {
    background-color: #e1f5fe;
    text-align: left;
  }
  .message.user {
    background-color: #c8e6c9;
    text-align: right;
  }
  .chat-input {
    display: flex;
    gap: 0.5em;
  }
  .chat-input input[type="text"] {
    flex: 1;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .chat-input button {
    padding: 0.5em 1em;
    border: none;
    background-color: #2196f3;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
  .chat-input button:hover {
    background-color: #1976d2;
  }
  .chat-end {
    text-align: center;
  }
  .chat-end button {
    margin-top: 1em;
    padding: 0.5em 1em;
    border: none;
    background-color: #4caf50;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
  .chat-end button:hover {
    background-color: #388e3c;
  }
  </style>
  
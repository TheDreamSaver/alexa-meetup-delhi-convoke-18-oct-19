/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(`Welcome. You can say tell me a super hero trivia, or, you can say exit... What can I help you with?`)
        .reprompt(`What can I help you with?`)
        .getResponse();
    },
};

const GetTriviaIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetTriviaIntent';
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speakOutput = `Here's your superhero trivia: ${randomFact} <break time="1s"/> You can say tell me a super hero trivia to hear another one.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(`You can say tell me a super hero trivia to hear another one.`)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(`You can say tell me a super hero trivia, or, you can say exit... What can I help you with?`)
      .reprompt(`What can I help you with?`)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
              || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(`Goodbye!`)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const data = [
  `Originally, Stan Lee wanted to make the Hulk grey, but due to issues with printing, they moved forward with the iconic green.`,
  `Superman's first appearance was as a bald supervillain, bent on conquering the world.`,
  `Bruce Wayne has an IQ of 192, beating out both Stephen Hawking and Albert Einstein.`,
  `Superman's shield is his family's crest, known as the insignia for the house of El.`,
  `Joker was originally supposed to die in his second appearance but was saved by the editor, Whitney Ellsworth, who saw the potential for a perfect arch-nemesis to Batman.`,
  `There is a course at the University of Victoria, called Science of Batman, where students can study the Dark Knight.`,
  `Superman has complete control over his heart allowing him to stop it from beating, or make it beat louder.`,
  `Adding to the list of strange superheroes is Dogwelder, created by DC, with the surprising and strange power of welding dead K9s into evil-doers.`,
  `Harley Quinn's origin story came after her TV debut in the Batman animated series.`,
  `One of Gambit's superpowers is possessing a hypnotic charm that he uses to influence pretty much anybody he wants.`,
  `One of Thor's powers is "All-Tongue", the ability to speak and have anybody understand him.`,
  `There was a superhero called Green Lama, who was a practicing Buddhist.`,
  `In the What if? Marvel comic series, Peter Parker was bitten by radioactive sheep, turning him into Sheep-Boy. With great powers come great sweater making responsibilities.`,
];

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchHandler,
    GetTriviaIntentHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

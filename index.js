/* eslint-disable  func-names */
/* eslint-disable  dot-notation */
/* eslint-disable  new-cap */
/* eslint quote-props: ['error', 'consistent']*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports en-US lauguage.
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-trivia
 **/

'use strict';

const Alexa = require('alexa-sdk');
const ud = require('urban');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
	'LookupIntent': function() {
		console.log(this.event.request.intent.slots);
		const term = this.event.request.intent.slots.term.value;

		ud(term).first((json) => {
			if (!json.definition) {
				this.response.speak(`I am unable to find a definition for ${term}. Sorry.`);
			} else {
				this.response.speak(`The top definition of ${term} is ${json.definition}`);
			}
			this.emit(':responseReady');
		});
	},
	'AMAZON.HelpIntent': function() {
		this.response.speak("Ask alexa to look up a term from urban dictionary");
		this.emit(':responseReady');
	},
	'Unhandled': function() {
		this.response.speak("I did not understand that. Try again?");
		this.emit(':responseReady');
	},
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

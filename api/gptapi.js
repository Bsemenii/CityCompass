const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();


const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const generateTour = async (country, city, preferences) => {
	const prompt = `
        Generate a tour guide for ${country}, ${city} with a preference for ${preferences}. Return response in the following parsable JSON format:

        {
            "Q": "question",
            "A": "answer"
        }

    `;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 1,
	});

	const parsableJSONresponse = response.data.choices[0].text;
	const parsedResponse = JSON.parse(parsableJSONresponse);

	return { question: parsedResponse.Q, answer: parsedResponse.A };
};

module.exports = { generateTour };

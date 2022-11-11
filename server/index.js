import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const prompt =
  "crystal image modern sci-fi brutalism logo of shiny head AI brain emiting light particles, vectorized, magical, black background, 8k, unreal engine, octane render, hyperrealistic, rim light";

const result = await openai.createImage({
  prompt,
  n: 1,
  size: "1024x1024",
});

const url = result.data.data[0].url;
console.log(url);
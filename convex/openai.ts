import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async(_, { input, voice }) => {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as SpeechCreateParams['voice'],
      input,
    });
    const buffer = await mp3.arrayBuffer();

    return buffer;
  }
})

export const generateThumbnailAction = action({
  args: { input: v.string() },
  handler: async(_, { input }) => {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: input,
      n: 1,
      size: "1024x1024",
      quality: 'standard'
    });
    const image_url = response.data[0].url;
    if (!image_url) {
      console.error("No image generated");
      throw new Error("No image generated")
    };
    const images = await fetch(image_url);
    const buffer = await images.arrayBuffer();

    return buffer;
  }
})

export const generatePodcastPromptAction = action({
  args: { input: v.string() },
  handler: async(_, { input }) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a podcast host." },
        { role: "user", content: input },
      ],
    });
    return response.choices[0].message.content;
  }
})
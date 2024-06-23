import type { APIGifts } from "../models/gifts.model";

const API_KEY = import.meta.env.API_KEY;

export const getGifs = async (limit = 25, keyword = "memes") => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}`;
  try {
    const response = await fetch(url);
    const { data }: APIGifts = await response.json();
    if (!data) throw new Error("No data");
    const gifs = data.map((gif) => {
      const { id, title, images } = gif;
      const { url } = images.downsized_medium;
      return { id, title, url };
    });
    return gifs;
  } catch (error) {
    console.log(error);
  }
};

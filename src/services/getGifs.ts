import type { APIGiftsID } from "../models/giftById.model";
import type { APIGifts } from "../models/gifts.model";

const API_KEY = import.meta.env.API_KEY;

export enum TypeAPI {
  SEARCH = "search",
  TRENDING = "trending",
}

interface Props {
  limit?: number;
  keyword?: string;
  type: TypeAPI;
}

export const getGifs = async ({
  limit = 25,
  keyword = "memes",
  type,
}: Props) => {
  const url = `https://api.giphy.com/v1/gifs/${type}?api_key=${API_KEY}&q=${keyword}&limit=${limit}`;
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

export const getGifById = async (id: string) => {
  const urlAPI = `https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`;
  try {
    const response = await fetch(urlAPI);
    const { data }: APIGiftsID = await response.json();
    if (!data) throw new Error("No data");
    const { images, id, title, user } = data;
    const { url } = images.downsized_medium;
    return { id, title, url, user };
  } catch (err) {
    console.log(err);
  }
};

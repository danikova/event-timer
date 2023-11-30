import axios from "axios";

const imgurClientId = "72a7bd26c2e9f2b";
export const imgurBaseUrl = "https://i.imgur.com/";

export interface ImgurResponse {
  data: {
    id: string;
    title: string | null;
    description: string | null;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote: string | null;
    favorite: boolean;
    nsfw: string | null;
    section: string | null;
    account_url: string | null;
    account_id: number;
    is_ad: boolean;
    in_most_viral: boolean;
    has_sound: boolean;
    tags: string[];
    ad_type: number;
    ad_url: string;
    edited: string;
    in_gallery: boolean;
    deletehash: string;
    name: string;
    link: string;
  };
  success: boolean;
  status: number;
}

export async function uploadImage(
  image: File | string
): Promise<ImgurResponse> {
  const body = new FormData();
  body.append("image", image);

  const res = await axios.post<ImgurResponse>(
    "https://api.imgur.com/3/image",
    body,
    {
      headers: {
        Authorization: `Client-ID ${imgurClientId}`,
      },
    }
  );

  return res.data;
}

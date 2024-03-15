import { supabase } from "./supabase";

export const getPhotosUrl = (path) => {
  const { data } = supabase.storage.from("savana").getPublicUrl(path);

  return data.publicUrl;
};

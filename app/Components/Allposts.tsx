// file: lib/fetchPosts.js
import { supabase } from "../supabaseClient";

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("blog")
    .select()
    .order("id", { ascending: false })

  if (error) throw error;
//   console.log(data)
  return data;
};

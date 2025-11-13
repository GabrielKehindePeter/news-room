import { supabase } from "../supabaseClient";

// Disable ISR and caching
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const sidebar = async () => {
  try {
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .limit(7); // limit to 7 posts

    if (error) throw error;

    if (!data) return [];

    // Shuffle the posts randomly
    const shuffled = data.sort(() => Math.random() - 0.5);
    return shuffled;
  } catch (err) {
    console.error("Supabase fetch error:", err);
    return [];
  }
};

import React from 'react'
import { supabase } from "../supabaseClient";

export const fetchpolitics = async() => {

  const { data, error } = await supabase
    .from("blog")
    .select()
    .eq('category', 'Politics')
    .order("id", { ascending: false })

  if (error) throw error;
//   console.log(data)
  return data;
}

// export default fetchoolitics



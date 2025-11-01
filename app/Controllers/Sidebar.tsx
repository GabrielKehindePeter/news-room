import React from 'react'
import { supabase } from "../supabaseClient";
import { randomInt } from 'crypto';
export const revalidate = 0;            // disables ISR and cache
export const dynamic = 'force-dynamic'; // forces dynamic fetch
export const sidebar = async() => {
 
    
  const { data, error } = await supabase
    .from("blog")
    .select()
     .limit(6)
    // .eq('category', 'Politics')
    //  .order('id', random() });

    
const shuffled = data.sort(() => Math.random() - 0.5);
  if (error) throw error;
//   console.log(data)
  return shuffled;
 
}




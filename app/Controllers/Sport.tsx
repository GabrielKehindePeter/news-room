import React from 'react'
import { supabase } from '../supabaseClient'

export const sport = async() => {

const { data, error } = await supabase
    .from("blog")
    .select()
     .limit(6)
    .eq('category', 'Sport')
    .order('id', { ascending: false })

    return data
}

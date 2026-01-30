'use server'
import {createClient} from "@/lib/supabase/client";

export async function sendmsg(formdata){
  const supabase = createClient();
  const msg = formdata.get("message")
    if(!msg||msg.trim().length===0) {
      return {error:"Message is Required"}
    }
    const {error}= await supabase
    .from('suggestions')
    .insert([{message:msg}])

     if (error) {
      return{error:"Failed to save suggestion"}
  }
  return{success:"Suggestion sent Successesfully!"}
}


    

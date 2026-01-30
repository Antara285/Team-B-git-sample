import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminPage(){
    const supabase = createClient();
    const {data:{user}} = await supabase.auth.getUser()
    if(!user||user.user_metadata?.isAdmin!==true){
        redirect('/admin/login');
    }
}
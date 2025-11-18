// Membership Api 
import { NextResponse } from "next/server";
import dbPool from "@/lib/db/dbconnect";

// Get all members 
export const GET = async () =>{
    try{
        const query = "SELECT * FROM interlifer.member"
        const data = await dbPool.query(query)

        return new NextResponse(JSON.stringify(data.rows), {status:200})
    }
    catch(error: any){
        return new NextResponse(`"message": error`, {status:500})
    }
}
// Membership Api 
import { NextResponse } from "next/server";
import dbPool from "@/lib/db/dbconnect";

// Get all members 
export const GET = async () =>{
    try{
        const query = "SELECT * FROM interlifer.member";
        const data = await dbPool.query(query)
        return new NextResponse(JSON.stringify(data.rows), {status:200})
    }
    catch(error: any){
        return new NextResponse(`"message": ${error.message}`, {status:500})
    }
}

export const POST = async (request: Request) =>{
    try{
        const body = await request.json();
        const { first_name, last_name, other_names, nationality, region, place_of_residence, residence, gender, marital_status, contact, email, year_joined, have_baptised, dob } = body;
        const query = `INSERT INTO interlifer.member (first_name, last_name, other_names, nationality, region,place_of_birth, residence, gender, marital_status,contact,email, year_joined, have_baptism, dob) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`
        const values = [first_name, last_name, other_names, nationality, region, place_of_residence, residence, gender, marital_status, contact, email, year_joined, have_baptised, dob];

        const results = await dbPool.query(query, values);
        const data =JSON.stringify(results.rows[0])
        return new NextResponse(`"data": ${data},"message":"Member added Successfully"`, {status:201});
    }
    catch(error: any){
        return new NextResponse(`"message": ${error.message}`, {status:500})
    }
}
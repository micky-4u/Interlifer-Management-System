import { NextResponse } from "next/server";
import dbPool from "../db/dbconnect";
// import { Result } from "pg";


export const systemLog = async (action: string, author: any ) => {
    const query = `INSERT INTO interlifer.system_logs (action,author) VALUES ($1, $2)`;
    const values = [action, author];

    try{
        const results = await dbPool.query(query, values);
        console.log("System action logged successfully");
    }
    catch(error){
        console.error("Error logging system action:", error);
    }
}
import dbPool from "../util/db.js";
import { comparePassword } from "../util/systemUtils.js";

// login in user 

export const  userLogin = async (username, password) =>{

    

    const query = `SELECT * FROM interlifer.users WHERE username = $1; `
    const values = [username]
    const result =  await dbPool.query(query, values);
    
    if(result.rows.length === 0){
        throw new Error("User not found");
    }

    const password_hash = result.rows[0].password_hash;

    if(password_hash !== password){
        throw new Error("Invalid password");
    }

    // verify password
    // const isPasswordValid = await comparePassword(password, password_hash);
    // if(!isPasswordValid){
    //     throw new Error("Invalid password");
    // }


    return result.rows[0];
   

}
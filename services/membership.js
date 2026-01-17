import dbPool from "../util/db.js";
import dotenv from "dotenv";
dotenv.config();


export const getAllMembers = async () => {

        const qurey= 'SELECT * FROM interlifer.member'
        const result = await dbPool.query(qurey);
        return result.rows;

}


// adding regular membership
export const addMember = async (memberData) => {
    const {first_name, last_name, other_names, nationality, regin, place_of_birth, residence, gender, marital_status,contact, email, year_joined,have_baptism,dob} = memberData;

    // check it member already exist 
    // console.log("Checking if member exists");
    const checkQuery = `SELECT * FROM interlifer.member WHERE email = $1`;
    const checkValues = [email];

    const checkResult = await dbPool.query(checkQuery, checkValues);
    // const checkResult = await dbPool.query(checkQuery, checkValues);
    if(checkResult.rows.length > 0){
        throw new Error("Member with this email already exists");
    }


    const query = `INSERT INTO interlifer.member 
    (first_name, last_name, other_names, nationality, region, place_of_birth, residence, gender, marital_status, contact, email, year_joined, have_baptism, dob)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;

    const values = [first_name,last_name,
        other_names,nationality,
        regin,
        place_of_birth,residence,
        gender,
        marital_status,
        contact,email,
        year_joined,
        have_baptism,dob];

    const result = await dbPool.query(query,values);
    return result.rows[0];

}


// get user memebers:

export const getUserMembers = async () => {
    const query = 'SELECT * FROM interlifer.users';
    const result = await dbPool.query(query);
    return result.rows;
}


// Adding memeber user to access portal
export const addUser = async (membershipId, username, password_hash, role
) =>{
    // check if user exists
    const checkQuery = `SELECT membership_id FROM interlifer.users WHERE username = $1`;
    const checkValues = [username];
    console.log("Checking if username exists:", username);
    const checkResult = await dbPool.query(checkQuery, checkValues);
    if(checkResult.rows.length > 0){
        throw new Error("Username already exists");
    }

    
    const query = `INSERT INTO interlifer.users (membership_id, username, password_hash, role,user_id) VALUES ($1, $2, $3, $4,$5) RETURNING *`;

    const values = [membershipId, username, password_hash, role,"user1"];
    const result = await dbPool.query(query,values);
    return result.rows[0];
}
import { getAllMembers, addMember, addUser } from "../services/membership.js";
import { systemLogs } from "../util/logs.js";
import { genUserName } from "../util/genUserName.js";

export const fetchAllMembers = async (req, res) => {
    try{
        // const admin = req.user.username;
        const members = await getAllMembers();
        // await systemLogs(admin, "fetched all members");
        return res.status(200).json(members);
    }catch(err){
        return res.status(500).json({"message":"error getching members",error: err.message});
    }

};


export const registerMember = async (req, res) =>{

    try{
        console.log("Registering new member");
        const memberData = req.body;

        console.log("data received:", memberData);
        const defaultPassword = "interlifer123"
        const username = genUserName("int",memberData.first_name, memberData.last_name);

        console.log("Generated username:", username);
        // console.log(memberData);


        const result = await addMember(memberData);
        console.log("Member added with ID:", result.id);

        const userResults = await addUser(result.membership_id, username, defaultPassword, 'member');
        return res.status(201).json(result);
    }
    catch(err){
        return res.status(500).json({"message":"error adding member", error: err.message});
    }
}
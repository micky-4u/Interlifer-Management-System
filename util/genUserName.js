export const genUserName = (id , first_name, last_name) =>{

    console.log("Generating username for:", first_name, last_name, id); 
    const prefix1 = first_name.toString()[0]
    const prefix2 = last_name.toString()[0]
    const userId = `${prefix1}${prefix2}${id}`

    return userId;
}

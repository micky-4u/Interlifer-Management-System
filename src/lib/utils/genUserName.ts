export const genUserName = (id:number , first_name: string, last_name: string) =>{

    const prefix1 = first_name[0]
    const prefix2 = last_name[0]
    const userId = `${prefix1}${prefix2}${id}`

    return userId;
}
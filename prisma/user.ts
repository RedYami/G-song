
import prisma from "./client";

export async function addNewUser(data:any){
    try {
        
        const user = await prisma.user.create({
            data:{
                username:data.username,
                email:data.email
            }
        })
        return user
    } catch (error) {
        return error
    }
}
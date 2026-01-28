import User from "../schema/user.schema.js";

export const userRepository = {
    create : async function (data){
        const newUser = await User.create(data);
        return newUser;
    },
    findById : async function(userId){
        const user = await User.findById(userId);
        return user;
    },
    delete : async function(userId){
        const user = await User.findByIdAndDelete(userId);
        return user;
    },
    update : async function(userId,data){
        const updatedUser = await User.findByIdAndUpdate(userId,data,{
            new : true,
        })

        return updatedUser;
    }
}
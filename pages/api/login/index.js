import connectMongoDb from "@/lib/connectDb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'

export default async function LoginPost(req, res) {


    try {
        if (req.method === "POST") {
            // validate 
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(442).json({msg:"provide login details"})
                return
            }

            // connect to my database
            await connectMongoDb()
           
            // check if user emial already exist in the databsse
            const user= await User.findOne({email:email})
            // we can get only the object key from the user object
            // const user= await User.findOne({email:email}).select("_id")
            if(!user){
                res.status(205).json({msg:"invalid credentials 1"})
                return
            }
           
            // compare user password to the one in the database
           const passwordTrue= bcrypt.compareSync(password,user.password);
           if(!passwordTrue){
                res.status(205).json({msg:"invalid credentials 2"})
                return
           }
        //    if both user details (email,password) are correct send this response
             res.status(200).json({msg:'correct', user})

        }
    } catch (error) {

    }

}
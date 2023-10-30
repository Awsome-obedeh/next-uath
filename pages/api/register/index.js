// import connectMongoDb from "./../../../lib/connectDb";
// or

import connectMongoDb from "@/lib/connectDb";
import User from "@/models/user";
import bcrypt, { genSalt, genSaltSync } from 'bcryptjs'




export default async function Register(req,res){
  

    try{ 
        if(req.method=='POST'){
            // get form data 
           //destructure the data coming from the from end
           const {email,password,name}=req.body;
   
           // validate 
           if(!email || !password || !name){
               res.status(442).json({msg:"please all fields required"})
               return
           }
           // send a response back o the front end
           
   
        await connectMongoDb()
        // check if user is using the same email
        const userExists=await User.findOne({email});
        if(userExists){
            res.status(202).json({msg:'user already exists'})
            return
        }
        // if user is not already registered , register the user
        else{

            // before we insert into our database, we need to hash our password for security reasons
            const salt=genSaltSync(12)
            // in bcryptjs, we can perform synchronous or asynchronuous in bcryptjs, if we use ascn we need to await, if we dont want to use await, we use sync
            const hashedPassword=bcrypt.hashSync(password,salt)
    
            // we have to insert into our datbase and we need to import our collection ,user
            // {name:name}-> the first name (ikey) is from our collection User,the second name(value) is from our front end
          const userCreated = await User.create({name:name, email:email, password:hashedPassword})
          if(userCreated){
            res.status(200).json({msg:"user created"})
               console.log(req.body);
           }
           return
          }
          res.status(400).json({msg:"user not created"})
        }


        
   
    }
        catch(error){
           console.log(error);
       res.status(500).json({msg:`server Error   ${error}`})
       }

}
import connectMongoDb from "@/lib/connectDb";

export default function Register(req,res){
    // get form data 

    try{
        //destructure the data coming from the from end
        const {email,password,name}=req.body;

        // validate 
        if(!email || !password || !name){
            res.status(442).json({msg:"please all fields required"})
            return
        }
        // send a response back o the front end
        let msg={
            name,
            password,
            email,
            msgs:'user seen'
        }

        connectMongoDb
        res.status(200).json(msg)
        console.log(req.body);
    }

    catch(error){
        console.log(error);
    res.status(500).json({msg:"server Error"})
    }
}
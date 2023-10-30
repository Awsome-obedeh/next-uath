import mongoose, {Schema} from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:['name is required',true]
        // we use enum we want to select an option 
        // enum:['female','male'],
     },

    email:{
        type:String,
        required:['please enter email', true],
        // the unique is used to check for the occurence of the same values
        unique:true
    },

    password:{
        type:String,
        required:['required',true],
        
    },

    createdAt:{
        //we don't want the user to input the time so we set a default value

        default: Date.now(),
        type:Date

    }
})
// we model our collection and assign a schema to it
// schema are guidelines as to the kind of data that should be allowed to our database
// we want to create our model based on the condition that it has'nt been created before
const User=mongoose.models.user || mongoose.model('user',userSchema)
export default User;
import mongoose, {Schema} from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:['name is required',true],
        // we use enum we want to select an option 
        enum:['female','male'],
            },

    email:{
        type:String,
        required:['please enter email', true],
        // the unique is used to chehch for the occurence of the same values
        unique:true
    },

    password:{
        type:String,
        required:['required',true],
        
    },

    createdAt:{
        //we don't want the user to input the time so we set a default value

        default: Date.now(),

    }
})
// we model our collect and assign a schema to it
// schema are guidelines as to the kind of data that should be allowed to our database
const User=mongoose.model('users',userSchema)
export default User;
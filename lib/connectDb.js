import mongoose from 'mongoose'

const connectMongoDb = async () => {
    try {
        // our MONGDB_URI is in the .env file 
        // we have to use it from the .env file
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to the database');
    }
    catch(error){
        console.log(`could not not connect ${error}`);
    }
}

export default connectMongoDb;
// we can still do it this way

// export default async function connecMONNGO(){
//     try {
//         // our MONGDB_URI is in the .env file 
//         // we have to use it from the .env file
//         await mongoose.connect(process.env.MONGODB_URI)
//         console.log('connected to the database');
//     }
//     catch(error){
//         console.log(`could not not connect ${error}`);
//     }
// }
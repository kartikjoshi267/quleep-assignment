import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(String(process.env.MONGO_URI), {
            dbName: 'quleep-assignment'
        });
        console.log('Successfully connected to Mongo');
    } catch (e) {
        console.log(e);
    }
}

export default connectToDatabase;
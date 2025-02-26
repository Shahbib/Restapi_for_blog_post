const mongoose = require ("mongoose");

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Database connected Succesfully!")

    }catch(error){
        console.log('Database connection failed!');

    }
};

module.exports = connectDB;
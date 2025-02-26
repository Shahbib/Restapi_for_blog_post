const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/auth/authRouter");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
dotenv.config();

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users",userRoute);
//post Routes
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
    connectDB();
})

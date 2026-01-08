import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// text api endpoint
app.get('/test',(req,res) =>{

    res.status(200).json({
        "message":"API is up and running correctly"
    })
})


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})
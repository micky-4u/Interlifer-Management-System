import express from 'express';
import dotenv from 'dotenv';
import membershipRoutes from './routes/membership.js';
import authRoutes from './routes/auth.js';
import dbPool from './util/db.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors());
app.use(cors({
  origin: ["http://localhost:5173","https://interlifer-ims.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// text api endpoint
app.get('/test',(req,res) =>{

    res.status(200).json({
        "message":"API is up and running correctly"
    })
})

const baseApiUrl = '/api/v1';


app.use(express.json())

//membership routes
app.use(`${baseApiUrl}/membership`, membershipRoutes)
// app.use(express.urlencoded({ extended: true }));

// authentication routes
app.use(`${baseApiUrl}/auth`,authRoutes)


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})
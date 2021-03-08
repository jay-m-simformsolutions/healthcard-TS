import express from 'express';
import env from 'dotenv';
import bodyParser from 'body-parser';

// ----- Routes -----

import userRoute from './routes/user'

env.config()

const app = express()
app.use(bodyParser.json())
app.use('/api/user', userRoute)

const PORT: string = process.env.PORT || "3001"
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

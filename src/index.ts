import express from 'express';
import env from 'dotenv';
import sessionCookie from 'cookie-session';

import userRoute from './routes/user'

env.config()

const app = express()
app.use(express.json())

const cookiesSessionOptions = {
    name: 'session',
    keys: ['healthcardcookies'],
    maxAge: 24*60*60*1000 //24hrs
}
app.use(sessionCookie(cookiesSessionOptions))

app.use('/api/user', userRoute)

const PORT: string | number = parseInt(process.env.PORT as string,10) || 3001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

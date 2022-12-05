import mongoose from 'mongoose'
import dotenv from 'dotenv'

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true )
export const connection=()=>{
    mongoose.connect(process.env.MONGO_URL!)
    .then(()=>console.log('connected successfully'))
    .catch(e =>console.log('error: ',e))
}

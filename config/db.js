const mongoose = require('mongoose')
const colors = require('colors')
const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,
            useUnifiedTopology: true,})
        console.log(`DB Connected with ${mongoose.connection.host}`.bgGreen)
    } catch (error) {
        console.log(`DB Error ${error}`.bgRed.white)
        
    }
}

module.exports = connectDB ;
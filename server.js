const express = require('express') ;
const colors = require('colors');
const morgan = require('morgan') ;
const cors = require('cors') ;
const dotenv = require('dotenv') ;
const connectDB = require('./config/db');
const path = require('path')

const authRoutes = require('./routes/authRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes')
const adminRoutes = require('./routes/adminRoutes')

// config dotenv
dotenv.config() ;

//DB connection 
connectDB();

const app = express() ;

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/inventory',inventoryRoutes)
app.use('/api/v1/analytics',analyticsRoutes)
app.use('/api/v1/admin',adminRoutes)

//static folder
app.use(express.static(path.join(__dirname,'./client/build')))

//static route
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

const PORT = process.env.PORT || 5000 ;

app.listen(PORT,()=>{
    console.log(`server running in ${process.env.DEV_MODE} mode on ${PORT} port`.bgBlue)
})
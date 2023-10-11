import {createAsyncThunk} from '@reduxjs/toolkit'
import API from '../../../services/API'
import { toast } from 'react-toastify'

//Login
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({role ,email,password},{rejectWithValue})=>{
        try {
            const {data} = await API.post('/auth/login',{role ,email,password})
            // console.log( "data",data)
            //store token 
            if(data.success){
                localStorage.setItem('token',data.token)
                toast.success(data.message)
                window.location.replace('/')
            }
            return data;
        } catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)
// Register
export const userRegister = createAsyncThunk(
    'auth/register',
    async({
        role,
        name,
        email,
        password,
        organizationName,
        hospitalName,
        website,
        address,
        phone},{rejectWithValue})=>{
            try {
                const {data} = await API.post("/auth/register",{role,
                    name,
                    email,
                    password,
                    organizationName,
                    hospitalName,
                    website,
                    address,
                    phone})
                if(data?.success){
                    
                    // toast.success(data.message)
                    toast.success('user registered successfully')
                    window.location.replace('/login')
                }
            } catch (error) {
                if(error.response && error.response.data.message){
                    return rejectWithValue(error.response.data.message)
                }else{
                    return rejectWithValue(error.message)
                }
            }
        }
)

//current user

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async ({rejectWithValue})=>{
        try {
            const res = await API.get('/auth/current-user')
            if(res?.data){
                return res?.data
            }
        } catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)
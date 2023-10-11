import { userLogin, userRegister } from '../redux/features/auth/authActions'
import store from '../redux/store'

export const handleRegister = (
    e,
    role,
    name,
    email,
    password,
    organizationName,
    hospitalName,
    website,
    address,
    phone
) => {
    e.preventDefault()
    try {
        store.dispatch(userRegister({
            role,
            name,
            email,
            password,
            organizationName,
            hospitalName,
            website,
            address,
            phone}))
    } catch (error) {
        console.log(error)
    }

}

export const handleLogin = (e, role, email, password) =>{
    e.preventDefault()
    try {
        if(!role || !email || !password){
            return alert("Please provide all fields")
        }
        store.dispatch(userLogin( {role, email, password}))
    } catch (error) {
        console.log(error)
        
    }

}
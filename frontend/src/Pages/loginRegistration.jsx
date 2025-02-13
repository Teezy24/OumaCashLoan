import React, {useState} from 'react'
import '../css/LoginRegistration.css'
import Axios from 'axios'
import {FaUser} from 'react-icons/fa'
import {FaLock} from 'react-icons/fa'
import {FaHouseUser}from 'react-icons/fa'
import {BsFillPostageFill} from 'react-icons/bs'
import {IoMdMail} from 'react-icons/io'
import {FaPhoneAlt} from 'react-icons/fa'
import {MdContactPhone} from 'react-icons/md'
import {FaUserShield} from 'react-icons/fa'

import {Link, useNavigate} from 'react-router-dom'




const LoginRegistration = () => {

    //registration variables
    const [Fullname, setFullname] = useState('');
    const [residential, setResidential] = useState('');
    const [Postal, setPostal] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');

    //login variables

    const [loginFullname, setloginFullname] = useState('');
    const [loginPassword, setloginPassword] = useState('');
    const navigateTo = useNavigate()

    //registration
    const createUser = () => {
        //create an api to connect the server
        Axios.post('http://localhost:3002/register', {
            //create the variables to send to the server through the route
            Fullname: Fullname,
            Residential: residential,
            Postal: Postal,
            Email: email,
            Phone: phone,
            ID: id,
            Password: password
        }).then(() =>{
            console.log('User has been created')
        })
    }

    //login handler
    const useUser = (e) => {
        e.preventDefault();
        //create an api to connect the server
        Axios.post('http://localhost:3002/login', {
            //create the variables to send to the server through the route
            LoginFullname: loginFullname,
            LoginPassword: loginPassword

        })
        .then((response) =>{
            console.log(response)
            if(response.data && response.data.message){
                localStorage.setItem('fullname', loginFullname)
                alert('login successful')
                navigateTo('/dashboard')
            }
            else {
                alert( 'login failed!')
                setError('Invalid')
            }
        })
    }

    const [action, setAction] = useState('');

    const registerLink = ()=> {
        setAction(' active')

    }
    const loginLink = ()=> {
        setAction('')

    }
    return(
        <div className = {`wrapper${action}`}>
            <div className = "form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className = "input-box">
                        <input type="text"  placeholder='Fullname'  onChange = {(event)=>{
                            setloginFullname(event.target.value)
                        }} required/>
                        <FaUser className = 'icon'/>
                    </div>
                    <div className = "input-box">
                        <input type="password"  placeholder='password'  onChange = {(event)=>{
                            setloginPassword(event.target.value)
                        }} required/>
                        <FaLock className = 'icon'/>

                    </div>
                    <div className = "remember-forgot">
                        <label>
                            <input type="checkbox"  /> Remember me

                        </label>
                        <a href = "a"> Forgot password?</a>

                    </div>
                    <Link to = {'/Dashboard'}  >
                    <button type= "submit" onClick = {useUser}>Login</button>
                    </Link>

                    <div className='register-link'>
                        <p>Don't have an account? <a href = "#" onClick={registerLink}>
                            Register</a></p>
                    </div>
                </form>
            
            </div>
            <div className = "form-box register">
                <form action="">
                    <h1>Registration</h1>
                    <div className = "input-box">
                        <input type="text"  placeholder='Fullname' onChange = {(event)=>{
                            setFullname(event.target.value)
                        }} required/>
                        <FaUser className = 'icon'/>
                    </div>
                    <div className = "input-box">
                        <input type="text"  placeholder='residential' onChange = {(event)=>{
                            setResidential(event.target.value)
                        }} required/>
                        <FaHouseUser className = 'icon'/>
                    </div>
                    <div className = "input-box">
                        <input type="text"  placeholder='Postal adress' onChange = {(event)=>{
                            setPostal(event.target.value)
                        }} required/>
                        <BsFillPostageFill className = 'icon'/>
                    </div>
                    <div className = "input-box">
                        <input type="text"  placeholder='email' onChange = {(event)=>{
                            setEmail(event.target.value)
                        }} required/>
                        <IoMdMail className = 'icon'/>
                    </div>
                    <div className = "input-box">
                        <input type="text"  placeholder='phone number' onChange = {(event)=>{
                            setPhone(event.target.value)
                        }} required/>
                        <FaPhoneAlt className = 'icon'/>
                    </div>
                    <div className = "input-box">
                        <input type="text"  placeholder='ID number' onChange = {(event)=>{
                            setID(event.target.value)
                        }} required/>
                        <MdContactPhone className = 'icon'/>
                    </div>
                    <div className = "input-box">
                        <input type="text"  placeholder='password' onChange = {(event)=>{
                            setPassword(event.target.value)
                        }} required/>
                        <FaUserShield className = 'icon'/>
                    </div>
                    <div className = "remember-forgot">
                        <label>
                            <input type="checkbox"  /> I agree to the terms and coditions

                        </label>
                        <a href = "a"> Forgot password?</a>

                    </div>
                    <button type= "submit" onClick = {createUser} >Register</button>

                    <div className='register-link'>
                        <p>Already dont have an account? <a href = "#" onClick={loginLink}>
                            login</a></p>
                    </div>
                </form>
            
            </div>
            
        </div>
    )
}

export default LoginRegistration
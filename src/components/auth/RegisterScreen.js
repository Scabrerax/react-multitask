import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    const {msgError} = useSelector(state => state.ui)

    const [{name,email,password,password2}, handleInputChange] = useForm({
        name: 'Sergio',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const handleRegister = (e)=>{
        e.preventDefault();

        if(isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email,password,name))
        }
    }
    const isFormValid = () =>{
        if(name.trim().length === 0){
            dispatch(setError('Error Nombre'))
            return false
        }else if(!validator.isEmail(email)){
            dispatch(setError('Error Email'))
            return false
        }else if(password !== password2){
            dispatch(setError('Error Paswod'))
            return
        }
        dispatch(removeError('Error Email'))
        return true
    }



    return (
        <>
            <h3 className='auth__title'>Register</h3>
            <form onSubmit = {handleRegister}>
                {   
                    (msgError !== null) &&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                }
                <input 
                    className='auth__input'
                    type ='text'
                    placeholder='Name'
                    name='name'
                    autoComplete = 'off'
                    value = {name}
                    onChange = {handleInputChange}
                />
                <input 
                    className='auth__input'
                    type ='text'
                    placeholder='Email'
                    name='email'
                    autoComplete = 'off'
                    value = {email}
                    onChange = {handleInputChange}
                />
                <input
                    className='auth__input'
                    type ='password'
                    placeholder='Password'
                    name='password'
                    value = {password}
                    onChange = {handleInputChange}
                />
                <input
                    className='auth__input'
                    type ='password'
                    placeholder='Confirm password'
                    name='password2'
                    value = {password2}
                    onChange = {handleInputChange}
                />
                <button 
                    className='btn btn-primary btn-block mb-5'
                    type ='submit'
                >Register</button>

                <Link to='/auth/login' className='link'>
                    Already Registered?
                </Link>

            </form>
        </>
    )
}

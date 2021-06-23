import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Redirect,Switch,} from "react-router-dom";
import {firebase} from '../firebase/firebaseConfig'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { starLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) =>{
            if(user?.uid){
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)

                dispatch(starLoadingNotes(user.uid))

            }else{
                setIsLoggedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch])
    if(checking){
        return(
            <h1> Wait... </h1>
        )
    }
    
    return (
        <div>
            <Router>
                <div>  
                    <Switch>
                        <PublicRoute 
                            path = '/auth' 
                            component = {AuthRouter} 
                            isLoggedIn = {isLoggedIn}    
                        />
                        <PrivateRoute 
                            exact path = '/' 
                            component = {JournalScreen} 
                            isLoggedIn = {isLoggedIn }    
                        />

                        <Redirect to='/auth/login' />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

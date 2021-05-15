import React, {useState} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import api from './api'
import {CircularProgress, Container} from "@material-ui/core"
import Auth from "./components/Auth"
import Header from "./components/Header"
import Procedures from "./components/Procedures"
import Records from "./components/Records"
import Reviews from "./components/Reviews"
import Contacts from "./components/Contacts"

function App() {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState()

    const registration = async (data) => {
        setLoading(true)
        const response = await api.post('auth/registration', data)
        setUser(response.data.data)
        setLoading(false)
    }

    const login = async (data) => {
        setLoading(true)
        const response = await api.post('auth/login', data)
        setUser(response.data.data)
        if (response.data.message !== 'Успешная автризация!') {
            alert(response.data.message)
        }
        setLoading(false)
    }

    const logout = async () => {
        setUser(null)
    }

    return (
        <Router>
            <Container>
                {loading && <CircularProgress className='loading'/>}
                <Header user={user} logout={logout}/>
                <Switch>
                    <Route path='/procedures'>
                        <Procedures user={user}/>
                    </Route>
                    <Route path='/records'>
                        <Records user={user}/>
                    </Route>
                    <Route path='/reviews'>
                        <Reviews userId={user ? user._id : ''}/>
                    </Route>
                    <Route path='/contacts'>
                        <Contacts/>
                    </Route>
                    <Route path='/login'>
                        <Auth login={login} registration={registration} userId={user ? user._id : ''}/>
                    </Route>
                    <Route path='*'>
                        <Procedures user={user}/>
                    </Route>
                </Switch>
            </Container>
        </Router>
    )
}

export default App

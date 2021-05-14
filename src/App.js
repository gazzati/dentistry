import React, {useState} from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import api from './api'
import {Container} from "@material-ui/core"
import Auth from "./components/Auth"
import Header from "./components/Header"
import Procedures from "./components/Procedures"
import Records from "./components/Records"
import Reviews from "./components/Reviews"

function App() {
    const [user, setUser] = useState({
        email: "nastyachymakina@mail.ru",
        name: "Анастасия",
        password: "nastua99",
        role: "user",
        surname: "Чумакина",
        _id: "609c3c79e7668b3f2079f118"
    })

    const registration = async (data) => {
        const response = await api.post('auth/registration', data)
        setUser(response.data.data)
    }

    const login = async (data) => {
        const response = await api.post('auth/login', data)
        setUser(response.data.data)
        if(response.data.message !== 'Успешная автризация!') {
            alert(response.data.message)
        }
    }

    const logout = async () => {
        setUser(null)
    }

    if (!user) {
        return <Auth login={login} registration={registration}/>
    }

    return (
        <Router>
          <Container>
            <Header user={user} logout={logout}/>
            <Switch>
                <Route path='/procedures'>
                    <Procedures userId={user._id}/>
                </Route>
                <Route path='/records'>
                    <Records user={user}/>
                </Route>
                <Route path='/reviews'>
                    <Reviews userId={user._id}/>
                </Route>
                <Route path='*'>
                    <Procedures userId={user._id}/>
                </Route>
            </Switch>
          </Container>
        </Router>
    )
}

export default App

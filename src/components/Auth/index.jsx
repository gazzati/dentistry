import React, {useState} from "react"
import {Redirect} from "react-router-dom"
import {Button, Container, CssBaseline, makeStyles, TextField, Typography} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const Auth = ({login, registration, userId}) => {
    const classes = useStyles()
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        name: '',
        surname: ''
    })

    const onLogin = (e) => {
        e.preventDefault()
        login(loginData)
    }

    const onRegistration = (e) => {
        e.preventDefault()
        registration(signUpData)
    }

    if(userId) {
        return <Redirect to={'procedures'}/>
    }

    return (
        <div className='auth'>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Авторизация
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onLogin}>
                        <TextField
                            inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => login(loginData)}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            Войти
                        </Button>
                    </form>
                </div>
            </Container>

            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onRegistration}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                            label="Имя"
                            autoFocus
                            value={signUpData.name}
                            onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Фамилия"
                            id="password"
                            value={signUpData.surname}
                            onChange={(e) => setSignUpData({...signUpData, surname: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            value={signUpData.password}
                            onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => registration(signUpData)}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default Auth

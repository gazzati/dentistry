import React, {useState} from "react"
import {NavLink} from "react-router-dom"
import {AppBar, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core"
import {AccountCircle} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    headWrap: {
        display: "flex",
        justifyContent: "space-between",
    },
    hide: {
        display: 'none',
    },
    leftBlock: {
        display: "flex",
        alignItems: "center"
    },
    headLink: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        textDecoration: 'none !important',
        marginRight: 16,
        color: '#fff',
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.6
    },
    headLinkActive: {
        opacity: 0.5
    },
    rightBlock: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    profileBlock: {},
    profileBlockWrap: {
        display: "flex",
        alignItems: "center",
        color: '#fff'
    }
}))

const Header = ({user, logout}) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleLogout = () => {
        setAnchorEl(null)
        logout()
    }

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar className={classes.headWrap}>
                <div className={classes.leftBlock}>
                    {user && user.role === 'user' && <>
                        <NavLink to='/procedures' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Записаться на прием
                        </NavLink>
                        <NavLink to='/records' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Мои записи
                        </NavLink>
                        <NavLink to='/reviews' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Отзывы
                        </NavLink>
                        <NavLink to='/contacts' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Контакты
                        </NavLink>
                    </>}
                    {user && user.role === 'doctor' && <>
                        <NavLink to='/records' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Записи пациентов
                        </NavLink>
                        <NavLink to='/reviews' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Отзывы
                        </NavLink>
                        <NavLink to='/contacts' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Контакты
                        </NavLink>
                    </>}
                    {!user && <>
                        <NavLink to='/procedures' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Процедуры
                        </NavLink>
                        <NavLink to='/reviews' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Отзывы
                        </NavLink>
                        <NavLink to='/contacts' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Контакты
                        </NavLink>
                    </>}
                </div>
                <div className={classes.rightBlock}>
                    {user && user._id
                        ? <div className={classes.profileBlockWrap}>
                            <Typography variant="h6" noWrap>{user && `${user.name} ${user.surname}`}</Typography>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                            >
                                <AccountCircle/>
                            </IconButton>

                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{vertical: "top", horizontal: "center"}}
                                transformOrigin={{vertical: "top", horizontal: "center"}}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={handleLogout}>Выход</MenuItem>
                            </Menu>
                        </div>
                        : <NavLink to='/login' className={classes.headLink} activeClassName={classes.headLinkActive}>
                            Авторизоваться
                        </NavLink>
                    }
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header

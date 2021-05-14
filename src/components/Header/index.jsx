import React from "react"
import {
    AppBar,
    IconButton,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import {AccountCircle} from "@material-ui/icons"
import clsx from "clsx"

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
    appBarShift: {
        width: `calc(100% - ${270}px)`,
        marginLeft: 240,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    headWrap: {
        display: "flex",
        justifyContent: "space-between",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    burgerBlock: {
        display: "flex",
        alignItems: "center"
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

const Header = ({open, setOpen, user}) => {
    const classes = useStyles()

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar className={classes.headWrap}>
                <div className={classes.burgerBlock}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>Библиотека</Typography>
                </div>
                <div className={classes.rightBlock}>
                    <div className={classes.profileBlockWrap}>
                        <Typography variant="h6" noWrap>{user && `${user.name} ${user.surname}`}</Typography>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header

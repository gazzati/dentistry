import React, {useEffect, useState} from "react"
import api from '../../api'
import {
    Button,
    Grid, TextField,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        marginTop: 80,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }
}))

const Contacts = () => {
    const classes = useStyles()

    return (
        <Grid container >
            <Grid className={classes.content}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1585.1840591851521!2d37.64753715935427!3d55.8142669657141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5178390dd64f5f06!2z0KHQnC3QodGC0L7QvNCw0YLQvtC70L7Qs9C40Y8!5e0!3m2!1sru!2sru!4v1621065398717!5m2!1sru!2sru"
                    width="600" height="450" allowFullScreen="" loading="lazy" className='googleMap'>
                </iframe>
            </Grid>
        </Grid>
    )
}

export default Contacts

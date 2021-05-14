import React, {useEffect, useState} from "react"
import api from '../../api'
import {
    Button,
    Grid, IconButton, InputBase,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        marginTop: 80,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    table: {
        minWidth: 650
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        backgroundColor: 'whitesmoke',
        margin: '0 auto 40px'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}))

const Procedures = ({open, userId}) => {
    const classes = useStyles()
    const [procedures, setProcedures] = useState(false)
    const [term, setTerm] = useState('')

    useEffect(() => {
        getAllProcedures()
    }, [term])

    const getAllProcedures = async () => {
        const response = await api.get(`procedures${!!term ? `?term=${term}` : ''}`)
        setProcedures(response.data.data)
    }

    const addProcedure = async (bookId) => {
        const response = await api.get('procedures/add', {bookId, userId})
        setProcedures(response.data.data)
        alert('Книга добавлена')
    }

    return (
        <Grid container >
            <Grid className={clsx(classes.content, {[classes.contentShift]: open})}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Поиск по процедурам"
                        inputProps={{ 'aria-label': 'Поиск по книгам' }}
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <IconButton className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell>Лечащий врач</TableCell>
                                <TableCell>Продолжительность</TableCell>
                                <TableCell>Стоимость</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {procedures && procedures.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.doctor}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => addProcedure(row._id)}>
                                            Записаться
                                        </Button>
                                    </TableCell>
                                </TableRow >
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Procedures

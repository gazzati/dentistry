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

const Records = ({user}) => {
    const classes = useStyles()
    const [records, setRecords] = useState()
    const [term, setTerm] = useState('')

    useEffect(() => {
        getAllRecords()
    }, [term])

    const getAllRecords = async () => {
        const response = await api.get(`records${!!term ? `?term=${term}` : ''}`)
        setRecords(response.data.data)
    }

    const removeRecord = async (recordId) => {
        const response = await api.delete('records/remove', {recordId})
        setRecords(response.data.data)
        alert('Запись отменена')
    }

    return (
        <Grid container >
            <Grid className={classes.content}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Поиск по записям"
                        inputProps={{ 'aria-label': 'Поиск по записям' }}
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
                                <TableCell>Название процедуры</TableCell>
                                <TableCell>Пациент</TableCell>
                                <TableCell>Лечащий врач</TableCell>
                                <TableCell>Дата и время</TableCell>
                                <TableCell>Стоимость</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records && records.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.doctor}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => removeRecord(row._id)}>
                                            Отменить запись
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

export default Records

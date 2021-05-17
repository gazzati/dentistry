import React, {useEffect, useState} from "react"
import api from '../../api'
import {getDate} from '../../helpers/getDate'
import {getSpecialty} from "../../helpers/getSpecialty"
import {
    Button, CircularProgress,
    Grid,
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
    },
    table: {
        minWidth: 650
    }
}))

const Records = ({user}) => {
    const classes = useStyles()
    const [records, setRecords] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        getAllRecords()
    }, [])

    const getAllRecords = async () => {
        setLoading(true)
        const response = await api.get(`records?userId=${user._id}${user.role === 'doctor' ? `&isDoctor=true` : ''}`)
        setRecords(response.data.data)
        setLoading(false)
    }

    const removeRecord = async (recordId) => {
        setLoading(true)
        await api.post('records/remove', {recordId})
        setRecords(records => records.filter(record => record._id !== recordId))
        alert('Запись отменена')
        setLoading(false)
    }

    return (
        <Grid container >
            <Grid className={classes.content}>
                {loading && <CircularProgress className='loading'/>}
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Название процедуры</TableCell>
                                <TableCell>Пациент</TableCell>
                                <TableCell>Дата и время</TableCell>
                                <TableCell>Лечащий врач</TableCell>
                                <TableCell>Специальность</TableCell>
                                <TableCell>Стоимость</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records && records.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.procedure.title}</TableCell>
                                    <TableCell>{`${row.user.name} ${row.user.surname}`}</TableCell>
                                    <TableCell>{getDate(row.date)}</TableCell>
                                    <TableCell>{`${row.doctor.name} ${row.doctor.surname}`}</TableCell>
                                    <TableCell>{getSpecialty(row.doctor.specialty)}</TableCell>
                                    <TableCell>{row.procedure.price}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => removeRecord(row._id)}>
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

import React, {useEffect, useState} from "react"
import api from '../../api'
import {getSpecialty} from "../../helpers/getSpecialty"
import DateFnsUtils from "@date-io/date-fns"
import ruLocale from "date-fns/locale/ru"
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
    TableRow,
    Modal, Select, MenuItem, CircularProgress
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"
import {Redirect} from "react-router-dom"

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
    modalPaper: {
        width: 400,
        margin: '400px auto',
        padding: 16,
        display: 'flex',
        flexDirection: 'column'
    },
    modalContent: {
        marginBottom: 24
    },
    doctorSelect: {
        marginRight: 16,
        minWidth: 160
    },
    timeSelect: {
        marginLeft: 16
    },
}))

const Procedures = ({user}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [procedures, setProcedures] = useState()
    const [doctors, setDoctors] = useState()
    const [term, setTerm] = useState('')
    const [recordData, setRecordData] = useState({procedureId: '', userId: '', doctorId: '', date: new Date()})
    const [hours, setHours] = useState('9')
    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState()
    const times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

    useEffect(() => {
        const date = new Date()
        date.setHours(9)
        date.setMinutes(0)
        date.setSeconds(0)
        user && user._id && setRecordData({...recordData, date, userId: user._id})
        getAllProcedures()
    }, [term])

    const getAllProcedures = async () => {
        setLoading(true)
        const response = await api.get(`procedures${!!term ? `?term=${term}` : ''}`)
        setProcedures(response.data.data)
        setLoading(false)
    }

    const getAllDoctors = async (doers) => {
        setLoading(true)
        const response = await api.post('doctors', {doers})
        setDoctors(response.data.data)
        setLoading(false)
    }

    const addProcedure = async () => {
        setLoading(true)
        if (!recordData.doctorId || !recordData.date || !recordData.procedureId || !recordData.userId) {
            return alert('Заполните все поля')
        }
        setOpen(false)
        await api.post('records/add', recordData)
        alert('Запись успешно создана')
        setLoading(false)
    }

    const openModal = (procedure) => {
        getAllDoctors(procedure.doers)
        setRecordData({...recordData, procedureId: procedure._id})
        setOpen(true)
    }

    const handleTimeChange = (hours) => {
        setHours(hours)
        const date = recordData.date
        date.setHours(hours)
        setRecordData({...recordData, date})
    }

    const handleDoctorChange = (doctorId) => {
        setDoctor(doctorId)
        setRecordData({...recordData, doctorId})
    }

    const getTimesRange = () => {
        const currentDate = new Date()
        const datesDiffs = Math.ceil((recordData.date.getTime() - currentDate.getTime()) / (1000 * 3600 * 24))
        if(datesDiffs < 2) {
            return times.filter(time => time === 12 || time === 18)
        }
        if(datesDiffs < 5) {
            return times.filter(time => time === 10 || time === 12 || time === 15 || time === 18)
        }
        return times
    }

    if(user && user.role === 'doctor') {
        return <Redirect to={'records'}/>
    }

    return (
        <Grid container>
            {loading && <CircularProgress className='loading'/>}
            <Grid className={classes.content}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Поиск по процедурам"
                        inputProps={{'aria-label': 'Поиск по процедурам'}}
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <IconButton className={classes.iconButton} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>

                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell>Продолжительность</TableCell>
                                <TableCell>Стоимость</TableCell>
                                {user && user._id && <TableCell> </TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {procedures && procedures.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>{`${row.price} р.`}</TableCell>
                                    {user && user._id &&
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => openModal(row)}>
                                            Записаться
                                        </Button>
                                    </TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Paper className={classes.modalPaper}>
                    <div className={classes.modalContent}>
                        <h3>Выберите доктора</h3>
                        <Select
                            value={doctor}
                            onChange={e => handleDoctorChange(e.target.value)}
                            className={classes.doctorSelect}
                        >
                            {doctors && doctors.map(doctor =>
                                <MenuItem key={doctor._id} value={doctor._id}>
                                    {`${doctor.name} ${doctor.surname} - ${getSpecialty(doctor.specialty)}`}
                                </MenuItem>)
                            }
                        </Select>
                    </div>

                    <div className={classes.modalContent}>
                        <h3>Выберите дату и время</h3>

                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                            <DatePicker
                                value={recordData.date}
                                onChange={date => setRecordData({...recordData, date})}
                                format="d MMM yyyy"
                                cancelLabel="отмена"
                                minDate={new Date()}
                            />
                        </MuiPickersUtilsProvider>

                        <Select
                            value={hours}
                            onChange={e => handleTimeChange(e.target.value)}
                            className={classes.timeSelect}
                        >
                            {getTimesRange().map(time => <MenuItem key={time} value={time.toString()}>{`${time}:00`}</MenuItem>)}
                        </Select>
                    </div>

                    <Button variant="contained" color="primary" onClick={() => addProcedure()}>
                        Записаться
                    </Button>
                </Paper>
            </Modal>
        </Grid>
    )
}

export default Procedures

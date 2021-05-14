import React, {useEffect, useState} from "react"
import api from '../../api'
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
    Modal, Select, MenuItem
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"

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

const Procedures = ({userId}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [procedures, setProcedures] = useState([
        {_id: 1111, title: '111', description: '11111_', time: '111+', price: '111#'},
        {_id: 2222, title: '222', description: '2222_', time: '222+', price: '222#'},
        {_id: 333, title: '3333', description: '33_', time: '333+', price: '333#'}
    ])
    const [doctors, setDoctors] = useState([
        {_id: 111, name: 'first', surname: 'first'},
        {_id: 222, name: 'sec', surname: 'sec'},
        {_id: 333, name: 'third', surname: 'third'}
    ])
    const [term, setTerm] = useState('')
    const [recordData, setRecordData] = useState({procedureId: '', userId: '', doctorId: '', date: new Date()})
    const [hours, setHours] = useState('9')
    const [doctor, setDoctor] = useState(null)

    useEffect(() => {
        const date = new Date()
        date.setHours(9)
        date.setMinutes(0)
        date.setSeconds(0)
        userId && setRecordData({...recordData, date, userId})
        getAllProcedures()
        getAllDoctors()
    }, [term])

    const getAllProcedures = async () => {
        const response = await api.get(`procedures${!!term ? `?term=${term}` : ''}`)
        setProcedures(response.data.data)
    }

    const getAllDoctors = async () => {
        const response = await api.get('doctors')
        setDoctors(response.data.data)
    }

    const addProcedure = async () => {
        //await api.post('records/add', recordData)
        //alert('Запись успешно создана')
        if (!recordData.doctorId || !recordData.date || !recordData.procedureId || !recordData.userId) {
            return alert('Заполните все поля')
        }
        console.log(recordData)
        setOpen(false)
    }

    const openModal = (procedureId) => {
        setRecordData({...recordData, procedureId})
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

    return (
        <Grid container>
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
                                <TableCell>Описание</TableCell>
                                <TableCell>Продолжительность</TableCell>
                                <TableCell>Стоимость</TableCell>
                                {userId && <TableCell> </TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {procedures && procedures.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    {userId &&
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => openModal(row._id)}>
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
                            {doctors.map(doctor =>
                                <MenuItem key={doctor._id} value={doctor._id}>
                                    {`${doctor.name} ${doctor.surname}`}
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
                            />
                        </MuiPickersUtilsProvider>

                        <Select
                            value={hours}
                            onChange={e => handleTimeChange(e.target.value)}
                            className={classes.timeSelect}
                        >
                            <MenuItem value={9}>9:00</MenuItem>
                            <MenuItem value={10}>10:00</MenuItem>
                            <MenuItem value={11}>11:00</MenuItem>
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

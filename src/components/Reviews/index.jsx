import React, {useEffect, useState} from "react"
import api from '../../api'
import {getDate} from '../../helpers/getDate'
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
    TableRow,
    TextField
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
    addReview: {
        marginBottom: 32,
        padding: 16,
        display: 'flex'
    },
    addReviewInput: {
        width: '100%',
        marginRight: 16
    },
    addReviewMark: {
        width: 240,
        marginRight: 16
    },
    addReviewBtn: {
        width: 222
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

const Reviews = ({userId}) => {
    const classes = useStyles()
    const [text, setText] = useState('')
    const [mark, setMark] = useState('')
    const [reviews, setReviews] = useState(false)
    const [loading, setLoading] = useState()

    useEffect(() => {
        getAllReviews()
    }, [])

    const getAllReviews = async () => {
        setLoading(true)
        const response = await api.get('reviews')
        setReviews(response.data.data)
        setLoading(false)
    }

    const addReview = async () => {
        setLoading(true)
        const response = await api.post('reviews/add', {userId, text, mark})
        setReviews(response.data.data)
        setText('')
        setMark('')
        alert('Отзыв добавлен')
        setLoading(false)
    }

    return (
        <Grid container>
            <Grid className={classes.content}>
                {loading && <CircularProgress className='loading'/>}
                {userId &&
                <Paper className={classes.addReview}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Ваш отзыв"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        variant="outlined"
                        required
                        className={classes.addReviewInput}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Оценка от 0 до 5"
                        value={mark}
                        onChange={e => setMark(e.target.value)}
                        variant="outlined"
                        required
                        className={classes.addReviewMark}
                    />
                    <Button variant="contained" color="primary" className={classes.addReviewBtn} onClick={addReview}>
                        Отправить
                    </Button>
                </Paper>
                }
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Посетитель</TableCell>
                                <TableCell>Отзыв</TableCell>
                                <TableCell>Оценка</TableCell>
                                <TableCell>Дата</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviews && reviews.slice(0).reverse().map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.author}</TableCell>
                                    <TableCell>{row.text}</TableCell>
                                    <TableCell>{row.mark}</TableCell>
                                    <TableCell>
                                        {getDate(row.date)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Reviews

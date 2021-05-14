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

const AllBooks = ({open, userId}) => {
    const classes = useStyles()
    const [books, setBooks] = useState(false)
    const [term, setTerm] = useState('')

    useEffect(() => {
        getAllBooks()
    }, [term])

    const getAllBooks = async () => {
        const response = await api.get('')
        const userData = await response.json()
        setBooks(userData.data)
    }

    const addBook = async (bookId) => {
        const response = await fetch(baseUrl + 'books/add', {
            method: 'POST',
            body: JSON.stringify({bookId, userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await response.json()
        alert('Книга добавлена')
    }

    return (
        <Grid container >
            <Grid className={clsx(classes.content, {[classes.contentShift]: open})}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Поиск по книгам"
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
                                <TableCell>Автор</TableCell>
                                <TableCell>Дата публикации</TableCell>
                                <TableCell>Ссылка</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books && books.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.publisher}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>
                                        {row.url &&
                                            <a href={row.url} target='_blank'>Ссылка</a>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => addBook(row._id)}>
                                            Добавить себе
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

export default AllBooks

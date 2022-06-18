import { useState } from "react";
import styles from './Book.module.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function Book(props) {
    const [editMode, setEditMode] = useState(false)
    const [book, setBook] = useState(props.info)
    const [books, setBooks] = props.booksState;

    const handleDelete = () => {
        setBooks(books.filter(current => current.id !== book.id))
    }

    const handleChange = (e) => {
        setBook({...book, [e.target.id]: e.target.value})
    }

    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setBook({...book, image: reader.result})
        })
        reader.readAsDataURL(e.target.files[0])
    }

    const handleSave = () => {
        if (book.title.length === 0 || book.author.length === 0) return false
        let newArray = books.map(current => current.id === book.id ? current = book : current)
        setBooks(newArray)
        setEditMode(false)
    }

    const theme = createTheme ({
        palette: {
            primary: {
                main: "#FFFFFF"
            }
        }
    })

    return ( 
        <div className={styles.book}>
            {editMode ? 
                <form>
                    <input className={styles.fileInput} onChange={(e) => handleFileChange(e)} type="file" name="image" id="image" />
                    <label className={styles.pointer} htmlFor="image">
                        {book.image ? <img className={styles.bookImage} src={book.image} alt={book.title} /> : <div className={styles.blankImage}><span>?</span></div>}
                    </label>
                    <input className={styles.textInput} required={true} minLength={1} type="text" placeholder="Название книги" value={book.title} id='title' onChange={handleChange}/>
                    <input className={styles.textInput} required={true} minLength={1} type="text" placeholder="Автор книги" value={book.author} id='author' onChange={handleChange}/>
                    <button className={styles.saveButton} onClick={handleSave}>Save</button>
                </form>
                :
                    <div>
                        {book.image ? 
                            <img className={styles.bookImage} src={book.image} alt={book.title} />
                        :
                            <div className={styles.blankImage}><span>?</span></div>
                        }
                        <div className={styles.controlButtons}>
                            <ThemeProvider theme={theme}>
                                <EditIcon color="primary" onClick={(e) => setEditMode(true)}/>
                                <DeleteIcon color="primary" onClick={handleDelete}/>
                            </ThemeProvider>
                        </div>
                        <p className={styles.title}>{book.title}</p>
                        <p className={styles.author}>{book.author}</p>
                    </div>
            }
        </div>
    );
}

export default Book;
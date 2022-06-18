import ImageIcon from '@mui/icons-material/Image';
import { useRef, useState } from 'react';

function AddBookForm({books, setBooks, setFormState}) {
    const [image, setImage] = useState(null)
    const lastId = books[books.length - 1]?.id;
    const title = useRef(null),
          author = useRef(null)

    const handleFileChange = (e) => {
        if (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg") {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImage(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = (e) => {
        if (title.current.value.length === 0 || author.current.value.length === 0) return false
        setBooks([...books, {id: lastId ? lastId + 1 : 0, title: title.current.value, author: author.current.value, image}])
        setFormState(false)
    }

    return ( 
        <form className='addBookForm' action="#">
            <input ref={title} className="textInput" required minLength={1} type="text" name="title" id="title" placeholder='Название книги' />
            <input ref={author} className="textInput" required minLength={1} type="text" name="author" id="author" placeholder='Автор книги' />
            <div className='uploadImage'>
                <input className="fileInput" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e)} type="file" name="image" id="image" />
                <label className='uploadImageButton' htmlFor="image"><ImageIcon fontSize='large' color="success"/>{image ? <p>Change Image</p> : <p>Upload Image</p>}</label>
                {image ? 
                <img className='imageInput' src={image} alt="" />
                :    
                <></>
                }
            </div>
            <button onClick={handleSubmit} className='submitButton'>ADD BOOK</button>
      </form>
    );
}

export default AddBookForm;
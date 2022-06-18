import { AddBox } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import './App.css';
import Book from './components/book/Book';
import AddBookForm from './components/form/form';

function App() {
  const [books, setBooks] = useState(JSON.parse(localStorage.getItem(0)))
  const [formState, setFormState] = useState(false)

  useEffect(() => {
    localStorage.setItem(0, JSON.stringify(books))
  }, [books])
  

  const handleClick = (e) => {
    setFormState(true)
  }

  return (
    <div className="App">
      {formState ? 
        <AddBookForm setFormState={setFormState} books={books} setBooks={setBooks}/>
      : <button onClick={handleClick} className='addBookButton'><AddBox fontSize='large' color="success"/></button>}
      <div className="books">
        {books && books.length > 0 ? books.map(book => <Book booksState={[books, setBooks]} key={book.id} info={book}/>) : <p className="emptyMessage">Книг нет</p>}
      </div>
    </div>
  );
}

export default App;

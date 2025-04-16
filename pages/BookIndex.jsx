const { useState, useEffect } = React

const {Link} = ReactRouterDOM

import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { bookService } from '../services/book.service.js'
import { BookEdit } from './BookEdit.jsx'


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        console.log('loading books..');
        loadBooks()
    }, [filterBy])

    useEffect(() => { loadBooks }
        , [isEdit])
    // const navigate = useNavigate()
    useEffect(() => {
        console.log("selectedBook:", selectedBook);
    }, [selectedBook]);




    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onSelect(select) {
        console.log(select)
        if (select !== null){
            bookService.get(select)
                .then(book => {
                    setSelectedBook(book)
                })
                .catch((err => console.log('Error fetching book:', err)))

        }


    }

    function onRemove(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('err:', err))



    }

    function getClearFilter() {
        const defaultFilter = bookService.getDefaultFilter()
        setFilterBy(defaultFilter)
    }


    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }


 

    return (<main>
        {!selectedBook && (
            <React.Fragment>
                {<BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} getClearFilter={getClearFilter} />}
                <Link to="/books/edit"><button>Add Book </button> </Link>
                {books && <BookList books={books} onRemove={onRemove} onSelect={onSelect} />}
            </React.Fragment>
        )}


    </main>
    )

}
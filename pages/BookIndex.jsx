const { useState, useEffect } = React

import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { SelectedBook } from '../cmps/SelectedBook.jsx'
import { bookService } from '../services/book.service.js'


export function BookIndex() {
    useEffect(() => {
        loadBooks()
    }, [])
    // filterBy



    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)




    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onSelect(bookId) {
        setSelectedBook(bookId)

        //     bookService.get(bookId)
        //         // .then(()=>{setSelectedBook()})
        //     // openModal()

    }

    function onRemove(bookId) {
        console.log(bookId)
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('err:', err))



    }

    function getClearFilter(){
        setFilterBy(bookService.getDefaultFilter())
    }


    function onSetFilterBy(filterByToEdit) {
        if(filterByToEdit===null){
            getClearFilter()
            loadBooks()
        }
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
        loadBooks()
    }

    return (<React.Fragment>
     
            {<BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} getClearFilter={getClearFilter} />}
            {selectedBook && <SelectedBook selectedBook={selectedBook} />}
    
        {books && <BookList books={books} onRemove={onRemove} onSelect={onSelect} />}









    </React.Fragment>
    )

}
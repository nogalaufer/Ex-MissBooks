const { useState, useEffect } = React

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

    useEffect(()=>{loadBooks},[isEdit])

   


    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onSelect(bookId) {
        bookService.get(bookId)
            .then(book => {
                setSelectedBook(book)
            })
            .catch((err => console.log('Error fetching book:', err)))

    }

    function onRemove(bookId) {
        console.log(bookId)
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


    function onUpdate(bookToEdit) {
        bookService.save(bookToEdit)
        .then((savedBook) => {
            setSelectedBook(savedBook)
            setIsEdit(false)
            setBooks(prevBooks => (
                prevBooks.map(book => book.id === savedBook.id ? savedBook : book)
            ))
        })

    }


    return (<main>
        {!selectedBook && (
            <React.Fragment>
                {<BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} getClearFilter={getClearFilter} />}
                {books && <BookList books={books} onRemove={onRemove} onSelect={onSelect} />}
            </React.Fragment>
        )}

        {selectedBook && (
            <section>
                {isEdit
                    ? <BookEdit book={selectedBook} onUpdate={onUpdate} onCancelEdit={()=>setIsEdit(false)} />
                    : <BookDetails
                        book={selectedBook}
                        onGoBack={() => setSelectedBook(null)}
                        onGoEdit={() => setIsEdit(true)}
                    />
                }

            </section>
        )}



    </main>
    )

}
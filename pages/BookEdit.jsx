
const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM
import { bookService } from '../services/book.service.js'
import {AddBook} from  '../assets/pages/AddBook.jsx'


export function BookEdit({ onUpdate }) {
    const { bookID } = useParams()
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    useEffect(() => {
        if (!bookID) return
        bookService.get(bookID)
            .then(book => setBookToEdit(book))
            .catch(err => console.error('Error fetching book:', err))
    }, [])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function handleListPriceChange({ target }) {

        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...bookToEdit.listPrice, [field]: value } }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
    }
    if (!bookToEdit) return <div className="loading">Loading...</div>

    // if (!bookID) return (<AddBook onSaveBook={onSaveBook} />)
    return (
        
        <section className='book-edit'>
            {/* {(!bookID) && <AddBook onSaveBook={onSaveBook} />} */}
            <h2 className='edit-book-header'>Edit Book</h2>
            <form onSubmit={onSaveBook}>
                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Title:</label>
                    <input
                        type='text'
                        placeholder='Enter New Title'
                        name='title'
                        value={bookToEdit.title}
                        onChange={handleChange}
                    />
                </div>

                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Price:</label>
                    <input
                        type='number'
                        placeholder='Set Price'
                        name='amount'
                        onChange={handleListPriceChange}
                        value={bookToEdit.listPrice.amount}
                    />
                </div>
                

                <div className='book-edit-actions-container'>
                    <button className='save-edit-btn' >
                        Save
                    </button>
                    <button
                        type='button'
                        className='cancel-edit-btn'

                    >
                        <Link to={`/books/${bookID}`}>Cancel</Link>
                    </button>
                </div>

            </form>
        </section>
    )
}

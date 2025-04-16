
const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM
import { bookService } from '../services/book.service.js'


export function BookEdit({ onUpdate }) {
    const { bookID } = useParams()
    const [book, setBookToEdit] = useState(null)

    useEffect(() => {
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
        setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...book.listPrice, [field]: value } }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        onUpdate(book)
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className='book-edit'>
            <h2 className='edit-book-header'>Edit Book</h2>
            <form onSubmit={onSaveBook}>
                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Title:</label>
                    <input
                        type='text'
                        placeholder='Enter New Title'
                        name='title'
                        value={book.title}
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
                        value={book.listPrice.amount}
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

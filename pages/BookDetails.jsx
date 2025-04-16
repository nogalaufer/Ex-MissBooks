const { useEffect, useState } = React
const { useParams, Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { LongTxt } from "../cmps/LongTxt.jsx"

export function BookDetails() {
    const { bookID } = useParams()
    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookID)
            .then(book => setBook(book))
            .catch(err => console.error('Error fetching book:', err))
    }, [])



    function getBookLng(lng) {
        const bookLang = {
            he: 'Hebrew',
            sp: 'Spanish',
        }
        return bookLang[lng] || 'English'
    }

    function getPublishDate() {
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        let diff = currYear - publishedYear
        if (diff > 10) publishedYear += ' - Vintage';
        else if (diff <= 1) publishedYear += ' - NEW!'
        return publishedYear
    }

    function getPageCount() {
        let pageCount = book.pageCount
        if (book.pageCount > 500) pageCount += ' - Long reading'
        else if (book.pageCount > 200) pageCount += ' - Descent reading'
        else if (book.pageCount < 100) pageCount += ' - Light reading'
        return pageCount
    }

    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'red'
        if (book.listPrice.amount < 20) return 'green'
        return ''
    }





    if (!book) return <div className="loading">Loading...</div>
    const {
        id,
        title,
        subtitle,
        thumbnail,
        authors,
        description,
        language,
        categories,
        listPrice
    } = book
    return (
        <React.Fragment>
            <section className="selected-book-modal">
                <div className="book-details-container">
                    <h3>{title},</h3>
                    <h1>{authors.join(', ')}</h1>
                    {listPrice.isOnSale && (
                        <div className="book-details-on-sale">On-sale!</div>
                    )}
                    <img src={thumbnail} alt="Book thumbnail" />
                </div>

                <div className="book-details-info">
                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Year publish:</span>
                        <span className="book-details-info-text">{getPublishDate()}</span>
                    </div>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">
                            Author{authors.length > 1 ? 's' : ''}:
                        </span>
                        <span className="book-details-info-text">
                            {authors.join(', ')}
                        </span>
                    </div>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Language:</span>
                        <span className="book-details-info-text">
                            {getBookLng(language)}
                        </span>
                    </div>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Categories:</span>
                        <span className="book-details-info-text">
                            {categories.join(', ')}
                        </span>
                    </div>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Pages:</span>
                        <span className="book-details-info-text">{getPageCount()}</span>
                    </div>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Price:</span>
                        <span className={'book-details-info-text ' + getPriceClass()}>
                            {listPrice.amount} {listPrice.currencyCode}
                        </span>
                    </div>

                    <div className="book-details-buy-container">
                        {listPrice.isOnSale && (
                            <button
                                className="buy-book-btn"
                                onClick={() => alert(`HA! ma ze po hanut?`)}
                            >
                                Buy it now!
                            </button>
                        )}
                        <div className="actions-btns">
                            <button className="go-back-btn" >
                                <Link to={`/books`}>Back</Link>
                            </button>
                            <button className="go-edit-btn">
                                <Link to={`/books/edit/${bookID}`}>Edit</Link>
                            </button>

                        </div>
                    </div>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Description:</span>
                    <LongTxt txt={description} />
                </div>
            </section>
        </React.Fragment>
    );
}
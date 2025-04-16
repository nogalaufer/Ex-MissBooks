import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onRemove, onSelect }) {

    return (
        <React.Fragment>
            <section className="add-book-btn">
                {/* <Link to="/books/edit">Add Book</Link> */}
            </section>
            <ul className="book-list">
                {books.map((book, index) =>
                (<li key={book.id}>
                    <BookPreview book={book} index={index} />
                    <div className="preview-button-container">
                        <button onClick={() => onRemove(book.id)}>X</button>
                        <button >
                        <Link to={`/books/${book.id}`}>Select</Link>
                        </button>
                    </div>

                </li>

                ))}

            </ul>
        </React.Fragment>
    )
}
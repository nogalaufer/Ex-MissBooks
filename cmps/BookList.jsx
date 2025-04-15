import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemove, onSelect }) {







    return (
        <React.Fragment>
            <ul className="book-list">
                {books.map((book, index) =>
                (<li key={book.id}>
                    <BookPreview book={book} index={index} />
                    <div className="preview-button-container">
                    <button onClick={() => onRemove(book.id)}>X</button>
                    <button onClick={() => onSelect(book.id)}>Select</button>
                    <button onClick={() => onSelect(book.id)}>Edit</button>
                    </div>

                </li>

                ))}

            </ul>
        </React.Fragment>
    )
}
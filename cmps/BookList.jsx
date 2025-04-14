import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books,onRemove,onSelect }) {







    return (
        <React.Fragment>
            <ul className="book-list">
                {books.map((book,index) =>
                (<li key={book.id}>
                    <BookPreview book={book} index={index} />
                
                    <section className="button-list-container">
                        <button onClick={()=>onRemove(book.id)}>X</button>
                        <button onClick={()=> onSelect(book.id)}>select</button>
                    </section>
                </li>

                ))}

            </ul>
        </React.Fragment>
    )
}
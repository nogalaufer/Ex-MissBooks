export function BookPreview({ book, index }) {
    const { title, subtitle, thumbnail, authors, listPrice } = book

    return (
        <article className="book-preview">
            <section><h2>{title},</h2> <h3>{authors}</h3></section>
            <p>{subtitle}</p>
            <img src={thumbnail} alt="img" />
            <h4>{listPrice.amount} €</h4>

        </article>
    )

}
export function BookPreview({ book,index }) {
    const { title, subtitle, thumbnail } = book

    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <img src={thumbnail} alt="img" />
        
        </article>
    )

}
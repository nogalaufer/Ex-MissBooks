
const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

export function BookFilter({ filterBy, onSetFilterBy, getClearFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)

    }

    function onClearFilter(ev) {
        ev.preventDefault()
        getClearFilter()
        setFilterByToEdit(bookService.getDefaultFilter())

    }

    const { txt, minPrice, isOnSale } = filterByToEdit

    return (
        <section className="book-filter-continer">
            <form onSubmit={onSubmitFilter}>
                <input onChange={handleChange} value={txt} name="txt" type="text" placeholder="Book name..." />
                <span> From <input onChange={handleChange} value={minPrice || ''} name="minPrice" type="number" placeholder="Price" /> €</span>
                <span> Sale:<input onChange={handleChange} checked={isOnSale || false} type="checkbox" name="isOnSale" /></span>
                <button type="button" onClick={onClearFilter} >Clear</button>
                <button>Submit</button>
            </form>


        </section>
    )
}
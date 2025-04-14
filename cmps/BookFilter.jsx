
const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy ,getClearFilter}) {
    
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    
    // useEffect(() => {
        //     onSetFilterBy(filterByToEdit)
        // }, [filterByToEdit])
        
        
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
        console.log(filterByToEdit)
    }
    
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    function getClearFilter(ev){
        ev.preventDefault()
        onSetFilterBy(null)
        setFilterByToEdit(filterBy)

    }
    
    const {txt, minPrice, isOnSale} = filterByToEdit
    
    return (
        <section className="book-filter-continer">
            <form onSubmit={onSubmitFilter}>
                <input onChange={handleChange} value={txt} name="txt" type="text" />
                <input onChange={handleChange} value={minPrice || ''} name="minPrice" type="number" />
                <input onChange={handleChange} checked={isOnSale || false} type="checkbox" name="isOnSale"  />
                <button onClick={getClearFilter} >Clear</button>

                <button>Submit</button>
            </form>


        </section>
    )
}
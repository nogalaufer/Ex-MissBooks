
export function AppHeader({ onSetPage }) {
    

    return (
        <header className="app-header-container">
            <section className="app-header">
                <h1>Books</h1>
                <nav className="app-nav">
                    <a onClick={() => onSetPage('BookIndex')}>BookIndex</a>
                    <a onClick={() => onSetPage('HomePage')}>HomePage</a>
                    <a onClick={() => onSetPage('AboutUs')}>AboutUs</a>
                </nav>
            </section>
        </header>
    )
}

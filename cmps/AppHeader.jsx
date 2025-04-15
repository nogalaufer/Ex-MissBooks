
export function AppHeader({ onSetPage }) {
    

    return (
        <header className="app-header-container">
            <section className="app-header">
                <h1 className="logo-header">Books</h1>
                <nav className="app-nav">
                    <a onClick={() => onSetPage('BookIndex')}>Books</a>
                    <a onClick={() => onSetPage('HomePage')}>Home</a>
                    <a onClick={() => onSetPage('AboutUs')}>About</a>
                </nav>
            </section>
        </header>
    )
}

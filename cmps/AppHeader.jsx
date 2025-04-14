
export function AppHeader({ onSetPage }) {
    

    return (
        <header className="app-header-container">
            <section>
                <h1>React Book App</h1>
                <nav className="app-nav">
                    <a onClick={() => onSetPage('BookIndex')}>BookIndex</a>
                    <a onClick={() => onSetPage('HomePage')}>HomePage</a>
                    <a onClick={() => onSetPage('AboutUs')}>AboutUs</a>
                </nav>
            </section>
        </header>
    )
}

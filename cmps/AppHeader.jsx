const { NavLink } = ReactRouterDOM

export function AppHeader({ onSetPage }) {


    return (
        <header className="app-header-container">
            <section className="app-header">
                <h1 className="logo-header">Books</h1>
                <nav className="app-nav">
                    <NavLink to="/books">Books</NavLink>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </section>
        </header>
    )
}

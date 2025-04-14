const { useState } = React

import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"

export function RootCmp() {

    const [page, setPage] = useState('book')




    
    return (
        <section className="app">
            <AppHeader onSetPage={(page) => setPage(page)} />

            <main>
                {page === 'book' && <BookIndex />}
                {page === 'home' && <HomePage />}
                {page === 'book' && <AboutUs />}
            </main>
        </section>
    )
} 
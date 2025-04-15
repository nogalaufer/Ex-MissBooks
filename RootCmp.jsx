const { useState } = React

import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"

export function RootCmp() {

    const [page, setPage] = useState('BookIndex')




    
    return (
        <section className="app">
            
            <AppHeader onSetPage={(page) => setPage(page)} />

            <main className="main-nav">
                {page === 'BookIndex' && <BookIndex/>}
                {page === 'HomePage' && <HomePage/>}
                {page === 'AboutUs' && <AboutUs/>}
            </main>
        </section>
    )
} 
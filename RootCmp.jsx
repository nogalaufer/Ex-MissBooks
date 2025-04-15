const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate} = ReactRouterDOM

import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

export function RootCmp() {

    // const [page, setPage] = useState('BookIndex')





    return (
        <Router>
            <section className="app">
                <AppHeader/>

                <main className="main-nav">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home"/>}/>
                        <Route path="/home" element={<HomePage />}/>
                        <Route path="/about" element={<AboutUs />}/>
                        <Route path="/books" element={<BookIndex />}/>
                        <Route path="/books/:bookID" element={<BookDetails />}/>
                        <Route path="/books/edit/:bookID" element={<BookEdit />}/>
                   
                    </Routes>
                </main>
            </section>
        </Router>
    )
} 
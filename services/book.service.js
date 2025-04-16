import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()


export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,

}


function query(filterBy={}) {
    const { txt, minPrice, isOnSale } = filterBy
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (minPrice) {
                books = books.filter(book => book.listPrice.amount >= minPrice)
            }
            if (isOnSale) {
                books = books.filter(book => book.listPrice.isOnSale === isOnSale)
            }
            return books
        })
}

function get(carId) {
    return storageService.get(BOOK_KEY, carId)
}

function remove(carId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, carId)
}


function save(car) {
    if (car.id) {
        return storageService.put(BOOK_KEY, car)
    } else {
        return storageService.post(BOOK_KEY, car)
    }
}

function getEmptyBook(title = '', amount = '', description = '', pageCount = '', language = 'en', authors = '') {
    return {
        title,
        authors,
        description,
        pageCount,
        thumbnail: `/assets/booksImages/15.jpg`,
        language,
        listPrice: {
            amount,
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        },
        reviews: []
    }
}

function getDefaultFilter() {
    return { txt: '', minPrice: 0, isOnSale: false }
}

function _createBooks() {
    if (!utilService.loadFromStorage(BOOK_KEY) || utilService.loadFromStorage(BOOK_KEY).length === 0) {
        const books = _createDemoBooks()
        console.log('books', books)

        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createDemoBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(1)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `/BooksImages/${i + 1}.jpg`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
    }
    return books
}
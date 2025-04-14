import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter
}


function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                // books = books.filter(car => regExp.test(car.vendor))
            }
            if (filterBy.minSpeed) {
                // books = books.filter(car => car.speed >= filterBy.minSpeed)
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

function getEmptyBook(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}

function _createBooks() { 
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
            thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`, 
            language: "en", 
            listPrice: { 
                amount: utilService.getRandomIntInclusive(80, 500), 
                currencyCode: "EUR", 
                isOnSale: Math.random() > 0.7 
            } 
        } 
        books.push(book) 
    } 
    console.log('books', books) 
} 

// function _createCar(vendor, speed = 250) {
//     const car = getEmptyBook(vendor, speed)
//     car.id = makeId()
//     return car
// }
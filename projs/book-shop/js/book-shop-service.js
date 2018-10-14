'use strict';

const PAGE_SIZE = 5;
var gBooks;
var gCurrPageNo = 0;

function createBooks() {
    gBooks = [
        createBook('Learning JS', 18, 'https://d2sis3lil8ndrq.cloudfront.net/books/f98a63ff-4e07-41cd-b6f7-4e3b1fbadf82.png'),
        createBook('Learning CSS', 20, 'https://www.cssmine.com/assets/img/content/dest/large/cssmine-ebook-cover-3d.png'),
        createBook('Learning HTML', 15, 'http://vitworks.com/wp-content/uploads/2012/04/html5-book.png'),
        createBook('Learning C++', 17, 'https://isocpp.org/files/img/C++StanadardLibraryReference.png')
    ]
}

function createBook(title, price, imgUrl) {
    return {
        id: makeId(),
        title: title,
        price: price,
        imgUrl: imgUrl,
        rate: 0
    }
}

function getBooks() {
    var fromBookIdx = gCurrPageNo * PAGE_SIZE;
    return gBooks.slice(fromBookIdx, fromBookIdx + PAGE_SIZE);
}

function getBookById(bookId) {
    return gBooks.find(function(book){
        return book.id === bookId;
    })
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks.splice(bookIdx, 1)
}

function addBook(title, price, imgUrl){
    debugger
    var newBook = createBook(title, price, imgUrl)
    gBooks.push(newBook);
}

function updateBookPrice(bookId, bookPrice){
    var bookIdx = gBooks.findIndex(function(book){
        return book.id === bookId;
    })
    gBooks[bookIdx].price = bookPrice;
}

function updateRateBook(bookId,rateInput){
   var currBook= getBookById(bookId)
   currBook.rate = rateInput;
}
// TODO: go prev page
function goNextPage() {
    gCurrPageNo++;
}




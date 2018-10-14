'use strict';


function init() {
    createBooks();
    render();
}

function render() {
    var books = getBooks();
    console.log('Books', books);

    var strHtmls = books.map(function (book) {
        var strHtml = `
        <tr>
        <td> ${book.id}</td>
        <td class = "font-weight-bold">`
        // if no imgUrl put &nbsp insted
        if (book.imgUrl !== undefined) {
            strHtml += `<img src=${book.imgUrl} alt="img" width="30px">`
        }
        else strHtml += ` &nbsp  &nbsp  &nbsp &nbsp`

        strHtml += ` 
        &nbsp ${book.title}</td>
        <td>${book.price}$</td>
        <td>${book.rate}</td>
        <td>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#book-details-modal" 
        onclick= "onReadBook('${book.id}')"  data-trans="read">
        read
      </button>
      <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#update-modal" 
      onclick= "readAndUpdateBook('${book.id}')"  data-trans="update">
      Update
    </button>
    <button type="button" class="btn btn-danger" 
    onclick = "onDeleteBook('${book.id}')" data-trans="delete">Delete</button>
        </td>
    </tr>
        `
        return strHtml
    });
    $('.books-table').html(strHtmls.join(''))
    doTrans();

}

function onDeleteBook(bookId) {
    if (!confirm(getTrans('sure'))) return;
    deleteBook(bookId);
    render();
}

function readAndAddNewBook() {
    debugger
    var title = $('.input-add-title').val();
    if (title === null || title === '') return;
    var price =  $('.input-add-price').val();
    var imgUrl =  $('.input-add-img-url').val();
    addBook(title, price);
    render();
}

function readAndUpdateBook(bookId) {
    var book = getBookById(bookId);
    $('#update-modal-title').text(book.title);
    $('.modal-inside').html(`<img src=\" ${book.imgUrl} \" alt="img" width="100px" ><span data-trans= "price"> Price </span>: <span>${book.price}$</span>`)
    $('.update-details-modal-button').html(`
    <button type="button" class="btn btn-primary" onclick="onSaveUpdatePrice('${book.id}')" 
    data-dismiss="modal" data-trans="saveAndClose">Save and close</button>`)
    doTrans();
}

function onSaveUpdatePrice (bookId){
    var bookPrice = +($('.input-price').val())
    if (isNaN(bookPrice)) return alert(getTrans('priceAlert'));
    updateBookPrice(bookId,bookPrice);
    render();
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    $('#book-details-modal-title').text(book.title);
    $('.modal-img').html(`<img src=\" ${book.imgUrl} \" alt="img" width="100px" ><span data-trans= "price"> Price </span>: <span> ${book.price} $</span> `)
    $('.input-rate').val(book.rate)
    $('.books-details-modal-button').html(`
    <button type="button" class="btn btn-primary" onclick="onSaveUpdateRate('${book.id}')"  data-dismiss="modal" data-trans = "saveAndClose">Save and close</button>`)
    doTrans();
}


function onRateBtnMinus() {
    var currVal = +($('.input-rate').val())
    if (currVal < 1) return
    else $('.input-rate').val(currVal - 1)
}

function onRateBtnPlus() {
    var currVal = +($('.input-rate').val())
    if (currVal > 9) return
    else $('.input-rate').val(currVal + 1)
}

function onSaveUpdateRate(bookId) {
    var rateInput = +($('.input-rate').val())
    if (rateInput < 0 || rateInput >= 10) return alert(getTrans('rateAlert'));
    updateRateBook(bookId, rateInput)
    render();
}

function onSetLang(lang) {
    setLang(lang);
    render();
}

function onNextPage() {
    goNextPage()
    renderCars();
}
// TODO: on prev page

// TODO: on clicked page






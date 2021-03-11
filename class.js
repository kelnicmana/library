//main notes, read/unread now properly set upon creation and can be toggled in the ui but need to be saved in local storage upon changing

// Book Class
    class Book {
        constructor(_title, _author, _status) {
            this.title = _title;
            this.author = _author;
            this.status= _status;
        }
    }

// UI Class
    class UI {
        static displayBooks() {
            
            const books = Store.getBooks();
            books.forEach((book) => UI.addBookToList(book));
        }

        static addBookToList(book) {
            let statusButton;
            if (book.status === "0") {
                statusButton = `<div class="btn btn-success btn-sm status py-0 px-2">Read</div>`
            }
            else if (book.status === "1") {
                statusButton = `<div class="btn btn-outline-secondary btn-sm status py-0 px-2 line">Read</div>`
            }
            const list = document.querySelector('.tbody');

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            
            <td>${statusButton}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete py-0 px-2">X</a></td>
            `;

            list.appendChild(row);
        }
        static toggleStatus(element) {
            if(element.classList.contains('btn-success')) {
                element.classList.remove('btn-success');
                element.classList.add('btn-outline-secondary', 'line');
            }
            else if(element.classList.contains('btn-outline-secondary')) {
                element.classList.remove('btn-outline-secondary', 'line');
                element.classList.add('btn-success');
                element.innerHTML = "Read";
            }
        }

        static deleteBook(element) {
            if(element.classList.contains('delete')) {
                element.parentElement.parentElement.remove();
                
                UI.showAlert('Book Deleted', 'dark');
            }
        }

        static showAlert(text, className) {
            const div = document.createElement('div');
            div.className = `alert alert-${className}`;
            div.appendChild(document.createTextNode(text));
            const container = document.querySelector('.container');
            const table = document.querySelector('#table');
            container.insertBefore(div, table);
            setTimeout(() => document.querySelector('.alert').remove(), 3000);
        }

        static clearFields() {
            document.querySelector('.title').value = '';
            document.querySelector('.author').value = '';
            document.querySelector('select').selectedIndex = 0;
        }
    }
// Store Class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    } 

    /// need to create the functions that will call this with datakey(should be attached to button) and statusButton(should target the currently selected button to toggle) and status set to 0 or 1 for read or unread.
    // static toggleStatusLocal(datakey, selectVal, status) {
    //     const books = Store.getBooks();
    //     books.forEach((book, index) => {
    //         if(book[index] === datakey) {
    //             selectVal.selectedIndex = status;
    //         }
    //     });
    // }

    static removeBook(title) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.title === title) {
            books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    //Get form values
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const status = document.getElementById('status').value;

    // validate
    if(title === '' || author === '' || status === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    }
    else {

        // add new book object
        const book = new Book(title, author, status);
        console.log(book);
        
        // add book to UI
        UI.addBookToList(book);
        // add book to local storage
        Store.addBook(book);
        UI.showAlert('Book Added', 'success');

        // clear fields
        UI.clearFields();
    }
});

// toggle status
document.querySelector('.tbody').addEventListener('click', (e) => {
    UI.toggleStatus(e.target)
});

// Event: Remove a Book
document.querySelector('.tbody').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});

// if (document.querySelector('select').selectedIndex = 0) {
//     return `<div class="btn btn-success btn-sm status py-0 px-2">Read</div>`
// }
// else {
//     return `<div class="btn btn-outline-secondary btn-sm status py-0 px-2 line">Read</div>`
// }
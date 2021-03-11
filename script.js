class Book {
    constructor(_title, _author, _status) {
        this.title = _title;
        this.author = _author;
        this.status= _status;
    }
}
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
        }
        Store.toggleStatus(element.parentElement.previousElementSibling.previousElementSibling.textContent);
    }
    static deleteBook(element) {
        if(element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
            
            UI.showAlert('Book Deleted', 'dark');
            Store.removeBook(element.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        }
    }
    static showAlert(text, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(text));
        if (className === "danger") {
            const cardBody = document.querySelector(".card-body");
            const bookForm = document.querySelector("#book-form");
            cardBody.insertBefore(div, bookForm);
        }
        else {
            const container = document.querySelector('#table-container');
            const table = document.querySelector('#table');
            container.insertBefore(div, table);
        }
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static clearFields() {
        document.querySelector('.title').value = '';
        document.querySelector('.author').value = '';
        document.querySelector('select').selectedIndex = 0;
    }
}
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

    static toggleStatus(title) {
        const books = Store.getBooks();
        books.forEach((book) => {
            if(book.title === title) {
                (book.status === '1') ? book.status = '0' : book.status = '1';
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }


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

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const status = document.getElementById('status').value;
    
    if(title === '' || author === '' || status === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    }
    else {
        const book = new Book(title, author, status);
        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert('Book Added', 'success');
        UI.clearFields();
        togglePopUp();
    }
});

document.querySelector('.tbody').addEventListener('click', (e) => {
    UI.toggleStatus(e.target);
});

document.querySelector('.tbody').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
});

function togglePopUp() {
    if (document.querySelector('#popUp').classList.contains("show")) {
        document.querySelector('#popUp').classList.remove("show");
        }
    else {
        document.querySelector('#popUp').classList.add("show");
    }
}

document.querySelector('#plus').addEventListener('click', () => {
    togglePopUp();
})
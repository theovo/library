let myLibrary = [];

class Book {
    constructor(t, a, p, s) {
        this.title = t;
        this.author = a;
        this.pages = p;
        this.status = s;
    }
}



const tbody = document.querySelector('tbody');
const add = document.querySelector('button');

add.addEventListener('click', addBookToLibrary);

function addBookToLibrary(e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const status = document.querySelector('#read').checked;

    const obj = new Book(title, author, pages, status);
    myLibrary.push(obj);

    const row = document.createElement('tr');
    row.id = title;

    const cell1 = document.createElement('td');
    cell1.innerText = obj.title;
    row.append(cell1);

    const cell2 = document.createElement('td');
    cell2.innerText = obj.author;
    row.append(cell2);

    const cell3 = document.createElement('td');
    cell3.innerText = obj.pages;
    row.append(cell3);

    const cell4 = document.createElement('td');
    const select = document.createElement('select');
    select.id = 'status';

    const option1 = document.createElement('option');
    option1.textContent = 'Unread';
    option1.setAttribute('value', 'unread');

    const option2 = document.createElement('option');
    option2.textContent = 'Read';
    option2.setAttribute('value', 'read');

    if (obj.status === 'Read') {
        option2.setAttribute('selected', '');
    } else {
        option1.setAttribute('selected', '');
    }

    select.append(option1);
    select.append(option2);

    cell4.append(select);
    row.append(cell4);

    const remove = document.createElement('button');
    remove.id = 'remove';
    remove.textContent = 'x';
    row.append(remove);

    tbody.append(row);
}



tbody.addEventListener('change', changeStatus);

function changeStatus(e) {

    if (e.target.id === 'status') {
        const title = e.target.parentElement.id;

        library = library.map(changeStatus);

        function changeStatus(ele) {
            if (ele.title === title) {
                ele.status = e.target.value;
            } return ele;
        }
    }

    if (e.target.value === 'unread') {
        e.target.children[0].setAttribute('selected');
        e.target.children[1].removeAttribute('selected');
    } else {
        e.target.children[0].removeAttribute('selected');
        e.target.children[1].setAttribute('selected');
    }
}



tbody.addEventListener('click', removeBookFromLibrary);

function removeBookFromLibrary(e) {
    if (e.target.id === 'remove') {
        const title = e.target.parentElement.id;
        myLibrary = myLibrary.filter((ele) => ele.title !== title);

        e.target.parentElement.remove();
    }
}
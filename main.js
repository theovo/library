const library = [];

class Book {
  constructor(title, author, pages, status, uuid) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.uuid = uuid;
  }
}

console.table(library);

// in the form, click "read" or "unread" to change the status of a new book
const statusButton = document.querySelector('input.status');
statusButton.addEventListener('click', changeStatus);

function changeStatus(e) {
  if (e.target.value === 'Unread') e.target.value = 'Read';
  else e.target.value = 'Unread';
}

// in the form, click "add" to add a new book
const addButton = document.querySelector('button.add');
addButton.addEventListener('click', addBookToLibrary);

function addBookToLibrary(e) {
  e.preventDefault();

  // get all the DOM inputs from the form
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const status = document.querySelector('#status');

  // create a unique random uuid
  const uuid = crypto.randomUUID();

  // create a new book and add it to the library
  const book = new Book(title.value, author.value, pages.value, status.value, uuid);
  library.push(book);

  // clear the form
  title.value = '';
  author.value = '';
  pages.value = '';
  status.value = 'Unread';

  showLibrary(uuid, book);
}

function showLibrary(uuid, book) {
  // create DOM elements for the new book
  const list = document.createElement('ul');
  list.dataset.uuid = uuid;

  const title = document.createElement('li');
  title.className = 'title';
  title.textContent = book.title;
  list.append(title);

  const author = document.createElement('li');
  author.className = 'author';
  author.textContent = book.author;
  list.append(author);

  const pages = document.createElement('li');
  pages.className = 'pages';
  pages.textContent = book.pages;
  list.append(pages);

  const status = document.createElement('li');
  status.className = 'status border centered';
  status.textContent = book.status;
  list.append(status);

  const removeButton = document.createElement('button');
  removeButton.className = 'remove';
  removeButton.textContent = '-';
  list.append(removeButton);

  const section = document.querySelector('section');
  section.append(list);

  console.log('Added a new book.', book);
  console.table(library);
}

// in the library, select "read" or "unread" to update the status of a book
const section = document.querySelector('section');
section.addEventListener('click', updateStatus);

function updateStatus(e) {
  if (e.target.className === 'status border centered') {

    if (e.target.textContent === 'Unread') e.target.textContent = 'Read';
    else e.target.textContent = 'Unread';

    // get the uuid of the parent element and update the corresponding book in the library
    const book = library.find(currentBook => currentBook.uuid === e.target.parentElement.dataset.uuid);
    book.status = e.target.textContent;

    console.log('Updated the status of a book.', book);
  }
}

// in the library, click "x" to remove a book
section.addEventListener('click', removeBookFromLibrary);

function removeBookFromLibrary(e) {
  if (e.target.className === 'remove') {
    // get the uuid of the parent element and remove the corresponding book from the library
    const index = library.findIndex(currentBook => currentBook.uuid === e.target.parentElement.dataset.uuid);
    library.splice(index, 1);

    // remove the parent element
    e.target.parentElement.remove();

    console.log('Removed a book.');
    console.table(library);
  };
}


let currentRole = "user";

let books = [

    {
        id: 1,
        title: "1984",
        author: "Джордж Оруэлл",
        category: "Фантастика",
        year: 1949,
        price: 15,
        available: true
    },

    {
        id: 2,
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        category: "Роман",
        year: 1967,
        price: 20,
        available: true
    },

    {
        id: 3,
        title: "Шерлок Холмс",
        author: "Артур Конан Дойл",
        category: "Детектив",
        year: 1892,
        price: 10,
        available: true
    }
];


// Авторизация
function login() {

    const username = document.getElementById("username").value;

    currentRole = document.getElementById("role").value;

    alert("Добро пожаловать, " + username);

    if (currentRole === "admin") {
        document.querySelector(".admin-panel").classList.remove("hidden");
    } else {
        document.querySelector(".admin-panel").classList.add("hidden");
    }

    showBooks(books);
}


// Показ книг
function showBooks(bookList) {

    const booksDiv = document.getElementById("books");

    booksDiv.innerHTML = "";

    bookList.forEach(book => {

        const div = document.createElement("div");

        div.classList.add("book");

        div.innerHTML = `
            <h3>${book.title}</h3>

            <p><b>Автор:</b> ${book.author}</p>

            <p><b>Категория:</b> ${book.category}</p>

            <p><b>Год:</b> ${book.year}</p>

            <p><b>Цена:</b> ${book.price}$</p>

            <p><b>Статус:</b> 
                ${book.available ? "Доступна" : "Недоступна"}
            </p>

            <button onclick="buyBook(${book.id})">
                Купить
            </button>

            <button onclick="rentBook(${book.id}, '2 недели')">
                Аренда 2 недели
            </button>

            <button onclick="rentBook(${book.id}, '1 месяц')">
                Аренда 1 месяц
            </button>

            <button onclick="rentBook(${book.id}, '3 месяца')">
                Аренда 3 месяца
            </button>

            ${
                currentRole === "admin"
                ?
                `
                <button onclick="deleteBook(${book.id})">
                    Удалить
                </button>

                <button onclick="changeAvailability(${book.id})">
                    Изменить статус
                </button>
                `
                :
                ""
            }
        `;

        booksDiv.appendChild(div);
    });
}


// Сортировка и фильтрация
function filterBooks() {

    const author = document
        .getElementById("searchAuthor")
        .value
        .toLowerCase();

    const category = document
        .getElementById("categoryFilter")
        .value;

    const year = document
        .getElementById("yearFilter")
        .value;

    const filtered = books.filter(book => {

        return (
            (author === "" || book.author.toLowerCase().includes(author))
            &&
            (category === "" || book.category === category)
            &&
            (year === "" || book.year == year)
        );
    });

    showBooks(filtered);
}


// Покупка книги
function buyBook(id) {

    const book = books.find(book => book.id === id);

    if (!book.available) {
        alert("Книга недоступна");
        return;
    }

    alert("Вы купили книгу: " + book.title);
}


// Аренда книги
function rentBook(id, period) {

    const book = books.find(book => book.id === id);

    if (!book.available) {
        alert("Книга недоступна");
        return;
    }

    alert(
        "Вы арендовали книгу \"" +
        book.title +
        "\" на срок: " +
        period
    );

    // Автоматическое напоминание
    setTimeout(() => {

        alert(
            "Срок аренды книги \"" +
            book.title +
            "\" скоро заканчивается!"
        );

    }, 5000);
}


// Добавление книги
function addBook() {

    const title = document.getElementById("bookTitle").value;

    const author = document.getElementById("bookAuthor").value;

    const category = document.getElementById("bookCategory").value;

    const year = document.getElementById("bookYear").value;

    const price = document.getElementById("bookPrice").value;

    books.push({
        id: Date.now(),
        title,
        author,
        category,
        year,
        price,
        available: true
    });

    showBooks(books);

    alert("Книга добавлена");
}


// Удаление книги
function deleteBook(id) {

    books = books.filter(book => book.id !== id);

    showBooks(books);
}


// Изменение доступности
function changeAvailability(id) {

    const book = books.find(book => book.id === id);

    book.available = !book.available;

    showBooks(books);
}


// Запуск
showBooks(books);

let currentUser = "";

let travels = [];


// Регистрация пользователя
function registerUser() {

    const username = document.getElementById("username").value;

    if (username === "") {
        alert("Введите имя");
        return;
    }

    currentUser = username;

    alert("Добро пожаловать, " + currentUser);
}


// Добавление путешествия
function addTravel() {

    if (currentUser === "") {
        alert("Сначала зарегистрируйтесь");
        return;
    }

    const place = document.getElementById("place").value;

    const geo = document.getElementById("geo").value;

    const cost = document.getElementById("cost").value;

    const heritage = document.getElementById("heritage").value;

    const description = document.getElementById("description").value;

    const image = document.getElementById("image").value;

    const travel = {
        user: currentUser,
        place,
        geo,
        cost,
        heritage,
        description,
        image
    };

    travels.push(travel);

    showTravels();

    alert("Путешествие добавлено");
}


// Отображение путешествий
function showTravels() {

    const travelsDiv = document.getElementById("travels");

    travelsDiv.innerHTML = "";

    travels.forEach(travel => {

        const div = document.createElement("div");

        div.classList.add("travel");

        div.innerHTML = `
            <h3>${travel.place}</h3>

            <p><b>Пользователь:</b> ${travel.user}</p>

            <p><b>Геопозиция:</b> ${travel.geo}</p>

            <p><b>Стоимость:</b> ${travel.cost}$</p>

            <p><b>Культурные места:</b> ${travel.heritage}</p>

            <p>${travel.description}</p>

            <img src="${travel.image}" alt="Изображение">
        `;

        travelsDiv.appendChild(div);
    });
}

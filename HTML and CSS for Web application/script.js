let users = [];
let currentUser = null;
let posts = [];
let subscriptions = {};


// Регистрация
function register() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    const userExists = users.find(user => user.username === username);

    if (userExists) {
        alert("Пользователь уже существует");
        return;
    }

    users.push({
        username,
        password
    });

    alert("Регистрация успешна");
}


// Вход
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find(
        user => user.username === username && user.password === password
    );

    if (!user) {
        alert("Неверный логин или пароль");
        return;
    }

    currentUser = username;

    alert("Вход выполнен");
}


// Создание поста
function createPost() {

    if (!currentUser) {
        alert("Сначала войдите");
        return;
    }

    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    const tags = document.getElementById("postTags").value.split(",");
    const visibility = document.getElementById("postVisibility").value;

    const post = {
        id: Date.now(),
        author: currentUser,
        title,
        content,
        tags,
        visibility,
        comments: []
    };

    posts.push(post);

    alert("Пост создан");

    showPosts();
}


// Подписка
function subscribe() {

    if (!currentUser) {
        alert("Войдите в систему");
        return;
    }

    const username = document.getElementById("subscribeUser").value;

    if (!subscriptions[currentUser]) {
        subscriptions[currentUser] = [];
    }

    subscriptions[currentUser].push(username);

    alert("Подписка оформлена");
}


// Показ постов
function showPosts() {

    const postsDiv = document.getElementById("posts");

    postsDiv.innerHTML = "";

    let filteredPosts = posts;

    // Лента по подпискам
    if (currentUser && subscriptions[currentUser]) {

        filteredPosts = posts.filter(post =>
            subscriptions[currentUser].includes(post.author)
            || post.author === currentUser
        );
    }

    filteredPosts.forEach(post => {

        if (post.visibility === "private" && post.author !== currentUser) {
            return;
        }

        const postElement = document.createElement("div");

        postElement.classList.add("post");

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>Автор: ${post.author}</small><br>
            <small>Теги: ${post.tags.join(", ")}</small><br>

            <input type="text" id="comment-${post.id}" placeholder="Комментарий">

            <button onclick="addComment(${post.id})">
                Комментировать
            </button>

            <button onclick="editPost(${post.id})">
                Редактировать
            </button>

            <button onclick="deletePost(${post.id})">
                Удалить
            </button>

            <div id="comments-${post.id}"></div>
        `;

        postsDiv.appendChild(postElement);

        showComments(post.id);
    });
}


// Комментарии
function addComment(postId) {

    const commentInput = document.getElementById(`comment-${postId}`);

    const text = commentInput.value;

    const post = posts.find(p => p.id === postId);

    post.comments.push({
        user: currentUser,
        text
    });

    showComments(postId);
}


// Показ комментариев
function showComments(postId) {

    const commentsDiv = document.getElementById(`comments-${postId}`);

    const post = posts.find(p => p.id === postId);

    commentsDiv.innerHTML = "<h4>Комментарии:</h4>";

    post.comments.forEach(comment => {

        commentsDiv.innerHTML += `
            <p><b>${comment.user}:</b> ${comment.text}</p>
        `;
    });
}


// Редактирование поста
function editPost(postId) {

    const post = posts.find(p => p.id === postId);

    if (post.author !== currentUser) {
        alert("Вы не автор поста");
        return;
    }

    const newContent = prompt("Новый текст", post.content);

    post.content = newContent;

    showPosts();
}


// Удаление поста
function deletePost(postId) {

    const post = posts.find(p => p.id === postId);

    if (post.author !== currentUser) {
        alert("Вы не автор поста");
        return;
    }

    posts = posts.filter(p => p.id !== postId);

    showPosts();
}

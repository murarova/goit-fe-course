/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const getUsers = document.querySelector(".get-users");
const getById = document.querySelector(".get-byId-users");
const addUsers = document.querySelector(".add-users");
const removeUsers = document.querySelector(".remove-byId-users");
const updateUserInfo = document.querySelector(".update-users");

const inputById = document.querySelector("#get-byId-input");
const inputUserName = document.querySelector("#user-name");
const inputUserAge = document.querySelector("#user-age");
const inputRemove = document.querySelector("#remove-byId-input");
const inputUpdateId = document.querySelector("#user-id");
const inputUpdateName = document.querySelector("#update-name");
const inputUpdateAge = document.querySelector("#update-age");

const result = document.querySelector(".result");
const URL = "https://test-users-api.herokuapp.com/users/";

function getAllUsers(e) {
	e.preventDefault();
	return fetch(URL)
		.then(response => {
			if (response.ok) return response.json();

			throw new Error(`Error: ${response.statusText}`);
		})
		.then(data => data.data)
		.then(arr => updateIF(arr))
		.catch(err => console.log(err));
}

function updateIF(arr) {
	let n = 0;
	let markUp = arr.reduce(
		(acc, el) =>
			acc +
			`
  <tr>
  <td>${(n += 1)}</td>
  <td>${el.id}</td>
  <td>${el.name}</td>
  <td>${el.age}</td>
  </tr>
  `,
		`<th>N</th><th>ID</th><th>Name</th><th>Age</th>`
	);

	result.innerHTML = markUp;
}

function getUserById(e) {
	e.preventDefault();

	return fetch(`${URL + inputById.value}`)
		.then(response => {
			if (response.ok) return response.json();

			throw new Error(`Error: ${response.statusText}`);
		})
		.then(data => data.data)
		.then(obj => updateIFObj(obj))
		.catch(err => console.log(err));
}

function updateIFObj(obj) {
	let n = 0;
	result.innerHTML = `
  <th>N</th>
  <th>ID</th>
  <th>Name</th>
  <th>Age</th>

  <tr>
    <td>${(n += 1)}</td>
    <td>${obj.id}</td>
    <td>${obj.name}</td>
    <td>${obj.age}</td>
  </tr>
  `;
	getById.reset();
}

function addUser(e) {
	e.preventDefault();

	let newPost = {
		name: `${inputUserName.value}`,
		age: `${inputUserAge.value}`
	};

	fetch(URL, {
		method: "POST",
		body: JSON.stringify(newPost),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(data => data.json())
		.then(res => console.log(res));

	addUsers.reset();
}

function removeUser(e) {
	e.preventDefault();

	fetch(`${URL + inputRemove.value}`, {
		method: "DELETE"
	})
		.then(response => {
			if (response.ok) return response.json();

			throw new Error(`Error: ${response.statusText}`);
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));
	removeUsers.reset();
}

function updateUser(e) {
	e.preventDefault();

	let updateUserData = {
		name: `${inputUpdateName.value}`,
		age: `${inputUpdateAge.value}`
	};

	fetch(`${URL + inputUpdateId.value}`, {
		method: "PUT",
		body: JSON.stringify(updateUserData),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(data => data.json())
		.then(res => console.log(res));

	updateUserInfo.reset();
}

getUsers.addEventListener("submit", getAllUsers);
getById.addEventListener("submit", getUserById);
addUsers.addEventListener("submit", addUser);
removeUsers.addEventListener("submit", removeUser);
updateUserInfo.addEventListener("submit", updateUser);

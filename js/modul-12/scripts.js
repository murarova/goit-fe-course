/* 
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок. 
  
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
      
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
          
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике 
      на кнопку происходит удаление.
      
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
      
  🔔 Оформление интерфейса произвольное
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходи проверка 
      на валидность введенной ссылки: если был введен невалидный url то должно всплывать 
      диалоговое окно, оповещающее пользователя о том, что это невалидный url. Используйте
      регулярные выражения для валидации url.
          
    - Каждая карточка содержит превью изображение и базовую информацию о странице по адресу закладки,
      для получения этой информации воспользуйтесь этим Rest API - https://www.linkpreview.net/
*/

const sourse = document.querySelector(".template").innerHTML.trim();
const template = Handlebars.compile(sourse);
const cardList = document.querySelector(".card-list");
const input = document.querySelector("#input");
const form = document.querySelector(".form");
const URL =
  "https://api.linkpreview.net/?key=5c90e99e4c39368cdd7cf8954323ce3a4329051385e2c&q=";


let linksArr = [];

const LOCALSTORAGE = (w => {
  if (!w) return;

  const isActive = "localStorage" in w;

  const get = key => {
    try {
      const serializedState = localStorage.getItem(key);

      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
      console.error("Get state error: ", err);
    }
  };

  const set = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error("Set state error: ", err);
    }
  };
  const remove = key => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Remove state error: ", err);
    }
  };

  const publicAPI = {
    isActive,
    get,
    set,
    remove
  };

  return publicAPI;
})(window);


(function preload() {
  if (LOCALSTORAGE.get("linksArr") === undefined) return;
  linksArr = LOCALSTORAGE.get("linksArr");
  getLinkinfo(linksArr);
})();

function handleClick(e) {
  e.preventDefault();

  cardList.innerHTML = "";

      if (!linksArr.includes(input.value)) {
        linksArr.push(input.value);
        LOCALSTORAGE.set("linksArr", linksArr);
      } else {
        alert("This link is in the list of bookmarks alredy");
        return;
      }

  getLinkinfo(linksArr);
  form.reset();
}

function getLinkinfo(linksArr) {
  linksArr.forEach(el => {
    fetch(`${URL}${el}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Error fetching data");
      })
      .then(data => makeMarkUp(data))
      .catch(err => console.log(err));
    // makeMarkUp(el);
  });
}

// function makeCard(arr) {

//     arr.reduce( )

//     <li class="card-item">
//         <div class="card">
//             <div class="img-cover">
//                 <img class="img" src="{{image}}" alt="">
//             </div>
//             <a href="{{url}}" class="link">{{title}}</a>
//             <p class="desc">{{description}}</p>
//             <button class="button">Delete</button>
//         </div>
//     </li>
// }

function makeMarkUp(data) {
  let linksInfo = [];
  linksInfo.push(data);
  let markUp = linksInfo.reduce((acc, obj) => acc + template(obj), "");
  cardList.insertAdjacentHTML("afterbegin", markUp);
}

function deleteLink(e) {
  let a = e.target.previousElementSibling.previousElementSibling.href;
  linksArr.splice(linksArr.indexOf(a), 1);
  LOCALSTORAGE.set("linksArr", linksArr);

  cardList.innerHTML = "";

  getLinkinfo(linksArr);
}

cardList.addEventListener("click", deleteLink);
form.addEventListener("submit", handleClick);

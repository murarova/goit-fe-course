/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">

        <div class="fullview">
            <img src="img/fullview-1.jpeg" alt="alt text 1">
        </div>

        <ul class="preview">
            <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
            <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
            <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
        </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

const galleryItems = [
  {
    preview: "img/preview-2.jpeg",
    fullview: "img/fullview-2.jpeg",
    alt: "alt text 2"
  },
  {
    preview: "img/preview-4.jpeg",
    fullview: "img/fullview-4.jpeg",
    alt: "alt text 4"
  },
  {
    preview: "img/preview-3.jpeg",
    fullview: "img/fullview-3.jpeg",
    alt: "alt text 3"
  },
  {
    preview: "img/preview-6.jpeg",
    fullview: "img/fullview-6.jpeg",
    alt: "alt text 6"
  }
];

class Gallery {
  constructor({ items, parentNode, defaultActiveItem }) {
    this.items = items;
    this.parentNode = parentNode;
    this.defaultActiveItem = defaultActiveItem;
    this.makeGalary();
  }

  makeGalary() {
    let li = "";
    for (const el of this.items) {
      let markup = `<li><img src=${el.preview} data-fullview=${
        el.fullview
      } alt=${el.alt}></li>`;
      li += markup;
    }

    const mainMarkup = `
    <div class="wrapper">
      <div class="fullview">
        <img src=${this.items[this.defaultActiveItem - 1].fullview} alt=${this.items[this.defaultActiveItem - 1].alt}>
      </div>
      <ul class="preview"> ${li}</ul>
    </div>`;

    this.parentNode.insertAdjacentHTML("afterbegin", mainMarkup);

    const preview = this.parentNode.querySelector(".preview");
    const fullview = this.parentNode.querySelector(".fullview");
    const liList = preview.querySelectorAll("li");

    function setFullview(e) {
      fullview.firstElementChild.setAttribute("src", e.target.dataset.fullview);

      liList.forEach(element => {
        if (element !== e.target.parentNode) {
          element.classList.remove("active");
        } else {
          element.classList.add("active");
        }
      });
    }

    preview.addEventListener("click", setFullview);
  }
}

const gallary = new Gallery({
  items: galleryItems,
  parentNode: document.querySelector(".image-gallery"),
  defaultActiveItem: 1
});

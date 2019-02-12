'use strict'

/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
	{
	  img: "https://placeimg.com/400/150/arch",
	  title: "Post title 1",
	  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
	  link: 'link-1.com'
	},
	{
	  img: "https://placeimg.com/400/150/nature",
	  title: "Post title 2",
	  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
	  link: 'link-2.com'
	},
	{
	  img: "https://placeimg.com/400/150/arch",
	  title: "Post title 3",
	  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
	  link: 'link-3.com'
	}
	];
	

	function createPostCard(post) {

		//select root
		let root = document.querySelector('.root');
		
		//create el
		let card = document.createElement('div');
		let cardImage = document.createElement('img');
        let cardBody = document.createElement('div');
        let cardTitle = document.createElement('h2');
        let cardText = document.createElement('p');
        let cardLink = document.createElement('a');

		//classes
		card.classList.add('card');
		cardImage.classList.add('card__image');
        cardBody.classList.add('card__body');
        cardTitle.classList.add('card_title');
        cardText.classList.add('card__text');
        cardLink.classList.add('card__link');

		//attributs
        cardImage.setAttribute('src', post.img);
        cardLink.setAttribute('href', '#');

        //textContent
        cardTitle.textContent = post.title;
        cardText.textContent = post.text;
        cardLink.textContent = post.link;

		//paste el to html
		root.append(card);
		card.append(cardImage);
        card.append(cardBody);
        cardBody.append(cardTitle);
        cardBody.append(cardText);
        cardBody.append(cardLink);
	}

    
    function createCards(posts) {
        posts.forEach(element => {
            createPostCard(element)
        });
    }

    createCards(posts);

/*
  Сеть фастфудов предлагает несколько видов гамбургеров.
  Основа (булочка) гамбургера может быть большой или маленькой (обязательно):
	- маленькая (+30 денег, +50 калорий)
	- большая (+50 денег, +100 калорий)
  Гамбургер может быть с одной из нескольких видов начинок (обязательно):
	- сыром (+15 денег, +20 калорий)
	- салатом (+20 денег, +5 калорий)
	- мясом (+35 денег, +15 калорий)
  Дополнительно, гамбургер можно:
	- посыпать приправой (+10 денег, +0 калорий)
	- полить соусом (+15 денег, +5 калорий)
  Напишите скрипт, расчитывающий стоимость и калорийность гамбургера. Используте ООП подход,
  создайте класс Hamburger, константы, методы для выбора опций и рассчета нужных величин.
  Написанный класс должен соответствовать следующему jsDoc описанию. То есть класс должен содержать
  указанные методы, которые принимают и возвращают данные указанного типа.
*/

/**
 * Класс, объекты которого описывают параметры гамбургера.
 */
class Hamburger {
	/**
	 * @constructor
	 * @param {String} size - Размер
	 * @param {String} stuffing - Начинка
	 */

	constructor(size, stuffing) {
		this._size = size;
		this._stuffing = stuffing;
		this._toppings = [];
	}

	/* SIZES */

	static get SIZE_SMALL() {
		return "SIZE_SMALL";
	}
	static get SIZE_LARGE() {
		return "SIZE_LARGE";
	}

	static get SIZES() {
		return {
			[Hamburger.SIZE_SMALL]: {
				price: 30,
				calories: 50
			},
			[Hamburger.SIZE_LARGE]: {
				price: 50,
				calories: 100
			}
		};
	}

	/* STUFFING */

	static get STUFFING_CHEESE() {
		return "STUFFING_CHEESE";
	}
	static get STUFFING_SALAD() {
		return "STUFFING_SALAD";
	}
	static get STUFFING_MEAT() {
		return "STUFFING_MEAT";
	}

	static get STUFFINGS() {
		return {
			[Hamburger.STUFFING_CHEESE]: {
				price: 15,
				calories: 20
			},
			[Hamburger.STUFFING_SALAD]: {
				price: 20,
				calories: 5
			},
			[Hamburger.STUFFING_MEAT]: {
				price: 35,
				calories: 15
			}
		};
	}

	/* TOPPINGS */

	static get TOPPING_SPICE() {
		return "TOPPING_SPICE";
	}
	static get TOPPING_SAUCE() {
		return "TOPPING_SAUCE";
	}

	static get TOPPINGS() {
		return {
			[Hamburger.TOPPING_SPICE]: {
				price: 10,
				calories: 0
			},
			[Hamburger.TOPPING_SAUCE]: {
				price: 15,
				calories: 5
			}
		};
	}

	/**
	 * Добавить topping к гамбургеру. Можно добавить несколько topping, при условии, что они разные.
	 * @param {String} topping - Тип добавки
	 */
	addTopping(topping) {
		if (!this._toppings.includes(topping)) {
			this._toppings.push(topping);
		}
	}

	/**
	 * Убрать topping, при условии, что она ранее была добавлена
	 * @param {String} topping - Тип добавки
	 */

	removeTopping(topping) {
		if (this._toppings.includes(topping)) {
			this._toppings = this._toppings.filter(el => el !== topping);
		}
	}

	/**
	 * Получить список toppings
	 * @returns {Array} - Массив добавленных topping, содержит значения констант Hamburger.TOPPING_*
	 *
	 * Попробуйте сделать это геттером чтобы можно было обращаться как obj.toppings и нам вернет массив добавок
	 */

	get toppings() {
		return this._toppings;
	}

	/**
	 * Узнать размер гамбургера
	 * @returns {String} - размер гамбургера
	 *
	 * Попробуйте сделать это геттером чтобы можно было обращаться как obj.size и нам вернет размер
	 */
	get size() {
		return this._size;
	}

	/**
	 * Узнать начинку гамбургера
	 * @returns {String} - начинка гамбургера
	 *
	 * Попробуйте сделать это геттером чтобы можно было обращаться как obj.stuffing и нам вернет начинку
	 */
	get stuffing() {
		return this._stuffing;
	}

	/**
	 * Узнать цену гамбургера
	 * @returns {Number} - Цена в деньгах
	 *
	 * Попробуйте сделать это геттером чтобы можно было обращаться как obj.price и нам вернет сумму.
	 */
	get price() {
		return (
			Hamburger.STUFFINGS[this.stuffing].price +
			Hamburger.SIZES[this.size].price +
			this.toppings.reduce(
				(acc, el) => acc + Hamburger.TOPPINGS[el].price,
				0
			)
		);
	}

	/**
	 * Узнать калорийность
	 * @returns {Number} - Калорийность в калориях
	 *
	 * Попробуйте сделать это геттером чтобы можно было обращаться как obj.calories и нам вернет сумму.
	 */
	get calculateCalories() {
		return (
			Hamburger.STUFFINGS[this.stuffing].calories +
			Hamburger.SIZES[this.size].calories +
			this.toppings.reduce(
				(acc, el) => acc + Hamburger.TOPPINGS[el].calories,
				0
			)
		);
	}
}

/* Вот как может выглядеть использование этого класса */

// Маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(
	Hamburger.SIZE_SMALL,
	Hamburger.STUFFING_CHEESE
);

// Добавка из приправы
hamburger.addTopping(Hamburger.TOPPING_SPICE);

// Спросим сколько там калорий
console.log("Calories: ", hamburger.calculateCalories);

// Сколько стоит?
console.log("Price: ", hamburger.price);

// Я тут передумал и решил добавить еще соус
hamburger.addTopping(Hamburger.TOPPING_SAUCE);

// А сколько теперь стоит?
console.log("Price with sauce: ", hamburger.price);

// Проверить, большой ли гамбургер?
console.log("Is hamburger large: ", hamburger.size === Hamburger.SIZE_LARGE); // -> false

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);

// Смотрим сколько добавок
console.log("Hamburger has %d toppings", hamburger.toppings.length); // 1

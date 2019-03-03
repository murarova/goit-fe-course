'use strict'

/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', (если кнопка активная, добавляем текст контент пауза и логику для стоп)
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.
  
  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.
  
  К примеру:
  
  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);
  
  Где parent* это существующий DOM-узел. 
*/

class Stopwatch {
  constructor(link) {
    this.link = link;
    this.isActive = false;
    this.startTime = null;
    this.timerID = null;
    this.pauseTime = null;
    this.delta = null;
    this.curentTime = null;
    this.ms = null;
    this.sec = null;
    this.min = null;
    this.arrLaps =[];
    this.length = null;
    this.html = '';
    this.li = '';
    this.createHtml(link);
    
    this.btnStart = document.querySelector(`.${this.link.className} .js-start`);
    this.btnStop = document.querySelector(`.${this.link.className}.js-stop`);
    this.timeInterface = document.querySelector(`.${this.link.className} .js-time`);
    this.btnReset = document.querySelector(`.${this.link.className} .js-reset`);
    this.btnLaps = document.querySelector(`.${this.link.className} .js-take-lap`);
    this.listLaps = document.querySelector(`.${this.link.className} .js-laps`);

    this.btnLaps.addEventListener('click', this.addLaps.bind(this));
    this.btnReset.addEventListener('click', this.reset.bind(this));
    this.btnStart.addEventListener('click', this.timer.bind(this));
  }

  createHtml(link) {
    this.html = `
    <div class="${this.link.className}">
        <p class="time js-time">00:00.0</p>
        <button class="btn js-start">Start</button>
        <button class="btn js-take-lap">Lap</button>
        <button class="btn js-reset" disabled>Reset</button>
      </div>
    <ul class="laps js-laps"></ul>
    `
    link.insertAdjacentHTML('afterbegin', this.html);
  }
  timer() {
    if(!this.isActive) {
      this.start();
    } else {
      this.stop();
    } 
  }
  start() {
    this.isActive = true;
    this.btnReset.removeAttribute('disabled');
    this.startTime = Date.now() - this.pauseTime;

    this.timerID = setInterval(() =>  {
      
      this.curentTime = Date.now();
      this.delta = new Date(this.curentTime - this.startTime);

      this.ms = Math.floor(this.delta.getMilliseconds()/100);
      this.sec = this.delta.getSeconds();
      this.min = this.delta.getMinutes();

      this.min = this.min < 10 ? '0' + this.min : this.min;
      this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
        
      this.timeInterface.textContent = `${this.min}:${this.sec}.${this.ms}`;
      this.pauseTime = this.delta;
    },100);
    this.btnStart.textContent = 'Pause';
  }
  stop() {
    this.isActive = false;
    this.btnStart.textContent = 'Continue';
    clearTimeout(this.timerID);
  }
  reset() {
  clearTimeout(this.timerID);
  this.isActive = false;
  this.startTime = null;
  this.pauseTime = null;
  this.btnStart.textContent ='Start';
  this.timeInterface.textContent = '00:0.0';
  this.btnReset.setAttribute('disabled','disabled');
  this.listLaps.innerHTML = `<ul class="laps js-laps"></ul>`;  
  }
  addLaps() {
    this.arrLaps.push(this.delta);
    this.length = this.arrLaps.length;

    this.ms = Math.floor(this.arrLaps[this.length-1].getMilliseconds()/100);
    this.sec = this.arrLaps[this.length-1].getSeconds();
    this.min = this.arrLaps[this.length-1].getMinutes();

    this.min = this.min < 10 ? '0' + this.min : this.min;
    this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
    this.li = `<li>${this.min}:${this.sec}.${this.ms}</li>`;
    this.listLaps.insertAdjacentHTML('afterbegin', this.li);
  }

}

const link2 = document.querySelector('.stopwatch2');
const stopwatch2 = new Stopwatch(link2);

const link3 = document.querySelector('.stopwatch3');
const stopwatch3 = new Stopwatch(link3);

const link4 = document.querySelector('.stopwatch4');
const stopwatch4 = new Stopwatch(link4);




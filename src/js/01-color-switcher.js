// import 'modern-normalize/modern-normalize.css';
// import '../sass/main.scss';

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let intervalId;

body.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  if (e.target === btnStart) {
    const timeout = 1000;

    intervalId = setInterval(() => {
      body.style = `background-color: ${getRandomHexColor()};`;
    }, timeout);

    btnStart.setAttribute('disabled', true);
  }

  if (e.target === btnStop) {
    clearInterval(intervalId);
    btnStart.removeAttribute('disabled');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Задание 1 - переключатель цветов
// В HTML есть кнопки Start и Stop.

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>
// Напиши скрипт, который после нажатия кнопки Start, раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку Stop, изменение цвета фона должно останавливаться.

// ⚠️ Учти, на кнопку Start можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка Start была не активна.

// Для генерации случайного цвета используй функцию getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

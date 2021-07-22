import 'modern-normalize/modern-normalize';
import '../sass/main.scss';
import Swal from 'sweetalert2';
import '../sass/timer.scss';

// import Tick from '@pqina/flip';
import '@pqina/flip/dist/flip.min.js';
import '@pqina/flip/dist/flip.min.css';

const refs = {
  input: document.querySelector('#date-selector'),
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),

  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),

  tickSS: document.querySelector('.tick[data-seconds]'),
};

let timerId = 0;
let diffInMS = 0;
let timezoneOffsetInMS = 0;
let targetTimeInMS = 0;

refs.startBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', onStart);
refs.input.addEventListener('input', onInput);

function onStart(e) {
  diffInMS = updateDiff();
  updateTimerInterface(diffInMS);
  timerId = setInterval(intervalCallback, 1000);
  refs.startBtn.setAttribute('disabled', true);
}

function onInput(e) {
  timezoneOffsetInMS = e.target.valueAsDate.getTimezoneOffset() * 60 * 1000;
  const selectedDateInUtcMS = e.target.valueAsDate.getTime();

  targetTimeInMS = selectedDateInUtcMS + timezoneOffsetInMS;

  diffInMS = updateDiff();

  if (diffInMS < 0) {
    Swal.fire({
      //https://sweetalert2.github.io/#download
      title: 'Error!',
      text: 'Please choose a date in the future',
      icon: 'error',
      confirmButtonText: 'Ok',
    });

    restartTimer(0);

    return;
  }

  restartTimer(diffInMS);
}

function restartTimer(newMS) {
  refs.startBtn.removeAttribute('disabled');
  clearInterval(timerId);
  timerId = 0;
  diffInMS = newMS;
  updateTimerInterface(newMS);
}

function intervalCallback() {
  if (diffInMS < 0) {
    restartTimer(0);
    return;
  }

  updateTimerInterface(diffInMS);

  diffInMS = updateDiff();
}

function updateTimerInterface(diffInMS) {
  refs.days.textContent = convertMs(diffInMS).days;
  refs.hours.textContent = convertMs(diffInMS).hours;
  refs.minutes.textContent = convertMs(diffInMS).minutes;
  refs.seconds.textContent = convertMs(diffInMS).seconds;

  // refs.tickDD.dataset.value = convertMs(diffInMS).days;
  // refs.tickHH.dataset.value = convertMs(diffInMS).hours;
  // refs.tickMM.dataset.value = convertMs(diffInMS).minutes;
  refs.tickSS.dataset.value = convertMs(diffInMS).seconds;
}

function updateDiff() {
  return targetTimeInMS - Date.now();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addPad(Math.floor(ms / day));
  // Remaining hours
  const hours = addPad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addPad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addPad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addPad(num) {
  return num.toString().padStart(2, '0');
}

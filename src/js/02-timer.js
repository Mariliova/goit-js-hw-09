import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  start: document.querySelector('[data-start]'),
  datetimePicker: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const DELAY = 1000;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseInput(selectedDates);
  },
};

refs.start.setAttribute('disabled', 'true');

flatpickr(refs.datetimePicker, options);

function onCloseInput(selectedDates) {
  if (selectedDates[0] <= options.defaultDate) {
    Notify.init({});
    Notify.failure('Please choose a date in the future');
    return;
  }

  refs.start.removeAttribute('disabled');
  const timerData = convertMs(selectedDates[0] - options.defaultDate);
  randerTimer(timerData);

  refs.start.addEventListener('click', () => {
    intervalId = setInterval(() => {
      const timerData = convertMs(selectedDates[0] - new Date());
      const dataToChack = randerTimer(timerData);
      const isToStop = checkIfStop(dataToChack);
      if (isToStop) {
        clearInterval(intervalId);
      }
    }, DELAY);
  });
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function randerTimer({ days, hours, minutes, seconds }) {
  refs.days.innerHTML = addLeadingZero(days);
  refs.hours.innerHTML = addLeadingZero(hours);
  refs.minutes.innerHTML = addLeadingZero(minutes);
  refs.seconds.innerHTML = addLeadingZero(seconds);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function checkIfStop({ days, hours, minutes, seconds }) {
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return true;
  }
}

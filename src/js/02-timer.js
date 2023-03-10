import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({});

const refs = {
  start: document.querySelector('[data-start]'),
  datetimePicker: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseInput(selectedDates);
  },
};

const DELAY = 1000;
let intervalId = null;
let selectedDate = null;

refs.start.addEventListener('click', onStartClisk);

refs.start.setAttribute('disabled', 'true');

flatpickr(refs.datetimePicker, options);

function onCloseInput(selectedDates) {
  selectedDate = selectedDates[0];

  if (selectedDate <= options.defaultDate) {
    Notify.failure('Please choose a date in the future');
    return;
  }

  refs.start.removeAttribute('disabled');
  const ms = selectedDate - options.defaultDate;
  buildTimer(ms);
}

function onStartClisk() {
  if (selectedDate <= new Date()) {
    Notify.failure(
      'Selected date has expired. Please choose a date in the future'
    );
    refs.start.setAttribute('disabled', 'true');
    const ms = 0;
    buildTimer(ms);
    return;
  }

  refs.start.setAttribute('disabled', 'true');
  refs.datetimePicker.setAttribute('disabled', 'true');

  intervalId = setInterval(() => {
    const ms = selectedDate - new Date();
    if (ms <= 1000) {
      refs.datetimePicker.removeAttribute('disabled');
      clearInterval(intervalId);
    }
    buildTimer(ms);
  }, DELAY);
}

function buildTimer(ms) {
  const timerData = convertMs(ms);
  randerTimer(timerData);
}

function randerTimer({ days, hours, minutes, seconds }) {
  refs.days.innerHTML = addLeadingZero(days);
  refs.hours.innerHTML = addLeadingZero(hours);
  refs.minutes.innerHTML = addLeadingZero(minutes);
  refs.seconds.innerHTML = addLeadingZero(seconds);
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

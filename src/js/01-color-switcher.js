const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body,
};

const DELAY = 1000;
let intervalId = null;

refs.stop.setAttribute('disabled', 'true');

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);

function onStartClick() {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
  refs.start.setAttribute('disabled', 'true');
  refs.stop.removeAttribute('disabled');
}

function onStopClick() {
  clearInterval(intervalId);
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

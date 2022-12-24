import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({});

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const { firstDelay, step, amount } = getValues(e);
  let delay = firstDelay;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(data => notifyOnSuccess(data))
      .catch(data => notifyOnFailure(data));
    delay += step;
  }
}

function getValues(e) {
  return {
    firstDelay: Number(e.currentTarget.elements.delay.value),
    step: Number(e.currentTarget.elements.step.value),
    amount: Number(e.currentTarget.elements.amount.value),
  };
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function notifyOnSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}

function notifyOnFailure({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}

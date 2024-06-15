import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const buttons = document.querySelectorAll('.button');

buttons.forEach((button) => {
  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      button.click();
    }
  });
});

const menuItems = document.querySelectorAll('.menu a');
const checkbox = document.getElementById('check');

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    menuItems.forEach((item) => {
      item.setAttribute('tabindex', '0');
    });
  } else {
    menuItems.forEach((item) => {
      item.setAttribute('tabindex', '-1');
    });
  }
});

const app = new App({
  button: document.querySelector('#drawer'),
  nav: document.querySelector('.navbar'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

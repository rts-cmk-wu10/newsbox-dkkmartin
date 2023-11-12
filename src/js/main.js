//@ts-check
// Import our custom CSS
import '../scss/styles.scss';

// Import needed of Bootstrap's JS
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/collapse';

// Import scripts
import Settings from './settings';
import Index from './index';

const settingsInputs = document.querySelectorAll('.settings__container > div > div > input');

Settings.run();
Index.run();

settingsInputs.forEach((input) => {
  input.addEventListener('click', () => {
    Index.run();
  });
});

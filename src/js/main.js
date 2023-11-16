//@ts-check
// Import our custom CSS
import '../scss/styles.scss'

// Import needed of Bootstrap's JS
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/collapse'

// Import scripts
import Settings from './settings'
import Accordion from './accordion'
import Archive from './archive'
import './theme'

const settingsInputs = document.querySelectorAll('.settings__container > div > div > input')

// Run settings, accordion and archive functions
Settings.run()
Accordion.run()
Archive.run()

// Update accordions shown if there is a change in settings
settingsInputs.forEach((input) => {
  input.addEventListener('click', () => {
    Accordion.accordionShower()
  })
})

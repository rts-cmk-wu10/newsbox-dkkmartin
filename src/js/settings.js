//@ts-check
import Storage from './storage';
export default class Settings {
  // Saves settings when inputs are clicked
  static settingsSaver() {
    const settingsInputs = document.querySelectorAll('.settings__container > div > div > input');
    const settingsArray = Storage.loadFromStorage('settings');
    settingsInputs.forEach((input) => {
      input.addEventListener('click', () => {
        settingsArray.forEach((obj) => {
          if (obj.name === input.id) {
            obj.checked = input.checked;
            Storage.saveToStorage('settings', settingsArray);
          }
        });
      });
    });
  }

  // Loads settings from localstorage
  // Create a default setting if no localstorage
  static settingsLoader() {
    if (!Storage.loadFromStorage('settings')) {
      const defaultSettings = [
        {
          name: 'flexSwitchCheckDefaultPopular',
          checked: false,
        },
        {
          name: 'flexSwitchCheckDefaultEuropa',
          checked: true,
        },
        {
          name: 'flexSwitchCheckDefaultHealth',
          checked: true,
        },
        {
          name: 'flexSwitchCheckDefaultSport',
          checked: true,
        },
        {
          name: 'flexSwitchCheckDefaultBusiness',
          checked: true,
        },
        {
          name: 'flexSwitchCheckDefaultTravel',
          checked: true,
        },
      ];
      Storage.saveToStorage('settings', defaultSettings);
    }
    const settingsArray = Storage.loadFromStorage('settings');
    settingsArray.forEach((obj) => {
      document.querySelector(`#${obj.name}`).checked = obj.checked;
    });
  }

  static run() {
    Settings.settingsLoader();
    Settings.settingsSaver();
  }
}

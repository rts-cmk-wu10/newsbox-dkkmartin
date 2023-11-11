//@ts-check
import Storage from './storage';
export default class Settings {
  static settingsSaver() {
    const settingsInputs = document.querySelectorAll('.settings__container > div > div > input');
    const settingsArray = [];
    settingsInputs.forEach((input) => {
      input.addEventListener('click', () => {
        let found = false;
        settingsArray.forEach((obj) => {
          if (obj.name === input.id) {
            obj.checked = input.checked;
            found = true;
          }
        });
        if (!found) {
          const newSetting = {
            name: input.id,
            checked: input.checked,
          };
          settingsArray.push(newSetting);
        }
        Storage.saveToStorage('settings', settingsArray);
      });
    });
  }

  static settingsLoader() {
    if (!Storage.loadFromStorage('settings')) {
      const defaultSettings = [
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
    const localSettingsArray = Storage.loadFromStorage('settings');
    localSettingsArray.forEach((obj) => {
      document.querySelector(`#${obj.name}`).checked = obj.checked;
    });
  }
}

Settings.settingsSaver();

window.addEventListener('DOMContentLoaded', Settings.settingsLoader);

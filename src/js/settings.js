//@ts-check

export function settingsSaver() {
  const settingsArray = [];
  const settingsInputs = document.querySelectorAll('.settings__container > div > div > input');
  settingsInputs.forEach((input) => {
    input.addEventListener('click', (e) => {
      console.log(settingsArray);
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
    });
  });
}

export function settingsLoader() {}

settingsSaver();

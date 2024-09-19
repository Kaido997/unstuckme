const options = document.querySelectorAll('input');
// Saves options to chrome.storage

const saveOptions = () => {
    options.forEach(async (s) => {
        let obj = {};
        obj[s.id] = s.checked;
        await chrome.storage.sync.set(obj);
    })
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {update: true}, function(response) {})
    })
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = async () => {
    options.forEach(async (option) => {
        await chrome.storage.sync.get(option.id, (item) => {
            option.checked = item[option.id];
        })
    })
};

options.forEach( (option) => {
    option.addEventListener('change', saveOptions);
})
document.addEventListener('DOMContentLoaded', restoreOptions);

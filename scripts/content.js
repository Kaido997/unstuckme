chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.update) return main();
})

const funcMap = new Map();
funcMap.set('related', blockReletadContent)
funcMap.set('comments', blockComments)
funcMap.set('feed', blockFeed)

function injectHtml(h) {
    let element = document.createElement("style");
    element.id = 'unstuckme',
    document.head.appendChild(element).innerHTML = h;
}

function blockReletadContent() {
    console.log("Blocking related content...")
    return '#related { display: none }\n'
}

function blockComments() {
    console.log("Blocking comments...")
    return '#comments { display: none }\n'
}

function blockFeed() {
    console.log("Blocking feed...")
    return '.ytd-browse{ display: none }'
}

function main() {
    console.log("BLOCKING DISTRACTION...")
    const before = document.querySelectorAll("style[id=unstuckme]")
    before.forEach((el) => {
        el.remove();
    })
    const keys = Array.from(funcMap.keys());

    chrome.storage.sync.get((items) => {
        for (let i = 0; i < keys.length; ++i) {
            if (items[keys[i]]) injectHtml(funcMap.get(keys[i])());
        }
    })
}

main();

// Saves options to chrome.storage

function save_options() {
    var linksText = document.getElementById('links').value;
    var json = [];
    var links = linksText.split("\n")
    links.forEach(function (line) {
        var conf = line.split("|");
        json.push({
            id: conf[0],
            name: conf[1],
            port: conf[2],
            path: conf[3]
        });
    });
    chrome.storage.sync.set({
        linksListAsText: linksText,
        linksListAsObj: json
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        linksListAsText: ""
    }, function (items) {
        document.getElementById('links').value = items.linksListAsText;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
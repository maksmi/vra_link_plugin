HTMLDocument.prototype.ready = new Promise(function (resolve) {
    if (document.readyState != "loading")
        return resolve();
    else
        document.addEventListener("DOMContentLoaded", function () {
            return resolve();
        });
});


document.ready.then(function () {
    create_list()
});

function add_item(url, name, port, path = '') {
    var tag = document.createElement("p");
    var a = document.createElement('a');
    a.href = "http://" + url.hostname + ":" + port + path;
    a.innerText = name;
    a.onclick = function () {
        window.open(this.href, "_blank");
    };
    tag.appendChild(a);
    document.querySelector('.row-content').appendChild(tag)
}

function check_url() {
    chrome.tabs.getSelected(null, function (tab) {
        if (tab.url.startsWith('http://srv8-')) {
            return true
        }
        return false
    });
}

function create_list() {
    chrome.tabs.getSelected(null, function (tab) {
        if (tab.url.startsWith('http://srv8-')) {
            var url = new URL(tab.url)
            chrome.storage.sync.get({
                linksListAsObj: []
            }, function(items) {
                items.linksListAsObj.forEach(function(entry) {
                    add_item(url, entry.name, entry.port, entry.path)
                });
            });
        } else {
            document.querySelector('.row-content').innerHTML = "NOT VRA";
        }
    });
}

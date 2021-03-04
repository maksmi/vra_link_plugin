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

function add_bookmarks(url) {
    console.log("you click button");
    chrome.bookmarks.search(url.hostname, function (results) {
        if (results.length === 0) {
            console.log("Adding bookmark");
            add_bookmarks_template(url.hostname);
        }
    });
}

function add_bookmarks_template(vra_name) {
    chrome.bookmarks.create({
            'parentId': "1",
            'title': vra_name
        },
        function (newFolder) {
            console.log("added folder: " + newFolder.title);
            console.log(newFolder.id);
            chrome.storage.sync.get({
                linksListAsObj: []
            }, function (items) {
                items.linksListAsObj.forEach(function (entry) {
                    add_item(url, entry.name, entry.port, entry.path)
                    chrome.bookmarks.create({
                        'parentId': newFolder.id,
                        'title': entry.name,
                        'url': "http://" + vra_name + ":" + entry.port + entry.path
                    });
                });
            });
        });

}

function create_list() {
    chrome.tabs.getSelected(null, function (tab) {
        if (tab.url.startsWith('http://srv8-')) {
            var url = new URL(tab.url)
            chrome.storage.sync.get({
                linksListAsObj: []
            }, function (items) {
                items.linksListAsObj.forEach(function (entry) {
                    add_item(url, entry.name, entry.port, entry.path)
                });
            });
            let button = document.createElement("button");
            button.innerText = "ADD TO BOOKMARKS "
            button.onclick = function () {
                add_bookmarks(url);
            };
            document.querySelector('.row-content').appendChild(button)
        } else {
            document.querySelector('.row-content').innerHTML = "NOT VRA";
        }
    });
}


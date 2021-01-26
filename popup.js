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

function add_item(url, name, port) {
    var tag = document.createElement("p");
    var a = document.createElement('a');
    a.href = "http://" + url.hostname + ":" + port;
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
    });
}

function create_list() {
    chrome.tabs.getSelected(null, function (tab) {
        if (tab.url.startsWith('http://srv8-')) {
            var url = new URL(tab.url)
            add_item(url, 'B2B_PORTAL (MAIN)', 80)
            add_item(url, 'B2B_PORTAL 8088', 8088)
            add_item(url, 'ZMAN', 2182)
            add_item(url, 'PORTAINER', 7000)
            add_item(url, 'SWAGGER-UI', "8080/swagger-ui.html")
        } else {
            document.querySelector('.row-content').innerHTML = "NOT VRA";
        }
    });
}

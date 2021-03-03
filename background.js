const def_list = 'b2b_main|B2B_PORTAL (MAIN)|80|\n' +
    'b2b_8088|B2B_PORTAL (8088)|8088|\n' +
    'b2b_service|B2B_PORTAL service access (555)|555|/service-access/login\n' +
    'Zman|ZMAN|2182|\n' +
    'portainer|PORTAINER|7000|\n' +
    'b2b_swggeer|SWAGGER-UI|8080|/swagger-ui.html\n' +
    'log_changer|LOG LEVEL CHANGER|8055|';

function init_options() {
    let json = [];
    def_list.split("\n").forEach(function (line) {
        var conf = line.split("|");
        json.push({
            id: conf[0],
            name: conf[1],
            port: conf[2],
            path: conf[3]
        });
    });
    chrome.storage.sync.set({
        linksListAsText: def_list,
        linksListAsObj: json
    });
}

function onClick(entry) {
    chrome.tabs.getSelected(null, function (tab) {
        var url = new URL(tab.url)
        window.open("http://" + url.hostname + ":" + entry.port + entry.path);
    });
}

// function onClickMain() {
//     chrome.tabs.getSelected(null, function (tab) {
//         var url = new URL(tab.url)
//         window.open("http://" + url.hostname + ":80");
//     });
// }
//
// function onClickZk() {
//     chrome.tabs.getSelected(null, function (tab) {
//         var url = new URL(tab.url)
//         window.open("http://" + url.hostname + ":2182");
//     });
// }
//
// function onClickPortainer() {
//     chrome.tabs.getSelected(null, function (tab) {
//         var url = new URL(tab.url)
//         window.open("http://" + url.hostname + ":7000");
//     });
// }
//
// function onClickNxTheme() {
//     chrome.tabs.getSelected(null, function (tab) {
//         var url = new URL(tab.url)
//         window.open("http://" + url.hostname + ":8088");
//     });
// }
//
// function onClickSwagger() {
//     chrome.tabs.getSelected(null, function (tab) {
//         var url = new URL(tab.url)
//         window.open("http://" + url.hostname + ":8080/swagger-ui.html");
//     });
// }

chrome.runtime.onInstalled.addListener(function () {
        init_options();
        chrome.contextMenus.removeAll(function () {
        });
        chrome.storage.sync.get({
            linksListAsObj: []
        }, function (items) {
            items.linksListAsObj.forEach(function (entry) {
                chrome.contextMenus.create({
                    "id": "vraContextMenu_" + entry.id,
                    "title": entry.name,
                    "visible": false,
                    "enabled": false
                });
            });
        });
        // chrome.contextMenus.create({
        //     "id": "vraContextMenu_b2b_main",
        //     "title": "B2B_PORTAL (MAIN)",
        //     "visible": false,
        //     "enabled": false
        // });
        // chrome.contextMenus.create({
        //     "id": "vraContextMenu_Zman",
        //     "title": "ZMAN",
        //     "visible": false,
        //     "enabled": false
        // });
        // chrome.contextMenus.create({
        //     "id": "vraContextMenu_portainer",
        //     "title": "Portainer",
        //     "visible": false,
        //     "enabled": false
        // });
        // chrome.contextMenus.create({
        //     "id": "vraContextMenu_b2b_8088",
        //     "title": "B2B_PORTAL 8088",
        //     "visible": false,
        //     "enabled": false
        // });
        // chrome.contextMenus.create({
        //     "id": "vraContextMenu_b2b_swggeer",
        //     "title": "B2B_POTAL swagger-ui",
        //     "visible": false,
        //     "enabled": false
        // });
    }
);

function update_menu() {
    chrome.tabs.getSelected(null, function (tab) {
        if (tab.url) {
            var url = new URL(tab.url)
            chrome.storage.sync.get({
                linksListAsObj: []
            }, function (items) {
                items.linksListAsObj.forEach(function (entry) {
                    if (url.hostname.startsWith('srv8-')) {
                        chrome.contextMenus.update('vraContextMenu_' + entry.id, {
                            "visible": true,
                            "enabled": true
                        });
                    } else {
                        chrome.contextMenus.update('vraContextMenu_' + entry.id, {
                            "visible": false,
                            "enabled": false
                        });
                    }
                })
            });
        }
    });
}

chrome.tabs.onActivated.addListener(function () {
    update_menu();
});

chrome.tabs.onUpdated.addListener(function () {
    update_menu();
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (tab) {
        chrome.storage.sync.get({
            linksListAsObj: []
        }, function (items) {
            items.linksListAsObj.forEach(function (entry) {
                if (info.menuItemId === "vraContextMenu_" + entry.id) {
                    onClick(entry);
                }
            })
        });

        // if (info.menuItemId === "vraContextMenu_b2b_main") {
        //     onClickMain();
        // }
        // if (info.menuItemId === "vraContextMenu_Zman") {
        //     onClickZk();
        // }
        // if (info.menuItemId === "vraContextMenu_portainer") {
        //     onClickPortainer();
        // }
        // if (info.menuItemId === "vraContextMenu_b2b_8088") {
        //     onClickNxTheme();
        // }
        // if (info.menuItemId === "vraContextMenu_b2b_swggeer") {
        //     onClickSwagger();
        // }
    }
});

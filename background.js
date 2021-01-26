function onClickMain() {
    chrome.tabs.getSelected(null, function (tab) {
        var url = new URL(tab.url)
        window.open("http://" + url.hostname + ":80");
    });
}

function onClickZk() {
    chrome.tabs.getSelected(null, function (tab) {
        var url = new URL(tab.url)
        window.open("http://" + url.hostname + ":2182");
    });
}

function onClickPortainer() {
    chrome.tabs.getSelected(null, function (tab) {
        var url = new URL(tab.url)
        window.open("http://" + url.hostname + ":7000");
    });
}

function onClickNxTheme() {
    chrome.tabs.getSelected(null, function (tab) {
        var url = new URL(tab.url)
        window.open("http://" + url.hostname + ":8088");
    });
}

function onClickSwagger() {
    chrome.tabs.getSelected(null, function (tab) {
        var url = new URL(tab.url)
        window.open("http://" + url.hostname + ":8080/swagger-ui.html");
    });
}

chrome.runtime.onInstalled.addListener(function () {
        chrome.contextMenus.removeAll(function () {
        });
        chrome.contextMenus.create({
            "id": "vraContextMenu_b2b_main",
            "title": "B2B_PORTAL (MAIN)",
            "visible": false,
            "enabled": false
        });
        chrome.contextMenus.create({
            "id": "vraContextMenu_Zman",
            "title": "ZMAN",
            "visible": false,
            "enabled": false
        });
        chrome.contextMenus.create({
            "id": "vraContextMenu_portainer",
            "title": "Portainer",
            "visible": false,
            "enabled": false
        });
        chrome.contextMenus.create({
            "id": "vraContextMenu_b2b_8088",
            "title": "B2B_PORTAL 8088",
            "visible": false,
            "enabled": false
        });
        chrome.contextMenus.create({
            "id": "vraContextMenu_b2b_swggeer",
            "title": "B2B_POTAL swagger-ui",
            "visible": false,
            "enabled": false
        });
    }
);

function update_menu() {
    chrome.tabs.getSelected(null, function (tab) {
        if (tab.url) {
            var url = new URL(tab.url)
            if (url.hostname.startsWith('srv8-')) {
                chrome.contextMenus.update('vraContextMenu_b2b_main', {
                    "visible": true,
                    "enabled": true
                });
                chrome.contextMenus.update("vraContextMenu_Zman", {
                    "visible": true,
                    "enabled": true
                });
                chrome.contextMenus.update("vraContextMenu_portainer", {
                    "visible": true,
                    "enabled": true
                });
                chrome.contextMenus.update("vraContextMenu_b2b_8088", {
                    "visible": true,
                    "enabled": true
                });
                chrome.contextMenus.update("vraContextMenu_b2b_swggeer", {
                    "visible": true,
                    "enabled": true
                });
            } else {
                chrome.contextMenus.update('vraContextMenu_b2b_main', {
                    "visible": false,
                    "enabled": false
                });
                chrome.contextMenus.update("vraContextMenu_Zman", {
                    "visible": false,
                    "enabled": false
                });
                chrome.contextMenus.update("vraContextMenu_portainer", {
                    "visible": false,
                    "enabled": false
                });
                chrome.contextMenus.update("vraContextMenu_b2b_8088", {
                    "visible": false,
                    "enabled": false
                });
                chrome.contextMenus.update("vraContextMenu_b2b_swggeer", {
                    "visible": false,
                    "enabled": false
                });
            }
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
        if (info.menuItemId === "vraContextMenu_b2b_main") {
            onClickMain();
        }
        if (info.menuItemId === "vraContextMenu_Zman") {
            onClickZk();
        }
        if (info.menuItemId === "vraContextMenu_portainer") {
            onClickPortainer();
        }
        if (info.menuItemId === "vraContextMenu_b2b_8088") {
            onClickNxTheme();
        }
        if (info.menuItemId === "vraContextMenu_b2b_swggeer") {
            onClickSwagger();
        }
    }
});

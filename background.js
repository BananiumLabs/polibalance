chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log("The color is green.");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'developer.chrome.com' },
            })
            ],
            // ShowPageAction() corresponds to "page_action" in manifest.json
            // Will have colored icons when user goes to an article that is politically charged
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
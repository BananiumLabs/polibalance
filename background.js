
var rule1 = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.google.com' },
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
};

var rule2 = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.apple.com' },
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
};

var rules = [rule1, rule2];
var siteHosts = [];
var siteRules = [];

function getSites()
{
    const sitesJsonUrl = chrome.runtime.getURL('Allsides-Scraper/biasRatings.json');

    fetch(sitesJsonUrl)
        .then((response) => response.json())
        .then((json) => extractInformation(json));
};

// Adds list of site host names to global variable siteHosts
function extractInformation(x) 
{
    var tempRule;
    for (var y in x)
    {
        tempRule = {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { pathContains : y },
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        };

        siteRules.push(tempRule);
        siteHosts.push(y);
    }

    console.log(siteRules);
    console.log(rules);

};


chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log("The color is green.");
    });

    getSites();

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        console.log("wat");
        chrome.declarativeContent.onPageChanged.addRules(siteRules);
    });
});
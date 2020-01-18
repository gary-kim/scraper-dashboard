import * as helpers from './helpers.js';
const browser = require('webextension-polyfill');

const hostName = 'io.github.tcode2k16.scrapdash';


chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.id, {
        file: 'js/main.js',
    });
});




const update = async function () {
    let { feedOptions, feedData, latestData } = await browser.storage.local.get({ feedOptions: [], feedData: [], latestData: {} });

    console.log(feedData);
    console.log(feedOptions);


    for (let i = 0; i < feedOptions.length; i++) {
        let each = feedOptions[i];
        // feedData.push({
        //     time: helpers.currentEpoch(),
        //     data: `hello world ${helpers.currentEpoch()}`,
        //     associatedFeed: each.id,
        // });
        // if (each.type === 'plain') {
        //     let res = await fetch(each.url);
        //     let text = await res.text();
        //     console.log(text);
        //     let template = document.createElement('template')
        //     template.innerHTML = text;
        //     console.log(template);
        //     console.log(each.selector);
        //     let data = template.content.querySelectorAll(each.selector)[0].innerHTML;
        //     if (data !== each.latestData) {
        //         feedData.push({
        //             time: helpers.currentEpoch(),
        //             data,
        //             associatedFeed: each.id,
        //         });
        //         feedOptions[i].latestData = data;

        //     }
        // }

        if (each.type === 'screenshot') {
            let cookies = await browser.cookies.getAll({ url: each.url });
            console.log('hi');

            console.log(cookies);

            let res = await browser.runtime.sendNativeMessage(hostName, {
                cmd: 'js',
                param: {
                    url: each.url,
                    selector: each.selector,
                    cookies: btoa(JSON.stringify(cookies)),
                }
            });
            const data = res.result;
            const hash = res.hash;
            console.log(data);
            console.log(feedData);
            console.log(each);



            if ((!(each.id in latestData)) || hash !== feedData[latestData[each.id]].hash) {
                feedData.push({
                    time: helpers.currentEpoch(),
                    data,
                    htmlHash: hash,
                    associatedFeed: each.id,
                });
                latestData[each.id] = feedData.length-1;
            }
        }
    }
    await browser.storage.local.set({
        feedData,
        latestData
    });
    setTimeout(update,5000);
}

update();


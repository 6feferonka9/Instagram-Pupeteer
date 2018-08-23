const puppeteer = require('puppeteer');
const fs = require('fs');
const moment = require('moment');

let myCustomUsers = [];
const sessionId = 'You sessionid from browser here';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/graphql/query/?query_hash=7dd9a7e2160524*****&variables={"id":"3047****","first":40,"include_reel":true}');

    await page.setCookie({
        name: 'sessionid',
        value: sessionId,
        path: '/',
        domain: '.instagram.com'
    }).then(() => {
        page.goto('https://www.instagram.com/graphql/query/?query_hash=7dd9a7e2160524*****&variables={"id":"3047****","first":40,"include_reel":true}');
    });

    await page.on('response', (response) => {
        response.text()
        .then((data) => {
            let data_object = JSON.parse(data);
            let has_next_page = data_object.data.user.edge_followed_by.page_info.has_next_page;
            let end_cursor = data_object.data.user.edge_followed_by.page_info.end_cursor;
            let users = data_object.data.user.edge_followed_by.edges;

            createNewObjectFromData(users);

            has_next_page ? page.goto('https://www.instagram.com/graphql/query/?query_hash=7dd9a7e2160524*****&variables={"id":"3047****","first":40,"include_reel":true,"after":"'+ end_cursor +'"}') : saveToFileAndClose();
        });
    });

    function createNewObjectFromData(users){
        users.forEach(element => {
            let user = {
                name: element.node.username,
                fullName: element.node.full_name
            }
            myCustomUsers.push(user);
        });      
    }

    function saveToFileAndClose(){
        let date = moment().format('H-mm-D-MM-YYYY');
        fs.writeFile(date + '.json', JSON.stringify(myCustomUsers, null, 4), (err) => {
            if(err) throw err;
            console.log('done', myCustomUsers.length + ' users', 'Now use http://json-diff.com/');
            browser.close();
        });              
    }

  })();
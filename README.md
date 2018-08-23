
# Instagram Pupeteer - get followers info

So as Instaram changed their API, you no longer can get information about your followers.

**This is a workaround made with Pupeteer.**  
It is not fully automated but does work pretty nice once you set it up.

## How does it work

You have to login on your instagram account and copy your sessionid from cookies then paste it into my code. 
Pupeteer will open the page, get people that follow you and save them into JSON file with their username and full name.

**Notice** : you need to change query parameter "query_hash" and "id" too.

## Usage

You can use this to do some kind of statistics, how the number of people that follow you changed after some kind of advertisement of your account  or use it to see, who unfollowed you :). You can do whatever you want.
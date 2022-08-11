
const fetch = require("node-fetch")
 
// fetch('https://api.binance.com/api/v3/ticker/price', {
fetch('https://api.binance.com/api/v3/ticker/price', {

    // https://api.juejin.cn/tag_api/v1/query_category_briefs
    method: 'GET'
})
.then(async res => {
    let data = await res.json();
   
    console.log(data,'<---data');
})
.catch(err => {
    console.log('Error: ', err.message);
});

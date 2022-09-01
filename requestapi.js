const request = require("request")

 //{ api_key, api_key_URL, base_URL } from "./constant"
const constants = require('./constant')
function call_api(finishedAPI,ticker){
    request(constants.base_URL+'fb'+constants.api_key_URL+constants.api_key, {json:true},(err,res,body)=>{
        if(err){
            console.log(err);
        }
        if(res.statusCode === 200){
            //console.log(body);
            //finishedAPI(body)
            return body
        }        
    })

}


module.exports = {call_api}
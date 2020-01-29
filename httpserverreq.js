var request = require("request");
const staticObj = require('./config.js').merge_output;
const req_url = staticObj.req_url;

exports.httpReq = function (ramdomId, type, data, user, callback) {
    var myrequest = { "type": type, "data": data }; // data- json
    generateLogs('trace', user + " made HTTPRequest of type = " + type + " (Random id -" + ramdomId + " )");
    var post_options = {
      url: req_url,
      timeout: 25000,
      method: "POST",
      body: '**jsonBegin' + JSON.stringify(myrequest) + 'jsonEnd*****11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
    };
  
    request(post_options, function (error, response, body) {
      if (error) {
        generateLogs('error', "Error in request made by = " + user + " and type = " + type + ". Error = " + JSON.stringify(error));
        callback(error, null);
      } else {
        // console.log(body);
        var json_res = JSON.parse(body);
        if (json_res.error) {
          generateLogs('error', "Error in response body in response to request by user =" + user + ", type = " + type + ". Error - " + json_res.error);
          callback(null, { success: false, result: json_res.error });
        } else {
          var resErr = json_res.result;
          if (resErr.error) {
            generateLogs('warn', "Error in successful response for user = " + user + " ,type=  " + type + " and Error=" + resErr.error);
          }
          generateLogs('info', "Response successful for user = " + user + " and type=" + type);
          callback(null, { success: true, result: json_res.result });
        }
      }
    });
}
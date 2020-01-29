exports.randomString = (length, chars) => {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
}



exports.currUtcDateTime =  () => {
    let dt = new Date();
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var ss = dt.getUTCSeconds();//secs
    var mm = dt.getUTCMinutes();//mins
    var hh = dt.getUTCHours();//hrs
    var dd = dt.getUTCDate();//dat    
    if (dd < 10) { dd = '0' + dd }
    if (hh < 10) { hh = '0' + hh }
    if (mm < 10) { mm = '0' + mm }
    if (ss < 10) { ss = '0' + ss }
    let cdate = month[dt.getUTCMonth()] + " " + dd + " " + dt.getUTCFullYear() + " " + hh + ":" + mm + ":" + ss + " UTC"
    return cdate;
}


exports.randID = function () {
    var text = "";
    var length = 5;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    var today = new Date();
    var ss = today.getSeconds();
    var mm = today.getMinutes();
    var hh = today.getHours();
    var dd = today.getDate();
    var mon = today.getMonth() + 1;
    var yy = (today.getFullYear().toString()).substr(2);
    if (dd < 10) { dd = '0' + dd }
    if (mon < 10) { mon = '0' + mon }
    if (hh < 10) { hh = '0' + hh }
    if (mm < 10) { mm = '0' + mm }
    if (ss < 10) { ss = '0' + ss }
    var randomId = yy + '' + mon + '' + dd + "-" + hh + '' + mm + '' + ss + "" + text;
    return randomId;
}
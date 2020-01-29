app.filter('utcToLocal', function utcToLocal($filter) {
    return function (utcDateString, format) {
        if (!utcDateString) {
            return;
        }
        
        var localTime = new Date(utcDateString).toString();
        var localDate = new Date(localTime).getTime();
        return $filter('date')(localDate, format);
    };
});

app.service('errorHandler', function() {
    this.auth = function (msg) {
        swal({
            title: msg,                        
            type: "error",                        
            buttonsStyling: false,
            confirmButtonClass: "btn btn-danger",
            timer: 3000
        }).then(()=>{
            window.location.href = "/";
        }).catch(swal.noop);
    }
});



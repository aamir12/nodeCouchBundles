// application wide global varibles //
var authErrorCode = ['notAuth','sessExpr'];

//end of application wide global varibles//

//global functions //
//get all notification in bell icon
function ad_getAllNotification(){
    $.ajax({
        url: "/dashboard/getAllNotification",
        type:'POST',
        success: function(result){
        console.log(result);
          if(result.total>0){
              $("#topAllNotification").text(result.total);
              $("#allNewAuthor").text(parseInt(result.newAuthorReq)>0?result.newAuthorReq:'');        

          }else{
            $("#topAllNotification").hide();
          } 
        },
        error: function (jqXHR, exception) {
            
            if(jqXHR.responseJSON){
                let errorCode = jqXHR.responseJSON.error;
                if(errorCode == 'notAuth' || errorCode == 'sessExpr'){
                    swal({
                        title: jqXHR.responseJSON.msg,                        
                        type: "error",                        
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-danger",
                        timer: 3000
                    }).then(()=>{
                        window.location.href = "/";
                    }).catch(swal.noop);                     
                }
            }
            
        }
    });    
}

//end of global functions//


//check error or success message in navbar//

$(document).ready(function(){
  
    if($("#hid_errMsg").length>0){      
      if($.trim($("#hid_errMsg").val())!=''){
        $.notify({
            icon: "add_alert",
            message: '<b>Error</b> '+$("#hid_errMsg").val()
      
        },{
            type: 'danger',  
            timer: 2000,          
            placement: {
                from: 'top',
                align: 'center'
            }
        });

      }
    }

    if($("#hid_succMsg").length>0){
        if($.trim($("#hid_succMsg").val())!=''){
            $.notify({
                icon: "done_outline",
                message:'<b>Success</b> '+ $("#hid_succMsg").val()
          
            },{
                type: 'success',
                timer: 2000,
                placement: {
                    from: 'top',
                    align: 'center'
                }
            });
        }
    }
   
    //update notification
    ad_getAllNotification();    

});

//end of check error or success message in navbar//




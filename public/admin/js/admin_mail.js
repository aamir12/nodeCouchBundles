$(document).ready(function() {
   

    if($("#singleMailFrm").length>0){
        $("#singleMailFrm").validate({
            highlight: function(element) {
              $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
              $(element).closest('.form-check').removeClass('has-success').addClass('has-danger');
            },
            success: function(element) {
              $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
              $(element).closest('.form-check').removeClass('has-danger').addClass('has-success');
            },
            errorPlacement: function(error, element) {
              $(element).closest('.form-group').append(error);
            },
            submitHandler: function(form){               
                return false;
            }
        });




        $("#singleMailFrm").submit(function(e) {
            e.preventDefault();
            $("#submitbutton").attr('disabled',true);
            let data = $('#singleMailFrm').serialize();
            $.ajax({
              url: "/mailsend/sendsiglemail",
              type:'POST',
              data: data,
              success: function(result){              
                 alert("send successfully");
                $("#submitbutton").attr('disabled',false);
                
              },
              error: function (jqXHR, exception) {
                console.log(jqXHR);
                $("#submitbutton").attr('disabled',true);
                if(jqXHR.responseJSON){
                   
                }
                
              }
             
          });



        })


    }


    if($("#multiSubmit").length>0){
        $("#multiSubmit").validate({
            highlight: function(element) {
              $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
              $(element).closest('.form-check').removeClass('has-success').addClass('has-danger');
            },
            success: function(element) {
              $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
              $(element).closest('.form-check').removeClass('has-danger').addClass('has-success');
            },
            errorPlacement: function(error, element) {
              $(element).closest('.form-group').append(error);
            },
            submitHandler: function(form){               
                return false;
            }
        });




        $("#multiSubmit").submit(function(e) {
            e.preventDefault();
            $("#multiSubBtn").attr('disabled',true);
            let data = $('#multiSubmit').serialize();
            $.ajax({
              url: "/mailsend/multiUserSendMail",
              type:'POST',
              data: data,
              success: function(result){              
                 alert("send successfully");
                $("#multiSubBtn").attr('disabled',false);
                
              },
              error: function (jqXHR, exception) {
                $("#multiSubBtn").attr('disabled',false);
                console.log(jqXHR);
                alert(`Error ${jqXHR.responseJSON.msg}`);
               
              }
             
          });
        })


    }

    if($("#GmailSubmitFrm").length>0){

      $("#GmailSubmitFrm").validate({
          highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
            $(element).closest('.form-check').removeClass('has-success').addClass('has-danger');
          },
          success: function(element) {
            $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
            $(element).closest('.form-check').removeClass('has-danger').addClass('has-success');
          },
          errorPlacement: function(error, element) {
            $(element).closest('.form-group').append(error);
          },
          submitHandler: function(form){               
              return false;
          }
      });




      $("#GmailSubmitFrm").submit(function(e) {
          e.preventDefault();
          $("#GSubBtn").attr('disabled',true);
          let data = $('#GmailSubmitFrm').serialize();
          $.ajax({
            url: "/mailsend/gmailsend",
            type:'POST',
            data: data,
            success: function(result){              
               alert("send successfully");
              $("#GSubBtn").attr('disabled',false);
              
            },
            error: function (jqXHR, exception) {
              $("#GSubBtn").attr('disabled',false);
              console.log(jqXHR);
              alert(`Error ${jqXHR.responseJSON.msg}`);
             
            }
           
        });
      })


    }

  


  });
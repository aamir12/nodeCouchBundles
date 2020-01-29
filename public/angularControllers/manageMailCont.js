var app = angular.module('app', ['ngValidate']);
app.controller('fileController',function($scope,$http,$timeout,errorHandler){
  
  $scope.initData = function(data){
   let allData = JSON.parse(data);
  //  $.each(allData, function(index, value) {
  //   $('#emailids').tagsinput('add', value);    
  //  });

  }  
  
  angular.element(document).ready( function () {
    $timeout(()=>{
      $('#fullPageLoader').fadeOut(1000);
      $("#wrapperBody").fadeIn();;
    },1500);
  });

  $scope.validationOptions = {
      rules: {
        email: {
              required: true,
              email:true
          },
          mailAttchFile: {
              required: true,
              extension: "png|jpeg|jpg"
          }
      },          
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
      }
  };

  $scope.onSubmitMailAtt = function(form){
    console.log("Angular submit")

    if(form.validate()) {
      let myForm = document.getElementById('mailAttFrm');
      let formData = new FormData(myForm);
      $http.post('/mailsend/mailwithAttachment', formData,
      {transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
      })
      .then(function(dataRes){
         console.log(dataRes);
      }, function(errorRes){
        console.log(errorRes);
      });
    }
  }

  $scope.onChangeFile = function(){
    $('#file').click()
  }


  $scope.onMailGunFrmSubmit = function(){
    let message =  CKEDITOR.instances['message'].getData();
    // let formData = new FormData();
    //  formData.append('message',message);

    // var ins = document.getElementById('mailGunFile').files.length;
    // for (var x = 0; x < ins; x++) {
    //   formData.append("mailGunFile", document.getElementById('mailGunFile').files[x]);
    // }

     $http.post('/mailsend/mailGun', {message})
      .then(function(dataRes){
         console.log(dataRes);
      }, function(errorRes){
        console.log(errorRes);
      });     
  }

  $scope.setDataToCk = function(data){
    CKEDITOR.instances.message.insertText(data);
  }





});

var app = angular.module('app', ['ngValidate']);
app.controller('fileupload1Cont',function($scope,$http,$timeout){
  
  $scope.initData = function(students){    
    let data = JSON.parse(students);
    $scope.students = data;

  }  
  
  angular.element(document).ready( function () {
    $timeout(()=>{
      $('#fullPageLoader').fadeOut(1000);
      $("#wrapperBody").fadeIn();;
    },1500);
  });

  $scope.validationOptions1 = {
      rules: {
        name: {
              required: true              
        },
        email: {
            required: true,
            email:true              
        },
        phone: {
          required: true              
        },
        file: {
              required: true,
              extension: "png|jpeg|jpg"
        }
      }, 
      ignore: [],         
      highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
        $(element).closest('.form-check').removeClass('has-success').addClass('has-danger');
      },
      success: function(element) {
        $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
        $(element).closest('.form-check').removeClass('has-danger').addClass('has-success');
      },
      errorPlacement: function (error, element) {
        //console.log(element);
        if (element.attr("type") == "file") {
            error.insertAfter($(element));
            //.prev($('.question'))
        } else {
          $(element).closest('.form-group').append(error);
        }
    }


  };

  $scope.validationOptions2 = {
    rules: {
      name: {
            required: true              
      },
      email: {
          required: true,
          email:true              
      },
      phone: {
        required: false              
      },
      multiFile: {
            required: false,
            extension: "png|jpeg|jpg"
      }
    }, 
    ignore: [],         
    highlight: function(element) {
      $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
      $(element).closest('.form-check').removeClass('has-success').addClass('has-danger');
    },
    success: function(element) {
      $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
      $(element).closest('.form-check').removeClass('has-danger').addClass('has-success');
    },
    errorPlacement: function (error, element) {
      //console.log(element);
      if (element.attr("type") == "file") {
          error.insertAfter($(element));
          //.prev($('.question'))
      } else {
        $(element).closest('.form-group').append(error);
      }
  }
  };

  $scope.onSubmitFrm1 = function(form){
    if(form.validate()) {
      let myForm = document.getElementById('frm1');
      let formData = new FormData(myForm);
      $http.post('/fileupload/sigleFileUploadToFolder', formData,
      {transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
      })
      .then(function(dataRes){
         console.log(dataRes);
         let data = dataRes.data.data;
         $scope.students.push(data);
         $("#frm1")[0].reset();
         $scope.onRemovePhoto();
      }, function(errorRes){
        console.log(errorRes);
      });
    }
  }

  
  $scope.onSubmitFrm2 = function(form){
    if(form.validate()) {
      let myForm = document.getElementById('frm2');
      let formData = new FormData(myForm);
      $http.post('/fileupload/multipleFileUploadToFolder', formData,
      {transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
      })
      .then(function(dataRes){
         console.log(dataRes);
         let data = dataRes.data.data;
         $scope.students.push(data);
         $("#frm2")[0].reset();
         imageContainer.innerHTML = '';
      }, function(errorRes){
        console.log(errorRes);
      });
    }
  }

 
 $scope.downloadDoc = function(id,documentName){
    let data = {
      id,
      documentName
    };

    $http.post('/fileupload/downloadDoc', data,{
      responseType: "arraybuffer"
    }).then(function(response){
      console.log(response);
      var headers = response.headers(); 
      headers['Content-Disposition'] = "attachment";
      var blob = new Blob([response.data], { type: "octet/stream" });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob); 
      link.download = documentName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    }, function(errorRes){
      console.log(errorRes);
    });
 
 }

  $scope.onChangeFile = function(id){
    $("#"+id).click();
  }

  let fileInput = document.getElementById('file');
  if(fileInput){
    fileInput.addEventListener('change',function(){
      if (fileInput.files && fileInput.files[0]) {
        let file = fileInput.files[0];
        //console.log(file);
        let tempArray = file.name.split('.');
        let extension = tempArray[tempArray.length-1].toLowerCase();
        let allowExtension = ['png','jpeg','jpg'];
        if(allowExtension.includes(extension)){
          var reader = new FileReader();      
          reader.onload = function(e) {          
            $('#preViewImg').attr('src', e.target.result);
            $('#browseBtn').hide();
            $('#canBrowseBtn').show();
            //console.log($( "#preViewImg" ).next('.error'))
            
          }
          reader.readAsDataURL(file);        
        }else{
          this.value= '';
          $('#preViewImg').attr('src','/theme/img/image_placeholder.jpg');
        }
  
      }
    });
  }

  let multiFile = document.getElementById('multiFile');
  let imageContainer = document.getElementById('fileListContainer');
  if(multiFile){
    multiFile.addEventListener('change',function(){
      imageContainer.innerHTML = '';

      if (multiFile.files) {
        let allowExtension = ['png','jpeg','jpg'];
        var filesAmount = multiFile.files.length;
       // let counter = 1;
        for (i = 0; i < filesAmount; i++) {
           let file = multiFile.files[i];
           let tempArray = file.name.split('.');
           let extension = tempArray[tempArray.length-1].toLowerCase();
           if(allowExtension.includes(extension)){
             var reader = new FileReader();      
             reader.onload = function(e) {
               let html = `<li class="text-center">
                             <img src="${event.target.result}" class="img-thumbnail imgSz">
                          </li>`;

                // <br>
                // <button type="button"  class="btn btn-sm btn-danger" id="file-${counter}" data-attr="${file.name}">
                // X
                // </button>
                $($.parseHTML(html)).appendTo(imageContainer);
                // let rmEle = document.getElementById(`file-${counter}`);
                // rmEle.addEventListener('click',removeEle);                
               // counter++;
               
             }
             reader.readAsDataURL(file);        
           }
        }  
      }
    });
  }

  // function removeEle(){    
  //   this.parentNode.parentNode.removeChild(this.parentNode);   
  //   let fileName = this.getAttribute('data-attr');
  //   multiFile.files = multiFile.files.filter(x=>{
  //        return x.name != fileName 
  //   });
  // }
 

  $scope.onRemovePhoto = function(){
    $('#preViewImg').attr('src','/theme/img/image_placeholder.jpg');
    fileInput.value='';
    $('#browseBtn').show();
    $('#canBrowseBtn').hide();
  }

  $scope.onDeleteDoc = function(id){
    $http.post('/fileupload/deleteStud', {id})
    .then(function(dataRes){
       console.log(dataRes);      
       $scope.students = $scope.students.filter(x=> x._id !=id);
    }, function(errorRes){
      console.log(errorRes);
    });
  }
  


});



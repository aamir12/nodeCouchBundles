Dropzone.autoDiscover = false;

var app = angular.module('app', ['ngValidate','thatisuday.dropzone']);
app.controller('fileupload2Cont',function($scope,$http,$timeout){
  
    $scope.initData = function(students,docUrl){    
        $scope.students = JSON.parse(students); 
        $scope.docUrl = docUrl;
        $scope.std = {};    
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
                required: false              
            },
            email:{
                required: false,
                email:true
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

    
    $scope.totalFiles = 0;
    $scope.onSubmitFrm1 = function(form){
        
        if(form.validate()) {
          
            if($scope.totalFiles<=0){
                alert("Please add atleast one document");
                return;
            }
            $scope.dzMethods.processQueue();
        }
    }

    $scope.dzOptions = {
        paramName : 'photos',
        url : '/fileupload/postdropzone',
        acceptedFiles : '.jpg, .jpeg, .JPEG, .JPG, .png, .PNG, .pdf, .csv, .doc, .docx, .xlsx, .xls, .txt, .pptx, .ppt',
        addRemoveLinks : true,
        dictDefaultMessage : 'Click to add or drop documents (5 docs max)',
        dictRemoveFile : 'Remove photo',
        dictResponseError : 'Could not upload this photo',
        maxFilesize : '25',
        maxFiles : '5',
        thumbnailWidth:250,
        thumbnailHeight:150,
        parallelUploads : 5,
        autoProcessQueue : false,
        uploadMultiple: true,
        init: function() {
          this.on("sendingmultiple", function(file, xhr, formData) {
            formData.append("data",JSON.stringify($scope.std) );
            console.log(formData);
          }); 
          this.on("successmultiple", function (file, response) {      
             location.reload();       
            console.log(response);           
          });
      }
	};

	$scope.dzMethods   = {};
    $scope.dzCallbacks = {
        'addedfile' : function(file){
          console.log("add");
          $scope.totalFiles++;
        },
        'removedfile' : function(file){
            console.log("remove")
            $scope.totalFiles--;
        }
    };

    $scope.downloadDoc = function(id,docname, doc){
       // console.log(doc._attachments[docname]);

        //it Work fine for pdf or csv files
        let url  = `${$scope.docUrl}/aak_students/${id}/${docname}`;
        var link = document.createElement('a');
        link.href = url;
        link.target = "_blank";
        link.download = docname;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;


        // $http.post('/fileupload/downloadDbDoc/'+id+'/'+docname,{
        //     responseType: "arraybuffer"
        //   }).then(function(response){
        //     console.log(response.data);
        //     var headers = response.headers(); 
        //     headers['Content-Disposition'] = "attachment";
        //     var blob = new Blob([response.data], { type: "octet/stream" });
        //     var link = document.createElement('a');
        //     link.href = window.URL.createObjectURL(blob); 
        //     link.download = docname;
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        //   }, function(errorRes){
        //     console.log(errorRes);
        // });

    }
  

});

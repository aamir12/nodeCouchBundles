
var app = angular.module('app', ['ngValidate']);
app.controller('fileupload3Cont',function($scope,$http,$timeout){
  
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
                required: true              
            },
            email:{
                required: true,
                email:true
            },
            base64file:{
                required:true
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
            let data = $("#frm1").serialize();
            
            $http.post('/fileupload/uploadWithBase64', data,{
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
           )
            .then(function(dataRes){
                location.reload();

            }, function(errorRes){
            console.log(errorRes);
            });
        }
    }

    $scope.onChangeFile = function(id){
        $("#"+id).click();
    }
    
    
    let fileInput = document.getElementById('base64file');
    var handleFileSelect = function(evt) {
        //////////////
        var Inputfiles = evt.target.files;
        if (Inputfiles && Inputfiles[0]) {
            let file = Inputfiles[0];
            //console.log(file);
            let tempArray = file.name.split('.');
            let extension = tempArray[tempArray.length-1].toLowerCase();
            let allowExtension = ['png','jpeg','jpg'];
            if(allowExtension.includes(extension)){
                var reader = new FileReader();      
                reader.onload = function(e) {          
                    var binaryString = e.target.result;
                    let imgUrl = "data:image/*;base64,"+btoa(binaryString);
                    $('#preViewImg').attr('src', imgUrl);
                    $('#browseBtn').hide();
                    $('#canBrowseBtn').show();
                    document.getElementById("base64Image").value = btoa(binaryString);
                    //console.log($( "#preViewImg" ).next('.error'))
                    
                
                }
                //reader.readAsDataURL(file);  
                reader.readAsBinaryString(file);        
            }else{
                evt.target.value = '';
                $('#preViewImg').attr('src','/theme/img/image_placeholder.jpg');
                alert("Please select valid image file only");
            }
        
        }
    };

    if(fileInput){
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            fileInput.addEventListener('change',handleFileSelect,false); 
        } else {
             alert('The File APIs are not fully supported in this browser.');
        }
    }

    // ----------------------------------------to generate base64 and ctype ------------------------------------



    
    $scope.onRemovePhoto = function(){
        $('#preViewImg').attr('src','/theme/img/image_placeholder.jpg');
        fileInput.value='';
        $('#browseBtn').show();
        $('#canBrowseBtn').hide();
    }

    $scope.onDeleteDoc = function(id){
        alert("Delete is disabled");
        // $http.post('/fileupload/deleteStud', {id})
        // .then(function(dataRes){
        //     console.log(dataRes);      
        //     $scope.students = $scope.students.filter(x=> x._id !=id);
        // }, function(errorRes){
        //     console.log(errorRes);
        // });
    }

    


});

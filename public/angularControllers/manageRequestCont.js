var app = angular.module('app', []);
app.controller('manageRequestController',function($scope,$http,$timeout,errorHandler){
  
  $scope.initData = function(data){
    let allData = JSON.parse(data);
    $scope.acceptedReqs = allData.accepted;
    $scope.pendingReqs = allData.pending;     
    $scope.rejectedReqs = allData.rejected;
  }  
  
  $scope.onView = function(doc,status){     
    $scope.mdlStatus = status;
    $scope.req = doc;      
    console.log($scope.req);
    $('#requestMdl').modal('show');
  }

  $scope.onAcceptRequest = function(id,status){
    swal({
      title: 'Are you sure?',
      text: "You want to accept request",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      buttonsStyling: false
    }).then(function(res) {
        console.log(res);
        if(res.value){
          $("#newReq").toggleClass("ad_blur");
          $("#accReq").toggleClass("ad_blur");
          $("#rejectReq").toggleClass("ad_blur");
            /////////////
            $http.post("request/acceptRequest", {id:id,status:status}).then(function (callback) {

              let data = callback.data;
              if(data.status){
                $('#requestMdl').modal('hide'); 
                swal({
                  title: 'Done!',
                  text: 'Request accepted successfully.',
                  type: 'success',
                  confirmButtonClass: "btn btn-success",
                  buttonsStyling: false
                }).then(()=>{
                  location.reload();
                });
              }
              
            }, function (errorRes) {
              let {error,msg} = errorRes.data;
              if(authErrorCode.includes(error)){
                errorHandler.auth(msg);
              }else{
                swal({
                  title: msg,                        
                  type: "error",                        
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-danger"            
                }).catch(swal.noop);
              }
              
            });
            /////////////
        }
        
    }).catch(swal.noop);

  }

  $scope.onRejectRequest = function(id){
  swal({
    title: 'Are you sure?',
    text: "You want to reject request",
    type: 'warning',
    showCancelButton: true,
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    buttonsStyling: false
  }).then(function(res) {
      console.log(res);
      if(res.value){

        $("#newReq").toggleClass("ad_blur");
        $("#accReq").toggleClass("ad_blur");
        $("#rejectReq").toggleClass("ad_blur");
        
          /////////////
          $http.post("request/rejectRequest", {id:id,status:'rejected'}).then(function (callback) {

            let data = callback.data;
            if(data.status){
              $('#requestMdl').modal('hide'); 
              swal({
                title: 'Done!',
                text: 'Request rejected successfully.',
                type: 'success',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
              }).then(()=>{
                location.reload();
              });
            }
            
          }, function (errorRes) {
            let {error,msg} = errorRes.data;
            if(authErrorCode.includes(error)){
              errorHandler.auth(msg);
            }else{
              swal({
                title: msg,                        
                type: "error",                        
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger"            
              }).catch(swal.noop);
            }
            
          });
          /////////////
      }
      
  }).catch(swal.noop);

  }

  angular.element(document).ready( function () {
   
      $('#pendingDataTable').DataTable({
          "pagingType": "full_numbers",
          "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
          ],
          
          language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records",
          },
          "order": [[ 4, "desc" ]]
      });

      $('#acceptedDataTable').DataTable({
          "pagingType": "full_numbers",
          "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
          ],
          responsive: true,
          language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records",
          },
          "order": [[ 4, "desc" ]]
      });

      $('#rejectedDataTable').DataTable({
          "pagingType": "full_numbers",
          "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
          ],
          responsive: true,
          language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records",
          },
          "order": [[ 4, "desc" ]]
      });

      $timeout(()=>{
        $('#fullPageLoader').fadeOut(1000);
        $("#wrapperBody").fadeIn();;
      },1500);

  });

});

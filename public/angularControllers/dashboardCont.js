var app = angular.module('app', []);
app.controller('dashController',function($scope,$http,$timeout){
   $scope.initDash = function(){     
     

   }


   angular.element(document).ready( function () {
      $timeout(()=>{
        $('#fullPageLoader').fadeOut(1000);
        $("#wrapperBody").fadeIn();;
      },1500);

   });

});

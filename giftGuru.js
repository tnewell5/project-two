document.addEventListener("DOMContentLoaded", function(event) {
console.log("js has loaded");

var query = '';

var $submitButton = $('#submit-btn');
$submitButton.on("click", function() {
  console.log('button was clicked');

  // gets user's search input for the Etsy api:
  var $userEtsySearch = $('#user-etsy-input').val();
  console.log($userEtsySearch);

  //create Etsy listings query:
  query = "https://openapi.etsy.com/v2/listings/active?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY;
  console.log(query);
  ajaxCall(query);

  //create Etsy treasuries query:
  $userEtsySearch = $userEtsySearch.split(' ').shift();
  console.log($userEtsySearch);

  query = "https://openapi.etsy.com/v2/treasuries?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY;
  console.log(query);

  //create events query:

  //make 3 ajax calls, passing in unique queries and returning responses

  //pass responses into handlebars function and print to the screen

  function ajaxCall (query) {
    $.ajax({
      url: query,
      jsonp: "callback",
      dataType: 'jsonp',
      // crossDomain: true,
      // data: {
      //   q: "select title,abstract,url from search.news where query=\"cat\"",
      //   format: "json"
      // },
      success: function(response) {
        console.log(response);
      }


    }).done(function(response) {
        console.log("success");
        console.log("response");

    }).fail(function(response){
              console.log("fail");
    }).always(function(response){
              console.log("this code runs no matter what.");
    });


  } // closes ajaxCall function















}) // closes $submitButton eventListener








}); // closed DOMContentLoaded

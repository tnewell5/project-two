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
  query = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY + "&callback=foo" + "&includes=MainImage";
  console.log(query);
  ajaxCall(query);

  //create Etsy treasuries query:
  $userEtsySearch = $userEtsySearch.split(' ').shift();
  console.log($userEtsySearch);

  // query = "https://openapi.etsy.com/v2/treasuries?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY;
  // console.log(query);

  //create events query:

  //make 3 ajax calls, passing in unique queries and returning responses

  //pass responses into handlebars function and print to the screen

  function ajaxCall (query) {
    $.ajax({
      url: query,
      // jsonp: "callback",
      dataType: 'jsonp',

    }).done(function(response) {
        console.log("success");
        console.log(response);

        //return response;
        var source = document.querySelector('#template').innerHTML;
        //console.log("$source:" + $source);
        var template = Handlebars.compile(source);
        var templateContainer = document.querySelector('#etsy-listings-container');
        //console.log("$templateContainer:" + $templateContainer);
        var html = template(response.results[0]);
        //console.log("$html: " + $html);
        templateContainer.innerHTML = html;
        console.log("templateContainer.innerHTML: " + templateContainer.innerHTML);
        //console.log("response.results[0].title" + response.results[0].title);



    }).fail(function(response){
        console.log("fail");
    }).always(function(response){
        console.log("this code runs no matter what.");
    });

    //return response;
  } // closes ajaxCall function

  function templateMaker (response, searchType) {


  } // closes templateMaker function















}) // closes $submitButton eventListener








}); // closed DOMContentLoaded

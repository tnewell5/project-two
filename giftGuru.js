document.addEventListener("DOMContentLoaded", function(event) {
console.log("js has loaded");

var query = '';
var queryType = '';
var userEtsyCategory = "choose-one";
var etsyTreasuries = {
  treasury1: null,
  treasury2: null,
  treasury3: null
}

var etsyCategories = ["accessories", "art", "bags_and_purses", "bath_and_beauty", "books_and_zines", "candles",
"ceramics_and_pottery", "children", "clothing", "dolls_and_miniatures", "crochet", "furniture", "geekery",
"housewares", "jewelry", "music", "plants_and_edibles", "toys", "vintage", "weddings", "woodworking"];

var etsyCategoriesDropdown = document.querySelector('#etsy-category-dropdown');
for (var i = 0; i < etsyCategories.length; i +=1) {
  var etsyCategoryOption = document.createElement('option');
  etsyCategoryOption.id = etsyCategories[i];
  etsyCategoryOption.value = etsyCategories[i];
  etsyCategoryOption.innerText = etsyCategories[i];
  etsyCategoriesDropdown.appendChild(etsyCategoryOption);
  //console.log(etsyCategoryOption);

} // closes loop


var $submitButton = $('#submit-btn');
$submitButton.on("click", function() {
  //console.log('button was clicked');

  // gets user's search input for the Etsy api:
  var $userEtsySearch = $('#user-etsy-input').val();
  userEtsyCategory = etsyCategoriesDropdown.value;
  console.log("userEtsyCategory: " + userEtsyCategory);
  //console.log($userEtsySearch);

  //create Etsy listings query:
  if (userEtsyCategory !== "any-category") {
    query = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY + "&callback=foo" + "&includes=MainImage"+"&category=" + userEtsyCategory + "&limit=5";
  }
  else {
    //console.log('working');
    query = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY + "&callback=foo" + "&includes=MainImage" + "&limit=5";
  }
  queryType = "listings";
  console.log(query);
  ajaxCall(query, queryType);

  //create Etsy treasuries query:
  $userEtsySearch = $userEtsySearch.split(' ').shift();
  //query = "https://openapi.etsy.com/v2/treasuries?keywords=%22red%22&api_key=" + ETSY_KEY;
  query = "https://openapi.etsy.com/v2/treasuries.js?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY + "&callback=foo";
  queryType = "treasuries";
  console.log(query);
  ajaxCall(query, queryType);



  //create events query:

  //make 3 ajax calls, passing in unique queries and returning responses

  //pass responses into handlebars function and print to the screen

  function ajaxCall (query, queryType) {
    $.ajax({
      url: query,
      // jsonp: "callback",
      dataType: 'jsonp',

    }).done(function(response) {
        console.log("success");
        console.log(response);

        var giftIdeasH2 = document.querySelector('#gift-ideas');
        console.log("giftIdeasH2: " + giftIdeasH2);
        giftIdeasH2.classList.remove('hidden');
        var inspirationsH2 = document.querySelector('#inspirations');
        inspirationsH2.classList.remove('hidden');

        //return response;
        if (queryType === "listings") {
          var source = document.querySelector('#template').innerHTML;
          //console.log("$source:" + $source);
          var template = Handlebars.compile(source);
          var templateContainer = document.querySelector('#etsy-listings-container');
          //console.log("$templateContainer:" + $templateContainer);
          var html = template(response);
          //console.log("$html: " + $html);
          templateContainer.innerHTML = html;
          //console.log("templateContainer.innerHTML: " + templateContainer.innerHTML);
          //console.log("response.results[0].title" + response.results[0].title);
        } // closes if stmt
        else if (queryType === "treasuries") {
          var source = document.querySelector('#treasuries-template').innerHTML;
          var template = Handlebars.compile(source);
          var templateContainer = document.querySelector('#etsy-treasuries-container');
          var html = template(response);
          templateContainer.innerHTML = html;

          var treasuryListingIDs = [];
          for (var i = 0; i < 16; i +=1) {
            treasuryListingIDs.push(response.results[0].listings[i].data.listing_id);
            //query = "https://openapi.etsy.com/v2/listings/223233914.js?&api_key=" + ETSY_KEY + "&callback=foo";
            query = "https://openapi.etsy.com/v2/listings/" + treasuryListingIDs[i] + ".js?&api_key=" + ETSY_KEY + "&callback=foo";
            queryType = "treasury-listings";
            // call ajax recursively

          }
          console.log("treasuryListingIDs: " + treasuryListingIDs);

          // if user clicks on any treasury picture, store "listing_id": 272188358, send ajax request
          // store the listing_id values for all listings in treasury in array
          // in for loop:
          // populate query string and send ajax request, build new array with corresponding url
          // add clickable links to treasury images

        } // closes else if for queryType === treasuries

        else if (queryType === "treasury-listings") {
          // add clickable links to existing treasury images
        }


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

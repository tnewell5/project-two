document.addEventListener("DOMContentLoaded", function(event) {
console.log("js has loaded");

var query = '';
var queryType = '';
var userEtsyCategory = "choose-one";
var containerTwo = document.querySelector('#container-two');

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
  //console.log("userEtsyCategory: " + userEtsyCategory);
  //console.log($userEtsySearch);

  //create Etsy listings query:
  if (userEtsyCategory !== "any-category") {
    query = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY + "&callback=foo" + "&includes=MainImage"+"&category=" + userEtsyCategory + "&limit=35";
  }
  else {
    query = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY + "&callback=foo" + "&includes=MainImage" + "&limit=35";
  }
  queryType = "listings";
  //console.log(query);
  ajaxCall(query, queryType);


  function ajaxCall (query, queryType) {
    var ajaxCallResponse;
    $.ajax({
      url: query,
      // jsonp: "callback",
      dataType: 'jsonp',

    }).done(function(response) {
        console.log("success");
        //console.log(response);

        // build global object inside of ajaxCall:
        if (queryType === "listings") {
          var etsyListingsObj = buildListingsObj(response); // returns etsyListingsObj
          templateMaker(etsyListingsObj, queryType);

        }
        // else if (queryType === "events") {
        //   etsyTreasuryObj = buildTreasuryObj(response); // returns etsyTreasuryObj
        //   queryType = "treasury-listings";
        //   console.log( "line 86, etsyTreasuryObj: ");
        //   console.log( etsyTreasuryObj);
        // }


    }).fail(function(response){
        console.log("fail");
    }).always(function(response){
        console.log("this code runs no matter what.");
    });

  } // closes ajaxCall function

  // takes in response from ajax call and returns new object:
  function buildListingsObj(response) {
    var etsyListingsObj = response;
    return etsyListingsObj;
  } // closes buildListingsObj function


  function templateMaker (object, queryType) {
    //console.log("templateMaker takes in object: " + object);
    //console.log("templateMaker takes in queryType: " + queryType);

    var giftIdeasH2 = document.querySelector('#gift-ideas');
    //console.log("giftIdeasH2: " + giftIdeasH2);
    giftIdeasH2.classList.remove('hidden');
    var savedIdeas = document.querySelector('#saved-h2');
    savedIdeas.classList.remove('hidden');
    containerTwo.classList.remove('hidden');


    //return response;
    if (queryType === "listings") {
      var source = document.querySelector('#template').innerHTML;
      //console.log("$source:" + $source);
      var template = Handlebars.compile(source);
      var templateContainer = document.querySelector('#etsy-listings-container');
      //console.log("$templateContainer:" + $templateContainer);
      var html = template(object);
      //console.log("$html: " + $html);
      templateContainer.innerHTML = html;

      var listingsArray = document.querySelectorAll('.listing');
      console.log("listingsArray: ");
      console.log(listingsArray);
      for (var i = 0; i < listingsArray.length; i += 1) {
        listingsArray[i].addEventListener("dragend", saveEtsyItem);
      } // closes for loop

      //console.log("templateContainer.innerHTML: " + templateContainer.innerHTML);
      //console.log("response.results[0].title" + response.results[0].title);
    } // closes if stmt
  } // closes templateMaker function

  // colorDiv.addEventListener("click", saveColor);
  //
  // var saveColor = function(event) {
  // colorContainerDiv.removeChild(event.target);
  // savedColorsDiv.appendChild(event.target);
  // event.target.removeEventListener("click", saveColor);
  // }

  var saveEtsyItem = function(event) {

    var listingsParent = document.querySelector(".listings-span");
    var imgParentAnchor = event.target.parentNode;
    imgParentAnchor.parentNode.removeChild(imgParentAnchor);

    var savedContainer = document.querySelector("#saved-container");
    savedContainer.appendChild(event.target.parentNode);
    event.target.removeEventListener("dragend", saveEtsyItem);
    imgParentAnchor.classList.add('saved-listing');
  } // closes saveEtsyItem function


}) // closes $submitButton eventListener



}); // closed DOMContentLoaded

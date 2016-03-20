document.addEventListener("DOMContentLoaded", function(event) {
console.log("js has loaded");

var query = '';
var queryType = '';
var userEtsyCategory = "choose-one";
var containerOne = document.querySelector('#container-one');
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

  // gets user's search input for the Etsy api:
  var $userEtsySearch = $('#user-etsy-input').val();
  userEtsyCategory = etsyCategoriesDropdown.value;

  //create Etsy listings query:
  if (userEtsyCategory !== "any-category") {
    query = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY + "&includes=MainImage"+"&category=" + userEtsyCategory + "&limit=28";
  }
  else {
    query = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + $userEtsySearch + "&api_key=" + ETSY_KEY + "&includes=MainImage" + "&limit=28";
  }
  queryType = "listings";
  //console.log(query);
  ajaxCall(query, queryType);

  function ajaxCall (query, queryType) {
    var ajaxCallResponse;
    $.ajax({
      url: query,
      dataType: 'jsonp',

    }).done(function(response) {
        console.log("success");
        //console.log(response);

        // build global object inside of ajaxCall:
        if (queryType === "listings") {
          var etsyListingsObj = buildListingsObj(response); // returns etsyListingsObj
          containerOne.style.background = '#CFE6DA';
          containerTwo.style.background = '#DFBA9D';
          templateMaker(etsyListingsObj, queryType);
        }
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
    // var giftIdeasH2 = document.querySelector('#gift-ideas');
    // giftIdeasH2.classList.remove('hidden');
    var savedIdeas = document.querySelector('#saved-h2');
    savedIdeas.classList.remove('hidden');
    containerTwo.classList.remove('hidden');

    if (queryType === "listings") {
      var source = document.querySelector('#template').innerHTML;
      var template = Handlebars.compile(source);
      var templateContainer = document.querySelector('#templates-container');
      var html = template(object);
      templateContainer.innerHTML = html;

      var listingsArray = document.querySelectorAll('.listing');
      for (var i = 0; i < listingsArray.length; i += 1) {
        listingsArray[i].addEventListener("dragend", saveEtsyItem);
      } // closes for loop
    } // closes if stmt
  } // closes templateMaker function

  var saveEtsyItem = function(event) {

    //var listingsParent = document.querySelector(".listings-span");
    var imgParentAnchor = event.target.parentNode;
    imgParentAnchor.parentNode.removeChild(imgParentAnchor);

    var savedContainer = document.querySelector("#saved-container");
    savedContainer.appendChild(event.target.parentNode);
    event.target.removeEventListener("dragend", saveEtsyItem);
    imgParentAnchor.classList.add('saved-listing');
  } // closes saveEtsyItem function
}) // closes $submitButton eventListener

// code block for events search:
query = '';

var eventDatesArr = ["future", "today", "this week", "next week"];
var eventWithinMilesArr = [1, 2, 5, 10];
var eventCategoriesArr = ["music", "comedy", "learning_education", "family_fun_kids", "festivals_parades",
  "movies_film", "food", "art", "books", "attractions", "community", "singles_social", "outdoors_recreation",
  "performing_arts", "animals", "science", "sports", "technology", "other"];

//populate event dates with values:
var eventDateDropdown = document.querySelector('#event-date-dropdown');
for (var i = 0; i < eventDatesArr.length; i += 1) {
  var dateOption = document.createElement('option');
  dateOption.value = eventDatesArr[i];
  dateOption.innerText = eventDatesArr[i];
  eventDateDropdown.appendChild(dateOption);
}

//populate event categories with values:
var eventCategoryDropdown = document.querySelector('#event-category-dropdown');
for (var j = 0; j < eventCategoriesArr.length; j += 1) {
  var categoryOption = document.createElement('option');
  categoryOption.value = eventCategoriesArr[j];
  categoryOption.innerText = eventCategoriesArr[j];
  eventCategoryDropdown.appendChild(categoryOption);
}

//add event listener to submit button:
var submitButton2 = document.querySelector('#submit-btn2');
submitButton2.addEventListener('click', function() {
  console.log("button 2 was clicked!");

  var userLocationSearch = document.querySelector('#user-eventLoc-input').value;
  var userDistance = document.querySelector('#event-distance-dropdown').value;
  var userDates = document.querySelector('#event-date-dropdown').value;
  var userCategory = document.querySelector('#event-category-dropdown').value;

  // build up query strings:
  query = "http://api.eventful.com/json/events/search?category=" + userCategory + "&location=" + userLocationSearch + "&date=" + userDates + "&within=" + userDistance + "&app_key=" + EVENTFUL_KEY;
  console.log(query);

  // make ajax call:
  $.ajax({
    url: query,
    dataType: 'jsonp'

  }).done(function(response){
    console.log("success");
    console.log(response);

    var etsyEventsObj = response; // returns etsyListingsObj

    containerOne.classList.add('height');
    containerOne.style.background = '#CFE6DA';
    containerTwo.classList.add('height');
    containerTwo.style.background = '#DFBA9D';

    templateMakerEvents(etsyEventsObj);

  }).fail(function(response){

  }).always(function(response){

  });

  function templateMakerEvents(object) {
    // var giftIdeasH2 = document.querySelector('#gift-ideas');
    // giftIdeasH2.classList.remove('hidden');
    var savedIdeas = document.querySelector('#saved-h2');
    savedIdeas.classList.remove('hidden');
    containerTwo.classList.remove('hidden');

    var source = document.querySelector('#templateEvents').innerHTML;
    var template = Handlebars.compile(source);
    var templateContainer = document.querySelector('#templates-container');
    var html = template(object);
    templateContainer.innerHTML = html;

    var eventsArray = document.querySelectorAll('.event-img');
    for (var i = 0; i < eventsArray.length; i += 1) {
      eventsArray[i].addEventListener("dragend", saveEvent);
    } // closes for loop
  } // closes templateMakerEvents function

  var saveEvent = function(event) {
    console.log(event);
    // get the parent Div of dragged img:
    var eventParentDiv = event.target.parentNode.parentNode;
    eventParentDiv.parentNode.removeChild(eventParentDiv);

    var savedContainer = document.querySelector("#saved-container");
    savedContainer.appendChild(eventParentDiv);
    event.target.removeEventListener("dragend", saveEvent);
    eventParentDiv.classList.add('saved-event');
  } // closes saveEtsyItem function

}); // closes submitButton2 eventListener



}); // closed DOMContentLoaded

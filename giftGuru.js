document.addEventListener("DOMContentLoaded", function(event) {
console.log("js has loaded");

var $submitButton = $('#submit-btn');
$submitButton.on("click", function() {
  console.log('button was clicked');

  // gets user's search input:
  var $userSearch = $('#user-input').val();
  console.log($userSearch);

  








}) // closes $submitButton eventListener








}); // closed DOMContentLoaded

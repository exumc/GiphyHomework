
var animals = ["Dog", "Cat", "Bird", "Whale", "Tiger",];

function renderButtons() {
    $("#buttons").empty();

    for (var i = 0; i < animals.length; i++) {

      var a = $("<button>");
      a.addClass("animalBtn btn btn-primary");
      a.attr("data-animal", animals[i]);
      a.text(animals[i]);
      $("#buttons").append(a);
    }
  }
function getAnimal(){
var animal = $(this).attr("data-animal");
var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=avR2qndchMGCZ9czEqF58E1Ca3YYXSp3&tag=" + animal + "&rating=PG-13";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Store the url to the actual gif in a variable
      var imageUrl = response.data.image_original_url;

      // Create a new img tag
      var animalImage = $("<img>");

      // Set the attributes for the image tag
      animalImage.attr("src", imageUrl);
      animalImage.attr("alt", "Random image");

      //prepend the img tag into the images div
      $("#images").prepend(animalImage);
    });

    

};
$(".animalBtn").on("click", getAnimal);
renderButtons();

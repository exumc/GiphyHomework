//variables
var teams = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",];
var limit = 12;

//functions
function getTeam(){
  $("#gifs").empty();
var team = $(this).attr("data-team");

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=avR2qndchMGCZ9czEqF58E1Ca3YYXSp3&rating=PG-13&limit=" + limit;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;
    // Store the url to the actual gif in a variable
    for (var i = 0; i < results.length; i++){
      var imageUrl = results[i].images.fixed_width_still.url;

      // Create a new img tag
      var teamImage = $("<img>").attr("src", imageUrl);
      teamImage.attr("data-state", "still");
      teamImage.attr("data-still", results[i].images.fixed_width_still.url);
      teamImage.attr("data-animate", results[i].images.fixed_width.url);
      teamImage.addClass("gif");
      
      //prepend the img tag into the images div
      $("#gifs").prepend(teamImage);
    };
  })
}

function renderButtons() {
  $("#buttons").empty();

  for (var i = 0; i < teams.length; i++) {

    var a = $("<button>");
    a.addClass("teamBtn myBtn btn btn-primary mr-4");
    a.attr("data-team", teams[i]);
    a.text(teams[i]);
    $("#buttons").append(a);
  }
}

// Main js
var newH1 = $("<div>");
newH1.html("<h1>Click on a gif to play/pause</h1>");
newH1.addClass("col-md-12 text-center");
$(".main").prepend(newH1);
$("#search").append('<input type="text" class="form-control" id="team-input" placeholder="Input new team">');
$("#search").append('<button type="submit" class="btn btn-primary myBtn mt-2" id="add-team">Submit</button>');


$("#add-team").on("click", function(event) {
  event.preventDefault();

  var newTeam = $("#team-input").val();
  if (newTeam == ""){
    alert("Please input a team name.");
  }else{
  teams.push(newTeam);
  renderButtons();
  }
})

$(document).on("click", ".teamBtn", getTeam);

$(document).on("click", ".gif", function(){
  var dataState = $(this).attr("data-state");

      if (dataState === "still"){
        var animateUrl = $(this).attr("data-animate");
        $(this).attr("src", animateUrl);
        $(this).attr("data-state", "animate");
      }else {
        var stillUrl = $(this).attr("data-still")
        $(this).attr("src", stillUrl);
        $(this).attr("data-state", "still");
      }
    });
    
renderButtons();

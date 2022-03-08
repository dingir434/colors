var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

// detect clicks

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatedPress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// detect keypress if started is false run nextSequence() and change started value to true

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$("#start").click(function () {

$(".startbtn").fadeOut(100).fadeIn(100);

});

// check if user clicked what game choose

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {

      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over Press Any Key to Restart");

    startOver();

  }

}

// restart the game

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}

// play sounds

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

// animate buttons

function animatedPress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

// next sequence

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  // playSound(randomChosenColor);

  // gamePattern.forEach(element => setTimeout(function() {
  //   animatedPress(element)}, 1500));

  // var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  // audio.play();

  gamePattern.forEach(function(element, index) {
    setTimeout(function() {
      playSound(element);
      animatedPress(element);
    }, index * 1000);
  });

}

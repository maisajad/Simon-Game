var buttonColours = ["brown", "blue", "pink", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isStarted = false;
var level = 0;

$(document).keydown(function() {
  if (!isStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    isStarted = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  if(level%5===0 && level!=0){
    playSound("win");
    confetti.start();
    setTimeout(function(){confetti.stop();
    },1500);
    setInterval(function(){
      console.log("");
    }, 3000);
  }
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".wav");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length)
      setTimeout(function() {
        nextSequence();
      }, 1000);
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(
      function(){$("body").removeClass("game-over")},1000
    );
    $("#level-title").text("Game Over 😔 , Press Any Key to Restart");
    startOver();
  }
}

function startOver()
{
  level=0;
  gamePattern=[];
  isStarted=false;
}

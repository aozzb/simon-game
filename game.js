
var userClickedPattern=[];

var gamePattern=[];

var buttonColours=["red", "blue", "green", "yellow"];

var started=false;

var level=0;

$(document).keydown(function (){
    if(!started){
        $("#level-title").text("Level " + level);
        started=true;
        nextSequence();
    }
    
});

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);

}

$(".btn").on("click", function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
            userClickedPattern=[];
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
}


// dice.js contains the user state, no cookies are used
// Callback for buttons
// get guess value, ask server if answer is correct
// update line colour on text input, disable guess button + change dice image

$(document).ready(function() {
    $('#diceThrows').hide();
    $('#gameInfo').hide();
    $('#gameHistory').hide();
    $('#gameGuess').hide();
    $('#gameSuccess').hide();
    $('#gameHint').hide();
    $('#gameNonSuccess').hide();
    $('#gameProgress').hide();
    $('#gameControl').hide();
    $('#gameHelp').hide();

});

function startGame() {
    $("#startImage").hide();
    $('#diceThrows').show();
    $("#gameInfo").show();
    $('#gameHistory').show();
    $('#gameGuess').show();
    $("#gameProgress").show();
    $("#gameControl").show();
    $("#gameHelp").show();
    $('#gameSuccess').hide();
    $('#gameProgressBar').attr('aria-valuenow', 0).css('width', 0+'%');
    $('#gameProgressBar').removeClass("bg-success");
    $('#gameProgressBar').addClass("bg-info");
    $("#startGame").hide();
    $("#gameHint").hide();
    $("#gameNonSuccess").hide();

    //$("#numDotsHistory").empty();
    //$("#throwHistory").empty();

    $("#numDotsHistory").empty();
    $("#throwHistory").empty();
    $("#guessHistory").empty();

    $('#dotGuess').css("border-color", "#ced4da");

}

// remove this after test run, should only be in startGame()
function restartGame() {
    $("#numDotsHistory").empty();
    $("#throwHistory").empty();
    $("#guessHistory").empty();
}


$( "#startGame" ).click(function() {
  startGame();
});

$( "#makeGuess" ).click(function() {

    const answer = 42;
    let newProgress;

    let guess = parseInt($("#dotGuess").val());

    if (!isNaN(guess)) {

       $('#numDotsHistory').append("777"  + "<br>");
       $('#throwHistory').append("777"  + "<br>");
       $('#guessHistory').append(guess + "<br>");

        if (parseInt(guess) === answer) {
           let currentProgress = $('#gameProgressBar').attr('aria-valuenow');
           newProgress = parseInt(currentProgress) + 25;
           $('#gameProgressBar').attr('aria-valuenow', newProgress).css('width', newProgress+'%');

           $('#dotGuess').css("border-color", "#7ED957");

           if (newProgress === 100) {
              $('#gameProgressBar').removeClass("bg-info");
              $('#gameProgressBar').addClass("bg-success");
              $('#gameSuccess').show();
              $("#startGame").text("Play again");
              $("#startGame").show();
              //restartGame();
           }
        } else {
            console.log( "You guessed: " + guess + ". That was not correct. Try again!" );
            newProgress = 0;
            $('#gameProgressBar').attr('aria-valuenow', newProgress).css('width', newProgress+'%');
            $('#gameProgressBar').removeClass("bg-success");
            $('#gameProgressBar').addClass("bg-info");
            $('#dotGuess').css("border-color", "#FF5757");
        }
    } else {
        alert( "Submit an integer in the range (-∞, ∞)" );
        $('#dotGuess').css("border-color", "#FF5757")

    }
    $( "#dotGuess" ).val('');
});

// Show hint
$( "#showHint" ).click(function() {
    $("#gameHint").show();
});

// Show solution
$( "#showSolution" ).click(function() {
    $("#gameNonSuccess").show();
});

// Show game instructions
$( "#showInstructions" ).click(function() {
    $("#gameInstructions").show();
    $('#gameInstructions').alert();
});

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

    //$("#numDotsHistory").empty();
    //$("#throwHistory").empty();

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

    let guess = $("#dotGuess").val();
    if (parseInt(guess)) {
        if (parseInt(guess) === answer) {
           let currentProgress = $('#gameProgressBar').attr('aria-valuenow');
           newProgress = parseInt(currentProgress) + 25;
           $('#gameProgressBar').attr('aria-valuenow', newProgress).css('width', newProgress+'%');
           if (newProgress === 100) {
              $('#gameProgressBar').removeClass("bg-info");
              $('#gameProgressBar').addClass("bg-success");
              $('#gameSuccess').show();

              $("#startGame").text("Play again");
              $("#startGame").show();
              restartGame();
           }

        } else {
            alert( "You guessed: " + guess + ". That was not correct. Try again!" );
            newProgress = 0;
            $('#gameProgressBar').attr('aria-valuenow', newProgress).css('width', newProgress+'%');
            $('#gameProgressBar').removeClass("bg-success");
            $('#gameProgressBar').addClass("bg-info");
        }
    } else {
        alert( "Submit an integer in the range (-∞, ∞)" );
    }

    $( "#dotGuess" ).val('');

});

$( "#showHint" ).click(function() {
    $("#gameHint").show();
});

$( "#showSolution" ).click(function() {
    $("#gameNonSuccess").show();
});

$( "#showInstructions" ).click(function() {
    $("#gameInstructions").show();
    $('#gameInstructions').alert();
});

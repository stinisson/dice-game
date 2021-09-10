// dice.js contains the user state, no cookies are used
// Callback for buttons
// get guess value, ask server if answer is correct
// update line colour on text input, disable guess button + change dice image

$(document).ready(function() {
    const elements = ['#diceRolls', '#gameInfo', '#gameHistory', '#gameGuess', '#gameSuccess', '#gameHint',
        '#gameNonSuccess', '#gameProgress', '#gameControl', '#gameHelp'];
    elements.forEach(element => $(element).hide());
});

function startGame() {
    gameSetup();
    enableGameControl();
    emptyHistory();
    roll();
}

function gameSetup() {
    const showOnStart = ['#diceRolls', '#gameInfo', '#gameHistory', '#gameGuess', '#gameProgress', '#gameControl',
        '#gameHelp', '#gameProgress', '#gameControl', '#gameHelp'];
    const hideOnStart = ['#startImage', '#gameSuccess', '#startGame', '#gameHint', '#gameNonSuccess'];
    showOnStart.forEach(element => $(element).show());
    hideOnStart.forEach(element => $(element).hide());

    $('#gameProgressBar').attr('aria-valuenow', 0).css('width', 0+'%');
    $('#gameProgressBar').removeClass("bg-success");
    $('#gameProgressBar').addClass("bg-info");
    $('#dotGuess').css("border-color", "#ced4da");
}


function emptyHistory() {
    const elementsToReset = ['#numDotsHistory', '#rollHistory', '#guessHistory'];
    elementsToReset.forEach(element => $(element).empty());
}

function roll() {
    $.get( "/roll", function(data) {})
    .done(function(data) {
        let rollHistory = "| "
        data.roll.forEach(dice => rollHistory += dice + " | ");
        $('#rollHistory').append(rollHistory + "<br>");
        $('#numDotsHistory').append(data.translation + "<br>");
    })
    .fail(function(data) {
        console.log(data)
        alert( "Error while contacting the server");
    });
}

$( "#rollDice" ).click(function() {
    if ($(this).hasClass('disabled')) {
        return false;
    }
    $('#rollDice').addClass('disabled');
    roll();
    $('#makeGuess').removeClass('disabled');
    $('#makeGuess').addClass('enabled');
});


$( "#startGame" ).click(function() {
  startGame();
});

$( "#makeGuess" ).click(function() {

    // Allow only one guess per roll
    if ($(this).hasClass('disabled')) {
        return false;
    }

    const answer = 42;
    let newProgress;

    let guess = parseInt($("#dotGuess").val());

    if (!isNaN(guess)) {

        // Disable button after valid guess
        $(this).addClass('disabled');

        $('#rollDice').removeClass('disabled');
        $('#rollDice').addClass('enabled');

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

function enableGameControl() {
    $('#dotGuess').prop('readonly', false);

    $('#makeGuess').addClass('enabled');
    $('#makeGuess').removeClass('disabled');

    $('#rollDice').addClass('enabled');
    $('#rollDice').removeClass('disabled');

    $('#help').addClass('enabled');
    $('#help').removeClass('disabled');
}

function disableGameControl() {
    $('#dotGuess').prop('readonly', true);

    $('#makeGuess').addClass('disabled');
    $('#makeGuess').removeClass('enabled');

    $('#rollDice').addClass('disabled');
    $('#rollDice').removeClass('enabled');

    $('#help').addClass('disabled');
    $('#help').removeClass('enabled');
}

function endGame() {
    gameSetup();
    $("#startGame").show();
    $("#startGame").text('Play again');
    disableGameControl();
}

// Show hint
$( "#showHint" ).click(function() {
    $("#gameHint").show();
});

// Close hint
$('#closeHint').click(function() {
   $('#gameHint').hide();
})

// Show solution
$( "#showSolution" ).click(function() {
    $("#gameNonSuccess").show();
});

// Close solution
$('#closeSolution').click(function() {
   $('#gameNonSuccess').hide();
})

// Show game instructions
$( "#showInstructions" ).click(function() {
    $("#gameInstructions").show();
});

// End game
$( "#endGame" ).click(function() {
    endGame();
});

// Close instructions
$('#closeInstructions').click(function() {
   $('#gameInstructions').hide();
})

// Close game success
$('#closeGameSuccess').click(function() {
   $('#gameSuccess').hide();
})
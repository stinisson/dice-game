document.answer = null;

$(document).ready(function() {
    const elements = ['#diceRolls', '#gameInfo', '#gameHistory', '#gameGuess', '#gameSuccess', '#gameHint',
        '#gameNonSuccess', '#gameProgress', '#gameControl', '#gameHelp', '#firstRoll'];
    elements.forEach(element => $(element).hide());
    $('#dotGuess').val('');
});

function startGame() {
    disableGameControl();
    gameSetup();
    emptyHistory();
    roll();
    $('#firstRoll').show();
    $("#makeGuess").text("Guess");
    $('#makeGuess').attr('style', 'background-color: #7B84FF !important; border-color: #4752e5 !important');
}

function gameSetup() {
    const showOnStart = ['#diceRolls', '#gameProgress', '#gameControl',
        '#gameHelp', '#gameProgress', '#gameControl', '#gameHelp'];
    const hideOnStart = ['#startImage', '#gameSuccess', '#startGame', '#gameHint', '#gameNonSuccess', '#gameInstructions'];
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
    const gameHistory = ['#gameInfo', '#gameHistory', '#gameGuess'];
    gameHistory.forEach(element => $(element).hide());
}


function roll() {
    $.get( "/roll", function(data) {})
    .done(function(data) {
        document.answer = data.calculation;
        const integerMapping = {1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six"};
        let rollHistory = ""

        data.roll.forEach((dice, index) => {

            rollHistory += "<i class='fas fa-dice-" + integerMapping[dice] + " fa-lg'></i> ";
            const imageElement = "#dice-" + index;
            const imageSrc = "/static/dice/" + data.colors[index] +"_" + dice + ".png";
            $(imageElement).attr("src", imageSrc);

            if (dice % 2 === 0) {
                var $elie = $(imageElement), degree = 360, timer;
                function rotateAntiClockwise() {
                    $elie.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
                    $elie.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
                    if (degree > 0) {
                        timer = setTimeout(function() {
                            --degree; rotateAntiClockwise();
                        },5);
                    }
                } rotateAntiClockwise();
            } else {
                var $elie = $(imageElement), degree = 0, timer;
                function rotateClockwise() {
                    $elie.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
                    $elie.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
                    if (degree < 360) {
                        timer = setTimeout(function() {
                            ++degree; rotateClockwise();
                        },5);
                    }
                } rotateClockwise();
            }
        });

        setTimeout(function() {
            $('#firstRollAnswer').text("✨  " + document.answer + "  ✨");
            $('#rollHistory').append(rollHistory + "<br>");
            $('#numDotsHistory').append(data.calculation + "<br>");
        }, 2500);

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
    $('#rollDice').removeClass('enabled');
    $('#rollDice').addClass('disabled');
    roll();

    $('#dotGuess').css("border-color", "#ced4da");
    $('#dotGuess').prop('readonly', false);
    $('#dotGuess').focus();

    $('#makeGuess').removeClass('disabled');
    $('#makeGuess').addClass('enabled');
    $("#makeGuess").text("Guess");
    $('#makeGuess').attr('style', 'background-color: #7B84FF !important; border-color: #4752e5 !important');
});


$( "#startGame" ).click(function() {
    startGame();
    $('#firstRollAnswer').text("");
});

// Check if guess is correct or not
$( "#makeGuess" ).click(function() {

    // Allow one guess per roll
    if ($(this).hasClass('disabled')) { return false; }

    let newProgress;
    let guess = parseInt($("#dotGuess").val());
    if (!isNaN(guess)) {

        $(this).addClass('disabled'); // Disable button after valid guess

        $('#rollDice').removeClass('disabled');
        $('#rollDice').addClass('enabled');
        $('#dotGuess').prop('readonly', true);
        $('#rollDice').focus();

        $('#guessHistory').append(guess + "<br>");
        if (parseInt(guess) === document.answer) {
           let currentProgress = $('#gameProgressBar').attr('aria-valuenow');
           newProgress = parseInt(currentProgress) + 25;
           $('#gameProgressBar').attr('aria-valuenow', newProgress).css('width', newProgress+'%');
           $('#dotGuess').css("border-color", "#7ED957");
           $("#makeGuess").text("Correct");
           $('#makeGuess').attr('style', 'background-color: #7ED957 !important; border-color: #7ED957 !important;');

           if (newProgress === 100) {
              $('#gameProgressBar').removeClass("bg-info");
              $('#gameProgressBar').addClass("bg-success");
              $('#gameSuccess').show();
              $("#startGame").text("Play again");
              $("#startGame").show();
              $('#startGame').focus();
           }
        } else {
            newProgress = 0;
            $('#gameProgressBar').attr('aria-valuenow', newProgress).css('width', newProgress+'%');
            $('#gameProgressBar').removeClass("bg-success");
            $('#gameProgressBar').addClass("bg-info");
            $('#dotGuess').css("border-color", "#FF5757");
            $("#makeGuess").text("Wrong");
            $('#makeGuess').attr('style', 'background-color: #FF5757 !important; border-color: #FF5757 !important');
        }
    } else {

        alert( "Submit an integer in the range (-∞, ∞)" );
        $('#dotGuess').css("border-color", "#FF5757");
        $('#dotGuess').focus();
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

function disableGuessControl() {
    $('#dotGuess').prop('readonly', true);
    $('#makeGuess').addClass('disabled');
    $('#makeGuess').removeClass('enabled');
}

function endGame() {
    gameSetup();
    $("#startGame").show();
    $("#startGame").text('Play again');
    disableGameControl();
    $("#makeGuess").text("Guess");
    $('#makeGuess').attr('style', 'background-color: #7B84FF !important; border-color: #4752e5 !important');
    $("#firstRollAnswer").text("");
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

// Close first roll
$('#closeFirstRoll').click(function() {
    $('#firstRoll').hide();
    enableGameControl();
    disableGuessControl();
    const showAfterFirstRoll = ['#gameInfo', '#gameHistory', '#gameGuess'];
    showAfterFirstRoll.forEach(element => $(element).show());
    $('#guessHistory').append(" - <br>");
    $('#rollDice').focus();
})
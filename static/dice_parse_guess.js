
function parseGuess(guess_input) {
    let isInt = !isNaN(guess_input) && (function(x) { return (x | 0) === x; }) (parseFloat(guess_input));
    if (isInt) {
        let guess = parseInt(guess_input);
        if (guess >= -46656 && guess <= 46656) {
            return guess
        }
    }
    return "invalid";
}

if (typeof module  !== "undefined") {
    // export when running jest tests
    module.exports = parseGuess;
}

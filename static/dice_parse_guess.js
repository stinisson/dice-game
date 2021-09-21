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

// module is not defined when running jest tests
if (typeof module  !== "undefined") {
    module.exports = parseGuess;
}

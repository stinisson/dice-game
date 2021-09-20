from flask import Flask
from flask import render_template
from flask import request
import random


app = Flask(__name__)


@app.route('/')
def main():
    return render_template('main.html')


@app.route('/get-rule')
def get_rule():
    """
    Return a randomly selected game rule with hint and an explanation of the rule.
    """
    rules = {"Petals Around the Rose": ["The name of the game is Petals Around the Rose.", "For every head with a petal - exclude the head and calculate the sum of the petals."],
             "Multiply by two": ["The whole is (not) more important than the sum of its parts.", "Calculate the sum of the dice heads and multiply by two."],
             "Only count colored": ["Don't judge a book by its cover. Or, well. Please do.", "Calculate the sum of the colored dice heads."]}
    rule, info = random.choice(list(rules.items()))
    return {"rule": rule, "hint": info[0], "explanation": info[1]}


def petals(roll):
    """
    Take a list of dice heads and calculate the total number of dots according to 'Petals Around the Rose'.
    Every dice with a dot in the middle has a head and the surrounding dots are the petals.
    Thus, dice 5 has four petals. Dice 3 has two petals.
    """
    dot_sum = 0
    for dice in roll:
        if dice == 5:
            dot_sum += 4
        elif dice == 3:
            dot_sum += 2
    return dot_sum


def x2(roll):
    """
    Take a list of dice heads and multiply the sum of the dice heads by two.
    """

    dot_sum = 0
    for dice in roll:
        dot_sum += dice * 2
    return dot_sum


def only_colored(roll, colors):
    """
    Take a list of dice heads and calculate the sum of the colored dice heads.
    """
    dot_sum = 0
    for idx, color in enumerate(colors):
        if color != "white":
            dot_sum += roll[idx]
    return dot_sum


@app.route('/roll')
def generate_roll():
    """
    Simulate a dice roll. Return dice color and value for 6 dice together with the total number of dots
    according to the secret rule.
    """

    num_dice = 6
    dice_colors = ["white", "blue", "pink"]
    colors = [random.choice(dice_colors) for i in range(num_dice)]
    roll = [random.randint(1, 6) for i in range(num_dice)]

    rule = request.args.get('rule')

    if rule == "Petals Around the Rose":
        calculation = petals(roll)
    elif rule == "Multiply by two":
        calculation = x2(roll)
    elif rule == "Only count colored":
        calculation = only_colored(roll, colors)
    else:
        return None

    return {"roll": roll, "colors": colors, "calculation": calculation}


if __name__ == '__main__':
    app.run()

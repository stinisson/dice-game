from flask import Flask
from flask import render_template
import random

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('main.html')


def calculate_roll_value(roll):
    """
    Take roll as a list and calculate the total number of dots according to the secret rule.
    """
    dot_sum = 0
    for dice in roll:
        if dice == 5:
            dot_sum += 4
        elif dice == 3:
            dot_sum += 2
    return dot_sum


@app.route('/roll')
def generate_roll():
    """ Simulate a dice roll. Return dice color and value for 6 dice together with the total number of dots
        according to the secret rule. """
    num_dice = 6
    dice_colors = ["white", "blue", "pink"]
    colors = [random.choice(dice_colors) for i in range(num_dice)]
    roll = [random.randint(1, 6) for i in range(num_dice)]
    calculation = calculate_roll_value(roll)
    return {"roll": roll, "colors": colors, "calculation": calculation}


if __name__ == '__main__':
    app.run()

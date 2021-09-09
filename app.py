from flask import Flask
from flask import render_template
import random

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('main.html')


@app.route('/magic-rule')
def translate_roll(roll):
    # Take roll as a list and calculate the total number of dots according to the magic rule
    # roll = [1, 2, 3, 4, 5, 6]

    dotSum = 0
    for dice in roll:
        if dice == 5:
            dotSum += 4
        elif dice == 3:
            dotSum += 2
    return dotSum


@app.route('/roll')
def generate_roll():
    roll = [random.randint(1, 6) for i in range(6)]
    translation = translate_roll(roll)
    return {"roll": roll, "translation": translation}


@app.route('/main.png')
def main_plot():
    pass
    # img = get_main_image()
    # return send_file(img, mimetype='image/png', cache_timeout=0)


if __name__ == '__main__':
    app.run()

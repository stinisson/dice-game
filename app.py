from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('main.html')


@app.route('/main.png')
def main_plot():
    pass
    # img = get_main_image()
    # return send_file(img, mimetype='image/png', cache_timeout=0)


if __name__ == '__main__':
    app.run()

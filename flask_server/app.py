from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__)

# Path to the React build directory
BUILD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist')

@app.route('/')
def serve_index():
    return send_file(os.path.join(BUILD_DIR, 'index.html'))

@app.route('/<path:path>')
def serve_static(path):
    # Check if the file exists in the build directory
    if os.path.exists(os.path.join(BUILD_DIR, path)):
        return send_from_directory(BUILD_DIR, path)
    else:
        # For client-side routing, return index.html
        return send_file(os.path.join(BUILD_DIR, 'index.html'))

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(os.path.join(BUILD_DIR, 'assets'), filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)


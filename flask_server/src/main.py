from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__)

# Use absolute path to the dist directory
BUILD_DIR = '/app/dist'

@app.route('/')
def serve_index():
    index_path = os.path.join(BUILD_DIR, 'index.html')
    if os.path.exists(index_path):
        return send_file(index_path)
    else:
        # Debug information
        app_contents = os.listdir('/app') if os.path.exists('/app') else 'No /app directory'
        return f"Build directory not found at {BUILD_DIR}. /app contents: {app_contents}", 404

@app.route('/<path:path>')
def serve_static(path):
    # Check if the file exists in the build directory
    file_path = os.path.join(BUILD_DIR, path)
    if os.path.exists(file_path):
        return send_from_directory(BUILD_DIR, path)
    else:
        # For client-side routing, return index.html
        index_path = os.path.join(BUILD_DIR, 'index.html')
        if os.path.exists(index_path):
            return send_file(index_path)
        else:
            return f"File not found: {path}", 404

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    assets_dir = os.path.join(BUILD_DIR, 'assets')
    if os.path.exists(os.path.join(assets_dir, filename)):
        return send_from_directory(assets_dir, filename)
    else:
        return f"Asset not found: {filename}", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)


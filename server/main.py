from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/api/users', methods=['GET'])
def api():
    # data = request.get_json()
    # return jsonify(data)

    return jsonify({
        'users': [
            {
                'name': 'John',
                'email': 'something'
            },
            {
                'name': 'Jane',
                'email': 'somethingaswell'
            }
        ]
    })

if __name__ == '__main__':
    app.run(debug=True, port = 8080)



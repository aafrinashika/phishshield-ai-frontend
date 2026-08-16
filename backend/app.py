from flask import Flask
from flask_cors import CORS

from database.database import init_db
from routes.auth import auth


# Create Flask application
app = Flask(__name__)

# Allow React frontend to communicate with Flask
CORS(app)


# Register authentication routes
app.register_blueprint(auth)


# Test route
@app.route("/")
def home():

    return {
        "message": "PhishShield AI Backend is Running!"
    }


# Start Flask server
if __name__ == "__main__":

    # Create database/tables
    init_db()

    # Start server
    app.run(
        debug=True,
        port=5000
    )
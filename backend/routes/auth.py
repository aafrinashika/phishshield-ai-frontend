from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from database.database import get_db_connection


auth = Blueprint("auth", __name__)


# =========================
# REGISTER
# =========================

@auth.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received"
        }), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "Name, email and password are required"
        }), 400

    if len(password) < 8:
        return jsonify({
            "success": False,
            "message": "Password must be at least 8 characters"
        }), 400

    hashed_password = generate_password_hash(password)

    connection = get_db_connection()

    try:

        connection.execute(
            """
            INSERT INTO users
            (name, email, password, role)
            VALUES (?, ?, ?, ?)
            """,
            (
                name,
                email,
                hashed_password,
                "individual"
            )
        )

        connection.commit()

    except Exception as error:

        connection.close()

        print("Registration error:", error)

        return jsonify({
            "success": False,
            "message": "Email already exists"
        }), 409

    connection.close()

    return jsonify({
        "success": True,
        "message": "Registration successful"
    }), 201


# =========================
# LOGIN
# =========================

@auth.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received"
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required"
        }), 400

    connection = get_db_connection()

    user = connection.execute(
        """
        SELECT id, name, email, password, role
        FROM users
        WHERE email = ?
        """,
        (email,)
    ).fetchone()

    connection.close()

    # User not found
    if user is None:
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    # Check hashed password
    if not check_password_hash(user["password"], password):
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    return jsonify({
        "success": True,
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }), 200
from flask import Flask, jsonify 
from flask import render_template, url_for, request, redirect
from flask import session
from markupsafe import escape
import os
import queries
import send_sms, send_email

app: Flask = Flask(__name__, static_folder="../front/static/", static_url_path="/static", 
                   template_folder="../front/pages/")
app.secret_key = "prettySecret"

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/submit", methods=["POST"])
async def takePhone():
    if request.method == "POST":
        try:
            data = request.get_json()
            if data and "type" in data:
                if data["type"] == "email":
                    if "email" in data and "name" in data and "preferred_response" in data:
                        email = data["email"]
                        name = data["name"]
                        preferred_response = data["preferred_response"]
                        if preferred_response == 1:
                            # Assuming 1 means email
                            query = f"INSERT INTO your_table (name, email, phone, preferred_response) VALUES ('{name}', '{email}', NULL, {preferred_response});"
                            await queries.connect_db(query)
                            send_email.send_email(email)
                            return jsonify(response="success", message="Email data processed")
                        else:
                            return jsonify(response="error", message="Invalid 'preferred_response' value for email"), 400
                    else:
                        return jsonify(response="error", message="Missing 'email', 'name', or 'preferred_response' for type 'email'"), 400
                elif data["type"] == "sms":
                    if "phone" in data and "name" in data and "preferred_response" in data:
                        phone = data["phone"]
                        name = data["name"]
                        preferred_response = data["preferred_response"]
                        if preferred_response == 2:
                            # Assuming 2 means sms
                            query = f"INSERT INTO your_table (name, email, phone, preferred_response) VALUES ('{name}', NULL, '{phone}', {preferred_response});"
                            await queries.connect_db(query)
                            send_sms.send_sms(phone)
                            return jsonify(response="success", message="SMS data processed")
                        else:
                            return jsonify(response="error", message="Invalid 'preferred_response' value for sms"), 400
                    else:
                        return jsonify(response="error", message="Missing 'phone', 'name', or 'preferred_response' for type 'sms'"), 400
                else:
                    return jsonify(response="error", message="Invalid 'type' in request"), 400
            else:
                return jsonify(response="error", message="Missing 'type' in request data"), 400
        except Exception as e:
            return jsonify(response="error", message=f"Error processing request: {str(e)}"), 500
    else:
        return jsonify(response="error", message="Only POST requests are allowed"), 405

@app.route("/update", methods=["GET"])
def updateQueue():
    if request.method == "GET":
        queue_id = request.args.get("id") # Renamed 'record_id' to 'queue_id' for clarity
        session_user_id = session.get("user_id") # Assuming you store a user ID in the session

        if not queue_id:
            return jsonify({"error": "Missing 'id' parameter (queue ID)"}), 400

        if not session_user_id:
            return jsonify({"error": "User not authenticated"}), 401 # Unauthorized access

        try:
            # Step 1: Verify ownership/access to the requested queue_id
            # This query checks if the 'queue_id' exists and belongs to the 'session_user_id'.
            # Replace 'your_queues_table' and 'owner_user_id_column' with your actual table and column names.
            verification_query = f"SELECT 1 FROM your_queues_table WHERE queue_id = '{queue_id}' AND owner_user_id_column = '{session_user_id}';"
            verification_result = queries.connect_db(verification_query)

            if not verification_result:
                # If no record is found, it means the queue_id doesn't exist or doesn't belong to this user
                return jsonify({
                    "response": "unauthorized",
                    "message": f"Queue with ID '{queue_id}' not found or you do not have access."
                }), 403 # Forbidden

            # Step 2: If authorized, retrieve the entire queue
            # This query fetches all items associated with the verified 'queue_id'.
            # Replace 'your_queue_items_table' and 'queue_id_column' with your actual table and column names.
            queue_items_query = f"SELECT * FROM your_queue_items_table WHERE queue_id_column = '{queue_id}' ORDER BY item_order_column ASC;"
            entire_queue_data = queries.connect_db(queue_items_query)

            if entire_queue_data is not None:
                return jsonify({
                    "response": "success",
                    "queue_id": queue_id,
                    "queue_data": entire_queue_data # This will be the list of items in the queue
                }), 200
            else:
                # This case might mean the queue exists but has no items, or a DB error occurred
                return jsonify({
                    "response": "error",
                    "message": f"Could not retrieve queue items for queue ID '{queue_id}'."
                }), 500

        except Exception as e:
            # Catch any unexpected errors during database operations
            return jsonify({"error": f"An internal server error occurred: {str(e)}"}), 500
    else:
        # This block should technically not be reached due to @app.route methods=["GET"]
        return jsonify({"error": "Only GET requests are allowed for this route"}), 405

if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True, threaded=False)

from flask import Flask, request, jsonify
from flask_cors import CORS
import oracledb;

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/admin', methods=['GET'])

def admin():
    # data = request.get_json()
    # return jsonify(data)

# Replace with your actual credentials
    username = "ora_CWLID"
    mypassword = "a123456789"

    ubchost = "dbhost.students.cs.ubc.ca" 

    global connection
    connection = oracledb.connect(user = username, password = mypassword, host = ubchost, port = 1522, sid = "stu")

    return jsonify({
        'message': 'connection established'
    })

if __name__ == '__main__':
    app.run(debug=True, port = 8080)
    
@app.route('/calendar', methods=['GET'])

def calendar():
    if request.method == 'GET':
        # return the calendar information from the database here.    
        result = []
        # TODO: WRITE THE QUERY FOR CALENDAR HERE. CHECK ON THE FIELDS IN THE FOLLOWING FOR LOOP TO SEE IF THEY ALIGN WITH THE CURSOR.
        query = ''
        cursor = connection.cursor()
        cursor.execute(query)
        for Year, YearTheme, Date, Summary, EmotionBoard, IssueBoard in cursor:
            result.append(jsonify({
            "Year": Year,
            "YearTheme": YearTheme,
            "Date": Date,
            "Summary": Summary,
            "EmotionBoard": EmotionBoard,
            "IssueBoard": IssueBoard
        }))
        return result
        

@app.route('/diaryentry', methods = ['PUT']) 
def diaryentry():
    if request.method == 'PUT':
        # send the information to the database
        # TODO: WRITE THE INQUERY and CHECKQUERY FOR CALENDAR HERE. INQUERY CREATES THE INPUTS BASED ON WHAT THE USER GAVE AND CHECKQUERY QUERY THE DATABASE AND RETURN RESULT.
        # CHECK IF THAT RESULT IS NOT NULL TO MAKE SURE THAT THE THING HAS ACTUALLY BEEN ADDED.
        # use the inputquery based on request.json which is the json input from the frontend for the user input.
        inputquery = ''
        checkquery = ''
        cursor = connection.cursor()
        cursor.execute(inputquery)
        cursor.execute(checkquery)
        # for Year, YearTheme, Date, Summary, EmotionBoard, IssueBoard in cursor:
        #     result.append(jsonify({
        #     "Year": Year,
        #     "YearTheme": YearTheme,
        #     "Date": Date,
        #     "Summary": Summary,
        #     "EmotionBoard": EmotionBoard,
        #     "IssueBoard": IssueBoard
        # }))
        return result

# TODO: CHANGE THIS WITH DAVID'S IMPLEMENTATION.
# const sendData = await request("http://localhost:8080/calendar").send(jsonify(singleuserinputobject));

@app.route('/emotionboard', methods = ['GET'])

def emotionboard():
     if request.method == 'GET':
        # return the calendar information from the database here.    
        result = []
        # TODO: WRITE THE QUERY FOR DIARY HERE. CHECK ON THE FIELDS IN THE FOLLOWING FOR LOOP TO SEE IF THEY ALIGN WITH THE CURSOR.
        query = ''
        cursor = connection.cursor()
        cursor.execute(query)
        for ID, Subtype, Overalltype in cursor:
            result.append(jsonify({
            "ID": ID,
            "Subtype": Subtype,
            "OverallType": Overalltype,
        }))
        return result

@app.route('/friends', methods = ['GET'])

def friends():
    if request.method == "GET":
        # return the calendar information from the database here.    
        result = []
        # TODO: WRITE THE QUERY FOR DIARY HERE. CHECK ON THE FIELDS IN THE FOLLOWING FOR LOOP TO SEE IF THEY ALIGN WITH THE CURSOR.
        query = ''
        cursor = connection.cursor()
        cursor.execute(query)
        for ID, Name, Email, Placemet in cursor:
            result.append(jsonify({
            "ID": ID,
            "Name": Name,
            "Email": Email,
            "Placemet": Placemet,
        }))
        return result
    
@app.route('/goallist', methods = ['GET'])
def goallist():
    if request.method == "GET":
        # return the calendar information from the database here.    
        result = []
        # TODO: WRITE THE QUERY FOR DIARY HERE. CHECK ON THE FIELDS IN THE FOLLOWING FOR LOOP TO SEE IF THEY ALIGN WITH THE CURSOR.
        query = ''
        cursor = connection.cursor()
        cursor.execute(query)
        for GoalID, GoalDescription, Status in cursor:
            result.append(jsonify({
            "GoalID": GoalID,
            "GoalDescription": GoalDescription,
            "Status": Status,
        }))
        return result
@app.route('/issueboard', methods = ['GET'])
def issueboard():
    if request.method == "GET":
        # return the calendar information from the database here.    
        result = []
        # TODO: WRITE THE QUERY FOR DIARY HERE. CHECK ON THE FIELDS IN THE FOLLOWING FOR LOOP TO SEE IF THEY ALIGN WITH THE CURSOR.
        query = ''
        cursor = connection.cursor()
        cursor.execute(query)
        for IssueID, Name, Resolved, Date, Details in cursor:
            result.append(jsonify({
            "IssueID": IssueID,
            "Name": Name,
            "Resolved": Resolved,
            "Date": Date,
            "Details": Details
        }))
        return result

import json
from flask import Flask, abort, request, jsonify, session
from flask_cors import CORS

from flask_session import Session
from flask_bcrypt import  Bcrypt
from flask_sqlalchemy import SQLAlchemy
from config import ApplicationConfig
# from models import db, User, Goal
import psycopg2
import uuid

import logging


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
server_session = Session(app)

username = "postgres"
password = "elysia"
host = 'localhost'
port = '5433'
db_name = 'elysia'

connection = psycopg2.connect(database = db_name, host = host, password = password, port = 5433, user = username)
@app.route("/calendar/admin", methods = ['GET'])

def admin():
    connection = psycopg2.connect(database = db_name, host = host, password = password, port = 5433, user = username)
    # try:
    q1 = "WITH tablename(tab) AS (SELECT table_name AS tab FROM information_schema.tables WHERE table_schema='public') "
    q2 = " SELECT tablename.tab AS TABLE, column_name FROM INFORMATION_SCHEMA.COLUMNS, tablename WHERE table_name = tablename.tab"
    q3 = " GROUP BY tablename.tab, column_name"
    query = q1 + q2 + q3
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    result = json.dumps(data)
    cursor.close()
    return jsonify({
            "result": result
    })
    # except:
    #     return jsonify({
    #         "error": "There is an error"
    #     })

@app.route('/user', methods=['GET'])
def get_user_details():
    try:
        user_id = request.args.get('id')
        cursor = connection.cursor()
        cursor.execute("SELECT uName, Email FROM Users WHERE uID = %s", (user_id,))
        user_details = cursor.fetchone()
        cursor.close()
        print(user_details[0], user_details[1])
        if user_details:
            return jsonify({"Name": user_details[0], "Email": user_details[1]}), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except (Exception, psycopg2.Error) as error:
        print("Error fetching user details from database:", error)
        return jsonify({"error": "Error fetching user details"}), 500     

@app.route('/users', methods=['GET'])
def get_users():
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT uID, uName, Email FROM Users")
        users = cursor.fetchall()
        cursor.close()
        
        user_list = []
        for user in users:
            user_dict = {
                'id': user[0],
                'name': user[1],
                'email': user[2]
            }
            user_list.append(user_dict)
        
        return jsonify(user_list)
    except:
        return jsonify({
            "error": "Something is wrong. Please try again."
        })
    

@app.route("/register", methods=["POST"])
def register_user():
    try:
        name = request.json["name"]
        email = request.json["email"]
        password = request.json["password"]
        uID = str(uuid.uuid4())

        cursor = connection.cursor()

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        try:
            cursor.execute("INSERT INTO Users (uID, uName, Email, Passw) VALUES (%s, %s, %s, %s)", (uID, name, email, hashed_password))
            
            connection.commit()
            return jsonify({
                "uName": name,
                "Email": email,
            }), 201 
        except psycopg2.Error as e:
            print("Error while registering user:", e)
            return jsonify({"error": "Failed to register user"}), 500
        finally:
            cursor.close()
    except:
        return jsonify({
            "error": "Something is wrong.Please try again."
        })

@app.route("/login", methods=["POST"])
def login_user():
    try:
        email = request.json["email"]
        password = request.json["password"]

        cursor = connection.cursor()
        cursor.execute("SELECT uID, Email, Passw FROM Users WHERE Email = %s", (email,))
        user = cursor.fetchone()

        if user is None:
            return jsonify({"error": "User not found"}), 404
        
        uID, stored_email, stored_password = user

        if not bcrypt.check_password_hash(stored_password, password):
            return jsonify({"error": "Unauthorized"}), 401
        

        session["uID"] = uID
        session.modified = True

        return jsonify({
            "uID": uID,
            "email": stored_email
        })
    except:
        return jsonify({
            "error": "Something is wrong"
        })
   


@app.route('/userupdate', methods = ['PUT', 'GET', 'DELETE'])
def userupdate():
    try:
        user_id = session.get("uID")

        cursor = connection.cursor()
        cursor.execute("SELECT uName, Email, Passw FROM Users WHERE uID = %s", (user_id,))
        user = cursor.fetchone()

        if not user:
            cursor.close()
            return jsonify({"error": "User not found"}), 404
        
        uName, stored_email, stored_password = user

        if request.method == "GET":
            cursor.close()
            return jsonify({
                "id": user_id,
                "name": uName,
                "email": stored_email
            })

        if request.method == "PUT":
            data = request.json
            currStatus = data.get("status")

            if currStatus == "nameChange":
                new_name = data.get("name")
                if new_name:
                    cursor.execute("UPDATE Users SET uName = %s WHERE uID = %s", (new_name, user_id))
                    connection.commit()
                    cursor.close()
                    return jsonify({"message": "Name updated successfully"})
                else:
                    return jsonify({"error": "New name not provided"}), 400
                
            if currStatus == "emailChange":
                new_email = data.get("email")
                if new_email:
                    cursor.execute("UPDATE Users SET Email = %s WHERE uID = %s", (new_email, user_id))
                    connection.commit()
                    cursor.close()
                    return jsonify({"message": "Email updated successfully"})
                else:
                    return jsonify({"error": "New email not provided"}), 400
                
            if currStatus == "passwordChange":
                old_password = data.get("oldPassword")
                new_password = data.get("newPassword")
                if not old_password or not new_password:
                    return jsonify({"error": "Old password and new password are required"}), 400
                if not bcrypt.check_password_hash(stored_password, old_password):
                    return jsonify({"error": "Old password is incorrect"}), 401
                
                hashed_new_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
                cursor.execute("UPDATE Users SET Passw = %s WHERE uID = %s", (hashed_new_password, user_id))
                connection.commit()
                cursor.close()
                return jsonify({"message": "Password updated successfully."})


        if request.method == "DELETE":
            cursor.execute("DELETE FROM Users WHERE uID = %s", (user_id,))
            connection.commit()
            cursor.close()
            return jsonify({"message": "User deleted successfully"})
    except:
        return jsonify({
            "error": "Something is wrong. Please try again."
        }) 

 
@app.route('/friends', methods=['GET', 'POST'])
def get_or_add_friends():

    user_id = session.get("uID")
    if request.method == 'GET':
        try:
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM HaveFriend WHERE UserID = %s", (user_id,))
            friends_data = cursor.fetchall()
            cursor.close()

            friends = []
            for friend in friends_data:
                friend_dict = {
                    "UserID": friend[0],
                    "FriendID": friend[1],
                    "PlaceMet": friend[2]
                }
                friends.append(friend_dict)

            return jsonify(friends)

        except (Exception, psycopg2.Error) as error:
            print("Error fetching data:", error)
            return jsonify({"error": "Error fetching data"}), 500

    if request.method == 'POST':
        try:
            print("userID", user_id)
            new_friend_data = request.json
        
            cursor = connection.cursor()
            cursor.execute("SELECT uID FROM Users WHERE uName = %s AND Email = %s", (new_friend_data["Name"], new_friend_data["Email"]))
            friend_id = cursor.fetchone()
            if not friend_id:
                return jsonify({"error": "Friend not found"}), 404
            print("friend-id", friend_id[0])

            cursor.execute("INSERT INTO HaveFriend (UserID, FriendID, PlaceMet) VALUES (%s, %s, %s)",
                          (user_id, friend_id[0], new_friend_data["PlaceMet"]))
            
            # cursor.execute("INSERT INTO HaveFriend (UserID, FriendID, PlaceMet) VALUES (%s, %s, %s)",
            #               (friend_id[0], user_id, new_friend_data["PlaceMet"]))

            connection.commit()
            cursor.close()

            return jsonify({"message": "Friend added successfully"}), 200

        except (Exception, psycopg2.Error) as error:
            print("Error adding friend:", error)
            return jsonify({"error": "Error adding friend"}), 500


@app.route('/calendar/<string:options>', methods=['POST'])

def calendar(options):
    try:
        connection = psycopg2.connect(database = db_name, host = host, password = password, port = 5433, user = username)        
        if request.method == 'POST':
            result = [] 
            # TODO: WRITE THE QUERY FOR CALENDAR HERE. CHECK ON THE FIELDS IN THE FOLLOWING FOR LOOP TO SEE IF THEY ALIGN WITH THE CURSOR.
            if (("projection" in options) and ("selection" in options)):
                selection = request.json["selection"]
                projection = request.json["projection"]
                verification = "u.Email = '" + request.json["email"] + "'"
                l1 =  'm.UserID = u.uID AND u.uID = y.UserID AND i.UserID = u.uID '
                l2 = ' AND yt.theme = m.Theme '
                l3 = ' AND yt.YearTheme = y.YearTheme AND yt.yearfield = y.yearfield AND yt.yearID = y.yearID'
                l4 = ' AND y.yearfield = idy.yearfield AND idy.yeartheme = y.yeartheme AND idy.yearID = y.yearID'
                l5 = ' AND EB.yearfield = y.yearfield AND EB.yeartheme = y.yeartheme AND EB.UserID = u.uid'
                l6 = ' AND ebt.Subtypes = EB.Subtypes AND ebt.EmotionID = EB.EmotionID'
                l7 = ' AND idy.issueID = i.issueID '
                connectingtable = l1 + l2 + l3 + l4 + l5 + l6 + l7
                query = 'SELECT u.Email, ' + projection + ' FROM YearTheme yt, Menu m, Users u, Years y, IssueDateYear idy, EB, Issue i, EBType ebt'+ ' WHERE ' + connectingtable + ' AND ' + verification + ' AND ' + selection + ";"
                cursor = connection.cursor()
                cursor.execute(query)
                data = cursor.fetchall()
                result = json.dumps(data)
            elif (("selection" in options)):
                projection = 'SELECT u.email as Email, y.yearfield as Year, y.Yeartheme as Yeartheme, yt.Theme as Theme, y.Summary as Summary, '+ 'y.UserID as UserID'
                selection = "(" + request.json["selection"] + ")"
                verification = "u.Email = '" + request.json["email"] + "'"
                l1 =  'm.UserID = u.uID AND u.uID = y.UserID AND i.UserID = u.uID '
                l2 = ' AND yt.theme = m.Theme '
                l3 = ' AND yt.YearTheme = y.YearTheme AND yt.yearfield = y.yearfield AND yt.yearID = y.yearID'
                l4 =' AND y.yearfield = idy.yearfield AND idy.yeartheme = y.yeartheme AND idy.yearID = y.yearID'
                l5 = ' AND EB.yearfield = y.yearfield AND EB.yeartheme = y.yeartheme AND EB.UserID = u.uid'
                l6 = ' AND ebt.Subtypes = EB.Subtypes AND ebt.EmotionID = EB.EmotionID'
                l7 = ' AND idy.issueID = i.issueID '
                connectingtable = l1 + l2 + l3 + l4 + l5 + l6 + l7
                query = projection + ' FROM YearTheme yt, Menu m, Users u, Years y, IssueDateYear idy, EB, Issue i, EBType ebt' + ' WHERE ' + connectingtable + ' AND ' + verification + "AND " + selection + ";"       
                cursor = connection.cursor()
                cursor.execute(query)
                data = cursor.fetchall()
                result = json.dumps(data)
            elif (("projection" in options)):
                projection = "SELECT " + request.json["projection"] + " "
                # verification = " WHERE u.Email = '" + request.json["email"] + "'" + " AND "
                if ("projectiontable" in request.json):
                # l1 =  'm.UserID = u.uID AND u.uID = y.UserID AND i.UserID = u.uID '
                # l2 = ' AND yt.theme = m.Theme '
                # l3 = ' AND yt.YearTheme = y.YearTheme AND yt.yearfield = y.yearfield AND yt.yearID = y.yearID'
                # l4 = ' AND y.yearfield = idy.yearfield AND idy.yeartheme = y.yeartheme AND idy.yearID = y.yearID'
                # l5 = ' AND EB.yearfield = y.yearfield AND EB.yeartheme = y.yeartheme AND EB.UserID = u.uid'
                # l6 = ' AND ebt.Subtypes = EB.Subtypes AND ebt.EmotionID = EB.EmotionID'
                # l7 = ' AND idy.issueID = i.issueID '

                    query = projection + " FROM " + request.json["projectiontable"]
                # query = projection + ' FROM YearTheme yt, Menu m, Users u, Years y, IssueDateYear idy, EB, Issue i, EBType ebt'+ ' WHERE ' + connectingtable + ' AND ' + verification + ";"
                cursor = connection.cursor()
                cursor.execute(query)
                data = cursor.fetchall()
                result = json.dumps(data)
            elif (options == 'none' and request.json["issue"] != None):
                verification = "u.Email = '" + request.json['email'] + "'"
                projection = 'SELECT u.Email, y.Yearfield as Year, y.Yeartheme as Yeartheme, yt.Theme as Theme, ' + ' y.Summary as Summary'
                l2 = ' AND y.yearfield = idy.yearfield AND idy.yeartheme = y.yeartheme AND idy.yearID = y.yearID' + ' AND EB.yearfield = y.yearfield AND EB.yeartheme = y.yeartheme AND EB.UserID = u.uid'
                l3 = ' AND ebt.Subtypes = EB.Subtypes AND ebt.EmotionID = EB.EmotionID' + ' AND idy.issueID = i.issueID '
                connectingtable =  'm.UserID = u.uID AND u.uID = y.UserID AND i.UserID = u.uID ' + ' AND yt.theme = m.Theme '+ ' AND yt.YearTheme = y.YearTheme AND yt.yearfield = y.yearfield AND yt.yearID = y.yearID' + l2 + l3
                query = projection + ' FROM YearTheme yt, Menu m, Users u, Years y, IssueDateYear idy, EB, Issue i, EBType ebt' + ' WHERE ' + connectingtable + ' AND ' + verification + ";"
                cursor = connection.cursor()
                cursor.execute(query)
                if (cursor.fetchone() == None):
                    return jsonify({
                        "error": "No data found"
                    })
                data = cursor.fetchall()
                result = json.dumps(data)
            elif (options == 'GROUPBY'):
                verification = "u.Email = '" + request.json['email'] + "'"
                # number of issues by years and within a year if specified.
                
                if ("year" not in request.json):
                    yearcondition = ''
                else:
                    yearcondition = 'AND y.yearfield = ' + str(request.json["year"])
                        
                if (request.json["table"] == "Issue"):
                    projection = 'y.yearfield as Year, Count(i.issueID) as NumberofIssue'
                    l1 =  'm.UserID = u.uID AND u.uID = y.UserID AND i.UserID = u.uID '
                    l2 = ' AND yt.theme = m.Theme '
                    l3 = ' AND yt.YearTheme = y.YearTheme AND yt.yearfield = y.yearfield AND yt.yearID = y.yearID'
                    l4 = ' AND y.yearfield = idy.yearfield AND idy.yeartheme = y.yeartheme AND idy.yearID = y.yearID'
                    l5 = ' AND EB.yearfield = y.yearfield AND EB.yeartheme = y.yeartheme AND EB.UserID = u.uid'
                    l6 = ' AND ebt.Subtypes = EB.Subtypes AND ebt.EmotionID = EB.EmotionID'
                    l7 = ' AND idy.issueID = i.issueID '
                    connectingtable = l1 + l2 + l3 + l4 + l5 + l6 + l7
                    query = 'SELECT u.Email, ' + projection + ' FROM YearTheme yt, Menu m, Users u, Years y, IssueDateYear idy, EB, Issue i, EBType ebt' + ' WHERE ' + connectingtable + ' AND ' + verification + yearcondition + ' GROUP BY Year, u.Email'";"
                    result = []
                    cursor = connection.cursor()
                    cursor.execute(query)
                    data = cursor.fetchall()
                    result = json.dumps(data)
                # number of emotions within a year
                elif (request.json["table"] == "EB") :
                    projection = 'y.yearfield as Year, Count(EB.EmotionID) as NumberofEmotions'
                    l1 =  'm.UserID = u.uID AND u.uID = y.UserID AND i.UserID = u.uID '
                    l2 = ' AND yt.theme = m.Theme '
                    l3 = ' AND yt.YearTheme = y.YearTheme AND yt.yearfield = y.yearfield AND yt.yearID = y.yearID'
                    l4 = ' AND y.yearfield = idy.yearfield AND idy.yeartheme = y.yeartheme AND idy.yearID = y.yearID'
                    l5 = ' AND EB.yearfield = y.yearfield AND EB.yeartheme = y.yeartheme AND EB.UserID = u.uid'
                    l6 = ' AND ebt.Subtypes = EB.Subtypes AND ebt.EmotionID = EB.EmotionID'
                    l7 = ' AND idy.issueID = i.issueID '
                    connectingtable = l1 + l2 + l3 + l4 + l5 + l6 + l7
                    query = 'SELECT u.Email, ' + projection + ' FROM YearTheme yt, Menu m, Users u, Years y, IssueDateYear idy, EB, Issue i, EBType ebt' + ' WHERE ' + connectingtable + ' AND ' + verification + yearcondition + ' GROUP BY Year, u.Email'";"
                    result = []
                    cursor = connection.cursor()
                    cursor.execute(query)
                    data = cursor.fetchall()
                    result = json.dumps(data)
                    
                
            elif (options == 'HAVING'):
                # number of issues within the recent * year for each theme. * to be inputted by the user 
                # use resolved or not as the step for having.
                # DAVID: Note the name of the body field
                verification = "u.Email = '" + request.json["email"] + "'"
                if ("resolvedissue" not in request.json):
                    resolved = ''
                else:
                    resolved = ' AND i.Resolved = TRUE'
                if ("recentyearno" not in request.json):
                    maxyearforeachtheme = ''
                    recentyearcondition = ''
                else:
                    s1 = 'WITH maxyear(Yeartheme, Maxyear) AS (SELECT yt.Yeartheme, Max(idy.yearfield) AS Maxyear'
                    s2 =' FROM YearTheme yt, Menu m, Users u, Years y, IssueDateYear idy, EB, Issue i, EBType ebt'
                    s3 = ' WHERE m.UserID = u.uID AND u.uID = y.UserID AND i.UserID = u.uID '
                    s4 = ' AND yt.theme = m.Theme '
                    s5 = ' AND yt.YearTheme = y.YearTheme AND yt.yearfield = y.yearfield AND yt.yearID = y.yearID'
                    s6 = ' AND y.yearfield = idy.yearfield AND idy.yeartheme = y.yeartheme AND idy.yearID = y.yearID'
                    s7 = ' AND EB.yearfield = y.yearfield AND EB.yeartheme = y.yeartheme AND EB.UserID = u.uid'
                    s8 = ' AND ebt.Subtypes = EB.Subtypes AND ebt.EmotionID = EB.EmotionID'
                    s9 = ' AND idy.issueID = i.issueID AND ' + verification 
                    s10 = ' GROUP BY yt.Yeartheme)'
                    maxyearforeachtheme = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9 + s10
                    recentyearcondition = 'AND maxyear.Maxyear > (2024 - ' + str(request.json["recentyearno"]) + ')'
                    recentyearcondition2 = 'AND maxyear.Maxyear < (2024 + ' + str(request.json["recentyearno"]) + ')'
                if ("recentyearno" in request.json and "resolvedissue" not in request.json):
                    
                    l1 = ' SELECT DISTINCT y.Yeartheme as Yeartheme, Count(i.issueID) as CountIssue, maxyear.maxyear'
                    l2 = ' FROM YearTheme yt, Menu m, Users u, Years y, IssueDateYear idy, EB, Issue i, EBType ebt, maxyear'
                    l3 = ' WHERE m.UserID = u.uID AND u.uID = y.UserID AND i.UserID = u.uID '
                    l4 = ' AND yt.theme = m.Theme '
                    l5 = ' AND yt.YearTheme = y.YearTheme AND yt.yearfield = y.yearfield AND yt.yearID = y.yearID'
                    l6 = ' AND y.yearfield = idy.yearfield AND idy.yeartheme = y.yeartheme AND idy.yearID = y.yearID'
                    l7 = ' AND EB.yearfield = y.yearfield AND EB.yeartheme = y.yeartheme AND EB.UserID = u.uid'
                    l8 = ' AND ebt.Subtypes = EB.Subtypes AND ebt.EmotionID = EB.EmotionID'
                    l9 = ' AND idy.issueID = i.issueID AND ' + verification 
                    l10 = ' GROUP BY y.Yeartheme, maxyear.Yeartheme, maxyear.maxyear'
                    l11 = ' HAVING maxyear.Yeartheme = y.Yeartheme '+ recentyearcondition + recentyearcondition2
                    query = maxyearforeachtheme + l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8 + l9 + l10 + l11
                elif ("recentyearno" in request.json and "resolvedissue" in request.json):
                    
                    l1 = ' SELECT DISTINCT y.Yeartheme as Yeartheme, Count(i.issueID) as CountIssue, maxyear.maxyear as maxyear'
                    l2 = ' FROM YearTheme yt, Menu m, Users u, Years y, IssueDateYear idy, EB, Issue i, EBType ebt, maxyear'
                    l3 = ' WHERE m.UserID = u.uID AND u.uID = y.UserID AND i.UserID = u.uID '
                    l4 = ' AND yt.theme = m.Theme '
                    l5 = ' AND yt.YearTheme = y.YearTheme AND yt.yearfield = y.yearfield AND yt.yearID = y.yearID'
                    l6 = ' AND y.yearfield = idy.yearfield AND idy.yeartheme = y.yeartheme AND idy.yearID = y.yearID'
                    l7 = ' AND EB.yearfield = y.yearfield AND EB.yeartheme = y.yeartheme AND EB.UserID = u.uid'
                    l8 = ' AND ebt.Subtypes = EB.Subtypes AND ebt.EmotionID = EB.EmotionID'
                    l9 = ' AND idy.issueID = i.issueID ' + resolved + ' AND ' + verification 
                    l10 = ' GROUP BY y.Yeartheme, maxyear.Yeartheme, maxyear.maxyear'
                    l11 = ' HAVING maxyear.Yeartheme = y.Yeartheme '+ recentyearcondition + recentyearcondition2
                    query = maxyearforeachtheme + l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8 + l9 + l10 + l11
                else:
                    return jsonify({
                        "error": "No recentyearno input."
                    })
                result = []
                cursor = connection.cursor()
                cursor.execute(query)
                data = cursor.fetchall()
                result = json.dumps(data)
            elif (options == 'division'):
                # find all the issues that have not been resolved overall that exists in every year.
                verification = "u.Email = '" + request.json["email"] + "'"
                if ("attribute" in request.json):
                    if ("issueresolved" in request.json):
                        issuecondition = request.json["issueresolved"]
                        l1 = ' SELECT i.issueName as IssueName, y.' + str(request.json["attribute"]).replace(" ", "") + ', u.Email, u.uid'
                        l2 = ' FROM Users u, Issue i, YearTheme yt , Menu m , Years y , IssueDateYear idy'
                        l3 = " WHERE u.email = '" + request.json["email"] + "' AND u.uID = i.UserID AND"
                        l4 = " m.UserID = u.uID AND u.uID = y.UserID AND i.UserID = u.uID "
                        l5 = " AND yt.Theme = m.Theme AND yt.MenuID = m.MenuID AND i.yearid = yt.yearID "
                        l6 = " AND yt.YearTheme = y.YearTheme AND yt.yearfield = y.yearfield AND yt.yearID = y.yearID" 
                        l7 = " AND y.yearfield = idy.yearfield AND idy.yeartheme = y.yeartheme AND idy.yearID = y.yearID" 
                        l8 = " AND idy.issueID = i.issueID "
                        l9 = " AND NOT EXISTS (SELECT DISTINCT y3." + str(request.json["attribute"]).replace(" ", "") + " FROM Years y3, Issue i2"
                        l10 = " WHERE u.uID = y3.UserID AND i2.UserID = u.uID AND i2.yearID = y3.yearID EXCEPT (SELECT "
                        l11 = " idy2." + str(request.json["attribute"]).replace(" ", "") + " FROM Issue i3, Issuedateyear idy2, Years y4  WHERE i3.Resolved = " + str(issuecondition).capitalize()
                        l12 = " AND i3.issuename = i.issuename AND u.uid = i3.UserID AND idy2.issueID = i3.issueID AND y4.yearID = idy2.yearID AND y4.yearfield = idy2.yearfield AND y4.yeartheme = idy2.yeartheme  AND u.uID = y4.UserID AND i3.UserID = u.uID ));"
                        query = l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8 + l9 + l10 + l11 + l12
                    else:
                        return jsonify({
                            "error": "No issue keys for checking condition (DIVISION)"
                        })
                else:
                    return jsonify({
                            "error": "No attribute keys for checking condition (DIVISION)"
                        })
                cursor = connection.cursor()
                cursor.execute(query)
                data = cursor.fetchall()
                result = json.dumps(data)  
    except:
        return jsonify({
            "error": "Something is wrong. Please try again."
        })    
    connection.close()    
    return jsonify({
        "result": result
    })

@app.route('/diaryentry/<string:task>', methods = ['POST', 'DELETE']) 
def diaryentry(task):
    try:
        connection = psycopg2.connect(database = db_name, host = host, password = password, port = 5433, user = username)
        if ((request.method == "DELETE") and (task == "deletediary")):
            # send the information to the database
            # TODO: WRITE THE INQUERY and CHECKQUERY FOR CALENDAR HERE. INQUERY CREATES THE INPUTS BASED ON WHAT THE USER GAVE AND CHECKQUERY QUERY THE DATABASE AND RETURN RESULT.
            # CHECK IF THAT RESULT IS NOT NULL TO MAKE SURE THAT THE THING HAS ACTUALLY BEEN ADDED.
            # use the inputquery based on request.json which is the json input from the frontend for the user input.
            connectingboards = 'd.Diarytheme = dt.Diarytheme AND dt.Theme = m.Theme AND m.UserID = u.ID'
            verification = 'u.Email = ' + request.body.email
            inputquery = 'DELETE '
            + 'FROM Diary d, DiaryTheme dt, Menu m, User u'
            + 'WHERE DiaryID = ' + request.body.diaryid + 'AND' + connectingboards + 'AND' + verification
            cursor = connection.cursor()
            cursor.execute(inputquery)
            connection.close()
            return jsonify({
                    'Message': "Diary deleted, please refresh to see the result"
            })
        elif (request.method == "POST") and (task == "render") :
            # Show all users diaries
            if ("condition" in request.json): # to be applied with menutheme or diarytheme
                condition = request.json["condition"]
            else :
                condition = ""
            if ("field" in request.json):
                field = request.json["field"]
                if (str(field).lower() == "diarytheme"):
                    connectingboards = 'd.UserID = u.uID AND dt.Diarytheme = d.diarytheme AND dt.MenuID = m.MenuID AND m.UserID = u.uid'
                    verification = "u.Email = '" + request.json["email"] + "'"
                    query = "SELECT dt.theme as menuTheme, d.DiaryTheme as DiaryTheme, u.Email, u.uName FROM Diary d, DiaryTheme dt, Users u, Menu m WHERE" + connectingboards + " AND " + verification + " AND " + condition + ";"
                    cursor = connection.cursor()   
                    cursor.execute(query)
                elif (str(field).lower() == "menutheme"):
                    connectingboards = 'd.UserID = u.uID AND dt.Diarytheme = d.diarytheme AND dt.MenuID = m.MenuID AND m.UserID = u.uid'
                    verification = "u.Email = '" + request.json["email"] + "'"
                    query = "SELECT d.DiaryTheme as DiaryTheme, dt.theme as menuTheme, u.Email, u.uName FROM Diary d, DiaryTheme dt, Users u, Menu m WHERE" + connectingboards + " AND " + verification + " AND " + condition + ";"
                    cursor = connection.cursor()   
                    cursor.execute(query)
                else:
                    return jsonify({
                        "error": "The field is inappropriate"
                    })
                
                data = cursor.fetchall()
                result = json.dumps(data)
                connection.close()
            else :
                return jsonify({
                        "error": "No field given for render"
                }) 
            return jsonify({
                'result': result
            })
        
    except:
        return jsonify({
            "error": "Something is wrong. Please try again."
        }) 
if __name__ == '__main__':
    app.run(debug=True, port = 8080)
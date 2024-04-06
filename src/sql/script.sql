drop table PriorityGoals;
drop TABLE NonPriorityGoals;

drop table IssueDateYear;
drop table Issue;
drop table YearTheme;
drop table EBType;
drop table EB;
drop table Activity;
drop table Entry;
drop table Years;
drop table DiaryTheme;
drop table Menu;

drop table HaveFriend;
drop table Users;
drop table Diary;




CREATE TABLE Users (
    uID Integer,
    uName VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Passw VARCHAR(50) NOT NULL,
    PRIMARY KEY(uID),
    UNIQUE(Email)
);
CREATE TABLE Years(
	yearID INTEGER,
    yearfield INTEGER,
    Yeartheme VARCHAR(50),
    Dateofentry DATE,
    Summary VARCHAR(200),
    UserID INTEGER NOT NULL,
    PRIMARY KEY (YearID, Yeartheme, yearfield),
    FOREIGN KEY (UserID) REFERENCES Users(uID)
);
CREATE TABLE Menu (
    Theme VARCHAR(50),
	MenuID Integer,
    Description VARCHAR(200),
	UserID Integer NOT NULL,
    PRIMARY KEY(Theme, MenuID),
    FOREIGN KEY(UserID) REFERENCES Users(uID)
);
CREATE TABLE YearTheme(
    Yeartheme VARCHAR(50),
    Theme VARCHAR(50) NOT NULL,
    Yearfield INTEGER NOT NULL,
	MenuID Integer NOT NULL,
	YearID Integer NOT NULL,
	UNIQUE(YearID),
    PRIMARY KEY (Yeartheme, YearID),
    FOREIGN KEY (Theme, MenuID) REFERENCES Menu(Theme, MenuID),
    FOREIGN KEY (YearID, YearTheme, Yearfield) REFERENCES Years(YearID, Yeartheme, Yearfield)
);

CREATE TABLE Issue(
    issuedate DATE,
    IssueID INTEGER,
    issuename VARCHAR(50),
    Resolved BOOLEAN,
    Details VARCHAR(200),
    UserID Integer NOT NULL,
	YearID Integer NOT NULL,
    PRIMARY KEY (IssueID),
    FOREIGN KEY (UserID) REFERENCES Users(uID),
	FOREIGN KEY (YearID) REFERENCES YearTheme(YearID)
);

CREATE TABLE IssueDateYear(
    issuedate DATE,
    yearfield INTEGER NOT NULL,
	
	IssueID Integer NOT NULL,
	yeartheme VARCHAR(50) NOT NULL,
	YearID Integer NOT NULL,
    PRIMARY KEY (issuedate, YearID),
    FOREIGN KEY (yearID, yearfield, yeartheme) REFERENCES Years(yearID, yearfield, yeartheme),
	FOREIGN KEY (IssueID) REFERENCES Issue(IssueID)
		
);





CREATE TABLE Diary (
    DiaryID INTEGER,
    Diarytheme VARCHAR(50) NOT NULL,
    PRIMARY KEY(DiaryID)
);

CREATE TABLE Entry (
    EntryID Integer,
    DiaryID INTEGER NOT NULL,
    Dateofdiaryentry DATE NOT NULL,
    entrycomment VARCHAR(200) NOT NULL,
    Emotions VARCHAR(200) NOT NULL,
    PRIMARY KEY (EntryID),
    FOREIGN KEY (DiaryID) REFERENCES Diary
        ON DELETE CASCADE
);
CREATE TABLE EB(
    Subtypes VARCHAR(200),
    EmotionID INTEGER,
    yearfield INTEGER NOT NULL,
    yeartheme VARCHAR(50) NOT NULL,
    EntryID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
	YearID Integer NOT NULL,
    PRIMARY KEY (Subtypes, EmotionID),
    FOREIGN KEY (YearID, yearfield, yeartheme) REFERENCES Years(YearID, yearfield, yeartheme),
    FOREIGN KEY (EntryID) REFERENCES Entry,
    FOREIGN KEY (UserID) REFERENCES Users(uID)
);

CREATE TABLE EBType(
    Subtypes VARCHAR(200),
    EmotionID INTEGER NOT NULL,
    OverallTypes VARCHAR(50),
    PRIMARY KEY (Subtypes, EmotionID),
    FOREIGN KEY (Subtypes, EmotionID) REFERENCES EB(Subtypes, EmotionID)
);



CREATE TABLE DiaryTheme (
    Diarytheme VARCHAR(50) NOT NULL,
    Theme VARCHAR(50) NOT NULL,
	MenuID INTEGER NOT NULL,
    PRIMARY KEY(Diarytheme),
    FOREIGN KEY (Theme, MenuID) REFERENCES Menu(Theme, MenuID)
);


CREATE TABLE PriorityGoals (
    GoalID INTEGER,
    Theme VARCHAR(50) NOT NULL,
    Status BOOLEAN NOT NULL,
    GoalDescription VARCHAR(200) NOT NULL,
    SoftDeadline Date,
	MenuID INTEGER NOT NULL,
    PRIMARY KEY(GoalID),
    FOREIGN KEY (Theme, MenuID) REFERENCES Menu(Theme, MenuID)
);

CREATE TABLE NonPriorityGoals(
    GoalID INTEGER,
    Theme VARCHAR(50) NOT NULL,
    Status BOOLEAN NOT NULL,
    GoalDescription VARCHAR(200) NOT NULL,
    Delegated BOOLEAN,
	MenuID INTEGER NOT NULL,
    PRIMARY KEY(GoalID),
    FOREIGN KEY (Theme, MenuID) REFERENCES Menu
);

CREATE TABLE Activity (
    ActivityID INTEGER,
    EntryID Integer NOT NULL,
    ActivityDescription VARCHAR(200),
    ActivityName VARCHAR(50) NOT NULL,
    PRIMARY KEY (ActivityID, EntryID),
    FOREIGN KEY (EntryID) REFERENCES Entry
);


CREATE TABLE HaveFriend(
    UserID Integer,
    FriendID Integer,
    PlaceMet VARCHAR(50),
    PRIMARY KEY (UserID, FriendID),
    FOREIGN KEY (FriendID) REFERENCES Users(uID),
    FOREIGN KEY (UserID) REFERENCES Users(uID)
);

INSERT INTO Users VALUES (1001, 'Alice', 'alice@example.com', 'password123');
INSERT INTO Menu VALUES('Health and Fitness', 1, 'Soccer, basketball, badminton, etc', 1001);
INSERT INTO Menu VALUES('Academics', 2, 'Midterms and finals date, assignments due, etc',
1001);
INSERT INTO Years VALUES(1, 2022, 'First Year with Honours', '2022-1-12', 'A hard year because of cpsc 121', 1001);
INSERT INTO Years VALUES(2, 2023, 'Second Year with Honours', '2023-7-9', 'Cpsc 210 my beloved', 1001);
INSERT INTO Years VALUES(3, 2024, 'Third Year with Honours', '2024-8-12', 'I do not like finance', 1001);

INSERT INTO YearTheme VALUES('First Year with Honours', 'Academics', 2022, 2,1);
INSERT INTO YearTheme VALUES('Second Year with Honours', 'Academics', 2023, 2,2);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2024, 2,3);

INSERT INTO Diary VALUES(101, 'Work');
INSERT INTO Diary VALUES(102, 'Health');
INSERT INTO Diary VALUES(103, 'Social');
INSERT INTO Entry VALUES (1, 101, '2024-02-26', 'Today was a productive day at work.',
'Happy');
INSERT INTO Entry VALUES (2, 102, '2024-02-25', 'Feeling a bit under the weather today.',
'Sick');
INSERT INTO Entry VALUES (3, 103, '2024-02-24', 'Had a great time with friends at the
park.', 'Joyful');
INSERT INTO EB VALUES('Peaceful', 1, 2022, 'First Year with Honours', 1, 1001,1);
INSERT INTO EB VALUES('Discouraged', 2, 2023, 'Second Year with Honours', 2, 1001,2);
INSERT INTO EB VALUES('Cheerful', 3, 2024, 'Third Year with Honours', 3, 1001,3);

INSERT INTO EBType VALUES('Peaceful',1, 'Happy');
INSERT INTO EBType VALUES('Discouraged',2, 'Sad');
INSERT INTO EBType VALUES('Cheerful',3, 'Happy');

INSERT INTO Issue VALUES('2022-4-22', 1, 'Academic Concession', TRUE, 'Not feeling well today', 1001, 1);
INSERT INTO Issue VALUES('2023-5-16', 2, 'Challenge', FALSE,'Cpsc 213 assignment is too hard', 1001, 2);
INSERT INTO Issue VALUES('2024-3-15', 3, 'Teamwork', TRUE,'had a fight with my teammate today', 1001, 3);

INSERT INTO IssueDateYear VALUES ('2022-4-22',  2022, 1, 'First Year with Honours',1);
INSERT INTO IssueDateYear VALUES ('2023-5-16', 2023, 2, 'Second Year with Honours',2);
INSERT INTO IssueDateYear VALUES ('2024-3-15', 2024, 3, 'Third Year with Honours',3);


-- -- SECOND USER
INSERT INTO Users VALUES (1002, 'Andy', 'andy@example.com', 'password123');
INSERT INTO Menu VALUES('Health and Fitness', 3, 'Soccer, basketball, badminton, etc', 1002);
INSERT INTO Menu VALUES('Academics', 4, 'Midterms and finals date, assignments due, etc',
1002);
INSERT INTO Years VALUES(4, 2021, 'First Year with Honours', '2021-1-12', 'A hard year because of cpsc 121', 1002);
INSERT INTO Years VALUES(10, 2022, 'First Year with Honours', '2022-1-12', 'A hard year because of cpsc 121', 1002);
INSERT INTO Years VALUES(11, 2023, 'First Year with Honours', '2023-1-12', 'A hard year because of cpsc 121', 1002);
INSERT INTO Years VALUES(12, 2024, 'First Year with Honours', '2024-1-12', 'A hard year because of cpsc 121', 1002);
INSERT INTO Years VALUES(5, 2023, 'Second Year with Honours', '2023-7-9', 'Cpsc 210 my beloved', 1002);
INSERT INTO Years VALUES(6, 2024, 'Third Year with Honours', '2024-8-12', 'I do not like finance', 1002);
INSERT INTO Years VALUES(7, 2021, 'First Year with Honours', '2021-1-12', 'A hard year because of cpsc 121', 1002);
INSERT INTO Years VALUES(8, 2022, 'Second Year with Honours', '2022-7-9', 'Cpsc 210 my beloved', 1002);
INSERT INTO Years VALUES(9, 2023, 'Third Year with Honours', '2023-8-12', 'I do not like finance', 1002);

INSERT INTO YearTheme VALUES('First Year with Honours', 'Academics', 2021, 4,4);
INSERT INTO YearTheme VALUES('First Year with Honours', 'Academics', 2022, 4,10);
INSERT INTO YearTheme VALUES('First Year with Honours', 'Academics', 2023, 4,11);
INSERT INTO YearTheme VALUES('First Year with Honours', 'Academics', 2024, 4,12);
INSERT INTO YearTheme VALUES('Second Year with Honours', 'Academics', 2023, 4,5);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2024, 4,6);
INSERT INTO YearTheme VALUES('First Year with Honours', 'Academics', 2021, 4,7);
INSERT INTO YearTheme VALUES('Second Year with Honours', 'Academics', 2022, 4,8);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2023, 4,9);

INSERT INTO Diary VALUES(104, 'Work');
INSERT INTO Diary VALUES(105, 'Health');
INSERT INTO Diary VALUES(106, 'Social');
INSERT INTO Entry VALUES (4, 104, '2022-02-26', 'Today was a productive day at work.',
'Happy');
INSERT INTO Entry VALUES (5, 105, '2023-02-25', 'Feeling a bit under the weather today.',
'Sick');
INSERT INTO Entry VALUES (6, 106, '2024-02-24', 'Had a great time with friends at the
park.', 'Joyful');
INSERT INTO Entry VALUES (7, 104, '2021-02-26', 'Today was a productive day at work.',
'Happy');
INSERT INTO Entry VALUES (8, 105, '2022-02-25', 'Feeling a bit under the weather today.',
'Sick');
INSERT INTO Entry VALUES (9, 106, '2023-02-24', 'Had a great time with friends at the
park.', 'Joyful');
INSERT INTO EB VALUES('Peaceful', 4, 2021, 'First Year with Honours', 4, 1002,4);
INSERT INTO EB VALUES('Peaceful', 10, 2022, 'First Year with Honours', 4, 1002,10);
INSERT INTO EB VALUES('Peaceful', 11, 2023, 'First Year with Honours', 4, 1002,11);
INSERT INTO EB VALUES('Peaceful', 12, 2024, 'First Year with Honours', 4, 1002,12);
INSERT INTO EB VALUES('Discouraged', 5, 2023, 'Second Year with Honours', 5, 1002,5);
INSERT INTO EB VALUES('Cheerful', 6, 2024, 'Third Year with Honours', 6, 1002,6);
INSERT INTO EB VALUES('Peaceful', 7, 2021, 'First Year with Honours', 7, 1002,7);
INSERT INTO EB VALUES('Discouraged', 8, 2022, 'Second Year with Honours', 8, 1002,8);
INSERT INTO EB VALUES('Cheerful', 9, 2023, 'Third Year with Honours', 9, 1002,9);

INSERT INTO EBType VALUES('Peaceful',4, 'Happy');
INSERT INTO EBType VALUES('Discouraged',5, 'Sad');
INSERT INTO EBType VALUES('Cheerful',6, 'Happy');
INSERT INTO EBType VALUES('Peaceful',7, 'Happy');
INSERT INTO EBType VALUES('Discouraged',8, 'Sad');
INSERT INTO EBType VALUES('Cheerful',9, 'Happy');

INSERT INTO Issue VALUES('2021-4-22', 4, 'Academic Concession', FALSE, 'Not feeling well today', 1002, 4);
INSERT INTO Issue VALUES('2022-4-22', 10, 'Academic Concession', FALSE, 'Not feeling well today', 1002, 10);
INSERT INTO Issue VALUES('2023-4-22', 11, 'Academic Concession', FALSE, 'Not feeling well today', 1002, 11);
INSERT INTO Issue VALUES('2024-4-22', 12, 'Academic Concession', FALSE, 'Not feeling well today', 1002, 12);
INSERT INTO Issue VALUES('2023-5-16', 5, 'Challenge', FALSE,'Cpsc 213 assignment is too hard', 1002, 5);
INSERT INTO Issue VALUES('2024-3-15', 6, 'Teamwork', TRUE,'had a fight with my teammate today', 1002, 6);
INSERT INTO Issue VALUES('2021-4-22', 7, 'Academic Concession', FALSE, 'Not feeling well today', 1002, 7);
INSERT INTO Issue VALUES('2022-5-16', 8, 'Challenge', FALSE,'Cpsc 213 assignment is too hard', 1002, 8);
INSERT INTO Issue VALUES('2023-3-15', 9, 'Teamwork', TRUE,'had a fight with my teammate today', 1002,9);

INSERT INTO IssueDateYear VALUES ('2021-4-22',  2021, 4, 'First Year with Honours',4);
INSERT INTO IssueDateYear VALUES ('2022-4-22',  2022, 10, 'First Year with Honours',10);
INSERT INTO IssueDateYear VALUES ('2023-4-22',  2023, 11, 'First Year with Honours',11);
INSERT INTO IssueDateYear VALUES ('2024-4-22',  2024, 12, 'First Year with Honours',12);
INSERT INTO IssueDateYear VALUES ('2023-5-16', 2023, 5, 'Second Year with Honours',5);
INSERT INTO IssueDateYear VALUES ('2024-3-15', 2024, 6, 'Third Year with Honours',6);
INSERT INTO IssueDateYear VALUES ('2021-4-22',  2021, 7, 'First Year with Honours',7);
INSERT INTO IssueDateYear VALUES ('2022-5-16', 2022, 8, 'Second Year with Honours',8);
INSERT INTO IssueDateYear VALUES ('2023-3-15', 2023, 9, 'Third Year with Honours',9);


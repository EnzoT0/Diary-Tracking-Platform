-- drop table PriorityGoals;
-- drop TABLE NonPriorityGoals;

-- drop table IssueDateYear;
-- drop table Issue;
-- drop table YearTheme;
-- drop table EBType;
-- drop table EB;
-- drop table Activity;
-- drop table Entry;
-- drop table Years;
-- drop table DiaryTheme;
-- drop table Menu;

-- drop table HaveFriend;
-- drop table Diary;
-- drop table Users;

CREATE TABLE Users (
    uID UUID,
    uName VARCHAR(1000) NOT NULL,
    Email VARCHAR(1000) NOT NULL,
    Passw VARCHAR(3000) NOT NULL,
    PRIMARY KEY(uID),
    UNIQUE(Email)
);
CREATE TABLE Years(
	yearID INTEGER,
    yearfield INTEGER,
    Yeartheme VARCHAR(50),
    Dateofentry VARCHAR(20),
    Summary VARCHAR(200),
    UserID UUID NOT NULL,
    PRIMARY KEY (YearID, Yeartheme, yearfield),
    FOREIGN KEY (UserID) REFERENCES Users(uID)
		ON DELETE CASCADE
);
CREATE TABLE Menu (
    Theme VARCHAR(50),
	MenuID Integer,
    Description VARCHAR(200),
	UserID UUID NOT NULL,
    PRIMARY KEY(Theme, MenuID),
    FOREIGN KEY(UserID) REFERENCES Users(uID)
		ON DELETE CASCADE
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
    issuedate VARCHAR(20),
    IssueID INTEGER,
    issuename VARCHAR(50),
    Resolved BOOLEAN,
    Details VARCHAR(200),
    UserID UUID NOT NULL,
	YearID Integer NOT NULL,
    PRIMARY KEY (IssueID),
    FOREIGN KEY (UserID) REFERENCES Users(uID)
		ON DELETE CASCADE,
	FOREIGN KEY (YearID) REFERENCES YearTheme(YearID)
);

CREATE TABLE IssueDateYear(
    issuedate VARCHAR(20),
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
	UserID UUID NOT NULL,
    PRIMARY KEY(DiaryID),
	FOREIGN KEY (UserID) REFERENCES Users(uID)
		ON DELETE CASCADE
);

CREATE TABLE Entry (
    EntryID Integer,
    DiaryID INTEGER NOT NULL,
    Dateofdiaryentry VARCHAR(20) NOT NULL,
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
    UserID UUID NOT NULL,
	YearID Integer NOT NULL,
    PRIMARY KEY (Subtypes, EmotionID),
    FOREIGN KEY (YearID, yearfield, yeartheme) REFERENCES Years(YearID, yearfield, yeartheme),
    FOREIGN KEY (EntryID) REFERENCES Entry,
    FOREIGN KEY (UserID) REFERENCES Users(uID)
		ON DELETE CASCADE
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
	DiaryID INTEGER NOT NULL,
    PRIMARY KEY(Diarytheme, DiaryID),
    FOREIGN KEY (Theme, MenuID) REFERENCES Menu(Theme, MenuID)
);


CREATE TABLE PriorityGoals (
    GoalID INTEGER,
    Theme VARCHAR(50) NOT NULL,
    Status BOOLEAN NOT NULL,
    GoalDescription VARCHAR(200) NOT NULL,
    SoftDeadline VARCHAR(20),
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
    UserID UUID,
    FriendID UUID,
    PlaceMet VARCHAR(50),
    PRIMARY KEY (UserID, FriendID),
    FOREIGN KEY (FriendID) REFERENCES Users(uID)
		ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(uID)
		ON DELETE CASCADE
);


INSERT INTO Users VALUES ('111e4567-e89b-12d3-a456-556642440000', 'Alice', 'alice@example.com', '$2b$12$7yE/GjDSrlyT8scjm28LMuuAopfCL54Xd2BOIK.SkBWMEZvHxfrSy');
INSERT INTO Users VALUES ('333e4567-e89b-12d3-a456-556642440002', 'ree', 'ree@example.com', '$2b$12$7yE/GjDSrlyT8scjm28LMuuAopfCL54Xd2BOIK.SkBWMEZvHxfrSy');
INSERT INTO Users VALUES ('444e4567-e89b-12d3-a456-556642440003', 'ad', 'ad@example.com', '$2b$12$7yE/GjDSrlyT8scjm28LMuuAopfCL54Xd2BOIK.SkBWMEZvHxfrSy');

--Menu
INSERT INTO Menu VALUES('Fitness', 1, 'Running, yoga, weightlifting', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Menu VALUES('Career', 2, 'Project deadlines, networking events', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Menu VALUES('Finance', 3, 'Budget planning, investment strategies', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Menu VALUES('Social', 4, 'Networking events, social gatherings, trips', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Menu VALUES('Hobbies', 5, 'Photography, painting, gardening', '111e4567-e89b-12d3-a456-556642440000');

--Years
INSERT INTO Years VALUES(1, 2021, 'Starting Fitness Journey', '2021-10-15', 'Time to go fit', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(2, 2022, 'Internship Year', '2022-07-10', 'Gaining practical experience', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(3, 2023, 'Final Year Project', '2023-05-20', 'Working on a groundbreaking project', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(4, 2021, 'First Year at University', '2021-09-15', 'Exciting new challenges', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(5, 2022, 'Second Year at University', '2022-09-15', 'More compsci yay', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(6, 2023, 'Trip to Japan', '2023-05-20', 'Trip LETS GO', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(7, 2026, 'Career Launch', '2026-08-30', 'Transitioning into the workforce', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(8, 2028, 'Professional Growth', '2028-03-15', 'Pursuing advanced certifications', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(9, 2023, 'Third Year at University', '2023-09-10', 'I hate finance','111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(10, 2024, 'Fourth Year at University', '2024-09-10', 'cpsc 304 my beloved','111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(11, 2022, 'First Year with Honours', '2022-4-27', 'A hard year because of cpsc 121', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(12, 2023, 'Second Year with Honours', '2023-4-27', 'A hard year because of cpsc 213', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Years VALUES(13, 2024, 'Third Year with Honours', '2024-4-27', 'A hard year because of comm 306', '111e4567-e89b-12d3-a456-556642440000');

--YearTheme
INSERT INTO YearTheme VALUES('Starting Fitness Journey', 'Fitness', 2021, 1, 1);
INSERT INTO YearTheme VALUES('Internship Year', 'Career', 2022, 2, 2);
INSERT INTO YearTheme VALUES('Final Year Project', 'Career', 2023, 2, 3);
INSERT INTO YearTheme VALUES('First Year at University', 'Fitness', 2021, 1, 4);
INSERT INTO YearTheme VALUES('Second Year at University', 'Career', 2022, 2, 5);
INSERT INTO YearTheme VALUES('Trip to Japan', 'Social', 2023, 4, 6);
INSERT INTO YearTheme VALUES('Career Launch', 'Career', 2026, 2, 7);
INSERT INTO YearTheme VALUES('Professional Growth', 'Career', 2028, 2, 8);
INSERT INTO YearTheme VALUES('Third Year at University', 'Career', 2023, 2, 9);
INSERT INTO YearTheme VALUES('Fourth Year at University', 'Career', 2024, 2, 10);
INSERT INTO YearTheme VALUES('First Year with Honours', 'Career', 2022, 2, 11);
INSERT INTO YearTheme VALUES('Second Year with Honours', 'Career', 2023, 2, 12);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Career', 2024, 2, 13);



--Diary
INSERT INTO Diary VALUES(101, 'Work', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Diary VALUES(102, 'Health', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Diary VALUES(103, 'Social', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Diary VALUES(104, 'Career', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Diary VALUES(105, 'Fitness', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Diary VALUES(106, 'Hobbies', '111e4567-e89b-12d3-a456-556642440000');
-- INSERT INTO Diary VALUES(107, 'Work', '111e4567-e89b-12d3-a456-556642440000');
-- INSERT INTO Diary VALUES(108, 'Health', '111e4567-e89b-12d3-a456-556642440000');
-- INSERT INTO Diary VALUES(109, 'Social', '111e4567-e89b-12d3-a456-556642440000');
INSERT INTO Diary VALUES(110, 'Finance', '111e4567-e89b-12d3-a456-556642440000');
-- INSERT INTO Diary VALUES(111, 'Hobbies', '111e4567-e89b-12d3-a456-556642440000');

--Entry
INSERT INTO Entry VALUES (1, 101, '2022-02-26', 'Completed a major milestone at work today.', 'Accomplished');
INSERT INTO Entry VALUES (2, 102, '2023-02-25', 'Feeling energetic after morning yoga.', 'Energetic');
INSERT INTO Entry VALUES (3, 103, '2024-02-24', 'Enjoyed a night out with friends.', 'Joyful');
INSERT INTO Entry VALUES (4, 104, '2022-02-26', 'Applied for a new position today.', 'Hopeful');
INSERT INTO Entry VALUES (5, 105, '2023-02-25', 'Achieved a new personal best in running.', 'Accomplished');
INSERT INTO Entry VALUES (6, 106, '2024-02-24', 'Completed my first painting.', 'Proud');
INSERT INTO Entry VALUES (7, 101, '2022-05-15', 'Completed a major project at work.', 'Accomplished');
INSERT INTO Entry VALUES (8, 105, '2023-04-20', 'Started a new fitness regimen.', 'Determined');
INSERT INTO Entry VALUES (9, 103, '2024-03-10', 'Attended a networking event.', 'Social');
INSERT INTO Entry VALUES (10, 110, '2025-02-28', 'Reviewed investment portfolio.', 'Focused');
INSERT INTO Entry VALUES (11, 106, '2025-01-05', 'Experimented with new painting techniques.', 'Creative');
INSERT INTO Entry VALUES (12, 106, '2021-04-07', 'Bought new merch smile', 'Happy');
INSERT INTO Entry VALUES (13, 101, '2026-10-13', 'Earned my first paycheck', 'Accomplished');
INSERT INTO Entry VALUES (14, 101, '2028-12-15', 'Rose up the ladder', 'Accomplished');
INSERT INTO Entry VALUES (15, 101, '2023-04-14', 'Studied for finals', 'Motivated');
INSERT INTO Entry VALUES (16, 101, '2024-04-14', 'Studied for finals', 'Motivated');
INSERT INTO Entry VALUES (17, 101, '2025-04-14', 'Studied for finals', 'Motivated');


--EB
INSERT INTO EB VALUES('Content', 1, 2021, 'First Year at University', 12, '111e4567-e89b-12d3-a456-556642440000', 4);
INSERT INTO EB VALUES('Productive', 2, 2022, 'Internship Year', 4, '111e4567-e89b-12d3-a456-556642440000', 2);
INSERT INTO EB VALUES('Motivated', 3, 2023, 'Final Year Project', 5, '111e4567-e89b-12d3-a456-556642440000', 3);
INSERT INTO EB VALUES('Determined', 4, 2021, 'Starting Fitness Journey', 12, '111e4567-e89b-12d3-a456-556642440000',1);
INSERT INTO EB VALUES('Fulfilled', 5, 2022, 'Second Year at University', 7, '111e4567-e89b-12d3-a456-556642440000', 5);
INSERT INTO EB VALUES('Energetic', 6, 2023, 'Trip to Japan', 2, '111e4567-e89b-12d3-a456-556642440000', 6);
INSERT INTO EB VALUES('Determined', 7, 2026, 'Career Launch', 13, '111e4567-e89b-12d3-a456-556642440000', 7);
INSERT INTO EB VALUES('Analytical', 8, 2028, 'Professional Growth', 14, '111e4567-e89b-12d3-a456-556642440000', 8);
INSERT INTO EB VALUES('Analytical', 9, 2022, 'First Year with Honours', 15, '111e4567-e89b-12d3-a456-556642440000', 11);
INSERT INTO EB VALUES('Analytical', 10, 2023, 'Second Year with Honours', 16, '111e4567-e89b-12d3-a456-556642440000', 12);
INSERT INTO EB VALUES('Analytical', 11, 2024, 'Third Year with Honours', 17, '111e4567-e89b-12d3-a456-556642440000', 13);

--EBType
INSERT INTO EBType VALUES('Content', 1, 'Happy');
INSERT INTO EBType VALUES('Productive', 2, 'Accomplished');
INSERT INTO EBType VALUES('Motivated', 3, 'Energetic');
INSERT INTO EBType VALUES('Fulfilled', 5, 'Happy');
INSERT INTO EBType VALUES('Energetic', 6, 'Energetic');
INSERT INTO EBType VALUES('Determined', 7, 'Confident');
INSERT INTO EBType VALUES('Analytical', 8, 'Focused');

-- Issue
INSERT INTO Issue VALUES('2022-8-10', 10, 'Project Deadline', FALSE, 'Facing tight deadlines at work', '111e4567-e89b-12d3-a456-556642440000', 5);
INSERT INTO Issue VALUES('2023-7-25', 11, 'Research Challenges', FALSE, 'Encountering difficulties in data analysis', '111e4567-e89b-12d3-a456-556642440000', 3);
INSERT INTO Issue VALUES('2022-6-15', 12, 'Career Transition', FALSE, 'Uncertainty about future career path', '111e4567-e89b-12d3-a456-556642440000', 5);
INSERT INTO Issue VALUES('2021-4-22', 13, 'Academic Concession', FALSE, 'Not feeling well today', '111e4567-e89b-12d3-a456-556642440000', 4);
INSERT INTO Issue VALUES('2022-4-22', 14, 'Academic Concession', FALSE, 'Not feeling well today', '111e4567-e89b-12d3-a456-556642440000', 5);
INSERT INTO Issue VALUES('2023-4-22', 15, 'Academic Concession', FALSE, 'Not feeling well today', '111e4567-e89b-12d3-a456-556642440000', 9);
INSERT INTO Issue VALUES('2024-4-22', 16, 'Academic Concession', FALSE, 'Not feeling well today', '111e4567-e89b-12d3-a456-556642440000', 10);
INSERT INTO Issue VALUES('2023-5-21', 17, 'Broke', FALSE, 'Wdym tickets are $1000 now', '111e4567-e89b-12d3-a456-556642440000', 6);

--IssueDateYear
INSERT INTO IssueDateYear VALUES ('2021-4-22', 2021, 13, 'First Year at University',4);
INSERT INTO IssueDateYear VALUES ('2022-4-22', 2022, 14, 'Second Year at University',5);
INSERT INTO IssueDateYear VALUES ('2023-4-22', 2023, 15, 'Third Year at University',9);
INSERT INTO IssueDateYear VALUES ('2024-4-22', 2024, 16, 'Fourth Year at University',10);
INSERT INTO IssueDateYear VALUES ('2022-8-10', 2022, 12, 'Internship Year', 2);
INSERT INTO IssueDateYear VALUES ('2023-7-25', 2023, 11, 'Final Year Project', 3);
INSERT INTO IssueDateYear VALUES ('2024-6-15', 2026, 12, 'Career Launch', 7);
INSERT INTO IssueDateYear VALUES ('2025-5-01', 2028, 12, 'Professional Growth', 8);
INSERT INTO IssueDateYear VALUES ('2025-3-10', 2023, 10, 'Trip to Japan', 6);

--DiaryTheme
INSERT INTO DiaryTheme VALUES('Work', 'Career', 2, 104);
INSERT INTO DiaryTheme VALUES('Japan Trip', 'Social', 4, 103);
INSERT INTO DiaryTheme VALUES('First Year With Honours', 'Career', 2, 104);
INSERT INTO DiaryTheme VALUES('Health', 'Fitness', 1, 105);
INSERT INTO DiaryTheme VALUES('Watersports', 'Hobbies', 5, 106);

-- PriorityGoals
INSERT INTO PriorityGoals VALUES(1, 'Career', TRUE, 'Complete certification course', '2025-12-31', 2);
INSERT INTO PriorityGoals VALUES(2, 'Fitness', TRUE, 'Run a half-marathon', '2023-06-30', 1);
INSERT INTO PriorityGoals VALUES(3, 'Finance', FALSE, 'Start investing in stocks', NULL, 3);
INSERT INTO PriorityGoals VALUES(4, 'Hobbies', TRUE, 'Learn to play the guitar', '2024-01-31', 5);
INSERT INTO PriorityGoals VALUES(5, 'Social', FALSE, 'Attend networking events', NULL, 4);

-- NonPriorityGoals
INSERT INTO NonPriorityGoals VALUES(1, 'Career', FALSE, 'Attend industry conferences', TRUE, 2);
INSERT INTO NonPriorityGoals VALUES(2, 'Fitness', FALSE, 'Try rock climbing', FALSE, 1);
INSERT INTO NonPriorityGoals VALUES(3, 'Finance', TRUE, 'Create a budget plan', FALSE, 3);
INSERT INTO NonPriorityGoals VALUES(4, 'Hobbies', FALSE, 'Visit an art museum', FALSE, 5);
INSERT INTO NonPriorityGoals VALUES(5, 'Social', TRUE, 'Host a dinner party', FALSE, 4);

-- Activity
INSERT INTO Activity VALUES(1, 1, 'Attended a certification workshop', 'Professional Development');
INSERT INTO Activity VALUES(2, 2, 'Completed a 10k run', 'Running');
INSERT INTO Activity VALUES(3, 9, 'Attended a finance seminar', 'Financial Education');
INSERT INTO Activity VALUES(4, 13, 'Practiced guitar for 1 hour', 'Music');
INSERT INTO Activity VALUES(5, 3, 'Met with friends for coffee', 'Socializing');

-- HaveFriend
INSERT INTO HaveFriend VALUES('111e4567-e89b-12d3-a456-556642440000', '333e4567-e89b-12d3-a456-556642440002', 'Coffee Shop');
INSERT INTO HaveFriend VALUES('111e4567-e89b-12d3-a456-556642440000', '444e4567-e89b-12d3-a456-556642440003', 'Gym');


-- ANDY
INSERT INTO Users VALUES ('691e766a-714c-4512-a650-ecf17b40227d', 'Andy', 'andy@example.com', '$2b$12$7yE/GjDSrlyT8scjm28LMuuAopfCL54Xd2BOIK.SkBWMEZvHxfrSy');
INSERT INTO Menu VALUES('Health and Fitness', 6, 'Soccer, basketball, badminton, etc', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Menu VALUES('Academics', 7, 'Midterms and finals date, assignments due, etc',
'691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(114, 2021, 'First Year with Honours', '2021-1-12', 'A hard year because of cpsc 121', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(115, 2022, 'First Year with Honours', '2022-1-12', 'A hard year because of cpsc 121', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(116, 2023, 'First Year with Honours', '2023-1-12', 'A hard year because of cpsc 121', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(117, 2024, 'First Year with Honours', '2024-1-12', 'A hard year because of cpsc 121', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(118, 2023, 'Second Year with Honours', '2023-7-9', 'Cpsc 210 my beloved', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(119, 2024, 'Third Year with Honours', '2024-8-12', 'I do not like finance', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(120, 2022, 'Second Year with Honours', '2022-7-9', 'Cpsc 210 my beloved', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(121, 2023, 'Third Year with Honours', '2023-8-12', 'I do not like finance', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(122, 2021, 'Second Year with Honours', '2021-7-9', 'Cpsc 210 my beloved', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(123, 2024, 'Second Year with Honours', '2024-7-9', 'Cpsc 210 my beloved', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(124, 2021, 'Third Year with Honours', '2021-8-12', 'I do not like finance', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(125, 2022, 'Third Year with Honours', '2022-8-12', 'I do not like finance', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(126, 2021, 'Third Year with Honours', '2021-8-12', 'I do not like hacks', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(127, 2022, 'Third Year with Honours', '2022-8-12', 'I do not like hacks', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(128, 2023, 'Third Year with Honours', '2023-8-12', 'I do not like hacks', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(129, 2024, 'Third Year with Honours', '2024-8-12', 'I do not like hacks', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(130, 2021, 'Fourth Year with Honours', '2021-8-12', 'I do not like hospital', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(131, 2022, 'Fourth Year with Honours', '2022-8-12', 'I love movies', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(132, 2021, 'Second Year with Honours', '2021-8-12', 'I love studying', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(133, 2022, 'Third Year with Honours', '2022-8-12', 'I love studying', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Years VALUES(134, 2023, 'Fourth Year with Honours', '2023-8-12', 'I love studying', '691e766a-714c-4512-a650-ecf17b40227d');

INSERT INTO YearTheme VALUES('First Year with Honours', 'Academics', 2021, 7,114);
INSERT INTO YearTheme VALUES('First Year with Honours', 'Academics', 2022, 7,115);
INSERT INTO YearTheme VALUES('First Year with Honours', 'Academics', 2023, 7,116);
INSERT INTO YearTheme VALUES('First Year with Honours', 'Academics', 2024, 7,117);
INSERT INTO YearTheme VALUES('Second Year with Honours', 'Academics', 2023, 7,118);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2024, 7,119);
INSERT INTO YearTheme VALUES('Second Year with Honours', 'Academics', 2022, 7,120);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2023, 7,121);
INSERT INTO YearTheme VALUES('Second Year with Honours', 'Academics', 2021, 7,122);
INSERT INTO YearTheme VALUES('Second Year with Honours', 'Academics', 2024, 7,123);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2021, 7,124);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2022, 7,125);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2021, 7,126);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2022, 7,127);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2023, 7,128);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2024, 7,129);
INSERT INTO YearTheme VALUES('Fourth Year with Honours', 'Health and Fitness', 2021, 6,130);
INSERT INTO YearTheme VALUES('Fourth Year with Honours', 'Health and Fitness', 2022, 6,131);
INSERT INTO YearTheme VALUES('Second Year with Honours', 'Academics', 2021, 7,132);
INSERT INTO YearTheme VALUES('Third Year with Honours', 'Academics', 2022, 7,133);
INSERT INTO YearTheme VALUES('Fourth Year with Honours', 'Academics', 2023, 7,134);

INSERT INTO Diary VALUES(1111, 'Work', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Diary VALUES(1112, 'Health', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Diary VALUES(1113, 'Social', '691e766a-714c-4512-a650-ecf17b40227d');
INSERT INTO Diarytheme VALUES ('Work', 'Academics', 7, 1111);
INSERT INTO Diarytheme VALUES ('Health', 'Health and Fitness', 6, 1112);
INSERT INTO Diarytheme VALUES ('Social', 'Health and Fitness', 6, 1113);
INSERT INTO Entry VALUES (114, 1111, '2022-02-26', 'Today was a productive day at work.',
'Happy');
INSERT INTO Entry VALUES (118, 1112, '2023-02-25', 'Feeling a bit under the weather today.',
'Sick');
INSERT INTO Entry VALUES (119, 1113, '2024-02-24', 'Had a great time with friends at the
park.', 'Joyful');
INSERT INTO Entry VALUES (120, 1112, '2022-02-25', 'Feeling a bit under the weather today.',
'Sick');
INSERT INTO Entry VALUES (121, 1113, '2023-02-24', 'Had a great time with friends at the
park.', 'Joyful');

INSERT INTO Entry VALUES (122, 1111, '2021-02-24', 'Worked hard', 'Anxious');
INSERT INTO Entry VALUES (123, 1111, '2024-02-24', 'Worked very hard', 'Happy');
INSERT INTO Entry VALUES (124, 1113, '2021-02-24', 'Pulled all nighter', 'Tiring');
INSERT INTO Entry VALUES (125, 1113, '2022-02-24', 'Chill', 'Joyful');
INSERT INTO Entry VALUES (126, 1111, '2021-02-24', 'Hacked', 'EnJoyful');
INSERT INTO Entry VALUES (127, 1111, '2022-02-24', 'Hacked', 'EnJoyful');
INSERT INTO Entry VALUES (128, 1111, '2023-02-24', 'Hacked', 'EnJoyful');
INSERT INTO Entry VALUES (129, 1111, '2024-02-24', 'Hacked', 'EnJoyful');
INSERT INTO Entry VALUES (130, 1112, '2021-02-24', 'Hospitalized', 'Stressy');
INSERT INTO Entry VALUES (131, 1112, '2022-02-24', 'Hangout', 'Jubilant');
INSERT INTO Entry VALUES (132, 1111, '2021-11-24', 'Debug', 'Jubilant');
INSERT INTO Entry VALUES (133, 1111, '2022-11-24', 'Debug', 'Jubilant');
INSERT INTO Entry VALUES (134, 1111, '2023-11-24', 'Debug', 'Jubilant');

INSERT INTO EB VALUES('Peaceful', 114, 2021, 'First Year with Honours', 114, '691e766a-714c-4512-a650-ecf17b40227d',114);
INSERT INTO EB VALUES('Peaceful', 115, 2022, 'First Year with Honours', 114, '691e766a-714c-4512-a650-ecf17b40227d',115);
INSERT INTO EB VALUES('Peaceful', 116, 2023, 'First Year with Honours', 114, '691e766a-714c-4512-a650-ecf17b40227d',116);
INSERT INTO EB VALUES('Peaceful', 117, 2024, 'First Year with Honours', 114, '691e766a-714c-4512-a650-ecf17b40227d',117);
INSERT INTO EB VALUES('Discouraged', 118, 2023, 'Second Year with Honours', 118, '691e766a-714c-4512-a650-ecf17b40227d',118);
INSERT INTO EB VALUES('Cheerful', 119, 2024, 'Third Year with Honours', 119, '691e766a-714c-4512-a650-ecf17b40227d',119);
INSERT INTO EB VALUES('Discouraged', 120, 2022, 'Second Year with Honours', 120, '691e766a-714c-4512-a650-ecf17b40227d',120);
INSERT INTO EB VALUES('Cheerful', 121, 2023, 'Third Year with Honours', 121, '691e766a-714c-4512-a650-ecf17b40227d',121);
INSERT INTO EB VALUES('Discouraged', 122, 2021, 'Second Year with Honours', 122, '691e766a-714c-4512-a650-ecf17b40227d',122);
INSERT INTO EB VALUES('Discouraged', 123, 2024, 'Second Year with Honours', 123, '691e766a-714c-4512-a650-ecf17b40227d',123);
INSERT INTO EB VALUES('Cheerful', 124, 2021, 'Third Year with Honours', 124, '691e766a-714c-4512-a650-ecf17b40227d',124);
INSERT INTO EB VALUES('Cheerful', 125, 2022, 'Third Year with Honours', 125, '691e766a-714c-4512-a650-ecf17b40227d',125);
INSERT INTO EB VALUES('Calm', 126, 2021, 'Third Year with Honours', 126, '691e766a-714c-4512-a650-ecf17b40227d',126);
INSERT INTO EB VALUES('Calm', 127, 2022, 'Third Year with Honours', 127, '691e766a-714c-4512-a650-ecf17b40227d',127);
INSERT INTO EB VALUES('Calm', 128, 2023, 'Third Year with Honours', 128, '691e766a-714c-4512-a650-ecf17b40227d',128);
INSERT INTO EB VALUES('Calm', 129, 2024, 'Third Year with Honours', 129, '691e766a-714c-4512-a650-ecf17b40227d',129);
INSERT INTO EB VALUES('Stress', 130, 2021, 'Fourth Year with Honours', 130, '691e766a-714c-4512-a650-ecf17b40227d',130);
INSERT INTO EB VALUES('Joy', 131, 2022, 'Fourth Year with Honours', 131, '691e766a-714c-4512-a650-ecf17b40227d',131);
INSERT INTO EB VALUES('Desparation', 132, 2021, 'Second Year with Honours', 132, '691e766a-714c-4512-a650-ecf17b40227d',132);
INSERT INTO EB VALUES('Desparation', 133, 2022, 'Third Year with Honours', 133, '691e766a-714c-4512-a650-ecf17b40227d',133);
INSERT INTO EB VALUES('Desparation', 134, 2023, 'Fourth Year with Honours', 134, '691e766a-714c-4512-a650-ecf17b40227d',134);

INSERT INTO EBType VALUES('Peaceful',114, 'Happy');
INSERT INTO EBType VALUES('Discouraged',118, 'Sad');
INSERT INTO EBType VALUES('Cheerful',119, 'Happy');
INSERT INTO EBType VALUES('Discouraged',120, 'Sad');
INSERT INTO EBType VALUES('Cheerful',121, 'Happy');
INSERT INTO EBType VALUES('Discouraged',122, 'Gloomy');
INSERT INTO EBType VALUES('Discouraged',123, 'Depressed');
INSERT INTO EBType VALUES('Cheerful',124, 'Energetic');
INSERT INTO EBType VALUES('Cheerful',125, 'Excited');
INSERT INTO EBType VALUES('Calm',126, 'Enjoy');
INSERT INTO EBType VALUES('Calm',127, 'Enjoy');
INSERT INTO EBType VALUES('Calm',128, 'Enjoy');
INSERT INTO EBType VALUES('Calm',129, 'Enjoy');
INSERT INTO EBType VALUES('Stress',130, 'Stressed');
INSERT INTO EBType VALUES('Joy',131, 'Jubilant');
INSERT INTO EBType VALUES('Desparation',132, 'Stresse');
INSERT INTO EBType VALUES('Desparation',133, 'Stresse');
INSERT INTO EBType VALUES('Desparation',134, 'Stresse');

INSERT INTO Issue VALUES('2021-4-22', 114, 'Academic Concession', FALSE, 'Not feeling well today', '691e766a-714c-4512-a650-ecf17b40227d', 114);
INSERT INTO Issue VALUES('2022-4-22', 115, 'Academic Concession', FALSE, 'Not feeling well today', '691e766a-714c-4512-a650-ecf17b40227d', 115);
INSERT INTO Issue VALUES('2023-4-22', 116, 'Academic Concession', FALSE, 'Not feeling well today', '691e766a-714c-4512-a650-ecf17b40227d', 116);
INSERT INTO Issue VALUES('2024-4-22', 117, 'Academic Concession', FALSE, 'Not feeling well today', '691e766a-714c-4512-a650-ecf17b40227d', 117);
INSERT INTO Issue VALUES('2023-5-16', 118, 'Challenge', FALSE,'Cpsc 213 assignment is too hard', '691e766a-714c-4512-a650-ecf17b40227d', 118);
INSERT INTO Issue VALUES('2024-3-15', 119, 'Teamwork', TRUE,'had a fight with my teammate today', '691e766a-714c-4512-a650-ecf17b40227d', 119);
INSERT INTO Issue VALUES('2022-5-16', 120, 'Challenge', FALSE,'Cpsc 304 assignment is too hard', '691e766a-714c-4512-a650-ecf17b40227d', 120);
INSERT INTO Issue VALUES('2023-3-15', 121, 'Teamwork', TRUE,'had a fight with my teammate today', '691e766a-714c-4512-a650-ecf17b40227d',121);
INSERT INTO Issue VALUES('2021-5-16', 122, 'Challenge', FALSE,'Cpsc 110 assignment is too hard', '691e766a-714c-4512-a650-ecf17b40227d', 122);
INSERT INTO Issue VALUES('2024-5-16', 123, 'Challenge', FALSE,'Cpsc 404 assignment is too hard', '691e766a-714c-4512-a650-ecf17b40227d', 123);
INSERT INTO Issue VALUES('2021-3-15', 124, 'Teamwork', TRUE,'had a fight with my colleagues today', '691e766a-714c-4512-a650-ecf17b40227d', 124);
INSERT INTO Issue VALUES('2022-3-15', 125, 'Teamwork', TRUE,'had a fight with my dog today', '691e766a-714c-4512-a650-ecf17b40227d', 125);
INSERT INTO Issue VALUES('2021-4-18', 126, 'Hackathon', TRUE,'had a demo today', '691e766a-714c-4512-a650-ecf17b40227d', 126);
INSERT INTO Issue VALUES('2022-4-18', 127, 'Hackathon', TRUE,'had a demo today', '691e766a-714c-4512-a650-ecf17b40227d', 127);
INSERT INTO Issue VALUES('2023-4-18', 128, 'Hackathon', TRUE,'had a demo today', '691e766a-714c-4512-a650-ecf17b40227d', 128);
INSERT INTO Issue VALUES('2024-4-18', 129, 'Hackathon', TRUE,'had a demo today', '691e766a-714c-4512-a650-ecf17b40227d', 129);
INSERT INTO Issue VALUES('2021-5-18', 130, 'Hospital', FALSE,'had a coma today', '691e766a-714c-4512-a650-ecf17b40227d', 130);
INSERT INTO Issue VALUES('2022-5-18', 131, 'Movie', TRUE,'had a movie today', '691e766a-714c-4512-a650-ecf17b40227d', 131);

INSERT INTO Issue VALUES('2021-7-22', 132, 'Academic Concession', FALSE,'had a concession today', '691e766a-714c-4512-a650-ecf17b40227d', 131);
INSERT INTO Issue VALUES('2022-7-22', 133, 'Academic Concession', FALSE,'had a concession today', '691e766a-714c-4512-a650-ecf17b40227d', 131);
INSERT INTO Issue VALUES('2023-7-22', 134, 'Academic Concession', FALSE,'had a concession today', '691e766a-714c-4512-a650-ecf17b40227d', 131);


INSERT INTO IssueDateYear VALUES ('2021-4-22',  2021, 114, 'First Year with Honours',114);
INSERT INTO IssueDateYear VALUES ('2022-4-22',  2022, 115, 'First Year with Honours',115);
INSERT INTO IssueDateYear VALUES ('2023-4-22',  2023, 116, 'First Year with Honours',116);
INSERT INTO IssueDateYear VALUES ('2024-4-22',  2024, 117, 'First Year with Honours',117);
INSERT INTO IssueDateYear VALUES ('2023-5-16', 2023, 118, 'Second Year with Honours',118);
INSERT INTO IssueDateYear VALUES ('2024-3-15', 2024, 119, 'Third Year with Honours',119);
INSERT INTO IssueDateYear VALUES ('2022-5-16', 2022, 120, 'Second Year with Honours',120);
INSERT INTO IssueDateYear VALUES ('2023-3-15', 2023, 121, 'Third Year with Honours',121);
INSERT INTO IssueDateYear VALUES ('2021-5-16', 2021, 122, 'Second Year with Honours',122);
INSERT INTO IssueDateYear VALUES ('2024-5-16', 2024, 123, 'Second Year with Honours',123);
INSERT INTO IssueDateYear VALUES ('2021-3-15', 2021, 124, 'Third Year with Honours',124);
INSERT INTO IssueDateYear VALUES ('2022-3-15', 2022, 125, 'Third Year with Honours',125);
INSERT INTO IssueDateYear VALUES ('2021-4-18', 2021, 126, 'Third Year with Honours',126);
INSERT INTO IssueDateYear VALUES ('2022-4-18', 2022, 127, 'Third Year with Honours',127);
INSERT INTO IssueDateYear VALUES ('2023-4-18', 2023, 128, 'Third Year with Honours',128);
INSERT INTO IssueDateYear VALUES ('2024-4-18', 2024, 129, 'Third Year with Honours',129);
INSERT INTO IssueDateYear VALUES ('2021-5-18', 2021, 130, 'Fourth Year with Honours',130);
INSERT INTO IssueDateYear VALUES ('2022-5-18', 2022, 131, 'Fourth Year with Honours',131);
INSERT INTO IssueDateYear VALUES ('2021-7-22',  2021, 132, 'Second Year with Honours',132);
INSERT INTO IssueDateYear VALUES ('2022-7-22',  2022, 133, 'Third Year with Honours',133);
INSERT INTO IssueDateYear VALUES ('2023-7-22',  2023, 134, 'Fourth Year with Honours',134);
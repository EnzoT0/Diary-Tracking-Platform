drop table IssueDateYear;
drop table Issue;
drop table YearTheme;
drop table Year;
drop table EBType;
drop table EB;
drop table DiaryTheme;
drop table Diary;
drop table Goal;
drop table Menu;
drop table Entry;
drop table Activity;
drop table User;
drop table HaveFriend;

CREATE TABLE IssueDateYear(
    Date DATE
    Year INTEGER
    PRIMARY KEY (Date)
    FOREIGN KEY (Year) REFERENCES Year(Year)
)

CREATE TABLE Issue(
    Date DATE
    IssueID INTEGER
    Name VARCHAR(50)
    Resolved NUMBER(1)
    Details VARCHAR(200)
    PRIMARY KEY (Date, IssueID)
)

CREATE TABLE YearTheme(
    Yeartheme VARCHAR(50)
    Theme VARCHAR(50) NOT NULL
    PRIMARY KEY (Yeartheme)
    FOREIGN KEY (Theme) REFERENCES Menu
)

CREATE TABLE Year(
    Year INTEGER
    Yeartheme VARCHAR(50)
    Date DATE
    Summary VARCHAR(200)
    PRIMARY KEY (Yeartheme, Year)
)

CREATE TABLE EBType(
    Subtypes VARCHAR(200)
    OverallTypes VARCHAR(50)
    PRIMARY KEY (Subtypes)
)

CREATE TABLE EB(
    Subtypes VARCHAR(200)
    EmotionID INTEGER
    Year INTEGER
    EntryID INTEGER
    PRIMARY KEY (Subtypes, EmotionID)
    FOREIGN KEY (Year) REFERENCES Year(Year)
    FOREIGN KEY (EntryID) REFERENCES Entry
)

CREATE TABLE DiaryTheme (
    Diarytheme VARCHAR(50) NOT NULL,
    Theme VARCHAR(50) NOT NULL
    PRIMARY KEY(Diarytheme)
    FOREIGN KEY (Theme) REFERENCES Menu
)

CREATE TABLE Diary (
    DiaryID INTEGER,
    Diarytheme VARCHAR(50) NOT NULL,
    PRIMARY KEY(DiaryID)
)

CREATE TABLE PriorityGoals (
    GoalID INTEGER,
    Theme VARCHAR(50) NOT NULL,
    Status NUMBER(1) NOT NULL,
    GoalDescription VARCHAR(200) NOT NULL,
    SoftDeadline Date,
    PRIMARY KEY(GoalID),
    FOREIGN KEY (Theme) REFERENCES Menu
)

CREATE TABLE NonPriorityGoals(
    GoalID INTEGER,
    Theme VARCHAR(50) NOT NULL,
    Status NUMBER(1) NOT NULL,
    GoalDescription VARCHAR(200) NOT NULL,
    Delegated NUMBER(1),
    PRIMARY KEY(GoalID),
    FOREIGN KEY (Theme) REFERENCES Menu
)

CREATE TABLE Menu (
    Theme VARCHAR(50),
    Description VARCHAR(200),
    UserID INTEGER,
    PRIMARY KEY(Theme),
    FOREIGN KEY(UserID) REFERENCES User(ID)
)

CREATE TABLE Entry (
    EntryID Integer,
    DiaryID INTEGER NOT NULL,
    Date DATE NOT NULL,
    Comment VARCHAR(200) NOT NULL,
    Emotions VARCHAR(200) NOT NULL,
    PRIMARY KEY (ActivityID, EntryID),
    FOREIGN KEY (DiaryID) REFERENCES Diary
)

CREATE TABLE Activity (
    ActivityID INTEGER,
    EntryID Integer NOT NULL,
    ActivityDescription VARCHAR(200),
    Name VARCHAR(50) NOT NULL,
    PRIMARY KEY (ActivityID, EntryID),
    FOREIGN KEY (EntryID) REFERENCES Entry
)
CREATE TABLE User (
    ID Integer,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    PRIMARY KEY(ID)
    UNIQUE(Email)
)

CREATE TABLE HaveFriend(
    UserID Integer,
    FriendID Integer,
    PlaceMet VARCHAR(50),
    PRIMARY KEY (UserID, FriendID),
    FOREIGN KEY (FriendID) REFERENCES User(ID),
    FOREIGN KEY (UserID) REFERENCES User(ID)
)

INSERT INTO IssueDateYear VALUES (2022-4-22, 2022);
INSERT INTO IssueDateYear VALUES (2023-5-16, 2023);
INSERT INTO IssueDateYear VALUES (2021-2-21, 2021);
INSERT INTO IssueDateYear VALUES (2022-3-15, 2022);
INSERT INTO IssueDateYear VALUES (2019-2-12, 2019);

INSERT INTO Issue VALUES(2022-02-21, 1, "Personal Health", 1, "Not feeling well today")
INSERT INTO Issue VALUES(2021-03-23, 2, "Self-Reflection", 0, "Feel guilty about lying today")
INSERT INTO Issue VALUES(2023-01-24, 3, "Challenge", 0, "Cpsc 213 assignment is too hard")
INSERT INTO Issue VALUES(2024-10-03, 4, "Relationship", 1, "had a fight with my brother today")
INSERT INTO Issue VALUES(2024-10-03, 5, "Dreams", 0, "Maybe this isn't the right place I should
be in")

INSERT INTO YearTheme VALUES("Watersports", "Sports")
INSERT INTO YearTheme VALUES("First Year with Honours", "Academic")
INSERT INTO YearTheme VALUES("Second Year with Honours", "Academics")
INSERT INTO YearTheme VALUES("Japan Trip", "Travel")
INSERT INTO YearTheme VALUES("Third Year with Honours", "Academics")

INSERT INTO Year VALUES(2024, "Watersports", 2024-2-01, "A good year of playing marco polo")
INSERT INTO Year VALUES(2022, "First Year with Honours", 2022-1-12, "A hard year because of
cpsc 121")
INSERT INTO Year VALUES(2023, "Second Year with Honours", 2023-7-9, "Cpsc 210 my beloved")
INSERT INTO Year VALUES(2024, "Third Year with Honours", 2024-8-12, "I don't like finance")
INSERT INTO Year VALUES(2023, "Japan Trip", 2023-12-5, "Kamakura was great")

INSERT INTO EBType VALUES("Peaceful", "Happy")
INSERT INTO EBType VALUES("Concerned", "Anxious")
INSERT INTO EBType VALUES("Frustrated", "Angry")
INSERT INTO EBType VALUES("Discouraged", "Sad")
INSERT INTO EBType VALUES("Optimistic", "Happy")

INSERT INTO EB VALUES("Peaceful", 1, 2024, 1)
INSERT INTO EB VALUES("Discouraged", 2, 2024, 2)
INSERT INTO EB VALUES("Cheerful", 3, 2024, 3)
INSERT INTO EB VALUES("Anxious", 4, 2024, 4)
INSERT INTO EB VALUES("Cheerful", 3, 2024, 5)

INSERT INTO DiaryTheme VALUES("Watersports", "Sports")
INSERT INTO DiaryTheme VALUES("First Year with Honours", "Academics")
INSERT INTO DiaryTheme VALUES("Second Year with Honours", "Academics")
INSERT INTO DiaryTheme VALUES(" Third Year with Honours", "Academics")
INSERT INTO DiaryTheme VALUES("Japan Trip", "Travel")

INSERT INTO Activity VALUES(1, 1, "Worked on a project", "Work")
INSERT INTO Activity VALUES(2, 2, "Ate congee", "Food")
INSERT INTO Activity VALUES(3, 3, "Ate out together", "Food")
INSERT INTO Activity VALUES(4, 4, "Studied for exams", "Academics")
INSERT INTO Activity VALUES(5, 5, "Ate together with family", "Food Gathering")

INSERT INTO PriorityGoals VALUES (1, "Health and Fitness", 0, "Get out and touch the grass, stop coding");
INSERT INTO PriorityGoals VALUES (2, "Personal Development", 1, "Turn off depression mode");
INSERT INTO PriorityGoals  VALUES (3, "Career and Education", 0, "Stop skipping classes");
INSERT INTO PriorityGoals  VALUES (4, "Relationships", 0, "Have a girlfriend");
INSERT INTO PriorityGoals VALUES(5, "Financial Management", 1, "Stop buying more clothes, I'm broke");

INSERT INTO NonPriorityGoals VALUES (1, "Health and Fitness", 0, "Go to the gym every week", 1);
INSERT INTO NonPriorityGoals VALUES (2, " Personal Development ", 1, "Read a book once a month, maintain a
healthy diet and drink more water", 0);
INSERT INTO NonPriorityGoals  VALUES (3, "Career and Education", 0, "Attend professional development
workshops or seminars", 1);
INSERT INTO NonPriorityGoals  VALUES (4, "Relationships", 0, "Spend quality time with loved ones and start
planning meaningful experiences with friends or family", 0);
INSERT INTO NonPriorityGoals VALUES(5, "Financial Management", 1, "Create and stick to a budget and save
$300 every month", 1);


INSERT INTO Menu VALUES("Sports", "Soccer, basketball, badminton, etc", 1001);
INSERT INTO Menu VALUES("Academics", "Midterms and finals date, assignments due, etc",
1001);
INSERT INTO Menu VALUES("Daily Life", "what happened today, daily occurrences, etc", 1002);
INSERT INTO Menu VALUES("Food and Cooking", "Interesting recipes, recent food cooked or
eaten, etc", 1003);
INSERT INTO Menu VALUES("Travel", "Recent travels, interesting places found, etc.", 1004);

INSERT INTO Entry VALUES (1, 101, 2024-02-26, 'Today was a productive day at work.',
'Happy');
INSERT INTO Entry VALUES (2, 102, 2024-02-25, 'Feeling a bit under the weather today.',
'Sick');
INSERT INTO Entry VALUES (3, 103, 2024-02-24, 'Had a great time with friends at the
park.', 'Joyful');
INSERT INTO Entry VALUES (4, 104, 2024-02-23, 'Feeling stressed about upcoming exams.',
'Anxious');
INSERT INTO Entry VALUES (5, 105, 2024-02-22, 'Celebrated mom''s birthday with a family
dinner.', 'Grateful');

INSERT INTO Diary VALUES(1, "Soccer", "Sports")
INSERT INTO Diary VALUES(2, "Cpsc 304", "Academics")
INSERT INTO Diary VALUES(3, "New Event", "Daily Life")
INSERT INTO Diary VALUES(4, "Spaghetti", "Food and Cooking")
INSERT INTO Diary VALUES(5, "Japan", "Travel")

INSERT INTO User VALUES (1001, 150, 'Alice', 'alice@example.com', 'password123');
INSERT INTO User VALUES (1002, 200, 'Bob', 'bob@example.com', 'securepass');
INSERT INTO User VALUES (1003, 75, 'Jhin', 'jhin4@example.com', 'mysecretpass4');
INSERT INTO User VALUES (1004, 300, 'Diana', 'diana@example.com', 'p@ssw0rd');
INSERT INTO User VALUES (1005, 100, 'Aphelios', 'aphelios@example.com', 'strongPassword');

INSERT INTO HaveFriend VALUES (1001, 1002, 'Coffee shop');
INSERT INTO HaveFriend VALUES (1002, 1003, 'Gym');
INSERT INTO HaveFriend VALUES (1003, 1004, 'Workplace');
INSERT INTO HaveFriend VALUES (1001, 1004, 'School');
INSERT INTO HaveFriend VALUES (1005, 1001, 'Online community');
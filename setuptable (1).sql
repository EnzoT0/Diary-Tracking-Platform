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
    Dateofentry DATE,
    Summary VARCHAR(200),
    UserID UUID NOT NULL,
    PRIMARY KEY (YearID, Yeartheme, yearfield),
    FOREIGN KEY (UserID) REFERENCES Users(uID)
);
CREATE TABLE Menu (
    Theme VARCHAR(50),
	MenuID Integer,
    Description VARCHAR(200),
	UserID UUID NOT NULL,
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
    UserID UUID NOT NULL,
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
    UserID UUID NOT NULL,
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
    UserID UUID,
    FriendID UUID,
    PlaceMet VARCHAR(50),
    PRIMARY KEY (UserID, FriendID),
    FOREIGN KEY (FriendID) REFERENCES Users(uID),
    FOREIGN KEY (UserID) REFERENCES Users(uID)
);
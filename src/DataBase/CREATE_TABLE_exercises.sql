CREATE TABLE dbo.exercises (
    Exercisesid INT NOT NULL IDENTITY,
    Title VARCHAR(50) NOT NULL,
    Description VARCHAR(100),
    Img VARCHAR(1000),
    LeftColor NVARCHAR(10),
    RightColor NVARCHAR(10),
    PRIMARY KEY (Exercisesid)
);
GO
CREATE PROCEDURE exercisesAddOrEdit (
    @_id INT,
    @_title VARCHAR(50),
    @_description VARCHAR(100),
    @_img VARCHAR(1000),
    @_leftColor NVARCHAR(10),
    @_rightColor NVARCHAR(10)
)
AS
BEGIN
SET NOCOUNT ON;
    IF @_id = 0 BEGIN
        INSERT INTO dbo.exercises (Title, Description, Img, LeftColor, RightColor)
        VALUES (@_title, @_description, @_img, @_leftColor, @_rightColor)
        SET @_id = SCOPE_IDENTITY()
    END
    ELSE BEGIN 
        UPDATE dbo.exercises
        SET 
            Title = @_title,
            Description = @_description,
            Img = @_img,
            LeftColor = @_leftColor,
            RightColor = @_rightColor
            WHERE Exercisesid = @_id
    END

    SELECT @_id AS Exercisesid
END;
GO
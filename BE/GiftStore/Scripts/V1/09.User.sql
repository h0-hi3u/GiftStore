﻿IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'User')
BEGIN
	
	CREATE TABLE [User] ( 
		[Id]						UNIQUEIDENTIFIER			PRIMARY KEY			DEFAULT NEWID(),
		[FirstName]					NVARCHAR(50)				NOT NULL,
		[LastName]					NVARCHAR(50)				NOT NULL,
		[Email]						NVARCHAR(250)				NOT NULL,
		[Password]					NVARCHAR(MAX)				NOT NULL,
		[Phone]						VARCHAR(10),
		[Address]					NVARCHAR(250),
		[VIP]						INT							NOT NULL,
	);

END

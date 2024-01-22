﻿IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Category')
BEGIN

	CREATE TABLE [Category] (
		[Id]						UNIQUEIDENTIFIER			PRIMARY KEY			DEFAULT NEWID(),
		[Name]						NVARCHAR(50)				NOT NULL,
		[Description]				NVARCHAR(250),
		[IsDeleted]					BIT							NOT NULL,
		[TagId]						UNIQUEIDENTIFIER			NOT NULL
	);
	ALTER TABLE Category
	ADD CONSTRAINT FK_Category_Refer_Tag FOREIGN KEY(TagId) REFERENCES Tag(Id);

END
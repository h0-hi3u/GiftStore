﻿IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Supplier')
BEGIN

	CREATE TABLE [Supplier] (
		[Id]						UNIQUEIDENTIFIER			PRIMARY KEY			DEFAULT NEWID(),
		[Name]						NVARCHAR(250)				NOT NULL,
		[Address]					NVARCHAR(250)				NOT NULL,
		[Telephone]					VARCHAR(10)					NOT NULL,
		[Email]						NVARCHAR(250),
		[CooperationDay]			DATETIME					NOT NULL			DEFAULT GETUTCDATE(),
		[IsDeleted]					BIT							NOT NULL,
	);

END
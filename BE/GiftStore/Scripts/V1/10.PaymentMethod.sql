﻿IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'PaymentMethod')
BEGIN
	CREATE TABLE [PaymentMethod] (
		[Id]						UNIQUEIDENTIFIER			PRIMARY KEY			DEFAULT NEWID(),
		[Name]						NVARCHAR(50)				NOT NULL,
		[IsDeleted]					BIT							NOT NULL,
	);

END
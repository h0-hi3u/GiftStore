﻿IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ImageProduct')
BEGIN
	
	CREATE TABLE [ImageProduct] (
		[Id]						UNIQUEIDENTIFIER			PRIMARY KEY			DEFAULT NEWID(),
		[Image]						NVARCHAR(MAX)				NOT NULL,
		[ProductId]					UNIQUEIDENTIFIER			NOT NULL,
	);
	ALTER TABLE ImageProduct
	ADD CONSTRAINT FR_ImageProduct_Refer_Product FOREIGN KEY (ProductId) REFERENCES Product(Id);

END
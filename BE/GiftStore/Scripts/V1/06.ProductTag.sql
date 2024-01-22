﻿IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ProductTag')

BEGIN
	
	CREATE TABLE ProductTag (
		[ProductId]					UNIQUEIDENTIFIER			NOT NULL,
		[TagId]						UNIQUEIDENTIFIER			NOT NULL,
		PRIMARY KEY (ProductId, TagId)
	);

	ALTER TABLE ProductTag
	ADD CONSTRAINT FK_ProductTag_Refer_Product FOREIGN KEY (ProductId) REFERENCES Product(Id);

	ALTER TABLE ProductTag
	ADD CONSTRAINT FK_ProductTag_Refer_Tag FOREIGN KEY (TagId) REFERENCES Tag(Id);

END
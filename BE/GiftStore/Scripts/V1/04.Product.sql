IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Product')
BEGIN 
	
	CREATE TABLE [Product] (
		[Id]						UNIQUEIDENTIFIER			PRIMARY KEY			DEFAULT NEWID(),
		[Name]						NVARCHAR(250)				NOT NULL,
		[Price]						FLOAT						NOT NULL,
		[Quantity]					INT							NOT NULL,
		[Variant]					NVARCHAR(50),
		[CreateDate]				DATETIME					NOT NULL			DEFAULT GETDATE(),
		[ParentId]					UNIQUEIDENTIFIER,
		[IsParent]					BIT							NOT NULL,
		[CategoryId]				UNIQUEIDENTIFIER			NOT NULL,
		[SupplierId]				UNIQUEIDENTIFIER			NOT NULL,
		[Description]				NVARCHAR(250),
		[IsDeleted]					BIT							NOT NULL,
	);
	ALTER TABLE Product
	ADD CONSTRAINT FR_Product_Refer_ProductParent FOREIGN KEY (ParentId) REFERENCES Product(Id);

	ALTER TABLE Product
	ADD CONSTRAINT FK_Produc_Refer_Category FOREIGN KEY (CategoryId) REFERENCES Category(Id);

	ALTER TABLE Product
	ADD CONSTRAINT FK_Produc_Refer_Supplier FOREIGN KEY (SupplierId) REFERENCES Supplier(Id);

END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CollectionProduct')

BEGIN

	CREATE TABLE CollectionProduct (
		[ProductId]					UNIQUEIDENTIFIER			NOT NULL,
		[CollectionId]				UNIQUEIDENTIFIER			NOT NULL,
		PRIMARY KEY(ProductId, CollectionId),
	);

	ALTER TABLE CollectionProduct
	ADD CONSTRAINT FK_ProductCollection_Refer_Product FOREIGN KEY (ProductId) REFERENCES Product(Id);
	
	ALTER TABLE CollectionProduct
	ADD CONSTRAINT FK_ProductCollection_Refer_Collection FOREIGN KEY (CollectionId) REFERENCES [Collection](Id);

END

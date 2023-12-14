IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'OrderDetail')
BEGIN
	
	CREATE TABLE [OrderDetail] (
		[Id]						UNIQUEIDENTIFIER			PRIMARY KEY			DEFAULT NEWID(),
		[ProductId]					UNIQUEIDENTIFIER			NOT NULL,
		[Price]						FLOAT						NOT NULL,
		[OrderId]					UNIQUEIDENTIFIER			NOT NULL,
		[Quantity]					INT							NOT NULL,
		[Discount]					FLOAT,
	);

	ALTER TABLE [OrderDetail]
	ADD CONSTRAINT FK_OrderDetail_Refer_Product FOREIGN KEY ([ProductId]) REFERENCES [Product](Id);

	ALTER TABLE [OrderDetail]
	ADD CONSTRAINT FK_OrderDetail_Refer_Order FOREIGN KEY ([OrderID]) REFERENCES [Order](Id);

END
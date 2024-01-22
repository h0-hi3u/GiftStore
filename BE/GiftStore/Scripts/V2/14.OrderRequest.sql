IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'OrderRequest')
BEGIN
	
	CREATE TABLE [OrderRequest] (
		[Id]						UNIQUEIDENTIFIER			PRIMARY KEY			DEFAULT NEWID(),
		[UserId]					UNIQUEIDENTIFIER,
		[TimeCreate]				DATETIME					NOT NULL			DEFAULT GETUTCDATE(),
		[OrderStatus]				INT							NOT NULL,
		[PaymentMethodId]			UNIQUEIDENTIFIER			NOT NULL,
		[TotalPrice]				FLOAT						NOT NULL,
		[Note]						NVARCHAR(250),
	);

	ALTER TABLE [OrderRequest]
	ADD CONSTRAINT FK_OrderRequest_Refer_PaymentMethod FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethod(Id);

	ALTER TABLE [OrderRequest]
	ADD CONSTRAINT FK_OrderRequest_Refer_User FOREIGN KEY (UserId) REFERENCES [User](Id);

END

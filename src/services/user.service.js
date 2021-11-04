     
    
   const querys = {
  getAllUsers: "SELECT  * FROM User",
  getUserById: "SELECT * FROM User Where IdUser = @IdUser",
  addNewUser:
    "INSERT INTO user (name, description, quantity) VALUES (@name,@description,@quantity);",
  deleteUsers: "DELETE FROM [webstore].[dbo].[Products] WHERE Id= @Id",
  getTotalUsers: "SELECT COUNT(*) FROM webstore.dbo.Products",
  updateUserById:
    "UPDATE [webstore].[dbo].[Products] SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @id",
};

module.exports= querys;
 
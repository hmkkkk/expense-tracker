namespace API.Entities
{
    public class Expense
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
    }
}
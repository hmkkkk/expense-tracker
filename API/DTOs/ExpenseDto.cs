namespace API.DTOs
{
    public class ExpenseDto
    {
        public int UserId { get; set; }
        public string Text { get; set; }
        public double Amount { get; set; }
    }
}
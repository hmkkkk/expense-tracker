using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Expense
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
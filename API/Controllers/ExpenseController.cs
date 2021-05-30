using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly DataContext _context;
        public ExpenseController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{username}")]
        public async Task<IEnumerable<Expense>> GetExpenses(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
            var expenses = await _context.Expenses.Where(u => u.UserId == user.Id).ToListAsync();

            return expenses;
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteExpense(int id)
        {
            var expenseToDelete = await _context.Expenses.FirstOrDefaultAsync(x => x.Id == id);
            if (expenseToDelete == null) return BadRequest("Nie udalo sie usunac transakcji");
            _context.Expenses.Remove(expenseToDelete);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult<Expense>> AddExpense(ExpenseDto expenseDto)
        {
            var expense = new Expense
            {
                UserId = expenseDto.UserId,
                Text = expenseDto.Text,
                Amount = expenseDto.Amount
            };
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return expense;
        }


    }
}
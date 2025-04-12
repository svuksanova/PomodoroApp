using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PomodoroApp.Data;
using PomodoroApp.Models;

namespace PomodoroApp.Controllers
{
    [Authorize]
    public class TimerController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public TimerController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            var sessions = _context.PomodoroSessions
                                   .Where(s => s.UserId == user.Id)
                                   .OrderByDescending(s => s.CompletedAt)
                                   .ToList();

            return View(sessions);
        }

        [HttpPost]
        public async Task<IActionResult> LogSession()
        {
            var user = await _userManager.GetUserAsync(User);
            var session = new PomodoroSession
            {
                UserId = user.Id
            };
            _context.PomodoroSessions.Add(session);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}

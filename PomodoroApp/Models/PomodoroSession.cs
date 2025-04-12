using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PomodoroApp.Models
{
    public class PomodoroSession
    {
        public int Id  { get; set; }
        public DateTime CompletedAt { get; set; } = DateTime.Now;
        public int DurationMinutes { get; set; } = 25;

        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}

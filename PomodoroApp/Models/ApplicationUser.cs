using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace PomodoroApp.Models
{
    public class ApplicationUser:IdentityUser
    {
        public virtual ICollection<PomodoroSession> Sessions{ get; set; }
    }
}

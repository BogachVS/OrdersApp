using Microsoft.EntityFrameworkCore;
using OrdersApp.Server.Models;

namespace OrdersApp.Server.Domain
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<OrderModel> Orders { get; set; }
    }
}

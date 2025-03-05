using Microsoft.EntityFrameworkCore;
using OrdersApp.Server.Domain;
using OrdersApp.Server.Services;

var builder = WebApplication.CreateBuilder(args);
var connection = builder.Configuration.GetConnectionString("Default");
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddCors();
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(connection));
builder.Services.AddScoped<DbOperations>();
var app = builder.Build();
app.UseDefaultFiles();
app.MapStaticAssets();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");
app.Run();

using Microsoft.AspNetCore.Mvc;
using OrdersApp.Server.Models;
using OrdersApp.Server.Services;

namespace OrdersApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class AppController : ControllerBase
{


    private readonly DbOperations _operations;

    public AppController(DbOperations operations)
    {
        _operations=operations;
    }

    [HttpGet("GetOrders")]
    public IActionResult Get()
    {
        try
        {
            return Ok(_operations.GetOrders());
        }
        catch(Exception ex)
        {
            Console.Write(ex.Message);
            return BadRequest(ex.Message);
        }
    }
    [HttpGet("GetOrderInfo/{number}")]
    public IActionResult Get(Guid number)
    {
        try
        {
            return Ok(_operations.GetOrder(number));
        }
        catch (Exception ex)
        {
            Console.Write(ex.Message);
            return BadRequest(ex.Message);
        }
    }
    [HttpPost("MakeOrder")]
    public IActionResult Post(OrderModel data)
    {
        try
        {
            _operations.AddOrder(data);
            return Ok(data);
        }
        catch(Exception ex)
        {
            Console.Write(ex.Message);
            return BadRequest(ex.Message);
        }
    }
}

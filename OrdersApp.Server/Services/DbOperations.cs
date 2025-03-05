using OrdersApp.Server.Domain;
using OrdersApp.Server.Models;

namespace OrdersApp.Server.Services
{
    public class DbOperations
    {
        private readonly AppDbContext _context;
        public DbOperations(AppDbContext context)
        {
            _context = context;
        }
        public void AddOrder(OrderModel data) 
        {
            OrderModel order = new()
            {
                OrderNumber = Guid.NewGuid(),
                CitySend = data.CitySend,
                AddressSend = data.AddressSend,
                CityRecieve = data.CityRecieve,
                AddressRecieve = data.AddressRecieve,
                Weight = data.Weight,
                DateOfRecieve = data.DateOfRecieve
            };
            try
            {
                _context.Orders.Add(order);
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                Console.Write(ex.Message);
            }
        }
        public object GetOrder(Guid number) 
        {
            var obj = _context.Orders.FirstOrDefault(obj => obj.OrderNumber==number);
            if (obj != null)
            {
                var order = new
                {
                    OrderNumber = obj.OrderNumber.ToString().ToUpper(),
                    obj.CitySend,
                    obj.AddressSend,
                    obj.CityRecieve,
                    obj.AddressRecieve,
                    obj.Weight,
                    DateOfRecieve = obj.DateOfRecieve.ToShortDateString()
                };
                return order;
            }
            else
            {
                var def = new
                {
                    Id = 0,
                    OrderNumber = Guid.Empty,
                    CitySend = "",
                    AddressSend = "",
                    CityRecieve = "",
                    AddressRecieve = "",
                    Weight = 0,
                    DateOfRecieve = DateTime.MinValue
                };
                return def;
            }    
        }
        public object[] GetOrders() 
        {
            int count = _context.Orders.Count();
            var array = _context.Orders.Take(count).Select(obj => new
            {
               obj.OrderNumber,
               obj.CitySend,
               obj.CityRecieve
            }).ToArray();
            return array;
        }
    }
}

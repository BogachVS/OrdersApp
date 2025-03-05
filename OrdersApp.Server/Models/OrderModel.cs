namespace OrdersApp.Server.Models
{
    public class OrderModel
    {
        public int Id { get; set; }
        public Guid OrderNumber { get; set; }
        public  string CitySend { get; set; }
        public  string AddressSend { get; set; }
        public  string CityRecieve { get; set; }
        public  string AddressRecieve { get; set; }
        public  float Weight { get; set; }
        public  DateTime DateOfRecieve { get; set; }
    }
}

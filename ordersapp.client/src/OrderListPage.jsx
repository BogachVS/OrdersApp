import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './OrderList.css'

function OrderListPage() {
    const [orders, setOrders] = useState([]); 
    const [selected, setSelected] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const fetchOrders = async () => {
        try
        {
            const response = await axios.get("https://localhost:7250/app/GetOrders"); 
            setOrders(response.data); 
        } catch (error)
        {
            console.error("Ошибка при получении данных:", error);
        }
    };
    const fetchOrderInfo = async (number) => {
        try {
            const response = await axios.get(`https://localhost:7250/app/GetOrderInfo/${number}`);
            setSelected(response.data); 
            setShowModal(true); 
        } catch (error) {
            console.error("Ошибка при получении данных о заказе:", error);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelected(null);
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
            <>
            <h4>Список заказов</h4>
            {orders.length === 0 ? (
                <p>Заказов ещё нет.</p>
            ) : (
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Номер заказа</th>
                            <th scope="col">Город отправителя</th>
                            <th scope="col">Город получателя</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.orderNumber} onClick={() => fetchOrderInfo(order.orderNumber)} style={{ cursor: "pointer" }}>
                                <td>{index + 1}</td>
                                <td>{order.orderNumber}</td>
                                <td>{order.citySend}</td>
                                <td>{order.cityRecieve}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Информация о заказе</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selected ? (
                        <div>
                            <p>
                                <strong>Номер заказа:</strong> {selected.orderNumber}
                            </p>
                            <p>
                                <strong>Город отправки:</strong> {selected.citySend}
                            </p>
                            <p>
                                <strong>Адрес отправки:</strong> {selected.addressSend}
                            </p>
                            <p>
                                <strong>Город получения:</strong> {selected.cityRecieve}
                            </p>
                            <p>
                                <strong>Адрес получения:</strong> {selected.addressRecieve}
                            </p>
                            <p>
                                <strong>Вес:</strong> {selected.weight} кг
                            </p>
                            <p>
                                <strong>Дата получения:</strong> {selected.dateOfRecieve}
                            </p>
                        </div>
                    ) : (
                        <p>Загрузка информации о заказе...</p>
                    )}
                </Modal.Body>
            </Modal>
            </>
    );
}
export default OrderListPage
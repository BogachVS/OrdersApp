import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Modal} from 'react-bootstrap'
import axios from 'axios'
import './MakeOrder.css'

const MakeOrderPage = () =>
{
    const [showModal, setShowModal] = useState(false); 
    const [modalMessage, setModalMessage] = useState(""); 
    const handleClose = () => setShowModal(false); 
    const handleShow = () => setShowModal(true);
    const [formData, setFormData] = useState({
        CitySend:"",
        AddressSend:"",
        CityRecieve:"",
        AddressRecieve:"",
        Weight:"",
        DateOfRecieve:"",
    });
    const [minDate, setMinDate] = useState("");
    useEffect(() => { const today = new Date().toISOString().split('T')[0]; setMinDate(today);}, []);
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const handleSubmit = async (e) => { e.preventDefault();
        try {
            const response = await axios.post("https://localhost:7250/app/MakeOrder", formData);
            if (response.status === 200) {
                setModalMessage("Заказ успешно создан");
                handleShow();
                setFormData({
                    CitySend:"",
                    AddressSend:"",
                    CityRecieve:"",
                    AddressRecieve:"",
                    Weight:"",
                    DateOfRecieve:"",
                });
            }
        }
        catch (error)
        {
            setModalMessage("Ошибка при создании заказа : " + error.message); 
            handleShow();
        }
    };
    return (
        <>
        <form className="ordering" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="CitySend" value={formData.CitySend} onChange={handleChange} required />
                <label htmlFor="CitySend">Город отправителя</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="AddressSend" value={formData.AddressSend} onChange={handleChange} required />
                <label htmlFor="AddressSend">Адрес отправителя</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="CityRecieve" value={formData.CityRecieve} onChange={handleChange} required />
                <label htmlFor="CityRecieve">Город получателя</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="AddressRecieve" value={formData.AddressRecieve} onChange={handleChange} required />
                <label htmlFor="AddressRecieve">Адрес получателя</label>
            </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="Weight" value={formData.Weight} min="1" max="1000" step=".01" onChange={handleChange} required />
                <label htmlFor="Weight">Вес груза(кг)</label>
            </div>
            <div className="form-floating  mb-3">
                <input type="date" id="DateOfRecieve" className="form-control" min={minDate} value={formData.DateOfRecieve} onChange={handleChange} required />
                <label htmlFor="DateOfRecieve">Дата получения</label>
            </div>
                    <button type="submit" className="btn btn-primary" id='btn'>Сделать заказ</button>
        </form>
            <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Результат</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
            </Modal>
      </>
    );
}
export default MakeOrderPage

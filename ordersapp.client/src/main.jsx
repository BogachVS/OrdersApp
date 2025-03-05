import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import MakeOrderPage from './MakeOrderPage.jsx'
import OrderListPage from './OrderListPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <Router>
        <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item"><a href="/" className="nav-link">Создать заказ</a></li>
                <li className="nav-item"><a href="/orders" className="nav-link">Список заказов</a></li>
            </ul>
        </header>
        <Routes>
            <Route path="/" element={<MakeOrderPage />} />
            <Route path="/orders" element={<OrderListPage />} />
        </Routes>
    </Router>
);

import axios from 'axios';
import { useEffect, useState } from 'react';
import { MOCK_API_URL } from '../../utils/urls';
import BaseTable from '../Tables/OrderTable';
import { OrderType } from '../../types/order';

function PreOrdersPage() {
    const tableHeaders = ['From', 'Product', 'Budget', 'Status'];
    const [orders, setOrders] = useState<OrderType[]>([]);
    const getOrders = async () => {
        const res = await axios.get(`${MOCK_API_URL}/pre-orders`);
        if (res.status === 200) {
            setOrders(res.data);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);
    return (
        <div>
            <BaseTable headers={tableHeaders} content={orders} />
        </div>
    );
}

export default PreOrdersPage;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL, MOCK_API_URL } from '../../utils/urls';
import BaseTable from '../Tables/OrderTable';
import { OrderType } from '../../types/order';

function PreOrdersPage() {
    const tableHeaders = ['From', 'Product', 'Budget', 'Status'];
    const [orders, setOrders] = useState<OrderType[]>([]);
    const getOrders = async () => {
        try {
            const orderRes = await axios.get(`${MOCK_API_URL}/pre-orders`);
            if (orderRes.status === 200 || orderRes.status === 304) {
                const ordersData: OrderType[] = orderRes.data;
                const updatedOrders = await Promise.all(
                    ordersData.map(async (order: OrderType) => {
                        // Call the profile API to get the sender's fullName
                        const profileRes = await axios.get(
                            `${API_URL}/profile/${order.senderId}`
                        );
                        if (profileRes.data) {
                            return {
                                ...order,
                                senderName: profileRes.data.fullName,
                            };
                        }
                        return order;
                    })
                );
                setOrders(updatedOrders);
            }
        } catch (error) {
            // console.error('Error fetching pre-orders:', error);
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

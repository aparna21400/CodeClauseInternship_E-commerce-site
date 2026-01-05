import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    if (!token) {
      console.log('No token available, cannot fetch orders');
      return;
    }

    try {
      setLoading(true)
      console.log('Requesting orders from', backendUrl + '/api/orders')
      const res = await axios.get(backendUrl + '/api/orders', { headers: { Authorization: `Bearer ${token}` } })
      console.log('Orders response:', res.status, res.data?.message || 'ok')
      if (res.data.success) {
        setOrders(res.data.orders || [])
      } else {
        toast.error(res.data.message || 'Failed to fetch orders')
      }
    } catch (err) {
      console.log('Fetch orders error:', err?.response?.status, err?.response?.data || err.message)
      if (err?.response?.status === 401) {
        toast.error('Unauthorized. Ensure you logged in with a user account that has an id (try /api/auth/login)')
      } else {
        toast.error(err.message || 'Failed to fetch orders')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [token])

  return (
    <div>
      <h2 className='mb-4'>Orders</h2>
      {loading ? <p>Loading...</p> : (
        <div>
          {orders.length === 0 ? <p>No orders found</p> : (
            <div className='space-y-3'>
              {orders.map((o) => (
                <div key={o._id} className='border p-3 rounded-sm'>
                  <p><b>Order:</b> {o.orderNumber || o._id}</p>
                  <p><b>User:</b> {String(o.user)}</p>
                  <p><b>Items:</b> {o.items?.length ?? 0}</p>
                  <p><b>Total:</b> {o.total ?? 0}</p>
                  <p><b>Status:</b> {o.status ?? 'N/A'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Orders
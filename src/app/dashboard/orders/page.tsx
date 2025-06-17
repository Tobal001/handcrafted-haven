'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Link from 'next/link';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const orders = {
  queue: [
    {
      id: 'order_001',
      customer: 'Jane Doe',
      status: 'waiting',
      date: '2025-06-15',
      items: ['Elegant Ceramic Bowl'],
    },
    {
      id: 'order_002',
      customer: 'Tom Smith',
      status: 'processing',
      date: '2025-06-16',
      items: ['Tea Cup Set'],
    },
  ],
  history: [
    {
      id: 'order_0001',
      customer: 'Anna White',
      status: 'completed',
      date: '2025-05-30',
      items: ['Serving Platter'],
    },
    {
      id: 'order_0002',
      customer: 'Mike Johnson',
      status: 'canceled',
      date: '2025-05-28',
      items: ['Handcrafted Vase'],
    },
  ],
};

const statusBadge = (status: string) => {
  switch (status) {
    case 'waiting':
      return (
        <span className="text-yellow-700 bg-yellow-100 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <ClockIcon className="h-4 w-4" /> Waiting
        </span>
      );
    case 'processing':
      return (
        <span className="text-blue-700 bg-blue-100 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <ClockIcon className="h-4 w-4" /> In Progress
        </span>
      );
    case 'completed':
      return (
        <span className="text-green-700 bg-green-100 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <CheckCircleIcon className="h-4 w-4" /> Completed
        </span>
      );
    case 'canceled':
      return (
        <span className="text-red-700 bg-red-100 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <XCircleIcon className="h-4 w-4" /> Canceled
        </span>
      );
  }
};

export default function OrdersPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-[#3E3E3E]">My Orders</h1>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-4 mb-8 border-b border-gray-200">
          <Tab
            className={({ selected }) =>
              `py-2 px-4 text-sm font-semibold ${
                selected
                  ? 'text-[#B55B3D] border-b-2 border-[#B55B3D]'
                  : 'text-gray-500 hover:text-[#B55B3D]'
              }`
            }
          >
            Queue
          </Tab>
          <Tab
            className={({ selected }) =>
              `py-2 px-4 text-sm font-semibold ${
                selected
                  ? 'text-[#B55B3D] border-b-2 border-[#B55B3D]'
                  : 'text-gray-500 hover:text-[#B55B3D]'
              }`
            }
          >
            Completed / Canceled
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {/* Queue Orders */}
          <Tab.Panel className="space-y-6">
            {orders.queue.map((order) => (
              <div
                key={order.id}
                className="border border-[#E6E1DC] rounded-xl p-5 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-[#3E3E3E]">Order #{order.id}</h2>
                  {statusBadge(order.status)}
                </div>
                <p className="text-sm text-[#6C6C6C]">
                  <strong>Customer:</strong> {order.customer}
                </p>
                <p className="text-sm text-[#6C6C6C]">
                  <strong>Items:</strong> {order.items.join(', ')}
                </p>
                <p className="text-sm text-[#6C6C6C] mb-4">
                  <strong>Placed on:</strong> {order.date}
                </p>
                <div className="flex gap-3">
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="text-sm bg-[#B55B3D] hover:bg-[#9E4F37] text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    View Details
                  </Link>
                  <button className="text-sm text-green-700 font-semibold hover:underline">
                    Mark as Completed
                  </button>
                </div>
              </div>
            ))}
          </Tab.Panel>

          {/* Completed & Canceled Orders */}
          <Tab.Panel className="space-y-6">
            {orders.history.map((order) => (
              <div
                key={order.id}
                className="border border-[#E6E1DC] rounded-xl p-5 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-[#3E3E3E]">Order #{order.id}</h2>
                  {statusBadge(order.status)}
                </div>
                <p className="text-sm text-[#6C6C6C]">
                  <strong>Customer:</strong> {order.customer}
                </p>
                <p className="text-sm text-[#6C6C6C]">
                  <strong>Items:</strong> {order.items.join(', ')}
                </p>
                <p className="text-sm text-[#6C6C6C]">
                  <strong>Date:</strong> {order.date}
                </p>
              </div>
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend }: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
}) => (
  <div className="bg-gray-800 rounded-lg p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
      </div>
      <div className="w-12 h-12 bg-indigo-500 bg-opacity-20 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-indigo-500" />
      </div>
    </div>
    <p className="text-green-500 text-sm mt-4">
      <TrendingUp className="w-4 h-4 inline mr-1" />
      {trend}
    </p>
  </div>
);

export default function Dashboard() {
  const { games } = useStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Users"
          value="1,234"
          trend="+12.5% from last month"
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value="856"
          trend="+8.2% from last month"
        />
        <StatCard
          icon={DollarSign}
          label="Revenue"
          value="$45,678"
          trend="+15.3% from last month"
        />
        <StatCard
          icon={ShoppingCart}
          label="Products"
          value={games.length.toString()}
          trend="+4.1% from last month"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Product</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="py-3">#ORD-{i}234</td>
                  <td>John Doe</td>
                  <td>Cyber Odyssey 2077</td>
                  <td>$49.99</td>
                  <td>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500 bg-opacity-20 text-green-500">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export const MetricsCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="text-3xl font-bold text-blue-900">12,870</div>
        <div className="text-gray-500 text-sm">Total Files Monitored</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="text-3xl font-bold text-yellow-500">89</div>
        <div className="text-gray-500 text-sm">Flagged Files</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="text-3xl font-bold text-red-500">16</div>
        <div className="text-gray-500 text-sm">Unverified Files</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="text-3xl font-bold text-green-500">420</div>
        <div className="text-gray-500 text-sm">Total Users</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="text-3xl font-bold text-red-500">6</div>
        <div className="text-gray-500 text-sm">Suspicious Transfers Today</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="text-3xl font-bold text-yellow-500">3</div>
        <div className="text-gray-500 text-sm">Pending Investigations</div>
      </div>
    </div>
  );
};
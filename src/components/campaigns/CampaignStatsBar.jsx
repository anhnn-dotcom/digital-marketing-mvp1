import Card from '../ui/Card';

export default function CampaignStatsBar({ campaigns, activeFilter, onFilterChange }) {
  const stats = [
    { id: 'Active', label: 'Active', value: campaigns.filter(c => c.status === 'Active' || c.status === 'Running').length },
    { id: 'Scheduled', label: 'Scheduled', value: campaigns.filter(c => c.status === 'Scheduled').length },
    { id: 'Completed', label: 'Completed', value: campaigns.filter(c => c.status === 'Completed').length },
    { id: 'Inactive', label: 'Inactive', value: campaigns.filter(c => c.status === 'Inactive').length },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card 
          key={stat.id} 
          className={`px-6 py-4 cursor-pointer transition-all hover:border-[#2563EB] hover:shadow-sm ${activeFilter === stat.id ? 'border-[#2563EB] bg-blue-50/20' : ''}`}
          onClick={() => onFilterChange(activeFilter === stat.id ? null : stat.id)}
        >
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${activeFilter === stat.id ? 'text-[#2563EB]' : 'text-[#64748B]'}`}>{stat.label}</p>
            <span className={`text-2xl font-bold ${activeFilter === stat.id ? 'text-[#0F172A]' : 'text-[#0F172A]'}`}>{stat.value}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

import { useState } from 'react';
import { Search, Plus, MoreVertical, Image as ImageIcon } from 'lucide-react';
import { DYNAMIC_CONTENTS } from '../../constants/mockData';
import Button from '../ui/Button';
import SearchBar from '../ui/SearchBar';
import Badge from '../ui/Badge';
import ActionsMenu from '../ui/ActionsMenu';

export default function ContentList({ onCreateContent, onEditContent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredContents = DYNAMIC_CONTENTS.filter((content) => {
    const matchesSearch = content.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || content.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || content.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Banner': return <Badge variant="blue">Banner</Badge>;
      case 'Popup': return <Badge variant="purple">Popup</Badge>;
      default: return <Badge variant="gray">Default</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return <Badge variant="green">Active</Badge>;
      case 'inactive': return <Badge variant="gray">Inactive</Badge>;
      case 'draft': return <Badge variant="yellow">Draft</Badge>;
      default: return <Badge variant="gray">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div className="w-full sm:w-96">
          <SearchBar 
            placeholder="Search content by name..." 
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            className="h-10 px-3 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Banner">Banner</option>
            <option value="Popup">Popup</option>
          </select>
          <select 
            className="h-10 px-3 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
              <tr>
                <th className="px-6 py-4 font-medium">Thumbnail</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Linked Campaign</th>
                <th className="px-6 py-4 font-medium">Segment</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Updated</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredContents.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors group cursor-pointer" onClick={() => onEditContent ? onEditContent(item) : onCreateContent()}>
                  <td className="px-6 py-4">
                    <div className={`w-12 h-8 rounded flex items-center justify-center ${item.type === 'Banner' ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg w-10 h-10'}`}>
                      <ImageIcon className="w-4 h-4 text-white opacity-80" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#0F172A]">{item.name}</td>
                  <td className="px-6 py-4">{getTypeBadge(item.type)}</td>
                  <td className="px-6 py-4 text-[#64748B]">{item.campaign}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-[#F1F5F9] text-[#475569] text-xs font-medium">
                      {item.segment}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                  <td className="px-6 py-4 text-[#64748B] text-xs">{item.updated}</td>
                  <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                    <ActionsMenu 
                      options={[
                        { label: 'Preview', onClick: () => {} },
                        { label: 'Edit', onClick: () => onEditContent ? onEditContent(item) : onCreateContent() },
                        { label: 'Duplicate', onClick: () => {} },
                        { label: 'Link to Campaign', onClick: () => {} },
                        { type: 'divider' },
                        { label: item.status === 'Active' ? 'Deactivate' : 'Activate', onClick: () => {} },
                        { label: 'Delete', onClick: () => {}, danger: true }
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {filteredContents.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-[#64748B]">
                    No content found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

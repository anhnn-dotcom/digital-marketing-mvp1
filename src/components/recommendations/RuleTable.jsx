import { GripVertical, MoreVertical, TrendingUp } from 'lucide-react';
import ActionsMenu from '../ui/ActionsMenu';
import Badge from '../ui/Badge';

export default function RuleTable({ rules, onEdit, onDelete, onToggle, onReorder }) {
  
  // Drag and drop is simplified for MVP without bringing in dnd libraries
  // but it visually represents the functionality
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('sourceIndex', index.toString());
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'), 10);
    if (sourceIndex !== index) {
      onReorder(sourceIndex, index);
    }
  };

  return (
    <div className="w-full overflow-x-auto fade-in">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
          <tr>
            <th className="px-5 py-4 font-medium w-16 text-center">Priority</th>
            <th className="px-5 py-4 font-medium min-w-[200px]">Rule Name</th>
            <th className="px-5 py-4 font-medium">Trigger Segment</th>
            <th className="px-5 py-4 font-medium min-w-[250px]">Products</th>
            <th className="px-5 py-4 font-medium">Placement</th>
            <th className="px-5 py-4 font-medium">Status</th>
            <th className="px-5 py-4 font-medium text-right">Performance</th>
            <th className="px-5 py-4 font-medium w-16 text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0] bg-white text-[#0F172A]">
          {rules.sort((a,b) => a.priority - b.priority).map((rule, index) => (
            <tr 
              key={rule.id} 
              className="hover:bg-[#F8FAFC] transition-colors group cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => onEdit(rule)}
            >
              <td className="px-5 py-4 tabular-nums">
                <div className="flex justify-center items-center gap-2 text-[#64748B]">
                  <GripVertical className="w-4 h-4 cursor-grab text-[#CBD5E1] group-hover:text-[#94A3B8]" />
                  <span className="font-mono text-sm">{rule.priority}</span>
                </div>
              </td>
              <td className="px-5 py-4 font-semibold text-[#0F172A]">{rule.name}</td>
              <td className="px-5 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded bg-[#F1F5F9] text-[#475569] text-xs font-medium border border-gray-200">
                  {rule.trigger}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-1">
                  {rule.products.slice(0, 2).map((p, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-medium whitespace-nowrap">
                      {p}
                    </span>
                  ))}
                  {rule.products.length > 2 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-[11px] font-medium whitespace-nowrap">
                      +{rule.products.length - 2} more
                    </span>
                  )}
                  {rule.products.length === 0 && (
                    <span className="text-gray-400 italic text-xs">Dynamic</span>
                  )}
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex gap-1 flex-wrap">
                  {rule.placements.map((p, i) => (
                    <Badge key={i} variant="gray" className="text-[10px] uppercase py-0 px-1.5">{p}</Badge>
                  ))}
                </div>
              </td>
              <td className="px-5 py-4">
                <Badge variant={rule.status === 'Active' ? 'green' : 'gray'}>
                  {rule.status}
                </Badge>
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex flex-col items-end gap-0.5">
                  <span className="font-medium text-[#0F172A] flex items-center gap-1">
                    {rule.ctr !== '—' && <TrendingUp className="w-3 h-3 text-[#10B981]" />}
                    {rule.ctr}
                  </span>
                  <span className="text-xs text-[#64748B]">{rule.shown > 0 ? `${rule.shown.toLocaleString()} shown` : 'No data'}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                <ActionsMenu 
                  options={[
                    { label: 'Edit', onClick: () => onEdit(rule) },
                    { label: 'Duplicate', onClick: () => {} },
                    { label: 'View Performance', onClick: () => {} },
                    { type: 'divider' },
                    { label: rule.status === 'Active' ? 'Deactivate' : 'Activate', onClick: () => onToggle(rule.id, rule.status !== 'Active') },
                    { label: 'Delete', onClick: () => onDelete(rule), danger: true }
                  ]}
                />
              </td>
            </tr>
          ))}
          {rules.length === 0 && (
            <tr>
              <td colSpan="8" className="px-6 py-12 text-center text-[#64748B]">
                No recommendation rules defined or found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

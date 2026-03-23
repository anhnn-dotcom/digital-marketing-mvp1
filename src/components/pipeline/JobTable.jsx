import React from 'react';
import { MoreHorizontal, Play, Pause, Edit, Trash2 } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

export default function JobTable({ jobs, dataSources, onRun, onTogglePause, onEdit, onDelete }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Running': return <Badge variant="blue"><span className="animate-pulse">Running</span></Badge>;
      case 'Completed': return <Badge variant="green">Completed</Badge>;
      case 'Scheduled': return <Badge variant="gray">Scheduled</Badge>;
      case 'Failed': return <Badge variant="red">Failed</Badge>;
      case 'Paused': return <Badge variant="yellow">Paused</Badge>;
      default: return <Badge variant="gray">{status}</Badge>;
    }
  };

  const getSourceNames = (sourceIds) => {
    if (!sourceIds) return '-';
    const names = sourceIds.map(id => dataSources.find(s => s.id === id)?.name || id);
    if (names.length > 2) {
      return `${names.slice(0, 2).join(', ')} +${names.length - 2}`;
    }
    return names.join(', ');
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-[#64748B]">
        <thead className="bg-[#F8FAFC] text-xs uppercase text-[#64748B] font-semibold border-y border-[#E2E8F0]">
          <tr>
            <th className="px-5 py-3 rounded-tl-lg">Job Name</th>
            <th className="px-5 py-3">Sources</th>
            <th className="px-5 py-3 whitespace-nowrap">Schedule</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-right">Enrichment %</th>
            <th className="px-5 py-3 text-right rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0] bg-white">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-[#F8FAFC] transition-colors group">
              <td className="px-5 py-4">
                <div className="font-semibold text-[#0F172A] mb-0.5">{job.name}</div>
                <div className="text-xs text-[#64748B] flex items-center gap-1.5">
                  <span className="font-medium bg-slate-100 rounded px-1.5 py-0.5">{job.type}</span>
                  Out: <span className="text-[#0F172A]">{job.outputDataset}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-[#0F172A] truncate max-w-[150px]" title={getSourceNames(job.sourceIds)}>
                {getSourceNames(job.sourceIds)}
              </td>
              <td className="px-5 py-4">
                <div className="text-[#0F172A] font-medium">{job.schedule}</div>
                <div className="text-xs text-slate-500 mt-0.5">Next: {job.nextRun || '-'}</div>
              </td>
              <td className="px-5 py-4">
                {getStatusBadge(job.status)}
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-col items-end gap-1">
                  <span className="font-semibold text-[#0F172A] text-right">{job.enrichmentRate}</span>
                  <ProgressBar 
                    progress={parseFloat(job.enrichmentRate) || 0} 
                    className="w-24 h-1.5"
                    colorClass={job.status === 'Failed' ? 'bg-red-500' : 'bg-green-500'} 
                  />
                </div>
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onRun(job)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Run Now">
                    <Play className="w-4 h-4" />
                  </button>
                  <button onClick={() => onTogglePause(job)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded" title={job.status === 'Paused' ? 'Resume' : 'Pause'}>
                    <Pause className="w-4 h-4" />
                  </button>
                  <button onClick={() => onEdit(job)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(job)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {jobs.length === 0 && (
            <tr>
              <td colSpan="6" className="px-5 py-12 text-center text-slate-500">
                No enrichment jobs found. Create one to start processing data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

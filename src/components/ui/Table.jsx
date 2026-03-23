export default function Table({ columns, data, rowKey = 'id' }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#E2E8F0] bg-white shadow-sm">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#E2E8F0]">
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index}
                className="px-6 py-3 font-medium text-xs tracking-wider uppercase"
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-[#64748B]">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr 
                key={row[rowKey]}
                className="hover:bg-[#F8FAFC] transition-colors group"
              >
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4 text-[#0F172A]">
                    {col.cell ? col.cell(row) : row[col.accessorKey]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

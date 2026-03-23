export default function Card({ children, className = '', title }) {
  return (
    <div className={`bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="px-5 py-4 border-b border-[#E2E8F0] bg-white">
          <h3 className="text-sm font-medium text-[#0F172A]">{title}</h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

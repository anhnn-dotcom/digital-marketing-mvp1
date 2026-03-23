import { Search } from 'lucide-react';
import { forwardRef } from 'react';

const SearchBar = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div className={`relative flex items-center w-full max-w-sm ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#94A3B8]">
        <Search className="w-4 h-4" />
      </div>
      <input
        ref={ref}
        type="text"
        className="block w-full h-10 pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-md leading-5 bg-white placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        placeholder="Search..."
        {...props}
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;

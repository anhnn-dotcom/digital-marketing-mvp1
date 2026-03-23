import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DateRangePicker({ date, setDate }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 justify-center w-[260px] rounded-md border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors"
      >
        <CalendarIcon className="w-4 h-4 text-[#64748B]" />
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
            </>
          ) : (
            format(date.from, 'LLL dd, y')
          )
        ) : (
          <span>Pick a date range</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 p-3 fade-in">
          <style>{`
            .rdp {
              --rdp-cell-size: 40px;
              --rdp-accent-color: #2563EB;
              --rdp-background-color: #DBEAFE;
              margin: 0;
            }
          `}</style>
          <DayPicker
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Clock, MapPin, ArrowLeft } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  type: 'lease' | 'maintenance' | 'payment';
  property: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Lease Expiration - Apt 2B',
    date: '2024-03-15',
    property: 'Los Volcanes 414',
    location: 'Apt 2B',
    type: 'lease'
  },
  {
    id: 2,
    title: 'AC Maintenance',
    date: '2024-03-20',
    time: '10:00',
    property: 'El Morro, 26',
    location: 'All units',
    type: 'maintenance'
  },
  {
    id: 3,
    title: 'Rent Payment Due',
    date: '2024-04-01',
    property: 'Holycan',
    location: 'Unit 3A',
    type: 'payment'
  }
];

interface CalendarProps {
  onClose: () => void;
}

export function Calendar({ onClose }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const hasEventsOnDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateStr);
  };

  const getDayEvents = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvents = hasEventsOnDate(day);
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`h-10 relative flex items-center justify-center rounded-full hover:bg-white/10 transition-colors
            ${hasEvents ? 'font-bold' : ''}
          `}
        >
          {day}
          {hasEvents && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full" />
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1E1B2E] rounded-xl w-full max-w-lg mx-4">
        <div className="p-4 border-b border-gray-800 flex items-center">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold flex-1">Calendar</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousMonth}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium">{formatDate(currentDate)}</h3>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="h-8 flex items-center justify-center text-sm text-gray-400">
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {events.map(event => (
                <div
                  key={event.id}
                  className="bg-[#13111C] rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">{event.title}</h4>
                    <span className="text-sm text-purple-400">{event.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                      {event.time && ` at ${event.time}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{event.property} - {event.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
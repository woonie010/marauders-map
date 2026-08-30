'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '.././libs/utils';
import { ActivityEvent } from '@/types/activity';
import { fetchNearActivities } from '@/epics/activity';
import { format } from 'date-fns';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);

  // Fetch activities when component loads
  useEffect(() => {
    const getActivities = async () => {
      try {
        const fetchedActivities = await fetchNearActivities();
        setActivities(fetchedActivities);
      } catch (err) {
        console.log('Error fetching activities:', err);
      }
    };

    getActivities();
  }, []);

  // Handle navigation to the previous month
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
    setSelectedDate(null);
  };

  // Handle navigation to the next month
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
    setSelectedDate(null);
  };

  // Generate calendar days based on the current month
  const generateCalendar = (date: Date): (number | null)[][] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = new Array(7).fill(null);

    for (let day = 1; day <= totalDays; day++) {
      const dayOfWeek = (day + adjustedStartDay - 1) % 7;
      week[dayOfWeek] = day;
      if (dayOfWeek === 6 || day === totalDays) {
        weeks.push([...week]);
        week = new Array(7).fill(null);
      }
    }

    return weeks;
  };

  const weeks = generateCalendar(currentDate);

  // Format date as 'YYYY-MM-DD'
  const formatDate = (year: number, month: number, day: number): string => {
    const m = month + 1 < 10 ? `0${month + 1}` : month + 1;
    const d = day < 10 ? `0${day}` : day;
    return `${year}-${m}-${d}`;
  };

  // Get activity events for a specific date
  const getActivityEventsForDate = (date: Date): ActivityEvent[] => {
    const dateKey = formatDate(date.getFullYear(), date.getMonth(), date.getDate());
    return activities.filter((event) => event.date === dateKey);
  };

  // Handle clicking on a day in the calendar
  const handleDayClick = (day: number | null) => {
    if (day === null) {
      setSelectedDate(null);
      return;
    }
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  // Check if a specific day has any events
  const hasEvents = (day: number | null): boolean => {
    if (day === null) return false;
    const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    return activities.some((event) => event.date === dateString);
  };

  // Get all events for the current month
  const getEventsForMonth = (year: number, month: number): ActivityEvent[] => {
    return activities.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  };

  const monthEvents = getEventsForMonth(currentDate.getFullYear(), currentDate.getMonth());

  // Selected date's events
  const selectedDateEvents = selectedDate ? getActivityEventsForDate(selectedDate) : [];

  const today = new Date();

  return (
    <div className="flex items-center py-8 px-4 pr-5 w-[20rem]">
      <div className="shadow-lg">
        {/* Calendar Header */}
        <div className="p-5 dark:bg-gray-800 bg-white rounded-t-lg">
          <div className="px-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold dark:text-gray-100 text-gray-800">
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h1>
            <div className="flex items-center text-gray-800 dark:text-gray-100">
              <button onClick={handlePrevMonth} className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button onClick={handleNextMonth} className="focus:outline-none ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler ml-3 icon-tabler-chevron-right"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          {/* Days of Week */}
          <div className="flex items-center justify-between pt-12 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                    <th key={day}>
                      <div className="w-full flex">
                        <p className="text-lg font-medium text-center text-gray-800 dark:text-gray-100">{day}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, i) => (
                  <tr key={i}>
                    {week.map((day, j) => {
                      const isCurrentDay =
                        day === today.getDate() &&
                        currentDate.getMonth() === today.getMonth() &&
                        currentDate.getFullYear() === today.getFullYear();

                      return (
                        <td key={j} className="pt-6">
                          <div
                            className={cn(
                              'px-2 py-1 cursor-pointer flex w-full justify-center relative',
                              isCurrentDay
                                ? 'bg-customBlue text-white rounded-full w-14 h-14 flex items-center justify-center'
                                : '',
                              hasEvents(day) && !isCurrentDay ? 'text-blue-500' : 'text-gray-500 dark:text-gray-100',
                            )}
                            onClick={() => handleDayClick(day)}
                          >
                            {day ? (
                              <>
                                <p
                                  className={cn(
                                    'text-lg font-medium',
                                    isCurrentDay ? 'text-white' : 'text-gray-500 dark:text-gray-100',
                                  )}
                                >
                                  {day}
                                </p>
                                {hasEvents(day) && !isCurrentDay && (
                                  <span className="absolute bottom-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </>
                            ) : null}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Events Section */}
        <div className="py-5 px-2 dark:bg-gray-700 bg-gray-50 rounded-b">
          <div className="px-4">
            {selectedDate ? (
              selectedDateEvents.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Events on {selectedDate.toLocaleDateString()}
                  </h2>
                  {selectedDateEvents.map((event, index) => (
                    <div key={index} className="border-b border-gray-200 py-2">
                      <h3 className="text-lg text-gray-800 dark:text-gray-100 font-medium">{event.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-300">No events for this day.</p>
              )
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-customBlue_300 mb-4 underline-offset-8 underline">
                  Events this month
                </h2>
                {monthEvents.length > 0 ? (
                  monthEvents.map((event, index) => (
                    <div key={index} className="border-b border-gray-200 py-2">
                      <h3 className="text-lg text-neutral-50 font-medium uppercase">{event.name}</h3>
                      <p className="text-neutral-300">{event.description}</p>
                      <p className="text-customPink_200 opacity-85">{format(event.date, 'MMMM dd, yyyy')}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-300">No events this month.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

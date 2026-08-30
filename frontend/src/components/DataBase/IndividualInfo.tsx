import Image from 'next/image';
import { IndividualInfoProps } from '@/types/individual';
import React, { useEffect, useRef, useState } from 'react';
import { format, toZonedTime } from 'date-fns-tz';
import { useRouter } from 'next/navigation';

const IndividualInfo: React.FC<IndividualInfoProps> = ({ onClose, individual }) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const getLastSeenDate = (): string => {
    if (individual.last_seen) {
      const lastSeenDate = toZonedTime(new Date(individual.last_seen), 'Asia/Kuala_Lumpur');
      return format(lastSeenDate, 'yyyy-MM-dd');
    }
    return ''; // Handle cases where last_seen is not available
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.remove('hidden');
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const handleClose = () => {
    onClose(); // Trigger the external onClose function passed via props
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/capture/positions/${individual.id}/${getLastSeenDate()}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      router.push(`/tracking?individualId=${individual.id}&date=${getLastSeenDate()}`);
    } catch (err) {
      console.error(err);
      setError('There was an error submitting the data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const lastSeenDate = getLastSeenDate(); // Get last seen date

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50" id="info-popup">
      <div ref={modalRef} className="bg-customBlue_700 rounded-lg p-6 max-w-lg w-full shadow-lg relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold uppercase text-neutral-300">Individual Information</h2>
          <button
            onClick={handleClose}
            className="bg-text-gray-500 hover:text-customBrightRed text-2xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="flex justify-center">
          <Image src="/profile_picture.jpg" alt="User Image" width={200} height={200} className="rounded-3xl" />
        </div>

        {/* Modal Content */}
        <div className="mb-4 p-2 text-neutral-300 pt-5">
          <p className="pt-1">
            <strong>Name:</strong> {individual.name}
          </p>
          <p className="pt-1">
            <strong>Category:</strong> {individual.category__name}
          </p>
          <p className="pt-1">
            <strong>Last Seen:</strong>{' '}
            {individual.last_seen ? format(new Date(individual.last_seen), 'dd MMMM yyyy, HH:mm:ss') : 'N/A'}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className={`bg-customBlue_300 hover:bg-customBlue_500 text-white font-bold py-2 px-4 rounded-xl ${!lastSeenDate ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!lastSeenDate}
            title={!lastSeenDate ? 'No last seen data available.' : ''} // Tooltip
          >
            Track
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualInfo;

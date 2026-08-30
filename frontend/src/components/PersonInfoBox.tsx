import { SelectedPerson } from '@/data/Types';

interface InfoBoxProps extends SelectedPerson {
  onClose: () => void; // Add onClose function type
}
/**
 * PersonInfoBox 
 *
 * This component displays information about the selected person, including person's longtitude, latitiude
 * building number, building level, person key. The value will keep update every time if user clicks again.
 */

const InfoBox = ({ personKey, info, onClose }: InfoBoxProps) => {
  return (
    <div className="absolute top-1/2 right-20 transform -translate-y-1/2 w-64 bg-blue-700 bg-opacity-90 text-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{personKey}</h3>
        <button
          onClick={onClose} // Handle the close action
          className="text-white font-bold text-xl hover:text-gray-300"
        >
          &times;
        </button>
      </div>
      <p>
        <strong className="text-blue-200">Longitude:</strong> {info.lng}
      </p>
      <p>
        <strong className="text-blue-200">Latitude:</strong> {info.lat}
      </p>
      <p>
        <strong className="text-blue-200">Level:</strong> {info.level}
      </p>
      <p>
        <strong className="text-blue-200">Building:</strong> {info.building}
      </p>
    </div>
  );
};

export default InfoBox;

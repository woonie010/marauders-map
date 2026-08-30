export interface trackingSliderProps {
  setTimeValue: (value: number) => void;
  timeValue: number;
}

export interface trackingDatePickerProps {
  setDateValue: (value: string) => void;
  dateValue: string;
}

export interface TimeSelectionProps {
  initialDate: string;
}

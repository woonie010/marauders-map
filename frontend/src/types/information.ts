import { CategoriesProps } from './category';
import { Individual } from './individual';

export interface NavInformation {
  organisationName: string;
}

export interface ActivityItemProps {
  title: string;
  description: string;
  status: string;
  statusColor: 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
}

export interface BadgesItemProps {
  colorTheme: 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
  context: string;
}

export interface IdentityCardItemProps {
  label: string;
  amount: number;
}

export interface IdentityCategoryProps {
  title: string;
  identitiesData: CategoriesProps[];
}

export interface visitorInformationItemProps {
  time: string;
  visitorToday: number;
  visitorMonth: number;
}

export interface visitorInformationProps {
  title: string;
  visitorData: visitorInformationItemProps[];
}

// Expanable Activity

export interface ExpanableActivityItemProps {
  title: string;
  description: string;
  status: string;
  statusColor: 'red' | 'yellow' | 'green' | 'blue' | 'purple';
  content: () => React.ReactNode;
}

export interface ExpanableActivityProps {
  expanableActivities: ExpanableActivityItemProps[];
}

// Database
export interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export interface SearchbarProps {
  searchValue: string;
  resetDateFilter: (option: string) => void;
  onSearch: (searchTerm: string) => void;
}

// Data Table
export interface DataTableProps {
  handleIndividualSelected: (individual: Individual) => void;
}

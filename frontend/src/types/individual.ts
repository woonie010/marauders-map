// Individuals
export interface IndividualDatabaseProps {
  individuals_data: Individual[];
}

export interface IndividualDatabaseItemProps {
  category: string;
  lastseen: string | null;
  individual: Individual;
  handleIndividualSelected: (individual: Individual) => void;
}

// response and request
export interface Individual {
  id: number;
  name: string;
  description: string;
  category__name: string;
  last_seen: string | null;
}

export interface IndividualInfoProps {
  onClose: () => void;
  individual: Individual;
}

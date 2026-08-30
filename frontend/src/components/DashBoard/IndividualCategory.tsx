import React from 'react';
import { IdentityInfo } from '@/data/DummyData';
import InfoCards from '../Common/InfoCard';
import { IndividualCategoryProps } from '@/types/category';

const CharacterCategory: React.FC<IndividualCategoryProps> = (props) => {
  const { individualCategories } = props;

  return (
    <div className="font-mono mt-2 mx-auto flex flex-row w-[75%] justify-center">
      {individualCategories.map((individual) => (
        <InfoCards
          key={individual.name} // Ensure that 'id' is a unique identifier in your data
          label={individual.name}
          amount={individual.num_individuals}
        />
      ))}
    </div>
  );
};

export default CharacterCategory;

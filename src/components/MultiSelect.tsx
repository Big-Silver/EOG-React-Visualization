import React from 'react';
import Select from 'react-select';
import { Metrics } from '../types/interfaces/Metrics';

interface SelectProps {
  data?: Metrics[];
  onChange: (list: Metrics[]) => void;
}

const MultiSelect: React.FC<SelectProps> = ({ data = [], onChange }) => {
  const handleChange = (e: any) => {
    onChange(e);
  };

  return (
    <Select
      isMulti
      options={data}
      onChange={handleChange}
    />
  );
};

export default MultiSelect;

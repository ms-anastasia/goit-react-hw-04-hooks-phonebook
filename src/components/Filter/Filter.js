import React from 'react';
import { FilterHeader, FilterInput } from "./Filter.styled";

const Filter = ({ value, onChange }) => (
  <FilterHeader>
    Найти контакт по имени
    <FilterInput type="text" value={value} onChange={onChange} />
  </FilterHeader>
);

export default Filter;
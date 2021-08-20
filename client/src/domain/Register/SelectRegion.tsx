import { Props } from "framer-motion/types/types";
import React from "react";
import { Select } from "@chakra-ui/select";

export const SelectRegion: React.FC<Props> = ({
  name,
  value,
  handleChange,
  regions
}) => (
  <Select name={name} value={value} onChange={handleChange}>
    {regions.map((region: any) => (
      <option value={region.id}>{region.name}</option>
    ))}
  </Select>
);

import { Props } from "framer-motion/types/types";
import React from "react";
import { Select } from "@chakra-ui/select";
import { useMediaQuery } from "@chakra-ui/media-query";
import { v4 as uuidv4 } from "uuid";

export const SelectRegion: React.FC<Props> = ({
  name,
  value,
  handleChange,
  regions
}) => {

  const [isLargerThan] = useMediaQuery("(max-width:400px)");
  
  return (
    <Select
      size={isLargerThan ? "sm" : "md"}
      name={name}
      value={value}
      onChange={handleChange}
    >
      {regions?.map((region: any) => (
        <option key={uuidv4()} value={region.id}>
          {region.name}
        </option>
      ))}
    </Select>
  );};

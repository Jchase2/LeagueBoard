import {
  InputGroup,
  InputLeftAddon,
  Input,
  Container,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SelectRegion } from "../../domain/Register/SelectRegion";
import { useState } from "react";
import { useParams } from "react-router-dom";


interface Props {
  message: string;
  regions: any;
}

type urlParams = {
  id: string;
};

const Searchbar: React.FC<Props> = ({ message, regions }) => {

  const { id } = useParams<urlParams>();
  const [isLargerThan] = useMediaQuery("(max-width:400px)");
  const [isError, setIsError] = useState<boolean>(false);

  const [formData, setFormData] = useState<any>({
    summoner_name: "",
    regionId: 0,
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
   e.preventDefault();
}

  return (
    <Flex marginLeft="25px">
      <form onSubmit={handleSubmit}>
        <InputGroup size={isLargerThan ? "sm" : "md"} borderRadius="20px">
          <InputLeftAddon
            borderRadius="10px"
            children={<SearchIcon color="black"/>}
          />
          <Input
            variant="filled"
            name="summoner_name"
            type="text"
            placeholder={message}
          />
          <SelectRegion name="regionId" regions={regions} />
        </InputGroup>
      </form>
    </Flex>
  );
};

export default Searchbar;

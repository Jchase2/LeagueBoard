import {
  InputGroup,
  InputLeftAddon,
  Input,
  useMediaQuery,
  Flex,
  FormControl,
  Select
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchRegions } from "../../redux/slices";
import { v4 as uuidv4 } from "uuid";

interface Props {
  message: string;
  regions: any;
}


const Searchbar: React.FC<Props> = ({ message }) => {

   const regions = useAppSelector((state) => state.regionReducer.regionState);
   const dispatch = useAppDispatch();
    let history = useHistory();

    useEffect(() => {
      dispatch(fetchRegions());
    }, [dispatch]);
  
  const [isLargerThan] = useMediaQuery("(max-width:400px)");

  const [formData, setFormData] = useState<any>({
    summoner_name: "",
    regionId: 0,
  });

  const id = formData.summoner_name.replace(/\s/g, "");

  const handleSubmit = async (e: React.SyntheticEvent) => {
   e.preventDefault();
    history.push({
      pathname: `/view/${id}`,
      state: { formdata: formData },
    });
};
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    console.log(e.currentTarget)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Flex marginLeft="25px">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputGroup size={isLargerThan ? "sm" : "md"} borderRadius="20px">
            <InputLeftAddon
              borderRadius="10px"
              children={<SearchIcon color="black" />}
            />
            <Input
              variant="filled"
              name="summoner_name"
              type="text"
              value={formData.summoner_name || ""}
              placeholder={message}
              onChange={handleChange}
            />
            <FormControl>
              <FormControl>
                <Select
                  size={isLargerThan ? "sm" : "md"}
                  name="regionId"
                  value={formData.regionId || ""}
                  onChange={handleChange}
                >
                  {regions?.map((region: any) => (
                    <option key={uuidv4()} value={region.code}>
                      {region.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </FormControl>
          </InputGroup>
        </FormControl>
      </form>
    </Flex>
  );
};

export default Searchbar;

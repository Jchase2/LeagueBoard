import { Image } from "@chakra-ui/image";

interface props {
  rank: string;
}

const RankImage: React.FC<props> = ({ rank }) => {
   return (<Image minW="125px"maxH="125px" src={`Emblem_${rank}.png`}></Image>);
};

export default RankImage;
import { Image } from "@chakra-ui/image";

interface props {
  rank: string | number;
}

const RankImage: React.FC<props> = ({ rank }) => {
   return (<Image minW="125px"maxH="125px" src={rank !== 0 ? `Emblem_${rank}.png` : 'latest.png'}></Image>);
};

export default RankImage;
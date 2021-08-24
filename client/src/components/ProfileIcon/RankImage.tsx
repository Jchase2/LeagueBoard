import { Image } from "@chakra-ui/image";
import { changeNum } from "../../utils/romanToNum";

interface props {
  rank: string;
  rankNum: string;
}

const RankImage: React.FC<props> = ({ rank, rankNum }) => {
  rank = rank?.toLowerCase();
  const num = changeNum(rankNum);
  return (
    <Image
      minW="125px"
      maxH="125px"
      src={
        rank
          ? `https://opgg-static.akamaized.net/images/medals/${rank}_${num}.png?image=q_auto:best&v=1`
          : "latest.png"
      }
    ></Image>
  );
};

export default RankImage;

import { Image } from "@chakra-ui/image"

interface props {
    rank: string 
}

const rankedImg:React.FC<props> = ( { rank } ) => {
    rank = rank.toLowerCase()
    rank = rank[0].toUpperCase()
    return <Image src={`Emblem_${rank}.png`}></Image>;
}

export default rankedImg
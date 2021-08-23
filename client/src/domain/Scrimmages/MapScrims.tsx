import { IScrimmage } from "../../interfaces/Scrimmages";
import ScrimCard from "./ScrimCard";

const MapScrims: React.FC<{scrims:any}> = ({scrims}) => {
  console.log(scrims)
  return (
    <>
      {
      scrims && [...scrims].sort((a, b) => Number(b.date) - Number(a.date)).map((scrim) => (
        
        <div key={scrim.id}>
            {!(scrim.parentid >= 1) && <ScrimCard scrim={scrim} />}
        </div>
        
        
      ))
      }
    </>
  );
};

export default MapScrims;

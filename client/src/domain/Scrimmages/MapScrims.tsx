import ScrimCard from "./ScrimCard";

const MapScrims: React.FC<{scrims:any}> = ({scrims}) => {
  return (
    <>
      {
      scrims && [...scrims].sort((a, b) => Number(b.date) - Number(a.date)).map((scrim) => (
        
        <div key={scrim.id}>
            {!(scrim.parentid >= 1) && <ScrimCard key={scrim.id} scrim={scrim} />}
        </div>
        
        
      ))
      }
    </>
  );
};

export default MapScrims;
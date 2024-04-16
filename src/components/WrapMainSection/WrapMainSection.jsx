import Planets from '../Planets/Planets';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
const WrapMainSection = () => {
  const [totalLoadedPlanets, setTotalLoadedPlanets] = useState(8);
  const setCount = (count) => {
    setTotalLoadedPlanets(count);
  };
  return (
    <>
      <Navbar />
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Planets setCount={setCount} />
      </div>
    </>
  );
};

export default WrapMainSection;

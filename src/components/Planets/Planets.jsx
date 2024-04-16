import { useCallback, useEffect, useRef, useState } from 'react'; 
import useGetPlanets from './hooks/useLoadPlanet';
import Load from '../animations/loading/Load'; 
import './Planets.css';
import Tilt from 'react-vanilla-tilt'; 
import { NavLink } from 'react-router-dom'; 
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Planets = (props) => { 
  const [loadedPlanets, setLoadedPlanets] = useState(8); 
  const { planets, loading, hasMore, totalCount } = 
    useGetPlanets(loadedPlanets); 
 
  useEffect(() => { 
    console.log('loading planets'); 
  }, [loadedPlanets]); 
 
  const observer = useRef(); 
 
  const refLoad = useCallback((node) => { 
    if (loading) { 
      return; 
    } 
 
    if (observer.current) { 
      observer.current.disconnect(); 
    } 
 
    observer.current = new IntersectionObserver((entries) => { 
      if (entries[0].isIntersecting && hasMore) { 
        setLoadedPlanets(totalCount + 1); 
        props.setCount(totalCount); 
      } 
    }); 
 
    if (node) { 
      observer.current.observe(node); 
    } 
  }); 
 const getPlanetImage = () => {
  const images = ['https://static.tumblr.com/a66af1138b78c5b3a362e79badfc2402/0hxowcx/lNFpreelq/tumblr_static_36fypyquy4844kg04gksksk0w.png',
'https://static.vecteezy.com/system/resources/thumbnails/022/718/742/small_2x/imagery-of-imaginary-planets-for-your-cosmic-image-ai-generated-png.png',
'https://static.vecteezy.com/system/resources/thumbnails/022/718/717/small_2x/imagery-of-imaginary-planets-for-your-cosmic-image-ai-generated-png.png',
'https://static.vecteezy.com/system/resources/thumbnails/022/718/723/small_2x/imagery-of-imaginary-planets-for-your-cosmic-image-ai-generated-png.png',
'https://static.vecteezy.com/system/resources/thumbnails/023/287/878/small_2x/a-breathtakingly-realistic-image-of-an-otherworldly-planet-floating-against-a-clear-background-allows-the-viewer-to-glimpse-into-the-inconceivable-expanse-of-space-generative-ai-png.png', 
'https://static.vecteezy.com/system/resources/thumbnails/034/469/446/small_2x/realistic-saturn-planet-ai-generative-png.png', 
'https://static.vecteezy.com/system/resources/thumbnails/022/718/732/small_2x/imagery-of-imaginary-planets-for-your-cosmic-image-ai-generated-png.png',
'https://static.vecteezy.com/system/resources/previews/016/778/857/non_2x/planet-galaxy-space-free-png.png'];
  return images[Math.floor(Math.random()*8)];
 }
  return ( 
    <div className="planets-container"> 
      <div className="load"> {loading && <Load />} </div> 
      <div className="sub-container"> 
        {planets.map((planet, id) => ( 
          <Tilt 
            key={id} 
            style={{ 
              borderRadius: '2rem', 
            }} 
            options={{ speed: 1000, max: 35, scale: 3 }} 
          > 
            <div className="card"> 
              <div className="face"> 
                <p>{planet.name}</p> 
                <LazyLoadImage
                    alt={'planet'}
                    src={
                    getPlanetImage()
                    }
                    effect="opacity"
                  />
              </div> 
 
              <div className="content"> 
                <h3>Name: {planet.name}</h3> 
                <p>Population: {planet.population}</p> 
                <NavLink to={`planets/${planet.name}`} className="btn"> 
                  Discover 
                </NavLink> 
              </div> 
            </div> 
          </Tilt> 
        ))} 
      </div> 
    </div> 
  ); 
}; 
 
export default Planets;
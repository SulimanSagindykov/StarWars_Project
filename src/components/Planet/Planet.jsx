import { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom'; 
import Navbar from '../Navbar/Navbar'; 
import './Planet.css'
const Planet = () => { 

  const getPlanetImage = () => {
    const images = ['https://static.tumblr.com/a66af1138b78c5b3a362e79badfc2402/0hxowcx/lNFpreelq/tumblr_static_36fypyquy4844kg04gksksk0w.png',
  'https://avatars.mds.yandex.net/i?id=5af49219cd9aba21133d859e2006b5c1bcf5040d-8179580-images-thumbs&ref=rim&n=33&w=430&h=400','https://w7.pngwing.com/pngs/634/854/png-transparent-sins-of-a-solar-empire-rebellion-android-softonic-com-google-play-planets-sphere-astronomical-object-earth.png',
  'https://avatars.mds.yandex.net/i?id=b0871ddca1d6945d291168f152b251d8252f0762-10102345-images-thumbs&ref=rim&n=33&w=400&h=400','https://avatars.mds.yandex.net/i?id=b0111bd21652e412d055149923c1dc05005e4c89-7854793-images-thumbs&ref=rim&n=33&w=480&h=382', 'https://avatars.mds.yandex.net/i?id=d74f3f9bcba7a3b81969e963fede7f4e5f4339a5-10850495-images-thumbs&ref=rim&n=33&w=406&h=400'];
    return images[Math.floor(Math.random()*4)];
   }


  const params = useParams(); 
  const [planetData, setPlanetData] = useState({}); 
  const [jsonData, setJsonData] = useState(''); 
 
  const myJsonToString = (obj) => { 
    if (!obj) { 
      return ''; 
    } 
 
    let res = ''; 
    const params = Object.keys(obj); 
 
    params.forEach((param) => { 
      const data = obj[param]; 
      const type = typeof data; 
 
      if (type === 'object') { 
        if (!Array.isArray(data)) { 
          res += myJsonToString(data); 
        } else { 
          res +=`${param}:\n \t`; 
          data.forEach((attr) => { 
            res += `${attr}, `; 
          }); 
          res += '\n'; 
        } 
      } else { 
        res += `${param}: ${data}\n`; 
      } 
    }); 
 
    return res; 
  }; 
 
  const splitPlanetData = (planet) => { 
    const resData = myJsonToString(planet); 
    setJsonData(resData); 
  }; 
 
  const loadData = async (name) => { 
    const res = await fetch(`https://swapi.dev/api/planets/?search=${name}`); 
    const data = await res.json(); 
    if (data.results.length > 0) { 
      setPlanetData(data.results[0]); 
      splitPlanetData(data.results[0]); 
    } 
  }; 
 
  useEffect(() => { 
    loadData(params.name); 
  }, [params.name]); 
 
  return ( 
    <> 
      <Navbar /> 
      <div className="planet-container"> 
        <div className="basic-info"> 
          <img 
            alt={planetData.name || "Unknown Planet"} 
            src={getPlanetImage()} 
          /> 
          <h1>{planetData.name}</h1> 
        </div> 
        <div className="additional-info"> 
          <h3 style={{ color: 'white' }}>Additional data</h3> 
          <pre>{jsonData}</pre> 
        </div> 
      </div> 
    </> 
  ); 
}; 
 
export default Planet;
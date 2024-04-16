import { useEffect, useState } from 'react';import axios from 'axios';
const useGetPlanets = (loadedPlanets) => {
  const [loading, setLoading] = useState(false);  const [hasMore, setHasMore] = useState(true);
  const [planets, setPlanets] = useState([]);  const [nextURI, setNextURI] = useState('https://swapi.dev/api/planets/');
  const [totalCount, setTotalCount] = useState(8);
  const loadPlanetsCallBack = () => {    setLoading(true);
    axios.get(nextURI).then((res) => {
      console.log('fetching data...');      // set next uri
      if (!res.data.next) {        console.log('end of planets');
      }      res.data.next ? setNextURI(res.data.next) : setHasMore(false);
      setPlanets((prevArray) => [...prevArray, ...res.data.results]);
      setTotalCount((prev) => prev + res.data.results.length);
      setLoading(false);    });
  };
  useEffect(loadPlanetsCallBack, [loadedPlanets]);
  return { planets, loading, hasMore, totalCount };};
export default useGetPlanets;
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["super-heroes"],
    fetchSuperHeroes,
    {
      // cacheTime: 5000,
      // 1. another use of query cache is to use a number of network requests for data that doesn't necessarily change too often (e.g. it is okay if the users see the stale data for a while like 30 seconds)
      // 1. our configuration is now cache duration for 5 minutes with stale time of 3 seconds
      // default of staleTime is 0
      staleTime: 3000,
    }
  );

  if (isLoading) return "Loading...";

  if (isError) return <h2>{error.message}</h2>;

  console.log(data.data[2].name);
  console.log("isLoading: ", isLoading, "isFetching: ", isFetching);

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;

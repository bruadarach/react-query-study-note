import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["super-heroes"],
    fetchSuperHeroes,
    // 2. the default cache time of react query is 5 minutes
    // 2. we can change it by passing in an object as the third argument
    {
      cacheTime: 5000, // 3. cache will be inactive after 5 seconds and will be garbage collected
    }
  );

  if (isLoading) return "Loading...";

  if (isError) return <h2>{error.message}</h2>;

  // 1. help us better track network activity
  // 1. caching? data is being updated, `without a request`! It is checkable on console. No loading indicator is shown every single time.
  // 1. reuse the data from the cache for the subsequent requests
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

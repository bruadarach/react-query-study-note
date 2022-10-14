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
      // React Query has a default cache duration of 5 minutes, and
      // default stale time of 0.
      // 2 more configurations related to refetching
      // (1) refetchOnMount: true
      // refetchOnMount: true, // refetch on mount 새로고침 할때마다 리페치
      // refetchOnMount: false, // query will not refetch on mount. check on network tap
      refetchOnMount: true,
      // (2) refetchOnWindowFocus: true
      // refetchOnWindowFocus: true, // refetch on window focus
      // refetchOnWindowFocus: false, // query will not refetch on window focus. check on network tap
      refetchOnWindowFocus: "always",
    }
  );

  console.log(isLoading, isFetching);

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

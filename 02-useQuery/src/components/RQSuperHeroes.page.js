import { useQuery } from "react-query";
import axios from "axios";

// const RQSuperHeroesPage = () => {
// const { isLoading, error, data } = useQuery(["super-heroes"], () =>
//   fetch("http://localhost:4000/superheroes").then((res) => res.json())
// );

// if (isLoading) return "Loading...";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery(["super-heroes"], fetchSuperHeroes);

  if (isLoading) return "Loading...";

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

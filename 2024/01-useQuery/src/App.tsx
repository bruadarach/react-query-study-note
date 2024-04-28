import { useQuery } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "Post 1  " },
  { id: 2, title: "Post 2  " },
];

function wait(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

const App = () => {
  const postsQuery = useQuery({
    /* 1. The query key is used to uniquely identify this query */
    queryKey: ["posts"],

    /* 2. The query function returns a promise */
    // Resolved promise returning posts after a delay
    queryFn: async () => {
      await wait(1000);
      return [...POSTS];
    },
    // queryFn: () => wait(1000).then(() => [...POSTS]),

    // Rejected promise with error message:
    // queryFn: () => Promise.reject("Error Message"),
    // queryFn: () => Promise.reject(new Error("Error Message")),
  });

  /* 3. The query object has properties like data, isLoading, isError, etc. */
  if (postsQuery.isLoading) return <h1>Loading...</h1>;

  // if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  if (postsQuery.isError) return <pre>{postsQuery.error.message}</pre>;

  return (
    <div>
      {/* 4. Show the data from the query */}
      {postsQuery.data?.map((post: { id: number; title: string }) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default App;

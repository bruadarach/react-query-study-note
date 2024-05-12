import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  // without useQueryClient, new post will be added but the list will not be updated on the screen
  console.log(POSTS, "POSTS"); // possible to see the updated POSTS array in the console, but not on the screen
  const queryClient = useQueryClient(); // useQueryClient hook to invalidate the query after adding a new post

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

  const newPostMutation = useMutation({
    // The mutation function returns a promise
    mutationFn: (title: string) => {
      return wait(1000).then(() => {
        // POSTS.push({ id: crypto.randomUUID(), title });
        POSTS.push({ id: POSTS.length + 1, title });
      });
    },
    // onSuccess is called when the mutation is successful
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["posts"] }); // from version 4
      queryClient.setQueryData(["posts"], [...POSTS]); // use setQueryData to update the query data from version 5
    },
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
      <button
        // use newPostMutation.status to disable the button while the mutation is pending from version 5
        disabled={newPostMutation.status === "pending"} // newPostMutation.isLoading from version 4
        onClick={() => newPostMutation.mutate("New Post")}
      >
        Add New
      </button>
    </div>
  );
};

export default App;

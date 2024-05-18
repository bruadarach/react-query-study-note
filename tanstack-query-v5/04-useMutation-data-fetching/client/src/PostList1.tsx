import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function PostList1() {
  const postsQuery = useQuery<Post[], Error>({
    // same query key as in PostList2
    // but on different pages
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 5000, // 5 seconds
  });

  // fetching / idle / paused
  // fetching : The query is currently fetching data.
  // idle : The query is either inactive or data fetching has completed. data fetching is not in progress.
  // paused : the query is in a paused state, typically due to network issues or other interruptions.
  if (postsQuery.fetchStatus === "fetching") return <div>Loading...</div>;

  // .status ==== "pending" | "error" | "success"
  if (postsQuery.status === "pending") return <div>Loading...</div>;
  if (postsQuery.status === "error")
    return <div>{JSON.stringify(postsQuery.error)}</div>;

  return (
    <div>
      <h1>Post List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}

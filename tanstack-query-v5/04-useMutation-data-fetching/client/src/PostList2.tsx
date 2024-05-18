import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function PostList2() {
  const postsQuery = useQuery<Post[], Error>({
    // same query key as in PostList1
    // but on different pages
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (postsQuery.status === "pending") return <div>Loading...</div>;
  if (postsQuery.status === "error")
    return <div>{JSON.stringify(postsQuery.error)}</div>;

  return (
    <div>
      <h1>Post List 2</h1>
      <ol>
        {postsQuery.data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}

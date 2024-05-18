import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api/posts";
import { getUser } from "./api/users";

export interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export default function Post({ id }: { id: number }) {
  const postsQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ["users", postsQuery.data?.userId],
    enabled: postsQuery.data?.userId !== null,
    queryFn: () => getUser(postsQuery.data.userId),
  });

  if (postsQuery.status === "pending") return <div>Loading...</div>;
  if (postsQuery.status === "error")
    return <div>{JSON.stringify(postsQuery.error)}</div>;

  return (
    <div>
      <h1>{postsQuery.data.title}</h1>
      <h2>UserId: {postsQuery.data.userId}</h2>
      <h4>
        {userQuery.isLoading
          ? "Loading user info..."
          : userQuery.isError
          ? userQuery.error.message
          : postsQuery.data.body}
      </h4>
      <small>
        {userQuery.isLoading
          ? "Loading user info..."
          : userQuery.isError
          ? userQuery.error.message
          : userQuery.data.name + " - " + "userId: " + userQuery.data.id}
      </small>
    </div>
  );
}

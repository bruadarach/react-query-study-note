import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "./api/posts";
import Post, { PostProps } from "./Post";

interface CreatePostProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<JSX.Element>>;
}

const CreatePost = ({ setCurrentPage }: CreatePostProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data: PostProps) => {
      // setQueriesData is used to update the cached data
      queryClient.setQueriesData(["posts", data.id], data);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
      setCurrentPage(<Post id={data.id} />);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
    });
  };

  //error | idle | pending | success
  createPostMutation.status === "error" &&
    console.log(createPostMutation.error);

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isPending}>
          {createPostMutation.isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

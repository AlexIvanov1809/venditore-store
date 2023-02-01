import React from "react";
import { IPost } from "../models/IPost";
import { postAPI } from "../services/post.service";
import styles from "./PostContainer.module.css";
import PostItem from "./PostItem";

const PostContainer = () => {
  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(100);
  const [createPost, {}] = postAPI.useCreatePostMutation();
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [deletePost, {}] = postAPI.useDeletePostMutation();

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost);
  };
  const handleRemove = async (post: IPost) => {
    await deletePost(post);
  };
  const handleUpdate = async (post: IPost) => {
    await updatePost(post);
  };
  if (error) {
    return <h2>Error</h2>;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className={styles.user}>
      <button onClick={handleCreate}>Add new post</button>
      {posts &&
        posts.map((p) => (
          <PostItem
            remove={handleRemove}
            update={handleUpdate}
            key={p.id}
            post={p}
          />
        ))}
    </div>
  );
};

export default PostContainer;

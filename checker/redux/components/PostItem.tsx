import React, { FC } from "react";
import { IPost } from "../models/IPost";
import styles from "./PostContainer.module.css";

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    remove(post);
  };
  const handleUpdate = (e: React.MouseEvent) => {
    const title: string = prompt() || "";
    update({ ...post, title });
  };
  return (
    <div className={styles.postContainer}>
      <span>
        {post.id} {post.title}
      </span>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={handleUpdate}>
          Update
        </button>
        <button
          className={`${styles.btn} ${styles.btn_dlt}`}
          onClick={handleRemove}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;

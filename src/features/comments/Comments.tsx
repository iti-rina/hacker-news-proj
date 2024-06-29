import { useState, useEffect, FC } from "react";
import { fetchComments } from "./fetchComments";
import Comment from "./Comment";
import "./style.css";

interface CommentsProps {
  commentsIds: number[]
}
const Comments: FC<CommentsProps> = ({ commentsIds }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(commentsIds)
    .then(data => setComments(data));
  }, [commentsIds]);

  return (
    comments?.map(comment => ( <Comment commentId={comment.id} key={comment.id} /> ))
  );
}

export default Comments;
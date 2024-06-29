import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectStoryById } from "./newsSlice";
import  Comments  from "../comments/Comments";
import { HiOutlineExternalLink } from "react-icons/hi"
import { fetchComments } from "../comments/fetchComments";

const SingleStoryPage = () => {
  const { storyId } = useParams();
  const story = useSelector(state => selectStoryById(state, storyId));

  if (!story?.title) {
    return (
      <section>
        <h2 style={{ maxWidth: "940px", marginLeft: "40px", marginTop: "10px", color: "#54595F", fontWeight: "700",
  fontSize: "24px" }}>Story not found!</h2>
      </section>
    );
  }

  const linkToFullStory = story?.url ? <p><a href={story.url} target="_blank" rel="noreferrer noopener">Read full story <HiOutlineExternalLink /></a></p> : null;
  const score = story?.score;
  
  return (
    <>
    <div className="story-wrapper" >
      <div className="single-story__container">
        <div className="single-story__header">
          <h2 className="single-story__title">{story.title}</h2>
          {linkToFullStory}
        </div>
        
        <div className="single-story__info">
          <p className="single-story__author">By {story.by}</p>
          <p>Score: {score}</p>
        </div>
      </div>
      <div className="comments-container comments" >
        {story?.kids ? <p className="comments__counter">Comments ({story?.descendants})</p> : null}

        <Comments commentsIds={story?.kids} />

        <button onClick={() => fetchComments(story?.kids)} className="comments__reload-btn">Reload Comments</button>
      </div>
    </div>
    </>
      
  );
}

export default SingleStoryPage;
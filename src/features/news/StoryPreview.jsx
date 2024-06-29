import React from "react";
import { Link } from "react-router-dom";
import { GoChevronUp } from "react-icons/go";
import { useSelector } from "react-redux";

import { selectStoryById } from "./newsSlice";
import TimeAgo from "./TimeAgo";

const StoryItem = ({ storyId }) => {
  const story = useSelector(state => selectStoryById(state, storyId));

  if (!story?.title) return;

  return (
    <div className="story-container">
      <div>
        <h2 className="story-title"><Link to={`post/${storyId}`}>{story.title}</Link></h2>
        <div className="story-info">
          <p className="story-author">By {story.by}</p>
          <TimeAgo timestamp={story.time}/>
        </div>
      </div>
      
      <div>
        <span className="story-rating">{story.score}</span>
        <GoChevronUp />
      </div>
  </div>
  );
}

export default StoryItem;
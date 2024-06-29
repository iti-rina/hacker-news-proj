import { useEffect, useState, useRef, UIEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectNewsIds } from './newsSlice';
import StoryPreview from './StoryPreview';

const NewsContainer = ({ sortType }) => {
  const newsIds = useSelector(selectNewsIds);
  const content = newsIds.map(storyId => <StoryPreview key={storyId} storyId={storyId} />);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const pageSize = 15;

  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPosts({ sortType, page, pageSize }));

    const timer = setInterval(() => dispatch(fetchPosts({ sortType, page, pageSize })), 30000);
    return () => clearInterval(timer);
  }, [dispatch, sortType, page, pageSize]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollTop === 0) {
      setPage(prevPage => (prevPage > 0 ? prevPage - 1 : 0));
    } else if (scrollTop + clientHeight >= scrollHeight - 5) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className='news-container'
      onScroll={handleScroll}
      style={{ height: '95vh', overflow: 'auto' }}
    >
      {content}
    </div>
  );
};

export default NewsContainer;

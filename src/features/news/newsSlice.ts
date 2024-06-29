import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { Post } from '../../types/data';

const newsAdapter = createEntityAdapter();

const initialState = newsAdapter.getInitialState({
  status: 'idle',
  error: null
});

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const NEW_STORIES_URL = `${BASE_URL}/newstories.json`;
const BEST_STORIES_URL = `${BASE_URL}/beststories.json`;
const TOP_STORIES_URL = `${BASE_URL}/topstories.json`;

interface FetchPostsParams {
  sortType: string;
  page: number;
  pageSize: number;
}

export const fetchPosts = createAsyncThunk<Post[], FetchPostsParams>(
  'news/fetchNews',
  async ({ sortType, page, pageSize }) => {
    let url = '';
    if (sortType === 'best') {
      url = BEST_STORIES_URL;
    } else if (sortType === 'top') {
      url = TOP_STORIES_URL;
    } else {
      url = NEW_STORIES_URL;
    }

    const response = await fetch(url);
    const data = await response.json();

    const start = page * pageSize;
    const end = start + pageSize;

    const promises = data.slice(start, end).map((id: number) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => response.json())
    );

    return {sortType, stories: await Promise.all(promises)};
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const { sortType, stories } = action.payload;
        if (sortType !== state.sortType) {
          newsAdapter.removeAll(state);
        }
        state.sortType = sortType;
        newsAdapter.addMany(state, stories);
        state.status = 'succeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export const { 
  selectIds: selectNewsIds, 
  selectById: selectStoryById,
  selectAll: selectAllStories
} = newsAdapter.getSelectors(state => state.news);

export const getStatus = state => state.news.status;

export default newsSlice.reducer;



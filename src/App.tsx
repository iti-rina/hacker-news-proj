import { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NewsContainer from "./features/news/NewsContainer";
import SingleStoryPage from "./features/news/SingleStoryPage";


const App: FC = () => {
  const [sortType, setSortType] = useState('new');

  function handleChangeSort(type) {
    console.log(type);
    setSortType(type);
  }

  return (
    <Routes>
      <Route path="/" element={<Layout onSort={handleChangeSort} />}>
        <Route index element={<NewsContainer sortType={sortType}/>}/>
        <Route path="post/:storyId" element={<SingleStoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;

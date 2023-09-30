import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import LogInPage from './pages/LogInPage';


const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet /> 
      {/* 기본적으로는 nav와 함께 index인 로그인 페이지를 노출, 
      path에 따라 nav와 함께 mainpage, detailpage, searchpage 노출 */}
    </div>
  )
};

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LogInPage />}/>
          <Route path="main" element={<MainPage />}/>
          <Route path=":movieId" element={<DetailPage />}/>
          <Route path="search" element={<SearchPage />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;



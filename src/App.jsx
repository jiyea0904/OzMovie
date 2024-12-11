import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Search from './pages/Search';
import Main from './pages/Main';
import Detail from './pages/Detail';



const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/movies/:id" element={<Detail />} />
        <Route path="/search/:query" element={<Search />} />
      </Route>
    </Routes>
    
  );
};

export default App;

import { Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';
import Layout from './components/Layout';
import MovieList from './components/MovieList';



const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
    
  );
};

export default App;

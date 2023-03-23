import { getTrendingMovies } from 'services/API';
import { useEffect, useState } from 'react';
import MovieList from 'components/MoviesList/MovieList';
import { MagnifyingGlass } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  getTrendingMovies();

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .then(setMovies)
      .catch(error => toast.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
     
      {loading && <MagnifyingGlass />}
      <MovieList movies={movies} />
    </div>
  );
}

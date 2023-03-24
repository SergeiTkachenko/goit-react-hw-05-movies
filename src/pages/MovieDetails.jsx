import Spiner from 'components/Spiner/spiner';
import { Suspense, useEffect, useState } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
  NavLink,
  Outlet,
} from 'react-router-dom';
import { getMoviesDetailsById } from 'services/API';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w200';

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();

  const handleGoBack = () => {
    navigate(location?.state?.from ?? '/');
  };

  useEffect(() => {
    getMoviesDetailsById(id).then(setMovie);
  }, [id]);

  if (!movie) {
    return <Spiner></Spiner>;
  }

  return (
    <div>
      <button type="button" onClick={handleGoBack}>
        Go back
      </button>
      <h2>{movie.title}</h2>
      <img src={BASE_IMG_URL + movie.poster_path} alt={movie.title} />

      <p>{movie.overview}</p>
      <NavLink state={{ from: location?.state?.from ?? '/' }} to="cast">
        Cast
      </NavLink>
      <NavLink state={{ from: location?.state?.from ?? '/' }} to="reviews">
        Reviews
      </NavLink>
      <Suspense fallback={<Spiner></Spiner>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

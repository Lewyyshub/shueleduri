import { useState } from "react";
import HeaderIcon from "../../assets/icons/Movie.png";
import all from "../../assets/icons/all.png";
import moiveic from "../../assets/icons/movic.png";
import tv from "../../assets/icons/tv.png";
import fav from "../../assets/icons/fav.png";
import human from "../../assets/images/human.png";
import beforefav from "../../assets/icons/beforefav.png";
import favactive from "../../assets/icons/favactive.png";
import search from "../../assets/icons/search.png";
import { trendingMovies, recommendedMovies } from "../../moviedata";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "../../../src/App";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const filterMovies = (movies) => {
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (categoryFilter ? movie.category === categoryFilter : true)
    );
  };

  const handleAddFavorite = (movie) => {
    const isFavorite = favorites.some(
      (favMovie) => favMovie.title === movie.title
    );

    if (isFavorite) {
      setFavorites(
        favorites.filter((favMovie) => favMovie.title !== movie.title)
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const handleCategoryFilter = (filter) => {
    setCategoryFilter(filter);
    setShowFavorites(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#10141E] text-white overflow-hidden">
      <aside
        className="bg-[#161D2F] p-6 rounded-[20px] flex flex-col md:flex-col justify-between items-center
        w-full h-[100px] md:w-[96px] md:h-full md:fixed md:left-0 md:top-0 md:z-10"
      >
        <div className="flex md:flex-col md:items-center md:h-full w-full justify-between md:justify-start gap-[75px] pt-[20px]">
          <div>
            <img
              src={HeaderIcon}
              alt="Header Icon"
              className="w-[32px] md:mb-6 md:w-[25px]"
            />
          </div>
          <div>
            <nav className="flex flex-row md:flex-col gap-10">
              <img
                src={all}
                className="cursor-pointer w-[20px] h-[20px]"
                onClick={() => handleCategoryFilter("")}
              />
              <img
                src={moiveic}
                className="cursor-pointer w-[20px] h-[20px]"
                onClick={() => handleCategoryFilter("Movie")}
              />
              <img
                src={tv}
                className="cursor-pointer w-[20px] h-[20px]"
                onClick={() => handleCategoryFilter("TV Series")}
              />
              <img
                src={fav}
                className="cursor-pointer w-[20px] h-[20px]"
                onClick={() => {
                  setShowFavorites(true);
                  setCategoryFilter("");
                }}
              />
            </nav>
          </div>
        </div>
        <div className="w-[50px] h-[50px] overflow-hidden border-none border-white md:mb-6">
          <img
            src={human}
            className="w-[40px] h-[40px] object-cover  hidden md:block"
          />
        </div>
      </aside>
      <div className="flex-1 p-6 overflow-y-auto mt-[90px] md:mt-0 md:ml-[110px]">
        <div className="mb-6 flex items-center ">
          <img className="w-[32px] h-[32px]" src={search} />
          <input
            type="text"
            placeholder="Search for movies or TV series"
            className="w-full text-white text-[20px] sm:text-[24px] font-[400px] p-3 rounded-md placeholder-[#ffffff90] outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {showFavorites ? (
          <div>
            <h2 className="text-[32px] font-[400px] mb-3">Bookmarked Movies</h2>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {favorites.map((movie, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden"
                  >
                    <img
                      src={movie.thumbnail.regular.small}
                      alt={movie.title}
                      className="w-[380px] h-[174px] object-cover rounded-[8px]"
                    />
                    <div className="pt-1 text-white">
                      <p className="text-sm opacity-80">
                        {movie.year} • {movie.category} • {movie.rating}
                      </p>
                      <h3 className="text-lg font-semibold">{movie.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>You have no favorite movies or tv series</p>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-3">Trending</h2>
            <div className="w-full h-[250px]">
              <Swiper
                spaceBetween={5}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                scrollbar={{ hide: true }}
                className="mySwiper p-0"
              >
                {filterMovies(trendingMovies).map((movie, index) => (
                  <SwiperSlide key={index} className="!m-0 relative ">
                    <img
                      src={movie.thumbnail.trending.small}
                      alt={movie.title}
                      className="rounded-lg w-full h-[230px] object-contain"
                    />
                    <img
                      onClick={() => handleAddFavorite(movie)}
                      className="w-[32px] h-[32px] absolute top-3 !right-[15px] cursor-pointer"
                      src={
                        favorites.find(
                          (favMovie) => favMovie.title === movie.title
                        )
                          ? favactive
                          : beforefav
                      }
                    />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-sm opacity-80">
                        {movie.year} • {movie.category} • {movie.rating}
                      </p>
                      <h3 className="text-lg font-semibold">{movie.title}</h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              Recommended for you
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filterMovies(recommendedMovies).map((movie, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden"
                >
                  <img
                    src={movie.thumbnail.regular.small}
                    alt={movie.title}
                    className="w-[380px] h-[174px] object-cover rounded-[8px]"
                  />
                  <img
                    onClick={() => handleAddFavorite(movie)}
                    className="w-[32px] h-[32px] absolute top-3 right-15 cursor-pointer"
                    src={
                      favorites.find(
                        (favMovie) => favMovie.title === movie.title
                      )
                        ? favactive
                        : beforefav
                    }
                    alt="Add to favorites"
                  />
                  <div className="pt-1 text-white">
                    <p className="text-sm opacity-80">
                      {movie.year} • {movie.category} • {movie.rating}
                    </p>
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;

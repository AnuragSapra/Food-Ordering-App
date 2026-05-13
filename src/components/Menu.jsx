import MenuItem from "./MenuItem";
import useHttp from "../hooks/useHttp";
import Error from "../Error";

const requestConfig = {};

export default function Menu() {
  const {
    data: menu,
    isLoading,
    error,
  } = useHttp(`${import.meta.env.VITE_API_URL}/meals`, requestConfig, []);

  if (isLoading) {
    return (
      <div className="center loading-container">
        <div className="spinner"></div>
        <p>Fetching meals...</p>
        <small>
          The server may take 15-20 seconds to wake up for the first request.
        </small>
      </div>
    );
  }
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {menu.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

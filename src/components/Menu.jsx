import MenuItem from "./MenuItem";
import useHttp from "../hooks/useHttp";
import Error from "../Error";

const requestConfig = {};

export default function Menu() {
  const {
    data: menu,
    isLoading,
    error,
  } = useHttp(`${import.meta.env.VITE_API_URL}/api/menu`, requestConfig, []);

  if (isLoading) {
    return (
      <div className="center loading-container">
        <div className="spinner"></div>
        <p>Loading menu...</p>
      </div>
    );
  }
  if (error) {
    return <Error title="Failed to fetch menu" message={error} />;
  }

  return (
    <ul id="meals">
      {menu.map((item) => (
        <MenuItem key={item._id} item={item} />
      ))}
    </ul>
  );
}

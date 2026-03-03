import MenuItem from "./MenuItem";
import useHttp from "../hooks/useHttp";
import Error from "../Error";

const requestConfig = {};

export default function Menu() {
  const {
    data: menu,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
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

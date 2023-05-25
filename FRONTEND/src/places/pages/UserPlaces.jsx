import { useParams } from "react-router-dom";
import Places from "../components/Places";

function UserPlaces() {
  const userId = useParams().userId;
  const link = `/places/user/${userId}`;

  return <Places link={link} />;
}

export default UserPlaces;

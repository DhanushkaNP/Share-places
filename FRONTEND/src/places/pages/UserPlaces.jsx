import { useParams } from "react-router-dom";
import Places from "../../shared/components/Container/Places";

function UserPlaces() {
  const userId = useParams().userId;
  const link = `/places/user/${userId}`;

  return <Places link={link} />;
}

export default UserPlaces;

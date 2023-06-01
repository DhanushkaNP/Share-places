import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";

function UserItem(props) {
  return (
    <Card className=" bg-transparent rounded-xl shadow-none hover:shadow-lg bg-[#D2F1FB]">
      <Link to={`/${props.id}/places`}>
        <div className="flex flex-col w-full pt-2 lg:pt-0 lg:flex-row gap-1 lg:gap-5 lg:m-1 lg:w-max">
          <div className="h-24 w-24 flex flex-row mx-auto">
            <Avatar
              image={process.env.REACT_APP_ASSEST_URL + props.image}
              alt={props.name}
            />
          </div>
          <div className="pt-2 text-center lg:text-left pb-2 lg:pb-0">
            <h2 className=" text-xl font-semibold">{props.name}</h2>
            <h3 className=" text-gray-600">
              {props.placeCount} {props.placeCount === 1 ? "place" : "places"}
            </h3>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default UserItem;

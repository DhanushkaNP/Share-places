import BackgroundSection from "../../shared/components/UIElements/BackgroundSection";
import Card from "../../shared/components/UIElements/Card";
import UserItem from "./UserItem";

function UsersList(props) {
  if (!props.items) {
    return (
      <div className="center">
        <Card>
          <h1>No user found!!!</h1>
        </Card>
      </div>
    );
  }

  return (
    <BackgroundSection className=" h-screen">
      <div className=" grid lg:grid-cols-2 gap-8 w-1/2 mx-auto pt-10">
        {props.items.map((user) => {
          return (
            <UserItem
              key={user.id}
              id={user.id}
              image={user.image}
              name={user.name}
              placeCount={user.places.length}
            />
          );
        })}
      </div>
    </BackgroundSection>
  );
}

export default UsersList;

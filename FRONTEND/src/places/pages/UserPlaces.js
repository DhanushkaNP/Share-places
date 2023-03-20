import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building",
    description: "One of the most sky scraper in the world!",
    imageUrl:
      "https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire state building",
    description: "One of the most sky scraper in the world!",
    imageUrl:
      "https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u2",
  },
];

function UserPlaces() {
  const userId = useParams().userId;
  const loadPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadPlaces} />;
}

export default UserPlaces;

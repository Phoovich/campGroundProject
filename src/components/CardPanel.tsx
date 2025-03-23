"use client";
import Card from "./Card";
import { useReducer } from "react";
import Link from "next/link";

type Action =
  | { type: "ADD_RATING"; campgroundId: string; rating: number }
  | { type: "REMOVE_RATING"; campgroundId: string };

function ratingReducer(state: Map<string, number>, action: Action) {
  const newState = new Map(state);
  switch (action.type) {
    case "ADD_RATING":
      newState.set(action.campgroundId, action.rating);
      return newState;
    case "REMOVE_RATING":
      newState.delete(action.campgroundId);
      return newState;
    default:
      return state;
  }
}

export default function CardPanel() {
  const [campgroundRatings, dispatch] = useReducer(ratingReducer, new Map<string, number>());

  const campgroundList = [
    { vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg" },
    { vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg" },
    { vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg" },
  ];

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        {campgroundList.map((campground) => (
          <Link key={campground.vid} href={`/campground/${campground.vid}`} passHref>
            <div style={{ cursor: "pointer" }}>
              <Card
                campgroundName={campground.name}
                imgSrc={campground.image}
                onRating={(rating) => dispatch({ type: "ADD_RATING", campgroundId: campground.vid, rating })}
              />
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "40px", marginLeft: "120px", marginBottom: "40px" }}>
        <h2 className="text-black font-serif font-bold">
          Campground List with Ratings: {campgroundRatings.size}
        </h2>
        {Array.from(campgroundRatings).map(([campgroundId, rating]) => (
          <p
            key={campgroundId}
            data-testid={campgroundId}
            style={{
              fontSize: "18px",
              color: "black",
              fontFamily: "serif",
              paddingTop: "5px",
              cursor: "pointer",
            }}
            onClick={() => dispatch({ type: "REMOVE_RATING", campgroundId })}
          >
            {campgroundList.find((v) => v.vid === campgroundId)?.name} Rating: {rating}
          </p>
        ))}
      </div>
    </div>
  );
}

"use client";
import Card from "./Card";
import { useReducer } from "react";
import Link from "next/link";

type Action =
  | { type: "ADD_RATING"; venueId: string; rating: number }
  | { type: "REMOVE_RATING"; venueId: string };

function ratingReducer(state: Map<string, number>, action: Action) {
  const newState = new Map(state);
  switch (action.type) {
    case "ADD_RATING":
      newState.set(action.venueId, action.rating);
      return newState;
    case "REMOVE_RATING":
      newState.delete(action.venueId);
      return newState;
    default:
      return state;
  }
}

export default function CardPanel() {
  const [venueRatings, dispatch] = useReducer(ratingReducer, new Map<string, number>());

  const venueList = [
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
        {venueList.map((venue) => (
          <Link key={venue.vid} href={`/venue/${venue.vid}`} passHref>
            <div style={{ cursor: "pointer" }}>
              <Card
                venueName={venue.name}
                imgSrc={venue.image}
                onRating={(rating) => dispatch({ type: "ADD_RATING", venueId: venue.vid, rating })}
              />
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "40px", marginLeft: "120px", marginBottom: "40px" }}>
        <h2 className="text-black font-serif font-bold">
          Venue List with Ratings: {venueRatings.size}
        </h2>
        {Array.from(venueRatings).map(([venueId, rating]) => (
          <p
            key={venueId}
            data-testid={venueId}
            style={{
              fontSize: "18px",
              color: "black",
              fontFamily: "serif",
              paddingTop: "5px",
              cursor: "pointer",
            }}
            onClick={() => dispatch({ type: "REMOVE_RATING", venueId })}
          >
            {venueList.find((v) => v.vid === venueId)?.name} Rating: {rating}
          </p>
        ))}
      </div>
    </div>
  );
}

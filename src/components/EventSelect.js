import React from "react";
import { Button } from "primereact/button";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const EventSelect = (props) => {
  const { eventSelection, setEventSelection, events, userSelection } = props;
  console.log("EventSelect props: ", props);

  // const handleClickButton = (e) => {
  //   console.log("clicked!", e);
  //   setEventSelection(e.eventId);
  //   saveEvent();
  // };
  // Saves a new message to Cloud Firestore.
  async function saveEvent(eventId) {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), "logs"), {
        userId: userSelection,
        eventId: eventId,
        timestamp: serverTimestamp(),
      });
      setEventSelection(eventId);
      console.log(
        `writing new message ${eventId} to Firebase Database succeded`
      );
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }

  const SelectedButton = () => {
    return (
      <div>
        {events.map((event) => (
          <Button
            label={event.eventType}
            key={event.id}
            severity={eventSelection !== event.eventId ? "" : "success"}
            outlined={eventSelection !== event.eventId}
            onClick={() => saveEvent(event.eventId)}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {!eventSelection ? (
        <h3>no event selected</h3>
      ) : (
        <h3>
          Event{" "}
          {events.find((event) => event.eventId === eventSelection).eventType}{" "}
          is selected
        </h3>
      )}
      <SelectedButton />
    </div>
  );
};

export default EventSelect;

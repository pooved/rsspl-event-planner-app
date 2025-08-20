import { useEffect, useState } from "preact/hooks";
import type { IEvent } from "../types/event";
import { Heart } from "lucide-react";

export default function BookMark({ event }: { event: IEvent }) {
  const [isBookMarked, setIsBookMarked] = useState(false);

  useEffect(() => {
    try {
      // Check localStorage
      const storedBookMarks = JSON.parse(
        localStorage.getItem("bookmarks") || "[]"
      );
      setIsBookMarked(storedBookMarks.includes(event.id));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [event.id]);

  const handleBookMarkToggle = () => {
    let storedBookMarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (isBookMarked) {
      // Remove from bookmarks
      storedBookMarks = storedBookMarks.filter((id: any) => id !== event.id);
    } else {
      // Add to bookmarks
      storedBookMarks.push(event.id);
    }
    localStorage.setItem("bookmarks", JSON.stringify(storedBookMarks));
    setIsBookMarked(!isBookMarked);
  };

  return (
    <span onClick={handleBookMarkToggle} style={{ cursor: "pointer" }}>
      {isBookMarked ? <Heart fill="red" /> : <Heart />}
    </span>
  );
}

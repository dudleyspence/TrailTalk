import { formatDistanceToNow } from "date-fns";

export default function CreatedTime({ timeString, isTimeFromNow = true }) {
  const date = new Date(timeString);

  const optionsDate = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };

  let formattedDate = "";
  let formattedTime = "";

  if (isTimeFromNow) {
    formattedDate = formatDistanceToNow(date, { addSuffix: true });
  } else {
    formattedDate = date.toLocaleDateString("en-GB", optionsDate);
    formattedTime = date.toLocaleTimeString("en-GB", optionsTime);
  }

  return (
    <div className="dateAndTime">
      <p>{formattedDate}</p>
      {!isTimeFromNow && <p>{formattedTime}</p>}
    </div>
  );
}

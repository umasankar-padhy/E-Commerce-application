import React, { useState } from "react";

const ReadMore = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      <button onClick={toggleReadMore} className="read-more-button">
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </span>
  );
};

export default ReadMore;

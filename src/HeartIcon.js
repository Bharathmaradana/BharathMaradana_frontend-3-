import React,{ useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

function HeartIcon() {
  const [isFilled, setIsFilled] = useState(false);

  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  return (
    <div onClick={handleClick}>
      {isFilled ? (
        <HeartFilled style={{ color: "red" }} />
      ) : (
        <HeartOutlined style={{ color: "red" }} />
      )}
    </div>
  );
}

export default HeartIcon;
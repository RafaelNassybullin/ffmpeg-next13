import { FC } from "react";

interface IPlayer {
  name: string;
  image: string;
}

const Player: FC<IPlayer> = ({ name, image }) => {
  
  const videoPath = `/uploads/one-video/${name}`;
  const imagePath = `/uploads/card-image/${image}`;

  return (
    <iframe
      src={`/playerjs.html?file=${videoPath}&poster=${imagePath}`}
      width="100%"
      height="700px"
      allowFullScreen
    ></iframe>
  );
};

export default Player;

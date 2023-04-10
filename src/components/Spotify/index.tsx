import { useSpotify } from "@/hooks/useSpotify";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  color: white;
  font-family: Roboto;
  text-shadow: #000 1px 1px 15px;
  bottom: 10%;
  left: 2%;
  z-index: 99;
`;

const Song = styled.span`
  display: block;
  width: 75%;
  font-size: 28px;
`;

const ArtistAlbum = styled.div`
  font-size: 16px;
`;

export const Spotify = () => {
  console.debug("Rendering Spotify");
  const { data: currentlyPlaying } = useSpotify();

  if (!currentlyPlaying) return null;

  return (
    <Container>
      <div style={{ marginRight: 20 }}>
        <Image
          alt="album"
          height={100}
          width={100}
          src={currentlyPlaying.albumUrl}
        />
      </div>
      <div>
        <Song>{currentlyPlaying.track}</Song>
        <ArtistAlbum>
          <span>{currentlyPlaying.artist}</span>
          <span style={{ margin: "0 10px" }}>•</span>
          <span>{currentlyPlaying.album}</span>
        </ArtistAlbum>
      </div>
    </Container>
  );
};

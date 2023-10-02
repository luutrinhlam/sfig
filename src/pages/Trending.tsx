import { IGif } from "@giphy/js-types";
import { Grid } from "@giphy/react-components";
import { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { SingleGifModal } from "../components";
import { Box, Typography } from "@mui/material";

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

interface IGridProps {
  onGifClick: ((gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => void) | undefined;
}
function GridComponent(props: IGridProps) {
  const fetchGifs = (offset: number) =>
    giphyFetch.trending({ offset, limit: 10 });
  return (
      <Grid
        onGifClick={props.onGifClick}
        fetchGifs={fetchGifs}
        width={800}
        columns={3}
        gutter={6}
      />
  );
}

const Trending = () => {
  const [modalGif, setModalGif] = useState<IGif | undefined>(undefined);

  return (
    <Box style ={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography my={5} align="center" variant='h3' mx={1}>Trending</Typography>
      <GridComponent
        onGifClick={(gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>): void => {
          e.preventDefault();
          setModalGif(gif);
        }}
      />
      {modalGif && <SingleGifModal gif={modalGif} onClick={setModalGif} />}
    </Box>
  )
}

export default Trending
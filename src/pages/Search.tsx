import { IGif } from '@giphy/js-types'
import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
} from '@giphy/react-components'
import { Box } from '@mui/material'

import { useContext, useState } from 'react'
import { useParams } from "react-router-dom";
import { SingleGifModal } from '../components'
import { useTheme } from '@mui/material'

// the search experience consists of the manager and its child components that use SearchContext
const Search = () => {
  const { initSearchKey } = useParams<{ initSearchKey: string }>()
  return (
    <SearchContextManager apiKey={'sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh'} initialTerm={initSearchKey ? initSearchKey : ''}>
      <Components />
    </SearchContextManager >)
}

// define the components in a separate function so we can
// use the context hook. You could also use the render props pattern
const Components = () => {
  const theme = useTheme();
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const [modalGif, setModalGif] = useState<IGif | undefined>(undefined);
  return (
    <Box style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {modalGif && <SingleGifModal gif={modalGif} onClick={setModalGif} />}

      <Box mb={8} style={{
        width: '60%',
        border : 'inset',
        borderRadius : '6px',
      }}>

        <SearchBar />
      </Box>
      {/** 
              key will recreate the component, 
              this is important for when you change fetchGifs 
              e.g. changing from search term dogs to cats or type gifs to stickers
              you want to restart the gifs from the beginning and changing a component's key does that 
          **/}
      <Grid key={searchKey} columns={3} width={800} fetchGifs={fetchGifs} onGifClick={(gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>): void => {
        e.preventDefault();
        setModalGif(gif);
      }} />
    </Box>
  )
}

export default Search;
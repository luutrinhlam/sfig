import { Home, Trending, Random, Search, Artist } from './pages'
import { Route, Routes } from 'react-router-dom'
import { Footer, NavigationBar } from './components'
import { Box, useTheme } from '@mui/material'


const App = () => {
  const theme = useTheme();
  return (
    <>
      <NavigationBar />
      <Box py={3} px={10} >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/random" element={<Random />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/search/:initSearchKey" element={<Search />} />
          <Route path="/artist" element={<Artist />} />
        </Routes>
      </Box>  
      <Footer />
    </>
  )
}

export default App


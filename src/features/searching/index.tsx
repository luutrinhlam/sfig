import { Button, Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 3, display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="search"
          type="search"
          label="Search"
          value={searchTerm}
          onChange={handleChange}
          sx={{ width: 600 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button type="submit">
                  <SearchIcon color="primary" />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Container>
  );
}

//component={Link} to={`/search/${searchTerm}`}
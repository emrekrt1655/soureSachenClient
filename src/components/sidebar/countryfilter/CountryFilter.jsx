import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { countries } from "../../modal/CountryBox";
import "./countryFilter.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "40%",
  left: "87%",
  transform: "translate(-50%, -50%)",
  width: 410,
  height: 400,
  bgcolor: "background.paper",
  borderRadius: "3%",
  border: "1px solid #195d49",
  boxShadow: 24,
  p: 8,
  overflow: "scroll",
  display: "flex",
  flexDirection: "column",
};

export default function CountryFilter({
  open2,
  handleClose2,
  setCountry,
  setFilter,
  country,
}) {
  const [countryList, setCountryList] = React.useState(countries);

  const onSearch = (text) => {
    const filteredList = countries.filter((country) => {
      const userText = text.toLowerCase();
      const countryName = country.label.toLowerCase();
      return countryName.indexOf(userText) > -1;
    });

    setCountryList(filteredList);
  };

  return (
    <Modal
      open={open2}
      onClose={handleClose2}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="countryFilterTitle">
          <TextField
            fullWidth
            id="outlined-basic"
            label={country ? country : "Type your country.."}
            variant="outlined"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Tooltip title="Clear the filter">
            <DeleteForeverIcon
              onClick={() => [
                setFilter("mostRated"),
                setCountry("Worldwide"),
                handleClose2(),
                setCountryList(countries),
              ]}
            />
          </Tooltip>
        </div>
        <ul className="countryList">
          {countries &&
            countryList?.map((country) => (
              <Paper key={country.label}>
                <li
                  className="countryList__country"
                  onClick={() => [
                    setFilter("countryTopic"),
                    setCountry(country?.label),
                    handleClose2(),
                  ]}
                >
                  {" "}
                  {country.label}{" "}
                </li>
              </Paper>
            ))}
        </ul>
      </Box>
    </Modal>
  );
}

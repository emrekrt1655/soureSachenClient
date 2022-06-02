import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { countries } from "../../modal/CountryBox";
import "./countryFilter.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "30%",
  left: "70%",
  transform: "translate(-50%, -50%)",
  width: 325,
  height: 325,
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
            label="Select your country to filter topics.."
            variant="outlined"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Tooltip title="Clear the filter">
            <DeleteForeverIcon
              onClick={() => [
                setFilter("mostRated"),
                setCountry(""),
                handleClose2(),
              ]}
            />
          </Tooltip>
        </div>
        <ul className="countryList">
          {countries &&
            countryList?.map((country, index) => (
              <li
                className="countryList__country"
                key={index}
                onClick={() => [
                  setFilter("countryTopic"),
                  setCountry(country?.label),
                  handleClose2(),
                ]}
              >
                {" "}
                {country.label}{" "}
              </li>
            ))}
        </ul>
      </Box>
    </Modal>
  );
}

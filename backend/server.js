const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post("/country-info", async (req, res, next) => {
  const { country } = req.body;

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from the external API. Status: ${response.status}`
      );
    } else {
        const data = await response.json();
        const countryInfo = data[0];
        res.json(countryInfo);
    }
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port https://localhost:${PORT}`);
});

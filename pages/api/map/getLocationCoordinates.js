const getLocationCoordinates = async (req, res) => {
  const mapboxUrl = `${process.env.MAPBOX_PLACES_API_URL}/${req.body.location}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

  try {
    const data = await fetch(mapboxUrl);
    const json = await data.json();
    res.status(200).send({ message: "success", data: json.features[0].center });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
  }
};

export default getLocationCoordinates;

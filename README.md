## Uber Clone with NextJS

![screenshot image](/screenshot.png)

- Demo: <https://uber-adhecode.vercel.app/>

This project is a simple Web 3.0 Application. It was created with NextJs Framework.

### Tools used

- [Ether.js](https://docs.ethers.io/)
- [Mapbox](https://docs.mapbox.com/)
- Store with sanity.io
- TailwindCSS

### Runing Project Locally

- Install dependencies: run `yarn install` in root project
- Get secret key from your project in sanity and mapbox
- Create .env file in root project and add:
  `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=YOUR_TOKEN_HERE`
  `SANITY_PROJECT_ID=YOUR_ID_HERE`
  `SANITY_TOKEN=YOUR_TOKEN_HERE`
  `MAPBOX_PLACES_API_URL=YOUR_API_URL_HERE`
  `MAPBOX_DIRECTIONS_API_URL=YOUR_API_URL_HERE`
  `NEXT_PUBLIC_UBER_ADDRESS=YOUR_ADDRESS_HERE`
- Run project: `yarn dev`

### User Stories

- User can login using MetaMask
- User can reserve a ride using the map
- User can pay for rides using Ethereum
- The webpage adapts to any screen size.

Please feel free to create a pull request and submit any issues!

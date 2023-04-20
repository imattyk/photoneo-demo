# Photoneo Demo
Demo web page that loads PLY files and renders them in the scene.

To run localy just switch to cliend folder `cd client` and run `npm install` and `npm start`.
Server is not needed for development runtime served by react-scripts.

To build and run a docker container build docker first by running
`docker build -t photoneo-demo .`
And run it with `docker run -d -p 3000:3000 photoneo-demo`.

Application will be available in the browser at http://localhost:3000/.

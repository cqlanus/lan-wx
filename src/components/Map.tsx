import ReactMapboxGl from "react-mapbox-gl"

const Map = ReactMapboxGl({
    accessToken: process.env.MAPBOX_TOKEN || 'pk.eyJ1IjoiY3FsYW51cyIsImEiOiJja2E4amlneHMwZ25qMnBsajJjNTA0ODZnIn0.BOLpyPQ9eys0jT3105nQbQ',
    scrollZoom: false,
})
export default Map

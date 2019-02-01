import { g_game } from "./src/game";
import { g_resources } from "./src/resources";
import { Movie } from "./src/network/movie";
var moviePath = '20923_5033_237_1548719510_1548723110_2643428645_.cam.ready';
var compressed = true;
console.log(+new Date());
g_game.setClientVersion(1099);
g_game.loadDatFile('Masteria.dat');
var movieData = g_resources.openFile(moviePath);
var movie;
if (compressed) {
    //movieData.setReadPos(8);
    try {
        var result = movieData.getBytes(-1);
        console.log(123, result);
        //var result = pako.inflate(x);
        //console.log(123, result);
        movie = new Movie(new DataView(result));
    }
    catch (err) {
        throw new Error(err);
    }
}
else {
    movie = new Movie(movieData.getDataView());
}
console.log(+new Date());
g_game.watchMovie(movie);
console.log(+new Date());
//g_mapview.draw(); 
//# sourceMappingURL=init.js.map
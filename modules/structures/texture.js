import { g_painter } from "../painter";
import { toInt } from "../constants/helpers";
let x = 0;
let y = 0;
let z = 0;
export class Texture {
    constructor(image, buildMipmaps = false, compress = false) {
        this.m_id = 0;
        this.m_time = 0;
        this.m_hasMipmaps = false;
        this.m_smooth = false;
        this.m_upsideDown = false;
        this.m_repeat = false;
        this.m_texture = [];
        ///  console.log('texture load', x++);
        this.m_image = image;
    }
    getPixiTexture(src) {
        let hash = src.hash();
        let textureCache = this.m_texture[hash];
        if (textureCache) {
            ///  console.log('getPixiTexture CACHE', +new Date(), y++);
            return textureCache;
        }
        ///  console.log('getPixiTexture LOAD', z++);
        let graphics = new PIXI.Graphics();
        ///  console.log('kkk', src.left(), src.top(),src.right(), src.bottom(), src.height(), src.width());
        graphics.width = src.width();
        graphics.height = src.height();
        graphics.beginFill(0, 0);
        graphics.drawRect(0, 0, graphics.width, graphics.height);
        graphics.endFill();
        //this.m_image.getPixelData();
        let other = this.m_image;
        for (let p = 0; p < other.getPixelCount(); ++p) {
            let x = toInt(p % other.getWidth());
            let y = toInt(p / other.getWidth());
            if (x >= src.left() && x <= src.right()) {
                if (y >= src.top() && y <= src.bottom()) {
                    if (other.m_pixels[p * 4 + 3] != 0) {
                        graphics.beginFill(other.m_pixels[p * 4] * 256 * 256 + other.m_pixels[p * 4 + 1] * 256 + other.m_pixels[p * 4 + 2], 1);
                        graphics.drawRect(x - src.left(), y - src.top(), 1, 1);
                        graphics.endFill();
                    }
                }
            }
        }
        /*
                let graphics = new PIXI.Graphics();
                graphics.width = this.m_image.m_size.width();
                graphics.height = this.m_image.m_size.height();
        
                graphics.beginFill(0, 0);
                graphics.drawRect(0,0, graphics.width,graphics.height);
                graphics.endFill();
                //this.m_image.getPixelData();
                let other = this.m_image;
                for (let p = 0; p < other.getPixelCount(); ++p) {
                    let x = toInt(p % other.getWidth());
                    let y = toInt(p / other.getWidth());
        
                    if (other.m_pixels[p * 4 + 3] != 0) {
                        graphics.beginFill(other.m_pixels[p * 4] * 256  * 256 + other.m_pixels[p * 4 + 1] * 256 + other.m_pixels[p * 4 + 2], 1);
                        graphics.drawRect(x, y, 1, 1);
                        graphics.endFill();
                    }
                }
                */
        this.m_texture[hash] = g_painter.app.renderer.generateTexture(graphics);
        return this.m_texture[hash];
        //return PIXI.Texture.fromImage('/prv/webclient/fronttypescript/favicon.png');
    }
}
//# sourceMappingURL=texture.js.map
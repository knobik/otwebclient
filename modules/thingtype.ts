import {FrameGroupType, GameFeature, Otc, ThingAttr, ThingCategory} from "./constants/const";
import {g_game} from "./game";
import {InputFile} from "./inputfile";
import {error, Log} from "./log";
import {LightView} from "./lightview";
import {Animator} from "./animator";
import {Image} from "./image";
import {Color} from "./color";
import {g_sprites} from "./spritemanager";
import {ThingTypeAttribs} from "./structures/thingtypeattribs";
import {Size} from "./structures/size";
import {Point} from "./structures/point";
import {Texture} from "./structures/texture";
import {Rect} from "./structures/rect";
import {MarketData} from "./structures/marketdata";
import {Light} from "./structures/light";
import {g_painter} from "./painter";
import {toInt} from "./constants/helpers";

export class ThingType {
    static maskColors = [Color.red, Color.green, Color.blue, Color.yellow];

    m_category: ThingCategory;
    m_id: number = 0;
    m_null: boolean = true;
    m_attribs: ThingTypeAttribs = new ThingTypeAttribs();

    m_size: Size = new Size();
    m_displacement: Point = new Point();
    m_animator: Animator = null;
    m_animationPhases: number = 0;
    m_exactSize: number = 0;
    m_realSize: number = 0;
    m_numPatternX: number = 0;
    m_numPatternY: number = 0;
    m_numPatternZ: number = 0;
    m_layers: number = 0;
    m_elevation: number = 0;
    m_opacity: number = 1.0;
    m_customImage: string;

    m_spritesIndex: number[] = [];
    m_textures: Texture[] = [];
    m_texturesFramesRects: Rect[][] = [];
    m_texturesFramesOriginRects: Rect[][] = [];
    m_texturesFramesOffsets: Point[][] = [];

    unserialize(clientId: number, category: ThingCategory, fin: InputFile) {
        this.m_null = false;
        this.m_id = clientId;
        this.m_category = category;

        //console.log('load', clientId, fin.getReadPos(), fin.data.buffer.slice(fin.getReadPos()));
        let count = 0;
        let attr = -1;
        let done = false;
        for (let i = 0; i < ThingAttr.ThingLastAttr; ++i) {
            count++;
            attr = fin.getU8();
            if (attr == ThingAttr.ThingLastAttr) {
                done = true;
                break;
            }

            if (g_game.getClientVersion() >= 1000) {
                /* In 10.10+ all attributes from 16 and up were
                 * incremented by 1 to make space for 16 as
                 * "No Movement Animation" flag.
                 */
                if (attr == 16)
                    attr = ThingAttr.ThingAttrNoMoveAnimation;
                else if (attr > 16)
                    attr -= 1;
            } else if (g_game.getClientVersion() >= 860) {
                /* Default attribute values follow
                 * the format of 8.6-9.86.
                 * Therefore no changes here.
                 */
            } else if (g_game.getClientVersion() >= 780) {
                /* In 7.80-8.54 all attributes from 8 and higher were
                 * incremented by 1 to make space for 8 as
                 * "Item Charges" flag.
                 */
                if (attr == 8) {
                    this.m_attribs.set(ThingAttr.ThingAttrChargeable, true);
                    continue;
                } else if (attr > 8)
                    attr -= 1;
            } else if (g_game.getClientVersion() >= 755) {
                /* In 7.55-7.72 attributes 23 is "Floor Change". */
                if (attr == 23)
                    attr = ThingAttr.ThingAttrFloorChange;
            } else if (g_game.getClientVersion() >= 740) {
                /* In 7.4-7.5 attribute "Ground Border" did not exist
                 * attributes 1-15 have to be adjusted.
                 * Several other changes in the format.
                 */
                if (attr > 0 && attr <= 15)
                    attr += 1;
                else if (attr == 16)
                    attr = ThingAttr.ThingAttrLight;
                else if (attr == 17)
                    attr = ThingAttr.ThingAttrFloorChange;
                else if (attr == 18)
                    attr = ThingAttr.ThingAttrFullGround;
                else if (attr == 19)
                    attr = ThingAttr.ThingAttrElevation;
                else if (attr == 20)
                    attr = ThingAttr.ThingAttrDisplacement;
                else if (attr == 22)
                    attr = ThingAttr.ThingAttrMinimapColor;
                else if (attr == 23)
                    attr = ThingAttr.ThingAttrRotateable;
                else if (attr == 24)
                    attr = ThingAttr.ThingAttrLyingCorpse;
                else if (attr == 25)
                    attr = ThingAttr.ThingAttrHangable;
                else if (attr == 26)
                    attr = ThingAttr.ThingAttrHookSouth;
                else if (attr == 27)
                    attr = ThingAttr.ThingAttrHookEast;
                else if (attr == 28)
                    attr = ThingAttr.ThingAttrAnimateAlways;

                /* "Multi Use" and "Force Use" are swapped */
                if (attr == ThingAttr.ThingAttrMultiUse)
                    attr = ThingAttr.ThingAttrForceUse;
                else if (attr == ThingAttr.ThingAttrForceUse)
                    attr = ThingAttr.ThingAttrMultiUse;
            }

            switch (attr) {
                case ThingAttr.ThingAttrDisplacement: {
                    this.m_displacement = new Point(0, 0);
                    if (g_game.getClientVersion() >= 755) {
                        this.m_displacement.x = fin.getU16();
                        this.m_displacement.y = fin.getU16();
                    } else {
                        this.m_displacement.x = 8;
                        this.m_displacement.y = 8;
                    }
                    this.m_attribs.set(attr, true);
                    break;
                }
                case ThingAttr.ThingAttrLight: {
                    let light = new Light();
                    light.intensity = fin.getU16();
                    light.color = fin.getU16();
                    this.m_attribs.set(attr, light);
                    break;
                }
                case ThingAttr.ThingAttrMarket: {
                    let market = new MarketData();
                    market.category = fin.getU16();
                    market.tradeAs = fin.getU16();
                    market.showAs = fin.getU16();
                    market.name = fin.getString();
                    market.restrictVocation = fin.getU16();
                    market.requiredLevel = fin.getU16();
                    this.m_attribs.set(attr, market);
                    break;
                }
                case ThingAttr.ThingAttrElevation: {
                    this.m_elevation = fin.getU16();
                    this.m_attribs.set(attr, this.m_elevation);
                    break;
                }
                case ThingAttr.ThingAttrUsable:
                case ThingAttr.ThingAttrGround:
                case ThingAttr.ThingAttrWritable:
                case ThingAttr.ThingAttrWritableOnce:
                case ThingAttr.ThingAttrMinimapColor:
                case ThingAttr.ThingAttrCloth:
                case ThingAttr.ThingAttrLensHelp:
                    this.m_attribs.set(attr, fin.getU16());
                    break;
                default:
                    this.m_attribs.set(attr, true);
                    break;
            }
        }

        if (!done)
            error("corrupt data (id: %d, category: %d, count: %d, lastAttr: %d)", this.m_id, this.m_category, count, attr);

        let hasFrameGroups = (category == ThingCategory.ThingCategoryCreature && g_game.getFeature(GameFeature.GameIdleAnimations));
        let groupCount = hasFrameGroups ? fin.getU8() : 1;

        this.m_animationPhases = 0;
        let totalSpritesCount = 0;

        //console.log(this.m_attribs.attribs);
        for (let i = 0; i < groupCount; ++i) {
            let frameGroupType = FrameGroupType.FrameGroupDefault;
            if (hasFrameGroups)
                frameGroupType = fin.getU8();

            let width = fin.getU8();
            let height = fin.getU8();
            this.m_size = new Size(width, height);
            if (width > 1 || height > 1) {
                this.m_realSize = fin.getU8();
                this.m_exactSize = Math.min(this.m_realSize, Math.max(width * 32, height * 32));
            }
            else
                this.m_exactSize = 32;

            this.m_layers = fin.getU8();
            this.m_numPatternX = fin.getU8();
            this.m_numPatternY = fin.getU8();
            if (g_game.getClientVersion() >= 755)
                this.m_numPatternZ = fin.getU8();
            else
                this.m_numPatternZ = 1;

            let groupAnimationsPhases = fin.getU8();
            this.m_animationPhases += groupAnimationsPhases;

            if (groupAnimationsPhases > 1 && g_game.getFeature(GameFeature.GameEnhancedAnimations)) {
                this.m_animator = new Animator();
                this.m_animator.unserialize(groupAnimationsPhases, fin);
            }

            let totalSprites = this.m_size.area() * this.m_layers * this.m_numPatternX * this.m_numPatternY * this.m_numPatternZ * groupAnimationsPhases;

            if ((totalSpritesCount + totalSprites) > 4096)
                error("a thing type has more than 4096 sprites", totalSprites, totalSpritesCount, this.m_size.area(), this.m_layers, this.m_numPatternX, this.m_numPatternY, this.m_numPatternZ, groupAnimationsPhases);

            //this.m_spritesIndex.resize((totalSpritesCount + totalSprites));
            this.m_spritesIndex = [];
            for (let i = totalSpritesCount; i < (totalSpritesCount + totalSprites); i++) {
                this.m_spritesIndex[i] = g_game.getFeature(GameFeature.GameSpritesU32) ? fin.getU32() : fin.getU16();
            }

            //console.log('spr', this.m_spritesIndex);
            totalSpritesCount += totalSprites;
        }
        /*
                this.m_textures.resize(m_animationPhases);
                this.m_texturesFramesRects.resize(m_animationPhases);
                this.m_texturesFramesOriginRects.resize(m_animationPhases);
                this.m_texturesFramesOffsets.resize(m_animationPhases);
        */
    }

    getId(): number {
        return this.m_id;
    }

    getCategory(): ThingCategory {
        return this.m_category;
    }

    isNull(): boolean {
        return this.m_null;
    }

    hasAttr(attr: ThingAttr): boolean {
        return this.m_attribs.has(attr);
    }

    getSize(): Size {
        return this.m_size;
    }

    getWidth(): number {
        return this.m_size.width();
    }

    getHeight(): number {
        return this.m_size.height();
    }

    getExactSize(layer: number = 0, xPattern: number = 0, yPattern: number = 0, zPattern: number = 0, animationPhase: number = 0): number {
        /* todo */
        return 0;
    }

    getRealSize(): number {
        return this.m_realSize;
    }

    getLayers(): number {
        return this.m_layers;
    }

    getNumPatternX(): number {
        return this.m_numPatternX;
    }

    getNumPatternY(): number {
        return this.m_numPatternY;
    }

    getNumPatternZ(): number {
        return this.m_numPatternZ;
    }

    getAnimationPhases(): number {
        return this.m_animationPhases;
    }

    getAnimator(): Animator {
        return this.m_animator;
    }

    getDisplacement(): Point {
        return this.m_displacement;
    }

    getDisplacementX(): number {
        return this.getDisplacement().x;
    }

    getDisplacementY(): number {
        return this.getDisplacement().y;
    }

    getElevation(): number {
        return this.m_elevation;
    }

    getGroundSpeed(): number {
        return this.m_attribs.get(ThingAttr.ThingAttrGround);
    }

    getMaxTextLength(): number {
        return this.m_attribs.has(ThingAttr.ThingAttrWritableOnce) ? this.m_attribs.get(ThingAttr.ThingAttrWritableOnce) : this.m_attribs.get(ThingAttr.ThingAttrWritable);
    }

    getLight(): Light {
        return this.m_attribs.get(ThingAttr.ThingAttrLight);
    }

    getMinimapColor(): number {
        return this.m_attribs.get(ThingAttr.ThingAttrMinimapColor);
    }

    getLensHelp(): number {
        return this.m_attribs.get(ThingAttr.ThingAttrLensHelp);
    }

    getClothSlot(): number {
        return this.m_attribs.get(ThingAttr.ThingAttrCloth);
    }

    getMarketData(): MarketData {
        return this.m_attribs.get(ThingAttr.ThingAttrMarket);
    }

    isGround(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrGround);
    }

    isGroundBorder(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrGroundBorder);
    }

    isOnBottom(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrOnBottom);
    }

    isOnTop(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrOnTop);
    }

    isContainer(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrContainer);
    }

    isStackable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrStackable);
    }

    isForceUse(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrForceUse);
    }

    isMultiUse(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrMultiUse);
    }

    isWritable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrWritable);
    }

    isChargeable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrChargeable);
    }

    isWritableOnce(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrWritableOnce);
    }

    isFluidContainer(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrFluidContainer);
    }

    isSplash(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrSplash);
    }

    isNotWalkable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrNotWalkable);
    }

    isNotMoveable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrNotMoveable);
    }

    blockProjectile(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrBlockProjectile);
    }

    isNotPathable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrNotPathable);
    }

    isPickupable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrPickupable);
    }

    isHangable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrHangable);
    }

    isHookSouth(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrHookSouth);
    }

    isHookEast(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrHookEast);
    }

    isRotateable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrRotateable);
    }

    hasLight(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrLight);
    }

    isDontHide(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrDontHide);
    }

    isTranslucent(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrTranslucent);
    }

    hasDisplacement(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrDisplacement);
    }

    hasElevation(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrElevation);
    }

    isLyingCorpse(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrLyingCorpse);
    }

    isAnimateAlways(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrAnimateAlways);
    }

    hasMiniMapColor(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrMinimapColor);
    }

    hasLensHelp(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrLensHelp);
    }

    isFullGround(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrFullGround);
    }

    isIgnoreLook(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrLook);
    }

    isCloth(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrCloth);
    }

    isMarketable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrMarket);
    }

    isUsable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrUsable);
    }

    isWrapable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrWrapable);
    }

    isUnwrapable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrUnwrapable);
    }

    isTopEffect(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrTopEffect);
    }

    getSprites(): number[] {
        return this.m_spritesIndex;
    }

// additional
    getOpacity(): number {
        return this.m_opacity;
    }

    isNotPreWalkable(): boolean {
        return this.m_attribs.has(ThingAttr.ThingAttrNotPreWalkable);
    }

    setPathable(v: boolean) {
        if (v == true)
            this.m_attribs.remove(ThingAttr.ThingAttrNotPathable);
        else
            this.m_attribs.set(ThingAttr.ThingAttrNotPathable, true);
    }


    getTexture(animationPhase: number): Texture {

        let animationPhaseTexture = this.m_textures[animationPhase];
        if (!animationPhaseTexture) {
            let useCustomImage = false;
            if (animationPhase == 0 && this.m_customImage)
                useCustomImage = true;

            // we don't need layers in common items, they will be pre-drawn
            let textureLayers = 1;
            let numLayers = this.m_layers;
            if (this.m_category == ThingCategory.ThingCategoryCreature && numLayers >= 2) {
                // 5 layers: outfit base, red mask, green mask, blue mask, yellow mask
                textureLayers = 5;
                numLayers = 5;
            }

            let indexSize = textureLayers * this.m_numPatternX * this.m_numPatternY * this.m_numPatternZ;
            let textureSize = this.getBestTextureDimension(this.m_size.width(), this.m_size.height(), indexSize);
            //console.log('dim', textureSize, this);
            let fullImage: Image;

            if (useCustomImage)
                fullImage = Image.load(this.m_customImage);
            else
                fullImage = new Image(textureSize.mul(Otc.TILE_PIXELS));

            //console.log('fi', fullImage.getWidth(), fullImage.getHeight())
            this.m_texturesFramesRects[animationPhase] = [];
            this.m_texturesFramesOriginRects[animationPhase] = [];
            this.m_texturesFramesOffsets[animationPhase] = [];

            for (let z = 0; z < this.m_numPatternZ; ++z) {
                for (let y = 0; y < this.m_numPatternY; ++y) {
                    for (let x = 0; x < this.m_numPatternX; ++x) {
                        for (let l = 0; l < numLayers; ++l) {
                            let spriteMask = (this.m_category == ThingCategory.ThingCategoryCreature && l > 0);
                            let frameIndex = this.getTextureIndex(l % textureLayers, x, y, z);
                            let framePos = new Point(toInt(frameIndex % toInt(textureSize.width() / this.m_size.width()) * this.m_size.width()) * Otc.TILE_PIXELS,
                                toInt(frameIndex / toInt(textureSize.width() / this.m_size.width()) * this.m_size.height()) * Otc.TILE_PIXELS);

                            //console.log('blitx', framePos);
                            if (!useCustomImage) {
                                for (let h = 0; h < this.m_size.height(); ++h) {
                                    for (let w = 0; w < this.m_size.width(); ++w) {
                                        let spriteIndex = this.getSpriteIndex(w, h, spriteMask ? 1 : l, x, y, z, animationPhase);
                                        let spriteImage = g_sprites.getSpriteImage(this.m_spritesIndex[spriteIndex]);

                                        if (spriteImage) {
                                            if (spriteMask) {
                                                spriteImage.overwriteMask(ThingType.maskColors[l - 1]);
                                            }
                                            let spritePos = new Point((this.m_size.width() - w - 1) * Otc.TILE_PIXELS,
                                                (this.m_size.height() - h - 1) * Otc.TILE_PIXELS);

                                            fullImage.blit(framePos.add(spritePos), spriteImage);
                                        } else {
                                            //console.error(this.m_spritesIndex, spriteIndex);
                                        }
                                    }
                                }
                            }

                            let drawRect = new Rect(
                                framePos.add(new Point(this.m_size.width(), this.m_size.height()))
                                    .mul(Otc.TILE_PIXELS)
                                    .sub(new Point(1, 1)),
                                framePos);

                            for (let x = framePos.x; x < framePos.x + this.m_size.width() * Otc.TILE_PIXELS; ++x) {
                                for (let y = framePos.y; y < framePos.y + this.m_size.height() * Otc.TILE_PIXELS; ++y) {

                                    let p = fullImage.getPixel(x, y);
                                    if (p[3] != 0x00) {
                                        drawRect.setTop(Math.min(y, drawRect.top()));
                                        drawRect.setLeft(Math.min(x, drawRect.left()));
                                        drawRect.setBottom(Math.max(y, drawRect.bottom()));
                                        drawRect.setRight(Math.max(x, drawRect.right()));
                                    }

                                }
                            }
                            //console.log('blit', drawRect);

                            this.m_texturesFramesRects[animationPhase][frameIndex] = drawRect;
                            this.m_texturesFramesOriginRects[animationPhase][frameIndex] = new Rect(framePos, new Size(this.m_size.width(), this.m_size.height()).mul(Otc.TILE_PIXELS));
                            this.m_texturesFramesOffsets[animationPhase][frameIndex] = drawRect.topLeft().sub(framePos);

                        }
                    }
                }
            }
            animationPhaseTexture = new Texture(fullImage, true);
            //animationPhaseTexture->setSmooth(true);
            //console.log(this.m_id, animationPhase, animationPhaseTexture);
            this.m_textures[animationPhase] = animationPhaseTexture;
        }
        return animationPhaseTexture;
    }

    getBestTextureDimension(w: number, h: number, count: number): Size {
        const MAX = 32;

        let k = 1;
        while (k < w)
            k <<= 1;
        w = k;

        k = 1;
        while (k < h)
            k <<= 1;
        h = k;

        let numSprites = w * h * count;
        /*
        assert(numSprites <= MAX*MAX);
        assert(w <= MAX);
        assert(h <= MAX);
        */
        let bestDimension = new Size(MAX, MAX);
        for (let i = w; i <= MAX; i <<= 1) {
            for (let j = h; j <= MAX; j <<= 1) {
                let candidateDimension = new Size(i, j);
                if (candidateDimension.area() < numSprites)
                    continue;
                if ((candidateDimension.area() < bestDimension.area()) ||
                    (candidateDimension.area() == bestDimension.area() && candidateDimension.width() + candidateDimension.height() < bestDimension.width() + bestDimension.height()))
                    bestDimension = candidateDimension;
            }
        }
        //console.log('dim', this.m_id, bestDimension);
        return bestDimension;
        //return new Size(w, h);
    }

    getSpriteIndex(w: number, h: number, l: number, x: number, y: number, z: number, a: number): number {

        let index =
            ((((((a % this.m_animationPhases)
                * this.m_numPatternZ + z)
                * this.m_numPatternY + y)
                * this.m_numPatternX + x)
                * this.m_layers + l)
                * this.m_size.height() + h)
            * this.m_size.width() + w;
        if (!(index < this.m_spritesIndex.length)) {
            throw new Error('index < this.m_spritesIndex.length');
        }
        return index;
    }

    getTextureIndex(l: number, x: number, y: number, z: number) {
        return ((l * this.m_numPatternZ + z)
            * this.m_numPatternY + y)
            * this.m_numPatternX + x;
    }

    draw(dest: Point, scaleFactor: number, layer: number, xPattern: number, yPattern: number, zPattern: number, animationPhase: number, lightView: LightView = null) {
        //console.log('draw thingtype', this.m_null, this.m_id, animationPhase, this.m_animationPhases);
        if (this.m_null)
            return;

        if (animationPhase >= this.m_animationPhases)
            return;

        let texture = this.getTexture(animationPhase); // texture might not exists, neither its rects.

        if (!texture)
            return;


        let frameIndex = this.getTextureIndex(layer, xPattern, yPattern, zPattern);

        if (frameIndex >= this.m_texturesFramesRects[animationPhase].length)
            return;

        let textureOffset = new Point();
        let textureRect = new Rect();

        if (scaleFactor != 1.0) {
            textureRect = this.m_texturesFramesOriginRects[animationPhase][frameIndex];
        } else {
            textureOffset = this.m_texturesFramesOffsets[animationPhase][frameIndex];
            textureRect = this.m_texturesFramesRects[animationPhase][frameIndex];
        }

        let screenRect = new Rect(dest.add(textureOffset.sub(this.m_displacement).sub(this.m_size.toPoint().sub(new Point(1, 1)).mul(32))).mul(scaleFactor),
            textureRect.size().mul(scaleFactor));
        //if (dest.x == 0 && dest.y == 0)
        //console.log('sr', this.m_id, texture, frameIndex, screenRect, textureOffset, this.m_displacement, this.m_size.toPoint(), this.m_texturesFramesRects[animationPhase]);
        /*
                let useOpacity = m_opacity < 1.0f;

                if(useOpacity)
                    g_painter->setColor(Color(1.0f,1.0f,1.0f,m_opacity));

        */
        //g_painter.drawTexturedRect(dest, texture);
        g_painter.drawTexturedRect(screenRect, texture, textureRect);
        //throw new Error('aa');
        /*
                if(useOpacity)
                    g_painter->setColor(Color::white);

                if(lightView && hasLight()) {
                    Light light = getLight();
                    if(light.intensity > 0)
                        lightView->addLightSource(screenRect.center(), scaleFactor, light);
                }
                */
    }
}
import {Creature} from "./creature";
import {Tile} from "./tile";
import {Position} from "./position";
import {Thing} from "./thing";
import {AwareRange} from "./structures/awarerange";
import {Light} from "./structures/light";
import {TileBlock} from "./tileblock";
import {Missile} from "./missile";
import {GameFeature, MessageMode, Otc} from "./constants/const";
import {AnimatedText} from "./animatedtext";
import {StaticText} from "./statictext";
import {Color} from "./color";
import {Point} from "./structures/point";
import {toInt} from "./constants/helpers";
import {Log} from "./log";
import {g_mapview} from "./view/mapview";
import {g_game} from "./game";


export class Map {
    m_tileBlocks: TileBlock[][] = [];
    m_knownCreatures: Creature[] = [];
    m_floorMissiles: Missile[][] = [];
    m_animatedTexts: AnimatedText[] = [];
    m_staticTexts: StaticText[] = [];
// std::vector<MapViewPtr> m_mapViews;
//std::unordered_map<Position, std::string, PositionHasher> m_waypoints;

    m_animationFlags: number = 0;
    m_zoneFlags: number = 0;
    m_zoneColors: Color[] = [];
    m_zoneOpacity: number = 0.0;

    m_light: Light = new Light();
    m_centralPosition: Position = new Position();


    m_attribs: number[] = [];
    m_awareRange: AwareRange = new AwareRange();


    constructor() {
        for (let z = 0; z <= Otc.MAX_Z + 1; ++z) {
            this.m_tileBlocks[z] = [];
            this.m_floorMissiles[z] = [];
        }
    }

    createTile(pos: Position): Tile {
        if (!pos.isMapPosition())
            return null;

        let block = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
        if (!block) {
            block = new TileBlock();
            this.m_tileBlocks[pos.z][this.getBlockIndex(pos)] = block
        }
        return block.create(pos);
    }

    getTile(pos: Position): Tile {
        if (!pos.isMapPosition())
            return null;
        let it = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
        if (it)
            return it.get(pos);
        return null;
    }

    getOrCreateTile(pos: Position): Tile {
        if (!pos.isMapPosition())
            return null;

        let tile = this.getTile(pos);
        if (!tile) {
            tile = this.createTile(pos);
        }
        return tile;
    }


    setAwareRange(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    getCreatureById(id: number): Creature {
        //console.log('known creatures', g_map.m_knownCreatures);
        if (!g_map.m_knownCreatures[id]) {
          ///  console.log('known creatures failed', id, g_map.m_knownCreatures);
            throw new Error('get ' + id);
        }
        return g_map.m_knownCreatures[id];
    }


    getAwareRange() {
        return this.m_awareRange;
    }

    getCentralPosition() {
        return this.m_centralPosition;
    }

    setCentralPosition(centralPosition: Position) {
        if (this.m_centralPosition.equals(centralPosition))
            return;

        this.m_centralPosition = centralPosition;

        this.removeUnawareThings();

        // this fixes local player position when the local player is removed from the map,
        // the local player is removed from the map when there are too many creatures on his tile,
        // so there is no enough stackpos to the server send him
        /*
        g_dispatcher.addEvent([this] {
            LocalPlayerPtr localPlayer = g_game.getLocalPlayer();
            if(!localPlayer || localPlayer->getPosition() == m_centralPosition)
            return;
            TilePtr tile = localPlayer->getTile();
            if(tile && tile->hasThing(localPlayer))
            return;

            Position oldPos = localPlayer->getPosition();
            Position pos = m_centralPosition;
            if(oldPos != pos) {
                if(!localPlayer->isRemoved())
                localPlayer->onDisappear();
                localPlayer->setPosition(pos);
                localPlayer->onAppear();
                g_logger.debug("forced player position update");
            }
        });
        */

        g_mapview.onMapCenterChange(centralPosition);
    }

    cleanTile(pos: Position) {

        if (!pos.isMapPosition())
            return;
        let block = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
        if (block) {
            let tile = block.get(pos);
            if (tile) {
                tile.clean();
                if (tile.canErase())
                    block.remove(pos);

                //notificateTileUpdate(pos);
            }
        }
        for (let i = 0; i < this.m_staticTexts.length;) {
            let staticText = this.m_staticTexts[i];
            if (staticText.getPosition().equals(pos) && staticText.getMessageMode() == MessageMode.MessageNone)
                this.m_staticTexts.splice(i, 1);
            else
                ++i;
        }
    }

    addThing(thing: Thing, pos: Position, stackPos: number = -1) {

        if (!thing)
            return;

        if (thing.isItem() || thing.isCreature() || thing.isEffect()) {
            let tile = this.getOrCreateTile(pos);
            if (tile)
                tile.addThing(thing, stackPos);
        } else {
            if (thing.isMissile()) {
                this.m_floorMissiles[pos.z].push(<Missile> thing);
            } else if (thing.isAnimatedText()) {
                // this code will stack animated texts of the same color
                let animatedText = <AnimatedText> thing;
                let prevAnimatedText: AnimatedText;
                let merged = false;
                for (let other of this.m_animatedTexts) {
                    if (other.getPosition() == pos) {
                        prevAnimatedText = other;
                        if (other.merge(animatedText)) {
                            merged = true;
                            break;
                        }
                    }
                }
                if (!merged) {
                    if (prevAnimatedText) {
                        let offset = prevAnimatedText.getOffset();
                        let t = prevAnimatedText.getTimer().ticksElapsed();
                        if (t < Otc.ANIMATED_TEXT_DURATION / 4.0) { // didnt move 12 pixels
                            let y = 12 - 48 * t / Otc.ANIMATED_TEXT_DURATION;
                            offset.add(new Point(0, y));
                        }
                        offset.y = Math.min(offset.y, 12);
                        animatedText.setOffset(offset);
                    }
                    this.m_animatedTexts.push(animatedText);
                }
            } else if (thing.isStaticText()) {
                let staticText = <StaticText> thing;
                let mustAdd = true;
                for (let other of this.m_staticTexts) {
                    // try to combine messages
                    if (other.getPosition() == pos && other.addMessage(staticText.getName(), staticText.getMessageMode(), staticText.getFirstMessage())) {
                        mustAdd = false;
                        break;
                    }
                }

                if (mustAdd)
                    this.m_staticTexts.push(staticText);
                else
                    return;
            }

            thing.setPosition(pos);
            thing.onAppear();
        }

        //notificateTileUpdate(pos);
    }

    removeThing(thing: Thing) {
        if (!thing)
            return false;

        let ret = false;
        if (thing.isMissile()) {
            let missile = <Missile> thing;
            let z = missile.getPosition().z;
            let it = this.m_floorMissiles[z].indexOf(missile);
            if (it > -1) {
                this.m_floorMissiles.splice(it, 1);
                ret = true;
            }
        } else if (thing.isAnimatedText()) {
            let animatedText = <AnimatedText> thing;
            let it = this.m_animatedTexts.indexOf(animatedText);
            if (it > -1) {
                this.m_animatedTexts.splice(it, 1);
                ret = true;
            }
        } else if (thing.isStaticText()) {
            let staticText = <StaticText> thing;
            let it = this.m_staticTexts.indexOf(staticText);
            if (it > -1) {
                this.m_staticTexts.splice(it, 1);
                ret = true;
            }
        } else {
            let tile = thing.getTile();
            if (tile)
                ret = tile.removeThing(thing);
        }

        //notificateTileUpdate(thing.getPosition());
        return ret;
    }

    removeThingByPos(pos: Position, stackPos: number) {
        let tile = this.getTile(pos);
        if (tile)
            return this.removeThing(tile.getThing(stackPos));
        return false;
    }

    setLight(light: Light) {

    }

    getThing(pos: Position, stackpos: number): Thing {
        let tile = this.getTile(pos);
        //Log.debug('Map.getThing', pos, tile.getThing(stackpos));
        if (tile)
            return tile.getThing(stackpos);
        return null;
    }

    addCreature(creature: Creature) {
        this.m_knownCreatures[creature.getId()] = creature;
    }

    removeCreatureById(id: number) {
        if (id == 0)
            return;

        if (this.m_knownCreatures[id]) {
            this.m_knownCreatures.splice(id, 1);
        }
    }

    getSightSpectators(centerPos: Position, multiFloor: boolean): Creature[] {
        return this.getSpectatorsInRangeEx(centerPos, multiFloor, this.m_awareRange.left - 1, this.m_awareRange.right - 2, this.m_awareRange.top - 1, this.m_awareRange.bottom - 2);
    }

    getSpectators(centerPos: Position, multiFloor: boolean): Creature[] {
        return this.getSpectatorsInRangeEx(centerPos, multiFloor, this.m_awareRange.left, this.m_awareRange.right, this.m_awareRange.top, this.m_awareRange.bottom);
    }

    getSpectatorsInRange(centerPos: Position, multiFloor: boolean, xRange: number, yRange: number): Creature[] {
        return this.getSpectatorsInRangeEx(centerPos, multiFloor, xRange, xRange, yRange, yRange);
    }

    getSpectatorsInRangeEx(centerPos: Position, multiFloor: boolean, minXRange: number, maxXRange: number, minYRange: number, maxYRange: number): Creature[] {
        let minZRange = 0;
        let maxZRange = 0;
        let creatures: Creature[] = [];

        if (multiFloor) {
            minZRange = 0;
            maxZRange = Otc.MAX_Z;
        }

        //TODO: optimize
        //TODO: get creatures from other floors corretly
        //TODO: delivery creatures in distance order

        for (let iz = -minZRange; iz <= maxZRange; ++iz) {
            for (let iy = -minYRange; iy <= maxYRange; ++iy) {
                for (let ix = -minXRange; ix <= maxXRange; ++ix) {
                    let tile = this.getTile(centerPos.translated(ix, iy, iz));
                    if (!tile)
                        continue;

                    let tileCreatures = tile.getCreatures();
                    for (let creature of tileCreatures) {
                        creatures.push(creature);
                    }
                    // TODO: WEB - REVERSE?
                    //creatures.insert(creatures.end(), tileCreatures.rbegin(), tileCreatures.rend());
                }
            }
        }

        return creatures;
    }

    isLookPossible(position: Position): boolean {
        let tile = this.getTile(position);
        return tile && tile.isLookPossible();
    }

    isCovered(pos: Position, firstFloor: number): boolean {
        // check for tiles on top of the postion
        let tilePos = pos.clone();
        while (tilePos.coveredUp() && tilePos.z >= firstFloor) {
            let tile = this.getTile(tilePos);
            // the below tile is covered when the above tile has a full ground
            if (tile && tile.isFullGround())
                return true;
        }
        return false;
    }

    isCompletelyCovered(pos: Position, firstFloor: number): boolean {
        const checkTile = this.getTile(pos);
        let tilePos = pos.clone();
        while (tilePos.coveredUp() && tilePos.z >= firstFloor) {
            let covered = true;
            let done = false;
            // check in 2x2 range tiles that has no transparent pixels
            for (let x = 0; x < 2 && !done; ++x) {
                for (let y = 0; y < 2 && !done; ++y) {
                    const tile = this.getTile(tilePos.translated(-x, -y));
                    if (!tile || !tile.isFullyOpaque()) {
                        covered = false;
                        done = true;
                    } else if (x == 0 && y == 0 && (!checkTile || checkTile.isSingleDimension())) {
                        done = true;
                    }
                }
            }
            if (covered)
                return true;
        }
        return false;
    }

    getFirstAwareFloor(): number {
        if (this.m_centralPosition.z > Otc.SEA_FLOOR)
            return this.m_centralPosition.z - Otc.AWARE_UNDEGROUND_FLOOR_RANGE;
        else
            return 0;
    }

    getLastAwareFloor(): number {
        if (this.m_centralPosition.z > Otc.SEA_FLOOR)
            return Math.min(this.m_centralPosition.z + Otc.AWARE_UNDEGROUND_FLOOR_RANGE, Otc.MAX_Z);
        else
            return Otc.SEA_FLOOR;
    }

    getFloorMissiles(z: number): Missile[] { return this.m_floorMissiles[z]; }

    isAwareOfPosition(pos: Position): boolean {
        if (pos.z < this.getFirstAwareFloor() || pos.z > this.getLastAwareFloor())
            return false;

        let groundedPos = pos.clone();
        while (groundedPos.z != this.m_centralPosition.z) {
            if (groundedPos.z > this.m_centralPosition.z) {
                if (groundedPos.x == 65535 || groundedPos.y == 65535) // When pos == 65535,65535,15 we cant go up to 65536,65536,14
                    break;
                groundedPos.coveredUp();
            }
            else {
                if (groundedPos.x == 0 || groundedPos.y == 0) // When pos == 0,0,0 we cant go down to -1,-1,1
                    break;
                groundedPos.coveredDown();
            }
        }
        return this.m_centralPosition.isInRange(groundedPos, this.m_awareRange.left,
            this.m_awareRange.right,
            this.m_awareRange.top,
            this.m_awareRange.bottom);
    }

    removeUnawareThings() {
        // remove creatures from tiles that we are not aware of anymore
        for (let creature of this.m_knownCreatures) {
            if (!this.isAwareOfPosition(creature.getPosition()))
                this.removeThing(creature);
        }

        // remove static texts from tiles that we are not aware anymore
        for (let i = 0; i < this.m_staticTexts.length;) {
            let staticText = this.m_staticTexts[i];
            if (staticText.getMessageMode() == MessageMode.MessageNone && !this.isAwareOfPosition(staticText.getPosition()))
                this.m_staticTexts.splice(i, 1);
            else
                ++i;
        }

        if (!g_game.getFeature(GameFeature.GameKeepUnawareTiles)) {
            // remove tiles that we are not aware anymore
            for (let z = 0; z <= Otc.MAX_Z; ++z) {
                let tileBlocks = this.m_tileBlocks[z];

                for (let i = 0; i < tileBlocks.length;) {
                    let block = tileBlocks[i];
                    let blockEmpty = true;

                    for (const tile of block.getTiles()) {
                        /*
                        if(!tile)
                            continue;
                        */

                        const pos = tile.getPosition();
                        if (!this.isAwareOfPosition(pos))
                            block.remove(pos);
                        else
                            blockEmpty = false;
                    }


                    if (blockEmpty)
                        tileBlocks.splice(i, 1);
                    else
                        ++i;
                }
            }
        }
    }

    getBlockIndex(pos: Position): number {
        return (toInt(pos.y / TileBlock.BLOCK_SIZE) * toInt(65536 / TileBlock.BLOCK_SIZE)) + toInt(pos.x / TileBlock.BLOCK_SIZE);
    }

}

let g_map = new Map();
export {g_map}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ThingType } from "./thingtype";
import { ThingCategory } from "./constants/const";
import { Log } from "./log";
import { g_resources } from "./resources";
let nullThingType = new ThingType();
export class ThingTypeManager {
    constructor() {
        this.m_nullThingType = new ThingType();
        this.m_thingTypes = null;
        this.m_datLoaded = false;
        this.m_datSignature = 0;
        this.m_contentRevision = 0;
        this.m_thingTypes = [];
        for (let i = ThingCategory.ThingCategoryItem; i < ThingCategory.ThingLastCategory; ++i) {
            this.m_thingTypes[i] = [];
        }
    }
    getThingType(id, category) {
        if (category >= ThingCategory.ThingLastCategory || id >= this.m_thingTypes[category].length) {
            Log.error("invalid thing type client id %d in category %d", id, category);
            return this.m_nullThingType;
        }
        return this.m_thingTypes[category][id];
    }
    rawGetThingType(id, category) {
        return this.getThingType(id, category);
    }
    isValidDatId(id, category) {
        return true;
    }
    getNullThingType() {
        return nullThingType;
    }
    getContentRevision() {
        throw new Error("Method not implemented.");
    }
    loadDat(file) {
        return __awaiter(this, void 0, void 0, function* () {
            this.m_datLoaded = false;
            this.m_datSignature = 0;
            this.m_contentRevision = 0;
            try {
                console.log(new Date().getTime(), this.m_thingTypes);
                let fin = yield g_resources.openFile(file);
                this.m_datSignature = fin.getU32();
                this.m_contentRevision = this.m_datSignature & 0xFFFF;
                for (let category = ThingCategory.ThingCategoryItem; category < ThingCategory.ThingLastCategory; ++category) {
                    let count = fin.getU16() + 1;
                    this.m_thingTypes[category] = [];
                    for (let thingCount = 0; thingCount < count; ++thingCount) {
                        this.m_thingTypes[category][thingCount] = nullThingType;
                    }
                }
                for (let category = 0; category < ThingCategory.ThingLastCategory; ++category) {
                    let firstId = 1;
                    if (category == ThingCategory.ThingCategoryItem)
                        firstId = 100;
                    for (let id = firstId; id < this.m_thingTypes[category].length; ++id) {
                        let type = new ThingType();
                        type.unserialize(id, category, fin);
                        this.m_thingTypes[category][id] = type;
                    }
                }
                this.m_datLoaded = true;
                console.log(new Date().getTime(), this.m_thingTypes);
                //g_lua.callGlobalField("g_things", "onLoadDat", file);
                return true;
            }
            catch (e) {
                Log.error("Failed to read dat '%s': %s'", file, e);
                return false;
            }
        });
    }
}
let g_things = new ThingTypeManager();
export { g_things };
//# sourceMappingURL=thingtypemanager.js.map
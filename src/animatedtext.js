import { Thing } from "./thing";
import { Timer } from "./structures/timer";
import { Color } from "./color";
import { CachedText } from "./cachedtext";
import { Otc } from "./constants/const";
export class AnimatedText extends Thing {
    constructor() {
        super();
        this.m_color = new Color();
        this.m_animationTimer = new Timer();
        this.m_cachedText = new CachedText();
        this.m_cachedText.setFont("verdana-11px-rounded");
        this.m_cachedText.setAlign(CachedText.ALIGN_LEFT);
    }
    drawText(dest, visibleRect) {
        /* todo */
        /*
        static float tf = Otc::ANIMATED_TEXT_DURATION;
        static float tftf = Otc::ANIMATED_TEXT_DURATION * Otc::ANIMATED_TEXT_DURATION;

        Point p = dest;
        Size textSize = m_cachedText.getTextSize();
        float t = m_animationTimer.ticksElapsed();
        p.x += (24 - textSize.width() / 2);

        if(g_game.getFeature(Otc::GameDiagonalAnimatedText)) {
            p.x -= (4 * t / tf) + (8 * t * t / tftf);
        }

        p.y += 8 + (-48 * t) / tf;
        p += m_offset;
        Rect rect(p, textSize);

        if(visibleRect.contains(rect)) {
            float t0 = tf / 1.2;
            if(t > t0) {
                Color color = m_color;
                color.setAlpha((float)(1 - (t - t0) / (tf - t0)));
                g_painter.setColor(color);
            }
            else
                g_painter.setColor(m_color);
            m_cachedText.draw(rect);
        }
        */
    }
    setColor(color) {
        this.m_color = Color.from8bit(color);
    }
    setText(text) {
        //m_cachedText.setText(text);
    }
    setOffset(offset) {
        this.m_offset = offset;
    }
    getColor() {
        return this.m_color;
    }
    getCachedText() {
        return this.m_cachedText;
    }
    getOffset() {
        return this.m_offset;
    }
    getTimer() {
        return this.m_animationTimer;
    }
    merge(other) {
        if (other.getColor() != this.m_color)
            return false;
        if (other.getCachedText().getFont() != this.m_cachedText.getFont())
            return false;
        if (this.m_animationTimer.ticksElapsed() > Otc.ANIMATED_TEXT_DURATION / 2.5)
            return false;
        let number = parseInt(this.m_cachedText.getText());
        let otherNumber = parseInt(other.getCachedText().getText());
        if (!isNaN(number) && !isNaN(otherNumber)) {
            this.m_cachedText.setText((number + otherNumber).toString());
            return true;
        }
        return false;
    }
    asAnimatedText() {
        return this;
    }
    isAnimatedText() {
        return true;
    }
    onAppear() {
        this.m_animationTimer.restart();
        // schedule removal
        //auto self = asAnimatedText();
        //g_dispatcher.scheduleEvent([self]() { g_map.removeThing(self); }, Otc::ANIMATED_TEXT_DURATION);
    }
}
//# sourceMappingURL=animatedtext.js.map
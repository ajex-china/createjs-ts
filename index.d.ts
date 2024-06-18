// Type definitions for CreateJS
// Project: http://www.createjs.com/
// Definitions by: Pedro Ferreira <https://bitbucket.org/drk4>, Chris Smith <https://github.com/evilangelist>, Satoru Kimura <https://github.com/gyohk>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*
    Copyright (c) 2012 Pedro Ferreira
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// Common class and methods for CreateJS.
// Library documentation : http://www.createjs.com/Docs/EaselJS/modules/EaselJS.html
// Library documentation : http://www.createjs.com/Docs/PreloadJS/modules/PreloadJS.html
// Library documentation : http://www.createjs.com/Docs/SoundJS/modules/SoundJS.html
// Library documentation : http://www.createjs.com/Docs/TweenJS/modules/TweenJS.html
export = createjs;


interface NativeMouseEvent extends MouseEvent {

}

declare namespace createjs {
    /**
     * 包含所有事件共享的属性和方法，以便与EventDispatcher一起使用。
     * 请注意，事件对象经常被重用，因此您永远不应该依赖于事件对象在调用堆栈之外的状态。
     */
    export class Event {
        constructor(type?: string, bubbles?: boolean, cancelable?: boolean);

        // properties
        /** 指示事件是否会在显示列表中冒泡 */
        bubbles: boolean;
        /** 指示是否可以通过preventDefault取消此事件的默认行为。这是通过Event构造函数设置的 */
        cancelable: boolean;
        /** 正在从中调度冒泡事件的当前目标。对于非冒泡事件，这将始终与目标相同。例如，如果childObj.parent=parentObj，并且从childObj生成冒泡事件，则parentObj上的侦听器将接收到target=childObj（原始目标）和currentTarget=parentObj（添加侦听器的位置）的事件 */
        currentTarget: any; // It is 'Object' type officially, but 'any' is easier to use.
        /** 指示是否对此事件调用了preventDefault */
        defaultPrevented: boolean;
        /**
         * 对于冒泡事件，这表示当前事件阶段：
         * 1.捕获阶段：从顶部父对象开始到目标
         * 2.在目标阶段：当前正在从目标调度
         * 3.冒泡阶段：从目标到顶部父对象
        */
        eventPhase: number;
        /** 指示是否对此事件调用了stopImmediatePropagation */
        immediatePropagationStopped: boolean;
        /** 指示是否对此事件调用了stopPropagation或stopImmediatePropagation */
        propagationStopped: boolean;
        /** 指示是否对此事件调用了remove */
        removed: boolean;
        /** 事件目标对象 */
        target: any; // It is 'Object' type officially, but 'any' is easier to use.
        timeStamp: number;
        type: string;

        // other event payloads
        data: any;
        delta: number;
        error: string;
        id: string;
        item: any;
        loaded: number;
        name: string;
        next: string;
        params: any;
        paused: boolean;
        progress: number;
        rawResult: any;
        result: any;
        runTime: number;
        src: string;
        time: number;
        total: number;

        // methods
        clone(): Event;
        preventDefault(): void;
        remove(): void;
        set(props: Object): Event;
        stopImmediatePropagation(): void;
        stopPropagation(): void;
        toString(): string;
    }

    export class EventDispatcher {
        constructor();

        // methods
        addEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): Function;
        addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): Object;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
        addEventListener(type: string, listener: (e?:Event) => void, useCapture?: boolean): ()=>{}
        addEventListener(type: string, listener: (e?:any) => void, useCapture?: boolean): ()=>{}
        /**
         * 将指定的事件分派给所有侦听器。
         * @param eventObj 具有“type”属性或字符串类型的对象。虽然通用对象可以工作，但建议使用CreateJS事件实例。如果使用了字符串，dispatchEvent将在必要时使用指定的类型构造一个Event实例。后一种方法可以用于避免可能没有任何侦听器的非冒泡事件的事件对象实例化。
         * @param bubbles 指定将字符串传递给eventObj时的气泡值。
         * @param cancelable 指定将字符串传递给eventObj时可取消的值。
         * @returns 如果对可取消事件调用了preventDefault()，则返回false，否则返回true。
         */
        dispatchEvent(eventObj: Object, target?: Object): boolean;
        dispatchEvent(eventObj: string, target?: Object): boolean;
        dispatchEvent(eventObj: Event, target?: Object): boolean;
        hasEventListener(type: string): boolean;
        static initialize(target: Object): void;
        off(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        off(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        on(type: string, listener: (eventObj: Object) => boolean, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        on(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        on(type: string, listener:(eventObj: any)=>void, scope?: any, once?: boolean, data?: any, useCapture?: boolean):void;
        removeAllEventListeners(type?: string): void;
        removeEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        toString(): string;
        willTrigger(type: string): boolean;
    }
    /**
     * 为新类设置原型链和构造函数属性。
     * 
     * 这应该在创建类构造函数之后立即调用。
     * 
     * @param subclass 
     * @param superclass 
     */
    export function extend(subclass: () => any, superclass: () => any): () => any;     // returns the subclass prototype
    /**
     * 在传入的数组中查找指定值searchElement的第一个匹配项，并返回该值的索引。如果找不到值，则返回-1。
     * @param array 数组
     * @param searchElement 匹配项
     */
    export function indexOf(array: any[], searchElement: Object): number;
    /**
     * 通过创建格式为prefix_methodName的别名，提升超类上被重写的任何方法。建议使用超类的名称作为前缀。超类的构造函数的别名总是以前缀_构造函数的格式添加。这允许子类在不使用function.call的情况下调用超类方法，从而提供更好的性能。
     * 
     * 例如，如果MySubClass扩展了MySuperClass，并且两者都定义了一个draw方法，那么调用promote(MySubClass, "MySuperClass")将向MySubClass添加一个MySupClass_constructor方法，并将MySupClass上的draw方法提升为MySupClass_draw的MySubClass原型。
     * 
     * 这应该在类的原型完全定义之后调用。
     * 
     * @param subclass 超类
     * @param prefix 前缀
     */
    export function promote(subclass: () => any, prefix: string): () => any;

    export function proxy(method: (eventObj: Object) => boolean, scope: Object, ...arg: any[]): (eventObj: Object) => any;
    export function proxy(method: (eventObj: Object) => void, scope: Object, ...arg: any[]): (eventObj: Object) => any;
    export function proxy(method: { handleEvent: (eventObj: Object) => boolean; }, scope: Object, ...arg: any[]): (eventObj: Object) => any;
    export function proxy(method: { handleEvent: (eventObj: Object) => void; }, scope: Object, ...arg: any[]): (eventObj: Object) => any;
    /**
     * 将灰度 Alpha 贴图图像（或画布）应用到目标，这样结果的 Alpha 通道将从贴图的红色通道复制，RGB 通道将从目标复制。
     * 通常，建议您使用AlphaMaskFilter，因为它的性能要好得多。
     */
    export class AlphaMapFilter extends Filter {
        constructor(alphaMap: HTMLImageElement | HTMLCanvasElement);

        // properties

        /**
         * 要用作结果的alpha值的灰度图像（或画布）。这应该与目标的尺寸完全相同。
         */
        alphaMap: HTMLImageElement | HTMLCanvasElement;

        // methods
        clone(): AlphaMapFilter;
    }
    /**
     * 将遮罩图像（或画布）中的alpha应用于目标，这样结果的alpha通道将从遮罩中导出，而RGB通道将从目标中复制。例如，这可以用于将alpha掩码应用于显示对象。这也可以用于将JPG压缩的RGB图像与PNG32 alpha掩码组合，这可以导致比包含RGB的单个PNG32小得多的文件大小。
     */
    export class AlphaMaskFilter extends Filter {
        constructor(mask: HTMLImageElement | HTMLCanvasElement);

        // properties

        /**
         * 要用作遮罩的图像（或画布）。
         */
        mask: HTMLImageElement | HTMLCanvasElement;

        // methods
        clone(): AlphaMaskFilter;
    }

    /**
     * 位图表示显示列表中的图像、画布或视频。可以使用现有HTML元素或字符串实例化位图。
     */
    export class Bitmap extends DisplayObject {
        constructor(imageOrUrl?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | Object | string);

        // properties

        /**
         * 要显示的源图像。这可以是CanvasImageSource（图像、视频、画布）、具有返回CanvasImage源的getImage方法的对象或图像的字符串URL。如果是后者，将使用URL作为其src的新图像实例。
         */
        image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
        /**
         * 指定要绘制的源图像的区域。如果省略，将绘制整个图像。
         * 注意：
         * 1.视频源必须设置宽度/高度才能正确使用sourceRect
         * 2.缓存对象将忽略sourceRect属性
         */
        sourceRect: Rectangle;

        // methods
        clone(): Bitmap;
    }
    /**
     * BitmapCache类集成了“缓存”对象所需的所有缓存属性和逻辑，它将DisplayObject对象渲染为位图。实际缓存本身仍然与cacheCanvas一起存储在目标上。Bitmap对象执行缓存几乎没有好处，因为它已经是单个图像了。如果容器包含多个复杂且不经常移动的内容，使用缓存渲染图像将提高整体渲染速度。缓存不会自动更新，除非调用cache方法。如果缓存像Stage一样每帧更新一次，则可能无法提高渲染性能。当对象的内容变化频率很低时（画面长时间静止），最好使用缓存。
     * 缓存也是应用滤镜的必要条件。当滤镜不改变时，直接使用缓存显示，不需要每帧渲染。
     */
    export class BitmapCache {
        constructor();

        // properties
        cacheID: number;

        // methods
        static getFilterBounds(target: DisplayObject, output?: Rectangle): Rectangle;
        toString(): string;
        define(target: DisplayObject, x: number, y: number, width: number, height: number, scale?: number): void;
        update(compositeOperation?: string): void;
        release(): void;
        getCacheDataURL(): string;
        draw(ctx: CanvasRenderingContext2D): boolean;
    }
    /**
     * 对位图使用九宫格缩放
     */
    export class ScaleBitmap extends DisplayObject {
        /**
         * 
         * @param imageOrUrl 源图或者链接地址
         * @param scale9Grid 指定九区域缩放网格的内部矩形
         */
        constructor(imageOrUrl: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | Object | string, scale9Grid: Rectangle);

        // properties

        /** 用来渲染的图像。可以是Image，或者Canvas，又或者Video */
        image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
        /** 源图的裁剪区域 */
        sourceRect: Rectangle;
        /** 绘制宽度 */
        drawWidth: number;
        /** 绘制高度 */
        drawHeight: number;
        /** 指定九区域缩放网格的内部矩形 */
        scale9Grid: Rectangle;
        /** ScaleSpriteSheet是否应在整个像素坐标下绘制到画布 */
        snapToPixel: boolean;

        // methods

        /**
         * 设置用于绘制ScaleSpriteSheet的尺寸
         * @param newWidth 
         * @param newHeight 
         */
        setDrawSize (newWidth: number, newHeight: number): void;
        clone(): ScaleBitmap;
    }

    export class BitmapText extends DisplayObject {
        constructor(text?:string, spriteSheet?:SpriteSheet);

        static maxPoolSize: number;

        // properties
        letterSpacing: number;
        lineHeight: number;
        spaceWidth: number;
        spriteSheet: SpriteSheet;
        text: string;
    }

    export class BlurFilter extends Filter {
        constructor(blurX?: number, blurY?: number, quality?: number);

        // properties
        blurX: number;
        blurY: number;
        quality: number;

        // methods
        clone(): BlurFilter;
    }

    export class ButtonHelper {
        constructor(target: Sprite, outLabel?: string, overLabel?: string, downLabel?: string, play?: boolean, hitArea?: DisplayObject, hitLabel?: string);
        constructor(target: MovieClip, outLabel?: string, overLabel?: string, downLabel?: string, play?: boolean, hitArea?: DisplayObject, hitLabel?: string);

        // properties
        downLabel: string | number;
        outLabel: string | number;
        overLabel: string | number;
        play: boolean;
        target: MovieClip | Sprite;
        enabled: boolean;

        // methods
        /**
         * @deprecated - use the 'enabled' property instead
         */
        setEnabled(value: boolean): void;
        /**
         * @deprecated - use the 'enabled' property instead
         */
        getEnabled(): boolean;
        toString(): string;
    }

    export class ColorFilter extends Filter {
        constructor(redMultiplier?: number, greenMultiplier?: number, blueMultiplier?: number, alphaMultiplier?: number, redOffset?: number, greenOffset?: number, blueOffset?: number, alphaOffset?: number);

        // properties
        alphaMultiplier: number;
        alphaOffset: number;
        blueMultiplier: number;
        blueOffset: number;
        greenMultiplier: number;
        greenOffset: number;
        redMultiplier: number;
        redOffset: number;

        // methods
        clone(): ColorFilter;
    }

    export class ColorMatrix {
        constructor(brightness?: number, contrast?: number, saturation?: number, hue?: number);

        // methods
        adjustBrightness(value: number): ColorMatrix;
        adjustColor(brightness: number, contrast: number, saturation: number, hue: number): ColorMatrix;
        adjustContrast(value: number): ColorMatrix;
        adjustHue(value: number): ColorMatrix;
        adjustSaturation(value: number): ColorMatrix;
        clone(): ColorMatrix;
        concat(...matrix: number[]): ColorMatrix;
        concat(matrix: ColorMatrix): ColorMatrix;
        copy(...matrix: number[]): ColorMatrix;
        copy(matrix: ColorMatrix): ColorMatrix;
        reset(): ColorMatrix;
        setColor( brightness: number, contrast: number, saturation: number, hue: number ): ColorMatrix;
        toArray(): number[];
        toString(): string;
    }

    export class ColorMatrixFilter extends Filter {
        constructor(matrix: number[] | ColorMatrix);

        // properties
        matrix: number[] | ColorMatrix;

        // methods
        clone(): ColorMatrixFilter;
    }


    export class Container extends DisplayObject {
        constructor();

        // properties
        children: DisplayObject[];
        mouseChildren: boolean;
        numChildren: number;
        tickChildren: boolean;

        // methods
        addChild<T extends DisplayObject>(child: T): T;
        addChild<T extends DisplayObject>(child0: DisplayObject, lastChild: T): T;
        addChild<T extends DisplayObject>(child0: DisplayObject, child1: DisplayObject, lastChild: T): T;
        addChild<T extends DisplayObject>(child0: DisplayObject, child1: DisplayObject, child2: DisplayObject, lastChild: T): T;
        addChild(...children: DisplayObject[]): DisplayObject;
        addChildAt<T extends DisplayObject>(child: T, index: number): T;
        addChildAt<T extends DisplayObject>(child0: DisplayObject, lastChild: T, index: number): T;
        addChildAt<T extends DisplayObject>(child0: DisplayObject, child1: DisplayObject, lastChild: T, index: number): T;
        addChildAt(...childOrIndex: (DisplayObject|number)[]): DisplayObject; // actually (...child: DisplayObject[], index: number)

        clone(recursive?: boolean): Container;
        contains(child: DisplayObject): boolean;
        getChildAt(index: number): DisplayObject;
        getChildByName(name: string): DisplayObject;
        getChildIndex(child: DisplayObject): number;
        /**
         * @deprecated - use numChildren property instead.
         */
        getNumChildren(): number;
        getObjectsUnderPoint(x: number, y: number, mode: number): DisplayObject[];
        getObjectUnderPoint(x: number, y: number, mode: number): DisplayObject;
        removeAllChildren(): void;
        removeChild(...child: DisplayObject[]): boolean;
        removeChildAt(...index: number[]): boolean;
        setChildIndex(child: DisplayObject, index: number): void;
        sortChildren(sortFunction: (a: DisplayObject, b: DisplayObject) => number): void;
        swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        swapChildrenAt(index1: number, index2: number): void;
    }

    export class DisplayObject extends EventDispatcher {
        constructor();

        // properties
        alpha: number;
        bitmapCache: BitmapCache;
        cacheCanvas: HTMLCanvasElement | Object;
        cacheID: number;
        compositeOperation: string;
        cursor: string;
        filters: Filter[];
        hitArea: DisplayObject;
        id: number;
        mask: Shape;
        mouseEnabled: boolean;
        name: string;
        parent: Container;
        regX: number;
        regY: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        scale: number;
        shadow: Shadow;
        skewX: number;
        skewY: number;
        snapToPixel: boolean;
        stage: Stage;
        static suppressCrossDomainErrors: boolean;
        tickEnabled: boolean;
        transformMatrix: Matrix2D;
        visible: boolean;
        x: number;
        y: number;

        // methods
        cache(x: number, y: number, width: number, height: number, scale?: number): void;
        clone(): DisplayObject;
        draw(ctx: CanvasRenderingContext2D, ignoreCache?: boolean): boolean;
        getBounds(): Rectangle;
        getCacheDataURL(): string;
        getConcatenatedDisplayProps(props?: DisplayProps): DisplayProps;
        getConcatenatedMatrix(mtx?: Matrix2D): Matrix2D;
        getMatrix(matrix?: Matrix2D): Matrix2D;
        /**
         * @deprecated
         */
        getStage(): Stage;
        getTransformedBounds(): Rectangle;
        globalToLocal(x: number, y: number, pt?: Point | Object): Point;
        hitTest(x: number, y: number): boolean;
        isVisible(): boolean;
        localToGlobal(x: number, y: number, pt?: Point | Object): Point;
        localToLocal(x: number, y: number, target: DisplayObject, pt?: Point | Object): Point;
        set(props: Object): DisplayObject;
        /**
         * 允许您手动设置对象的边界，这些对象要么无法计算自己的边界（例如，形状和文本）以供将来引用，要么可以将对象包含在容器边界中。手动设置的边界将始终覆盖计算的边界。边界应该在对象的局部（未转换的）坐标中指定。例如，一个以(0,0)为中心的半径为25px的圆的Shape实例的边界为(-25，-25，50，50)。
         * @param x 
         * @param y 
         * @param width 
         * @param height 
         */
        setBounds(x: number, y: number, width: number, height: number): void;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): DisplayObject;
        uncache(): void;
        updateCache(compositeOperation?: string): void;
        updateContext(ctx: CanvasRenderingContext2D): void;
    }
    /**
     * 用于计算和封装与显示相关的属性。
     */
    export class DisplayProps {
        constructor(visible?: number, alpha?: number, shadow?: number, compositeOperation?: number, matrix?: number);

        // properties
        alpha: number;
        compositeOperation: string;
        matrix: Matrix2D;
        shadow: Shadow;
        visible: boolean;

        // methods

        /**
         * 附加指定的显示属性。这通常用于应用子属性及其父属性。
         * @param visible 
         * @param alpha 
         * @param shadow 
         * @param compositeOperation 
         * @param matrix 变换矩阵。默认为单位矩阵。
         */
        append(visible: boolean, alpha: number, shadow: Shadow, compositeOperation: string, matrix?: Matrix2D): DisplayProps;
        /**
         * 返回DisplayProps实例的克隆。克隆相关矩阵。
         */
        clone(): DisplayProps;
        /**
         * 将此实例及其矩阵重置为默认值。
         */
        identity(): DisplayProps;
        /**
         * 前置指定的显示属性。这通常用于将父属性应用于子属性。例如，要获取将应用于子对象的组合显示属性。
         * @param visible 
         * @param alpha 
         * @param shadow 
         * @param compositeOperation 
         * @param matrix 变换矩阵。默认为单位矩阵。
         */
        prepend(visible: boolean, alpha: number, shadow: Shadow, compositeOperation: string, matrix?: Matrix2D): DisplayProps;
        /**
         * 使用指定的值重新初始化实例。
         * @param visible 
         * @param alpha 
         * @param shadow 
         * @param compositeOperation 合成。
         * @param matrix 变换矩阵。默认为单位矩阵。
         */
        setValues(visible?: boolean, alpha?: number, shadow?: number, compositeOperation?: number, matrix?: number): DisplayProps;
    }


    export class DOMElement extends DisplayObject {
        constructor(htmlElement: HTMLElement);

        // properties
        htmlElement: HTMLElement;

        // methods
        clone(): DisplayObject; // throw error
        set(props: Object): DOMElement;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): DOMElement;
    }


    export class EaselJS {
        // properties
        static buildDate: string;
        static version: string;
    }

    export class Filter {
        constructor();

        // methods
        applyFilter(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, targetCtx?: CanvasRenderingContext2D, targetX?: number, targetY?: number): boolean;
        clone(): Filter;
        getBounds(): Rectangle;
        toString(): string;
    }

    export class Graphics {
        constructor();

        // properties
        static BASE_64: Object;
        static beginCmd: Graphics.BeginPath;
        command: Object;
        instructions: Object[]; // array of graphics command objects (Graphics.Fill, etc)
        static STROKE_CAPS_MAP: string[];
        static STROKE_JOINTS_MAP: string[];

        // methods
        append(command: Object, clean?: boolean): Graphics;
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        beginBitmapFill(image: Object, repetition?: string, matrix?: Matrix2D): Graphics;
        beginBitmapStroke(image: Object, repetition?: string): Graphics;
        beginFill(color: string): Graphics;
        beginLinearGradientFill(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
        beginLinearGradientStroke(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
        beginRadialGradientFill(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
        beginRadialGradientStroke(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
        beginStroke(color: string): Graphics;
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): Graphics;
        clear(): Graphics;
        clone(): Graphics;
        closePath(): Graphics;
        curveTo(cpx: number, cpy: number, x: number, y: number): Graphics;
        decodePath(str: string): Graphics;
        draw(ctx: CanvasRenderingContext2D): void;
        drawAsPath(ctx: CanvasRenderingContext2D): void;
        drawCircle(x: number, y: number, radius: number): Graphics;
        drawEllipse(x: number, y: number, w: number, h: number): Graphics;
        drawPolyStar(x: number, y: number, radius: number, sides: number, pointSize: number, angle: number): Graphics;
        drawRect(x: number, y: number, w: number, h: number): Graphics;
        drawRoundRect(x: number, y: number, w: number, h: number, radius: number): Graphics;
        drawRoundRectComplex(x: number, y: number, w: number, h: number, radiusTL: number, radiusTR: number, radiusBR: number, radisBL: number): Graphics;
        endFill(): Graphics;
        endStroke(): Graphics;
        static getHSL(hue: number, saturation: number, lightness: number, alpha?: number): string;
        /**
         * @deprecated - use the instructions property instead
         */
        getInstructions(): Object[];
        static getRGB(r: number, g: number, b: number, alpha?: number): string;
        inject(callback: (data: any) => any,  data: any): Graphics; // deprecated
        isEmpty(): boolean;
        lineTo(x: number, y: number): Graphics;
        moveTo(x: number, y: number): Graphics;
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): Graphics;
        rect(x: number, y: number, w: number, h: number): Graphics;
        setStrokeStyle(thickness: number, caps?: string | number, joints?: string | number, miterLimit?: number, ignoreScale?: boolean): Graphics;
        setStrokeDash(segments?: number[], offset?: number): Graphics;
        store(): Graphics;
        toString(): string;
        unstore(): Graphics;


        // tiny API - short forms of methods above
        a(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
        at(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        bf(image: Object, repetition?: string, matrix?: Matrix2D): Graphics;
        bs(image: Object, repetition?: string): Graphics;
        f(color: string): Graphics;
        lf(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
        ls(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
        rf(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
        rs(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
        s(color?: string): Graphics;
        bt(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): Graphics;
        c(): Graphics;
        cp(): Graphics;
        p(str: string): Graphics;
        dc(x: number, y: number, radius: number): Graphics;
        de(x: number, y: number, w: number, h: number): Graphics;
        dp(x: number, y: number, radius: number, sides: number, pointSize: number, angle: number): Graphics;
        dr(x: number, y: number, w: number, h: number): Graphics;
        rr(x: number, y: number, w: number, h: number, radius: number): Graphics;
        rc(x: number, y: number, w: number, h: number, radiusTL: number, radiusTR: number, radiusBR: number, radisBL: number): Graphics;
        ef(): Graphics;
        es(): Graphics;
        lt(x: number, y: number): Graphics;
        mt(x: number, y: number): Graphics;
        qt(cpx: number, cpy: number, x: number, y: number): Graphics;
        r(x: number, y: number, w: number, h: number): Graphics;
        ss(thickness: number, caps?: string | number, joints?: string | number, miterLimit?: number, ignoreScale?: boolean): Graphics;
        sd(segments?: number[], offset?: number): Graphics;
    }


    namespace Graphics
    {
        export class Arc
        {
            constructor(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: number);

            // properties
            anticlockwise: number;
            endAngle: number;
            radius: number;
            startAngle: number;
            x: number;
            y: number;
        }

        export class ArcTo
        {
            constructor(x1: number, y1: number, x2: number, y2: number, radius: number);

            // properties
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            radius: number;
        }

        export class BeginPath
        {

        }

        export class BezierCurveTo
        {
            constructor(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);

            // properties
            cp1x: number;
            cp1y: number;
            cp2x: number;
            cp2y: number;
            x: number;
            y: number;
        }

        export class Circle
        {
            constructor(x: number, y: number, radius: number);

            // properties
            x: number;
            y: number;
            radius: number;
        }

        export class ClosePath
        {

        }

        export class Fill
        {
            constructor(style: Object, matrix?: Matrix2D);

            // properties
            style: Object;
            matrix: Matrix2D;

            // methods
            bitmap(image: HTMLImageElement, repetition?: string): Fill;
            linearGradient(colors: number[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Fill;
            radialGradient(colors: number[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Fill;
        }

        export class LineTo
        {
            constructor(x: number, y: number);

            // properties
            x: number;
            y: number;
        }

        export class MoveTo
        {
            constructor(x: number, y: number);

            x: number;
            y: number;
        }

        export class PolyStar
        {
            constructor(x: number, y: number, radius: number, sides: number, pointSize: number, angle: number);

            // properties
            angle: number;
            pointSize: number;
            radius: number;
            sides: number;
            x: number;
            y: number;
        }

        export class QuadraticCurveTo
        {
            constructor(cpx: number, cpy: number, x: number, y: number);

            // properties
            cpx: number;
            cpy: number;
            x: number;
            y: number;
        }

        export class Rect
        {
            constructor(x: number, y: number, w: number, h: number);

            // properties
            x: number;
            y: number;
            w: number;
            h: number;
        }

        export class RoundRect
        {
            constructor(x: number, y: number, w: number, h: number, radiusTL: number, radiusTR: number, radiusBR: number, radiusBL: number);

            // properties
            x: number;
            y: number;
            w: number;
            h: number;
            radiusTL: number;
            radiusTR: number;
            radiusBR: number;
            radiusBL: number;
        }

        export class Stroke
        {
            constructor(style: Object, ignoreScale: boolean);

            // properties
            style: Object;
            ignoreScale: boolean;

            // methods
            bitmap(image: HTMLImageElement, repetition?: string): Stroke;
            linearGradient(colors: number[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Stroke;
            radialGradient(colors: number[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Stroke;
        }

        export class StrokeStyle
        {
            constructor(width: number, caps: string, joints: number, miterLimit: number);

            // properties
            caps: string;
            joints: string;
            miterLimit: number;
            width: number;
        }

        export class StrokeDash
        {
            constructor(segments:any[], offset:number);

            // properties
            offset: number;
            segments: any[];
        }
    }



    export class Matrix2D {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);

        // properties
        a: number;
        b: number;
        c: number;
        d: number;
        static DEG_TO_RAD: number;
        static identity: Matrix2D;
        tx: number;
        ty: number;

        // methods
        append(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2D;
        appendMatrix(matrix: Matrix2D): Matrix2D;
        appendTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX?: number, regY?: number): Matrix2D;
        clone(): Matrix2D;
        copy(matrix: Matrix2D): Matrix2D;
        decompose(): {x: number; y: number; scaleX: number; scaleY: number; rotation: number; skewX: number; skewY: number};
        decompose(target: Object): Matrix2D;
        equals(matrix: Matrix2D): boolean;
        identity(): Matrix2D;
        invert(): Matrix2D;
        isIdentity(): boolean;
        prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2D;
        prependMatrix(matrix: Matrix2D): Matrix2D;
        prependTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX?: number, regY?: number): Matrix2D;
        rotate(angle: number): Matrix2D;
        scale(x: number, y: number): Matrix2D;
        setValues(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix2D;
        skew(skewX: number, skewY: number): Matrix2D;
        toString(): string;
        transformPoint(x: number, y: number, pt?: Point | Object): Point;
        translate(x: number, y: number): Matrix2D;
    }


    export class MouseEvent extends Event {
        constructor(type: string, bubbles: boolean, cancelable: boolean, stageX: number, stageY: number, nativeEvent: NativeMouseEvent, pointerID: number, primary: boolean, rawX: number, rawY: number);

        // properties
        isTouch: boolean;
        localX: number;
        localY: number;
        nativeEvent: NativeMouseEvent;
        pointerID: number;
        primary: boolean;
        rawX: number;
        rawY: number;
        relatedTarget: DisplayObject;
        stageX: number;
        stageY: number;
        mouseMoveOutside: boolean;

        // methods
        clone(): MouseEvent;

        // EventDispatcher mixins
        addEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): Function;
        addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): Object;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
        dispatchEvent(eventObj: Object | string | Event, target?: Object): boolean;
        hasEventListener(type: string): boolean;
        off(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        off(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        on(type: string, listener: (eventObj: Object) => boolean, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        on(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        removeAllEventListeners(type?: string): void;
        removeEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        toString(): string;
        willTrigger(type: string): boolean;
    }


    export class MovieClip extends Container {
        constructor(mode?: string, startPosition?: number, loop?: boolean, labels?: Object);

        // properties
        actionsEnabled: boolean;
        autoReset: boolean;
        static buildDate: string;
        currentFrame: number;
        totalFrames: number;
        currentLabel: string;
        frameBounds: Rectangle[];
        framerate: number;
        static INDEPENDENT: string;
        labels: Object[];
        loop: boolean;
        mode: string;
        paused: boolean;
        static SINGLE_FRAME: string;
        startPosition: number;
        static SYNCHED: string;
        timeline: Timeline;
        duration: number;
        static version: string;

        // methods
        advance(time?: number): void;
        clone(): MovieClip; // not supported
        /**
         * @deprecated - use 'currentLabel' property instead
         */
        getCurrentLabel(): string;  // deprecated
        /**
         * @deprecated - use 'labels' property instead
         */
        getLabels(): Object[];
        gotoAndPlay(positionOrLabel: string | number): void;
        gotoAndStop(positionOrLabel: string | number): void;
        play(): void;
        stop(): void;
    }

    export class MovieClipPlugin {
        // methods
        tween(tween: Tween, prop: string, value: string | number | boolean, startValues: any[], endValues: any[], ratio: number, wait: Object, end: Object): void;
    }

    export class Point {
        constructor(x?: number, y?: number);

        // properties
        x: number;
        y: number;

        // methods
        clone(): Point;
        copy(point: Point): Point;
        setValues(x?: number, y?: number): Point;
        toString(): string;
    }

    export class Rectangle {
        constructor(x?: number, y?: number, width?: number, height?: number);

        // properties
        height: number;
        width: number;
        x: number;
        y: number;

        // methods
        clone(): Rectangle;
        contains(x: number, y: number, width?: number, height?: number): boolean;
        copy(rectangle: Rectangle): Rectangle;
        extend(x: number, y: number, width?: number, height?: number): Rectangle;
        intersection(rect: Rectangle): Rectangle;
        intersects(rect: Rectangle): boolean;
        isEmpty(): boolean;
        pad(top: number, left: number, bottom: number, right: number): Rectangle;
        setValues(x?: number, y?: number, width?: number, height?: number): Rectangle;
        toString(): string;
        union(rect: Rectangle): Rectangle;
    }


    export class Shadow {
        constructor(color: string, offsetX: number, offsetY: number, blur: number);

        // properties
        blur: number;
        color: string;
        static identity: Shadow;
        offsetX: number;
        offsetY: number;

        // methods
        clone(): Shadow;
        toString(): string;
    }


    export class Shape extends DisplayObject {
        constructor(graphics?: Graphics);

        // properties
        graphics: Graphics;

        // methods
        clone(recursive?: boolean): Shape;
        set(props: Object): Shape;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): Shape;
    }


    export class Sprite extends DisplayObject {
        constructor(spriteSheet: SpriteSheet, frameOrAnimation?: string | number);

        // properties
        currentAnimation: string;
        currentAnimationFrame: number;
        currentFrame: number;
        framerate: number;
        /**
         * @deprecated
         */
        offset: number;
        paused: boolean;
        spriteSheet: SpriteSheet;

        // methods
        advance(time?: number): void;
        clone(): Sprite;
        getBounds(): Rectangle;
        gotoAndPlay(frameOrAnimation: string | number): void;
        gotoAndStop(frameOrAnimation: string | number): void;
        play(): void;
        set(props: Object): Sprite;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): Sprite;
        stop(): void;

    }

    export class SpriteContainer extends Container
    {
        constructor(spriteSheet?: SpriteSheet);

        spriteSheet: SpriteSheet;
    }

    // what is returned from SpriteSheet.getAnimation(string)
    interface SpriteSheetAnimation {
        frames: number[];
        speed: number;
        name: string;
        next: string;
    }

    // what is returned from SpriteSheet.getFrame(number)
    interface SpriteSheetFrame {
        image: HTMLImageElement;
        rect: Rectangle;
    }

    export class SpriteSheet extends EventDispatcher {
        constructor(data: Object);

        // properties
        animations: string[];
        complete: boolean;
        framerate: number;

        // methods
        clone(): SpriteSheet;
        getAnimation(name: string): SpriteSheetAnimation;
        /**
         * @deprecated - use the 'animations' property instead
         */
        getAnimations(): string[];
        getFrame(frameIndex: number): SpriteSheetFrame;
        getFrameBounds(frameIndex: number, rectangle?: Rectangle): Rectangle;
        getNumFrames(animation: string): number;
    }


    export class SpriteSheetBuilder extends EventDispatcher {
        constructor();

        // properties
        maxHeight: number;
        maxWidth: number;
        padding: number;
        progress: number;
        scale: number;
        spriteSheet: SpriteSheet;
        timeSlice: number;

        // methods
        addAnimation(name: string, frames: number[], next?: string|boolean, frequency?: number): void;
        addFrame(source: DisplayObject, sourceRect?: Rectangle, scale?: number, setupFunction?: () => any, setupData?: Object): number;
        addMovieClip(source: MovieClip, sourceRect?: Rectangle, scale?: number, setupFunction?: () => any, setupData?: Object, labelFunction?: () => any): void;
        build(): SpriteSheet;
        buildAsync(timeSlice?: number): void;
        clone(): void; // throw error
        stopAsync(): void;
    }

    export class SpriteSheetUtils {
        /**
         * @deprecated
         */
        static addFlippedFrames(spriteSheet: SpriteSheet, horizontal?: boolean, vertical?: boolean, both?: boolean): void; // deprecated
        static extractFrame(spriteSheet: SpriteSheet, frameOrAnimation: number | string): HTMLImageElement;
        /**
         * @deprecated
         */
        static mergeAlpha(rgbImage: HTMLImageElement, alphaImage: HTMLImageElement, canvas?: HTMLCanvasElement): HTMLCanvasElement; // deprecated
    }

    export class SpriteStage extends Stage
    {
        constructor(canvas: HTMLCanvasElement | string, preserveDrawingBuffer?: boolean, antialias?: boolean);

        // properties
        static INDICES_PER_BOX: number;
        isWebGL: boolean;
        static MAX_BOXES_POINTS_INCREMENT: number;
        static MAX_INDEX_SIZE: number;
        static NUM_VERTEX_PROPERTIES: number;
        static NUM_VERTEX_PROPERTIES_PER_BOX: number;
        static POINTS_PER_BOX: number;

        // methods
        clearImageTexture(image: Object): void;
        updateViewport(width: number, height: number): void;
    }

    export class Stage extends Container {
        constructor(canvas: HTMLCanvasElement | string | Object);

        // properties
        autoClear: boolean;
        canvas: HTMLCanvasElement | Object;
        drawRect: Rectangle;
        handleEvent: Function;
        mouseInBounds: boolean;
        mouseMoveOutside: boolean;
        mouseX: number;
        mouseY: number;
        nextStage: Stage;
        /**
         * @deprecated
         */
        preventSelection: boolean;
        snapToPixelEnabled: boolean;  // deprecated
        tickOnUpdate: boolean;

        // methods
        clear(): void;
        clone(): Stage;
        enableDOMEvents(enable?: boolean): void;
        /**
         * 为舞台的显示列表启用或禁用（通过传递刷新频次数0）鼠标悬停（mouseover和mouseout）和滚动事件（rollover和rollout）。这些事件的性能消耗可能很高，因此在默认情况下会被禁用。可以通过可选的频率参数独立于鼠标移动事件来控制事件的频率。
         * @param frequency 可选参数，指定每秒广播鼠标悬停/退出事件的最大次数。设置为0可完全禁用鼠标悬停事件。最大值为50。较低的频率响应较少，但使用较少的CPU。默认值为20。
         */
        enableMouseOver(frequency?: number): void;
        tick(props?: Object): void;
        toDataURL(backgroundColor: string, mimeType: string): string;
        update(...arg: any[]): void;

    }

    interface IStageGLOptions {
        preserveBuffer?: boolean;
        antialias?: boolean;
        transparent?: boolean;
        premultiply?: boolean;
        autoPurge?: number;
    }

    export class StageGL extends Stage {
        constructor(canvas: HTMLCanvasElement | string | Object, options?: IStageGLOptions);

        // properties
        static VERTEX_PROPERTY_COUNT: number;
        static INDICIES_PER_CARD: number;
        static DEFAULT_MAX_BATCH_SIZE: number;
        static WEBGL_MAX_INDEX_NUM: number;
        static UV_RECT: number;
        static COVER_VERT: Float32Array;
        static COVER_UV: Float32Array;
        static COVER_UV_FLIP: Float32Array;
        static REGULAR_VARYING_HEADER: string;
        static REGULAR_VERTEX_HEADER: string;
        static REGULAR_FRAGMENT_HEADER: string;
        static REGULAR_VERTEX_BODY: string;
        static REGULAR_FRAGMENT_BODY: string;
        static REGULAR_FRAG_COLOR_NORMAL: string;
        static REGULAR_FRAG_COLOR_PREMULTIPLY: string;
        static PARTICLE_VERTEX_BODY: string;
        static PARTICLE_FRAGMENT_BODY: string;
        static COVER_VARYING_HEADER: string;
        static COVER_VERTEX_HEADER: string;
        static COVER_FRAGMENT_HEADER: string;
        static COVER_VERTEX_BODY: string;
        static COVER_FRAGMENT_BODY: string;
        isWebGL: boolean;
        autoPurge: number;
        vocalDebug: boolean;

        // methods
        static buildUVRects(spritesheet: SpriteSheet, target?: number, onlyTarget?: boolean): Object;
        static isWebGLActive(ctx: CanvasRenderingContext2D): boolean;
        cacheDraw(target: DisplayObject, filters: Filter[], manager: BitmapCache): boolean;
        getBaseTexture(w?: number, h?: number): WebGLTexture | null;
        getFilterShader(filter: Filter | Object): WebGLProgram;
        getRenderBufferTexture (w: number, h: number): WebGLTexture;
        getTargetRenderTexture (target: DisplayObject, w: number, h: number): Object;
        protectTextureSlot(id: number, lock?: boolean): void;
        purgeTextures(count?: number): void;
        releaseTexture(item: DisplayObject | WebGLTexture | HTMLImageElement | HTMLCanvasElement): void;
        setTextureParams(gl: WebGLRenderingContext, isPOT?: boolean): void;
        updateSimultaneousTextureCount(count?: number): void;
        updateViewport(width: number, height: number): void;
    }

    /**
     * 显示一行或多行动态文本（不可由用户编辑）。
     * 支持基本的换行（使用lineWidth），仅在空格和制表符上换行。
     * 注意，您可以使用DOMElement将HTML文本显示在canvas的上方或下方，通过localToGlobal方法定位，以此作为输入文本使用。
     * 注意，Text不支持HTML文本，并且一个Text实例只能显示一种字体样式。要使用多种字体样式，您需要创建多个Text实例，并手动定位它们。
     * 如果你是高手，你可以自己封装一个RichText类，哈哈哈！
     * @see http://www.createjs.com/Docs/EaselJS/classes/Text.html
     */
    export class Text extends DisplayObject {
        constructor(text?: string, font?: string, color?: string);

        // properties
        color: string;
        font: string;
        lineHeight: number;
        lineWidth: number;
        maxWidth: number;
        outline: number;
        text: string;
        /** 水平文本对齐方式。"start"、"end"、"left"、"right"和"center"中的任意一个。有关详细信息，请查看whatwg规范。默认值为“left”。 */
        textAlign: string;
        textBaseline: string;

        // methods
        clone(): Text;
        getMeasuredHeight(): number;
        getMeasuredLineHeight(): number;
        getMeasuredWidth(): number;
        getMetrics(): Object;
        set(props: Object): Text;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): Text;
    }

    export class Ticker {
        // properties
        static framerate: number;
        static interval: number;
        static maxDelta: number;
        static paused: boolean;
        static RAF: string;
        static RAF_SYNCHED: string;
        static TIMEOUT: string;
        static timingMode: string;
        /**
         * @deprecated
         */
        static useRAF: boolean;

        // methods
        static getEventTime(runTime?: boolean): number;
        /**
         * @deprecated - use the 'framerate' property instead
         */
        static getFPS(): number;
        /**
         * @deprecated - use the 'interval' property instead
         */
        static getInterval(): number;
        static getMeasuredFPS(ticks?: number): number;
        static getMeasuredTickTime(ticks?: number): number;
        /**
         * @deprecated - use the 'paused' property instead
         */
        static getPaused(): boolean;
        static getTicks(pauseable?: boolean): number;
        static getTime(runTime?: boolean): number;
        static init(): void;
        static reset(): void;
        /**
         * @deprecated - use the 'framerate' property instead
         */
        static setFPS(value: number): void;
        /**
         * @deprecated - use the 'interval' property instead
         */
        static setInterval(interval: number): void;
        /**
         * @deprecated - use the 'paused' property instead
         */
        static setPaused(value: boolean): void;

        // EventDispatcher mixins
        static addEventListener(type: string, listener: Stage, useCapture?: boolean): Stage;
        static addEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): Function;
        static addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
        static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): Object;
        static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
        static dispatchEvent(eventObj: Object | string | Event, target?: Object): boolean;
        static hasEventListener(type: string): boolean;
        static off(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        static off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        static off(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        static off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        static off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        static on(type: string, listener: (eventObj: Object) => boolean, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        static on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        static on(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        static on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        static removeAllEventListeners(type?: string): void;
        static removeEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        static toString(): string;
        static willTrigger(type: string): boolean;
    }

    export class TickerEvent {
        // properties
        target: Object;
        type: string;
        paused: boolean;
        delta: number;
        time: number;
        runTime: number;
    }

    export class Touch {
        // methods
        static disable(stage: Stage): void;
        static enable(stage: Stage, singleTouch?: boolean, allowDefault?: boolean): boolean;
        static isSupported(): boolean;
    }

    export class UID {
        // methods
        static get(): number;
    }

    export class CSSPlugin {
        constructor();

        // properties
        static cssSuffixMap: Object;

        // methods
        static install(): void;
    }

    export class Ease {
        // methods
        static backIn: (amount: number) => number;
        static backInOut: (amount: number) => number;
        static backOut: (amount: number) => number;
        static bounceIn: (amount: number) => number;
        static bounceInOut: (amount: number) => number;
        static bounceOut: (amount: number) => number;
        static circIn: (amount: number) => number;
        static circInOut: (amount: number) => number;
        static circOut: (amount: number) => number;
        static cubicIn: (amount: number) => number;
        static cubicInOut: (amount: number) => number;
        static cubicOut: (amount: number) => number;
        static elasticIn: (amount: number) => number;
        static elasticInOut: (amount: number) => number;
        static elasticOut: (amount: number) => number;
        static get(amount: number): (amount: number) => number;
        static getBackIn(amount: number): (amount: number) => number;
        static getBackInOut(amount: number): (amount: number) => number;
        static getBackOut(amount: number): (amount: number) => number;
        static getElasticIn(amplitude: number, period: number): (amount: number) => number;
        static getElasticInOut(amplitude: number, period: number): (amount: number) => number;
        static getElasticOut(amplitude: number, period: number): (amount: number) => number;
        static getPowIn(pow: number): (amount: number) => number;
        static getPowInOut(pow: number): (amount: number) => number;
        static getPowOut(pow: number): (amount: number) => number;
        static linear: (amount: number) => number;
        static none: (amount: number) => number;    // same as linear
        static quadIn: (amount: number) => number;
        static quadInOut: (amount: number) => number;
        static quadOut: (amount: number) => number;
        static quartIn: (amount: number) => number;
        static quartInOut: (amount: number) => number;
        static quartOut: (amount: number) => number;
        static quintIn: (amount: number) => number;
        static quintInOut: (amount: number) => number;
        static quintOut: (amount: number) => number;
        static sineIn: (amount: number) => number;
        static sineInOut: (amount: number) => number;
        static sineOut: (amount: number) => number;
    }

    export class MotionGuidePlugin {
        constructor();

        //methods
        static install(): Object;
    }

    /*
        NOTE: It is commented out because it conflicts with SamplePlugin Class of PreloadJS.
              this class is mainly for documentation purposes.
        http://www.createjs.com/Docs/TweenJS/classes/SamplePlugin.html
    */
    /*
    export class SamplePlugin {
        constructor();

        // properties
        static priority: any;

        //methods
        static init(tween: Tween, prop: string, value: any): any;
        static step(tween: Tween, prop: string, startValue: any, injectProps: Object, endValue: any): void;
        static install(): void;
        static tween(tween: Tween, prop: string, value: any, startValues: Object, endValues: Object, ratio: number, wait: boolean, end: boolean): any;
    }
    */

    export class Timeline extends EventDispatcher {
        constructor (tweens: Tween[], labels: Object, props: Object);

        // properties
        duration: number;
        ignoreGlobalPause: boolean;
        loop: boolean;
        position: Object;

        // methods
        addLabel(label: string, position: number): void;
        addTween(...tween: Tween[]): void;
        getCurrentLabel(): string;
        getLabels(): Object[];
        gotoAndPlay(positionOrLabel: string | number): void;
        gotoAndStop(positionOrLabel: string | number): void;
        removeTween(...tween: Tween[]): void;
        resolve(positionOrLabel: string | number): number;
        setLabels(o: Object): void;
        setPaused(value: boolean): void;
        setPosition(value: number, actionsMode?: number): boolean;
        tick(delta: number): void;
        updateDuration(): void;
    }


    export class Tween extends EventDispatcher {
        constructor(target: Object, props?: Object, pluginData?: Object);

        // properties
        duration: number;
        static IGNORE: Object;
        ignoreGlobalPause: boolean;
        static LOOP: number;
        loop: boolean;
        static NONE: number;
        onChange: Function; // deprecated
        passive: boolean;
        pluginData: Object;
        position: number;
        static REVERSE: number;
        target: Object;

        // methods
        call(callback: (tweenObject: Tween) => any, params?: any[], scope?: Object): Tween;    // when 'params' isn't given, the callback receives a tweenObject
        call(callback: (...params: any[]) => any, params?: any[], scope?: Object): Tween; // otherwise, it receives the params only
        static get(target: Object, props?: Object, pluginData?: Object, override?: boolean): Tween;
        static hasActiveTweens(target?: Object): boolean;
        static installPlugin(plugin: Object, properties: any[]): void;
        pause(tween: Tween): Tween;
        play(tween: Tween): Tween;
        static removeAllTweens(): void;
        static removeTweens(target: Object): void;
        set(props: Object, target?: Object): Tween;
        setPaused(value: boolean): Tween;
        setPosition(value: number, actionsMode: number): boolean;
        static tick(delta: number, paused: boolean): void;
        tick(delta: number): void;
        to(props: Object, duration?: number, ease?: (t: number) => number): Tween;
        wait(duration: number, passive?: boolean): Tween;

    }

    export class TweenJS {
        // properties
        static buildDate: string;
        static version: string;
    }
    export class AbstractLoader extends EventDispatcher {
        // properties
        static BINARY: string;
        canceled: boolean;
        static CSS: string;
        static GET: string;
        static IMAGE: string;
        static JAVASCRIPT: string;
        static JSON: string;
        static JSONP: string;
        loaded: boolean;
        static MANIFEST: string;
        static POST: string;
        progress: number;
        resultFormatter: () => any;
        static SOUND: string;
        static SPRITESHEET: string;
        static SVG: string;
        static TEXT: string;
        type: string;
        static VIDEO: string;
        static XML: string;

        // methods
        cancel(): void;
        destroy(): void;
        getItem(value?: string): Object;
        getLoadedItems(): Object[];
        /**
         * 通过id获取资源。
         * 注意：如果加载项中没有提供“id”，则将“src”当作id使用（且不含basePath）。
         * @param value 资源id
         * @param rawResult true返回原始数据，false格式化数据，适用于通过XHR加载的内容，如脚本、XML、CSS和图像。如果没有原始数据，则将返回格式化数据。
         * @returns 返回已经加载的资源。该资源包含如下类型：
         * 1. 对于图像，返回HTMLImageElement。
         * 2. JavaScript的脚本（＜script/＞）。请注意，脚本会自动添加到HTMLDOM中。
         * 3. CSS的样式（＜style/＞或＜link＞）
         * 4. text的原始文本
         * 5. 对于JSON，返回Object。
         * 6. 对于XML，返回XMLDocument。
         * 7. XHR加载的二进制数组缓冲区。
         * 8. 对于声音，返回HTMLAudioElement。注意，建议使用SoundJS API来播放加载的音频。具体来说，Flash和WebAudio加载的音频将使用此方法返回一个加载器对象，该对象不能用于播放音频。
         */
        getResult(value?: any, rawResult?: boolean): Object;
        getTag(): Object;
        /**
         * 开始加载资源。
         */
        load(): void;
        setTag(tag: Object): void;
        toString(): string;
    }

    export class AbstractMediaLoader
    {
        constructor(loadItem: Object, preferXHR: boolean, type: string);
    }

    export class AbstractRequest
    {
        constructor(item: LoadItem);

        cancel(): void;
        destroy(): void;
        load(): void;
    }

    export class BinaryLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        // methods
        static canLoadItem(item: Object): boolean;
    }

    export class CSSLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        // methods
        canLoadItem(item: Object): boolean;
    }

    export module DataUtils
    {
        export function parseJSON(value: string): Object;
        export function parseXML(text: string, type: string): XMLDocument;
    }

    export class ErrorEvent
    {
        constructor(title?: string, message?: string, data?: Object);

        // properties
        data: Object;
        message: string;
        title: string;
    }

    export class ImageLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        static canLoadItem(item: Object): boolean;
    }

    export class JavaScriptLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        static canLoadItem(item: Object): boolean;
    }

    export class JSONLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        static canLoadItem(item: Object): boolean;
    }

    export class JSONPLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        static canLoadItem(item: Object): boolean;
    }

    export class LoadItem
    {
        // properties
        callback: string;
        crossOrigin: boolean;
        data: Object;
        headers: Object;
        id: string;
        loadTimeout: number;
        maintainOrder: boolean;
        method: string;
        mimeType: string;
        src: string;
        type: string;
        values: Object;
        withCredentials: boolean;

        // methods
        static create(value: LoadItem | string | Object): Object | LoadItem;
        set(props: Object): LoadItem;
    }

    export class LoadQueue extends AbstractLoader
    {
        constructor(preferXHR?: boolean, basePath?: string, crossOrigin?: string | boolean);

        // properties
        maintainScriptOrder: boolean;
        next: LoadQueue;
        stopOnError: boolean;

        // methods
        close(): void;
        getItems(loaded: boolean): Object[];
        installPlugin(plugin: any): void;
        loadFile(file: Object | string, loadNow?: boolean, basePath?: string): void;
        loadManifest(manifest: Object | string | any[], loadNow?: boolean, basePath?: string): void;
        registerLoader(loader: AbstractLoader): void;
        remove(idsOrUrls: string | any[]): void;
        removeAll(): void;
        reset(): void;
        setMaxConnections(value: number): void;
        setPaused(value: boolean): void;
        setPreferXHR(value: boolean): boolean;
        /**
         * @deprecated - use 'preferXHR' property instead (or setUseXHR())
         */
        setUseXHR(value: boolean): void;
        unregisterLoader(loader: AbstractLoader): void;
    }

    export class ManifestLoader extends AbstractLoader
    {
        constructor(loadItem: LoadItem | Object);

        // methods
        static canLoadItem(item: LoadItem | Object): boolean;
    }

    export class MediaTagRequest
    {
        constructor(loadItem: LoadItem, tag: HTMLAudioElement | HTMLVideoElement, srcAttribute: string);
    }

    export class PreloadJS
    {
        static buildDate: string;
        static version: string;
    }

    export class ProgressEvent
    {
        constructor(loaded: number, total?: number);

        // properties
        loaded: number;
        progress: number;
        total: number;

        // methods
        clone(): ProgressEvent;
    }
    /**
     * 帮助解析加载项和确定文件类型等。
     */
    export class RequestUtils
    {
        // properties
        static ABSOLUTE_PATH: RegExp;
        static EXTENSION_PATT: RegExp;
        static RELATIVE_PATH: RegExp;

        // methods
        static buildPath(src: string, data?: Object): string;
        static formatQueryString(data: Object, query?: Object[]): string;
        /**
         * 使用通用扩展确定对象的类型。请注意，如果类型是不寻常的扩展，则可以将其与加载项一起传入。
         * @param extension 用于确定加载类型的文件扩展名。
         */
        static getTypeByExtension(extension: string): string;
        static isAudioTag(item: Object): boolean;
        /**
         * 确定是否应将特定类型加载为二进制文件。目前，只有专门标记为“二进制”的图像和项目才加载为二进制。请注意，音频不是二进制类型，因为如果加载为二进制，则无法使用音频标签进行回放。插件可以将项类型更改为二进制，以确保获得可使用的二进制结果。二进制文件是使用XHR2加载的。类型在AbstractLoader上定义为静态常量。
         * @param type 加载项类型
         */
        static isBinary(type: string): boolean;
        static isCrossDomain(item: Object): boolean;
        static isImageTag(item: Object): boolean;
        static isLocal(item: Object): boolean;
        /**
         * 确定特定类型是否是基于文本的资源，并且应以UTF-8加载。
         * @param type 加载项类型
         */
        static isText(type: string): boolean;
        static isVideoTag(item: Object): boolean;
        static parseURI(path: string): Object;
    }

    export class SoundLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        static canLoadItem(item: Object): boolean;
    }

    export class SpriteSheetLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        static canLoadItem(item: Object): boolean;
    }

    export class SVGLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        static canLoadItem(item: Object): boolean;
    }

    export class TagRequest
    {

    }

    export class TextLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        static canLoadItem(item: Object): boolean;
    }

    export class VideoLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        static canLoadItem(item: Object): boolean;
    }

    export class XHRRequest extends AbstractLoader
    {
        constructor(item: Object);

        // methods
        getAllResponseHeaders(): string;
        getResponseHeader(header: string): string;
    }

    export class XMLLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        static canLoadItem(item: Object): boolean;
    }
    export class AbstractPlugin
    {
        // methods
        create(src: string, startTime: number, duration: number): AbstractSoundInstance;
        getVolume(): number;
        isPreloadComplete(src: string): boolean;
        isPreloadStarted(src: string): boolean;
        isSupported(): boolean;
        preload(loader: Object): void;
        register(loadItem: string, instances: number): Object;
        removeAllSounds(src: string): void;
        removeSound(src: string): void;
        setMute(value: boolean): boolean;
        setVolume(value: number): boolean;
    }

    export class AbstractSoundInstance extends EventDispatcher
    {
        constructor(src: string, startTime: number, duration: number, playbackResource: Object);

        // properties
        duration: number;
        loop: number;
        muted: boolean;
        pan: number;
        paused: boolean;
        playbackResource: Object;
        playState: string;
        position: number;
        src: string;
        uniqueId: number | string;
        volume: number;

        // methods
        destroy(): void;
        getDuration(): number;
        getLoop(): number;
        getMute(): boolean;
        getPan(): number;
        getPaused(): boolean;
        getPosition(): number;
        getVolume(): number;
        play(interrupt?: string | Object, delay?: number, offset?: number, loop?: number, volume?: number, pan?: number): AbstractSoundInstance;
        setDuration(value: number): AbstractSoundInstance;
        setLoop(value: number): void;
        setMute(value: boolean): AbstractSoundInstance;
        setPan(value: number): AbstractSoundInstance;
        setPlayback(value: Object): AbstractSoundInstance;
        setPosition(value: number): AbstractSoundInstance;
        setVolume(value: number): AbstractSoundInstance;
        stop(): AbstractSoundInstance;
    }

    export class FlashAudioLoader extends AbstractLoader
    {
        // properties
        flashId: string;

        // methods
        setFlash(flash: Object): void;
    }

    export class FlashAudioPlugin extends AbstractPlugin
    {
        // properties
        flashReady: boolean;
        showOutput: boolean;
        static swfPath: string;

        // methods
        static isSupported(): boolean;
    }

    export class FlashAudioSoundInstance extends AbstractSoundInstance
    {
        constructor(src: string, startTime: number, duration: number, playbackResource: Object);
    }

    /**
     * @deprecated - use FlashAudioPlugin
     */
    export class FlashPlugin {
        constructor();

        // properties
        static buildDate: string;
        flashReady: boolean;
        showOutput: boolean;
        static swfPath: string;
        static version: string;

        // methods
        create(src: string): AbstractSoundInstance;
        getVolume(): number;
        isPreloadStarted(src: string): boolean;
        static isSupported(): boolean;
        preload(src: string, instance: Object): void;
        register(src: string, instances: number): Object;
        removeAllSounds (): void;
        removeSound(src: string): void;
        setMute(value: boolean): boolean;
        setVolume(value: number): boolean;
    }

    export class HTMLAudioPlugin extends AbstractPlugin
    {
        constructor();

        // properties
        defaultNumChannels: number;
        enableIOS: boolean;     // deprecated
        static MAX_INSTANCES: number;

        // methods
        static isSupported(): boolean;
    }

    export class HTMLAudioSoundInstance extends AbstractSoundInstance
    {
        constructor(src: string, startTime: number, duration: number, playbackResource: Object);
    }

    export class HTMLAudioTagPool
    {

    }

    export class PlayPropsConfig
    {
        delay:number;
        duration:number;
        interrupt:string;
        loop:number;
        offset:number;
        pan:number;
        startTime:number;
        volume:number;
        static create( value:PlayPropsConfig|any ): PlayPropsConfig;
        set ( props:any ): PlayPropsConfig;
    }

    export class Sound extends EventDispatcher
    {
        // properties
        static activePlugin: Object;
        static alternateExtensions: any[];
        static defaultInterruptBehavior: string;
        static EXTENSION_MAP: Object;
        static INTERRUPT_ANY: string;
        static INTERRUPT_EARLY: string;
        static INTERRUPT_LATE: string;
        static INTERRUPT_NONE: string;
        static PLAY_FAILED: string;
        static PLAY_FINISHED: string;
        static PLAY_INITED: string;
        static PLAY_INTERRUPTED: string;
        static PLAY_SUCCEEDED: string;
        static SUPPORTED_EXTENSIONS: string[];
        static muted: boolean;
        static volume: number;
        static capabilities: any;

        // methods
        static createInstance(src: string): AbstractSoundInstance;
        static getCapabilities(): Object;
        static getCapability(key: string): number | boolean;
        static getMute(): boolean;
        static getVolume(): number;
        static initializeDefaultPlugins(): boolean;
        static isReady(): boolean;
        static loadComplete(src: string): boolean;
        static play(src: string, interrupt?: any, delay?: number, offset?: number, loop?: number, volume?: number, pan?: number): AbstractSoundInstance;
        static registerManifest(manifest: Object[], basePath: string): Object;
        static registerPlugins(plugins: any[]): boolean;
        static registerSound(src: string | Object, id?: string, data?: number | Object, basePath?: string): Object;
        static registerSounds(sounds: Object[], basePath?: string): Object[];
        static removeAllSounds(): void;
        static removeManifest(manifest: any[], basePath: string): Object;
        static removeSound(src: string | Object, basePath: string): boolean;
        static setMute(value: boolean): boolean;
        static setVolume(value: number): void;
        static stop(): void;

        // EventDispatcher mixins
        static addEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): Function;
        static addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
        static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): Object;
        static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
        static dispatchEvent(eventObj: Object | string | Event, target?: Object): boolean;
        static hasEventListener(type: string): boolean;
        static off(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        static off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        static off(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        static off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        static off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        static on(type: string, listener: (eventObj: Object) => boolean, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        static on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        static on(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        static on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        static removeAllEventListeners(type?: string): void;
        static removeEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        static toString(): string;
        static willTrigger(type: string): boolean;
    }

    export class SoundJS {
        static buildDate: string;
        static version: string;
    }

    export class WebAudioLoader
    {
        static context: AudioContext;
    }

    export class WebAudioPlugin extends AbstractPlugin
    {
        constructor();

        // properties
        static context: AudioContext;
        context: AudioContext;
        dynamicsCompressorNode: DynamicsCompressorNode;
        gainNode: GainNode;

        // methods
        static isSupported(): boolean;
        static playEmptySound(): void;
    }

    export class WebAudioSoundInstance extends AbstractSoundInstance
    {
        constructor(src: string, startTime: number, duration: number, playbackResource: Object);

        // properties
        static context: AudioContext;
        static destinationNode: AudioNode;
        gainNode: GainNode;
        panNode: PannerNode;
        sourceNode: AudioNode;
    }
}

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


interface NativeMouseEvent extends MouseEvent {

}

declare namespace createjs {
    /**
     * 包含所有事件共享的属性和方法，以便与{@link EventDispatcher}一起使用。
     * 请注意，事件对象经常被重用，因此您永远不应该依赖于事件对象在调用堆栈之外的状态。
     */
    class Event {
        /**
         * 
         * @param type 事件类型。例如，Event.COMPLETE
         * @param bubbles 指示事件是否会在显示列表中冒泡。
         * @param cancelable 指示是否可以取消此事件的默认行为。
         */
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
        /**
         * 返回Event实例的克隆。
         * @returns Event实例的克隆。
         */
        clone(): Event;
        /**
         * 如果事件可取消，则将{@link defaultPrevented}设置为true。反映DOM2事件标准。一般来说，如果事件可取消，则调用preventDefault()将取消与该事件关联的默认行为。
         */
        preventDefault(): void;
        /**
         * 通过removeEventListener();删除活动监听器
         * ```js
         * myBtn.addEventListener("click", function(evt) {
         *     // do stuff...
         *     evt.remove(); // 删除此侦听器。
         * });
         * ```
         */
        remove(): void;
        /**
         * 提供一种可链接的快捷方式，用于在实例上设置多个属性。
         * @param props 包含要复制到实例的属性的通用对象。
         * @returns 返回方法被调用的实例（对于链式调用很有用。）
         */
        set(props: Object): Event;
        /**
         * 将{@link propagationStopped}和{@link immediatePropagationStopped}设置为true。反映DOM事件标准。
         */
        stopImmediatePropagation(): void;
        /**
         * 将{@link propagationStopped}设置为true。反映DOM事件标准。
         */
        stopPropagation(): void;
        /**
         * 返回此对象的字符串表示形式。
         * @returns 实例的字符串表示。
         */
        toString(): string;
    }
    /**
     * EventDispatcher提供了管理事件侦听器队列和分发事件的方法。
     * 
     * 您可以扩展EventDispatcher，也可以使用EventDispatcher的{@link initialize}方法将其方法混合到现有的原型或实例中。
     * 
     * EventDispatcher与CreateJS Event类一起提供了一个基于DOM Level 2事件模型的扩展事件模型，包括addEventListener、removeEventListener和dispatchEvent。它支持冒泡/捕获、preventDefault, stopPropagation, stopImmediatePropagation和handleEvent。
     * 
     * EventDispatcher还公开了一个{@link on}方法，这使得创建作用域监听器、只运行一次的监听器以及具有相关任意数据的监听器变得更加容易。{@link off}方法只是removeEventListener的别名。
     * 
     * DOM Level 2模型的另一个补充是{@link removeAllEventListener}方法，该方法可用于所有事件的监听器，或特定事件的监听器。Event对象还包括一个{@link remove}方法，用于删除活动侦听器。
     * 
     * Example
     * 
     * 将EventDispatcher功能添加到“MyClass”类中。
     * ```js
     * EventDispatcher.initialize(MyClass.prototype);
     * ```
     * 添加事件（请参阅{@link addEventListener}）。
     * ```js
     * instance.addEventListener("eventName", handlerMethod);
     * function handlerMethod(event) {
     *     console.log(event.target + " Was Clicked");
     * }
     * ```
     * 保持适当的范围
     * 
     * Scope (ie. "this")对事件来说可能是一个挑战。使用{@link on}方法监听事件简化了这一过程。
     * ```js
     * instance.addEventListener("click", function(event) {
     *     console.log(instance == this); // false, scope is ambiguous.
     * });
     *
     * instance.on("click", function(event) {
     *     console.log(instance == this); // true, "on" uses dispatcher scope by default.
     * });
     * ```
     * 如果你想使用addEventListener，你可能想使用function.bind()或类似的代理来管理作用域。
     * 
     * 浏览器支持CreateJS中的事件模型可以在任何项目中与套件分开使用，但是继承模型需要现代浏览器（IE9+）。
     */
    class EventDispatcher {
        constructor()
        // methods
        /**
         * 添加指定的事件侦听器。请注意，向同一个对象添加多个监听器将导致多个监听器被触发。
         * 
         * 案例：
         * ```js
         * displayObject.addEventListener("click", handleClick);
         * function handleClick(event) {
         *     // Click happened.
         * }
         * ```
         * @param type 事件的字符串类型。
         * @param listener 具有handleEvent方法的对象，或在事件被分派时将被调用的函数。
         * @param useCapture 对于冒泡的事件，指示是在捕获阶段还是冒泡/目标阶段监听事件。
         * @returns 返回用于链接或赋值的侦听器。
         */
        addEventListener(type: string, listener: (eventObj: Object) => void|boolean, useCapture?: boolean): Function|Object
        //addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void|boolean}, useCapture?: boolean): Object
        //addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
        addEventListener(type: string, listener: (e?:Event|any) => void, useCapture?: boolean): ()=>{}
        //addEventListener(type: string, listener: (e?:any) => void, useCapture?: boolean): ()=>{}
        /**
         * 将指定的事件分派给所有侦听器。
         * @param eventObj 具有“type”属性或字符串类型的对象。虽然通用对象可以工作，但建议使用CreateJS事件实例。如果使用了字符串，dispatchEvent将在必要时使用指定的类型构造一个Event实例。后一种方法可以用于避免可能没有任何侦听器的非冒泡事件的事件对象实例化。
         * @param bubbles 指定将字符串传递给eventObj时的气泡值。
         * @param cancelable 指定将字符串传递给eventObj时可取消的值。
         * @returns 如果对可取消事件调用了preventDefault()，则返回false，否则返回true。
         */
        dispatchEvent(eventObj: Object|string|Event, target?: Object): boolean;
        /*dispatchEvent(eventObj: string, target?: Object): boolean;
        dispatchEvent(eventObj: Event, target?: Object): boolean;*/
        /**
         * 指定事件类型是否至少有一个侦听器。
         * @param type 事件类型
         * @returns 如果指定事件至少有一个侦听器，则返回true。
         */
        hasEventListener(type: string): boolean;
        /**
         * 静态初始化方法，用于将EventDispatcher方法混合到目标对象或原型中。
         * ```js
         * EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
         * EventDispatcher.initialize(myObject); // add to a specific instance
         * ```
         * @param target 将EventDispatcher方法注入的目标对象。这可以是实例或原型。
         */
        static initialize(target: Object): void;
        off(type: string, listener: (eventObj: Object) => boolean|void, useCapture?: boolean): void;
        //off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        off(type: string, listener: { handleEvent: (eventObj: Object) => boolean|void; }, useCapture?: boolean): void;
        //off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        off<T extends Event = Event>(type: string, listener: Function|((eventObj?: T)=>void), useCapture?: boolean): void;
        /**
         * 一种使用addEventListener的快捷方法，可以更容易地指定执行范围，使侦听器只运行一次，将任意数据与侦听器相关联，并删除侦听器。
         * 
         * 此方法通过创建匿名包装器函数并使用addEventListener订阅它来工作。返回包装器函数以与removeEventListener一起使用（或关闭）。
         * 
         * 重要提示：要删除添加了on的侦听器，您必须将返回的包装器函数作为侦听器传递，或使用remove。同样，每次调用NEW包装器函数时，都会订阅，因此使用相同参数对on的多次调用将创建多个侦听器。
         * 
         * 案例：
         * ```js
         * var listener = myBtn.on("click", handleClick, null, false, {count:3});
         * function handleClick(evt, data) {
         *     data.count -= 1;
         *     console.log(this == myBtn); // true - scope defaults to the dispatcher
         *     if (data.count == 0) {
         *         alert("clicked 3 times!");
         *         myBtn.off("click", listener);
         *         // alternately: evt.remove();
         *     }
         * }
         * ```
         * @param type 事件类型
         * @param listener 侦听器
         * @param scope 执行侦听器的作用域。对于函数侦听器，默认为dispatcher/currentTarget，对于对象侦听器，则默认为侦听器本身（即使用handleEvent）。直白点说就是this指向谁，默认是指向侦听器自身。
         * @param once 是否仅执行一次侦听器
         * @param data 传参
         * @param useCapture 
         */
        on(type: string, listener: (eventObj: Object) => boolean|void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        //on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        on(type: string, listener: { handleEvent: (eventObj: Object) => boolean|void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        //on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        on(type: string, listener:(eventObj: any)=>void, scope?: any, once?: boolean, data?: any, useCapture?: boolean):void;
        on<T extends Event = Event>(type: string, listener: Function|((eventObj?: T)=>void|boolean), scope?: any, once?: boolean, data?: any, useCapture?: boolean):Function|((eventObj?: T)=>void);
        /**
         * 删除指定类型的所有侦听器，或所有类型的所有监听器。
         * 
         * 案例：
         * ```js
         * // Remove all listeners
         * displayObject.removeAllEventListeners();
         * 
         * // Remove all click listeners
         * displayObject.removeAllEventListeners("click");
         * ```
         * @param type 事件类型
         */
        removeAllEventListeners(type?: string): void;
        /**
         * 删除指定的事件侦听器。
         * 
         * 重要提示：您必须传递添加事件时使用的确切函数引用。如果使用代理函数或函数闭包作为回调，则必须使用代理/闭包引用——新的代理或闭包将无法工作。
         * 
         * 案例：
         * ```js
         * displayObject.removeEventListener("click", handleClick);
         * ```
         * @param type 事件类型
         * @param listener 监听器函数或对象。
         * @param useCapture 对于冒泡的事件，指示是在捕获阶段还是冒泡/目标阶段监听事件。
         */
        removeEventListener(type: string, listener: (eventObj: Object) => boolean|void, useCapture?: boolean): void;
        //removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean|void; }, useCapture?: boolean): void;
        //removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        /**
         * @returns 实例的字符串表示。
         */
        toString(): string;
        /**
         * 指示此对象或其任何祖先（父级、父级的父级等）上是否至少有一个指定事件类型的侦听器。
         * 返回值true表示，如果从该对象分派指定类型的冒泡事件，它将触发至少一个侦听器。
         * 
         * 这类似于{@link hasEventListener}，但它在整个事件流中搜索侦听器，而不仅仅是这个对象。
         * @param type 事件类型
         * @returns 如果指定事件至少有一个侦听器，则返回true。
         */
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
     * 通过创建格式为prefix_methodName的别名，提升超类上被重写的任何方法。建议使用超类的名称作为前缀。超类的构造函数的别名总是以前缀_构造函数的格式添加。
     * 这允许子类在不使用function.call的情况下调用超类方法，从而提供更好的性能。
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
    class AlphaMapFilter extends Filter {
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
     * 将遮罩图像（或画布）中的alpha应用于目标，这样结果的alpha通道将从遮罩中导出，而RGB通道将从目标中复制。例如，这可以用于将alpha掩码应用于显示对象。
     * 这也可以用于将JPG压缩的RGB图像与PNG32 alpha掩码组合，这可以导致比包含RGB的单个PNG32小得多的文件大小。
     */
    class AlphaMaskFilter extends Filter {
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
     * 
     * 举个栗子
     * ```js
     * var bitmap = new createjs.Bitmap("imagePath.jpg");
     * ```
     * 注意事项：
     * 
     * 1.当使用可能循环或查找的视频源时，请使用{@link VideoBuffer}对象以防止闪烁/闪烁。
     * 
     * 2.当使用的图像或者img标签尚未加载时，在图像加载完成后，stage需要重绘才能显示该图像。
     * 
     * 3.具有SVG源的位图当前不考虑0或1以外的alpha值。要解决此问题，可以缓存位图。
     * 
     * 4.带有SVG源的位图会用跨源数据污染画布，这会阻止交互性。除最近的Firefox版本外，所有浏览器都会出现这种情况。
     * 
     * 5.对于跨源加载的图像，如果使用鼠标交互、使用 getObjectUnderPoint等方法、应用滤镜或者缓存时会抛出cross-origin security报错。
     * 你可以通过在将图像传递给EaselJS之前设置img标签的 crossOrigin 属性来解决这个问题，例如：img.crossOrigin="Anonymous";
     */
    class Bitmap extends DisplayObject {
        /**
         * 要显示的源图像。这可以是CanvasImageSource (image, video, canvas)、具有返回CanvasImageSourcean的getImage方法的对象或图像的字符串URL。
         * 如果是后者，将使用URL作为其src的新图像实例。
         * @param imageOrUrl 
         */
        constructor(imageOrUrl?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | Object | string);

        // properties

        /**
         * 要显示的源图像。这可以是CanvasImageSource（图像、视频、画布）、具有返回CanvasImage源的getImage方法的对象或图像的字符串URL。
         * 如果是后者，将使用URL作为其src的新图像实例。
         */
        image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
        /**
         * 指定要绘制的源图像的区域。如果省略，将绘制整个图像。
         * 
         * 注意：
         * 
         * 1.视频源必须设置宽度/高度才能正确使用sourceRect
         * 
         * 2.缓存对象将忽略sourceRect属性
         */
        sourceRect: Rectangle;

        // methods
        clone(): Bitmap;
    }
    /**
     * BitmapCache类集成了“缓存”对象所需的所有缓存属性和逻辑，它将{@link DisplayObject}对象渲染为位图。
     * 此信息和功能曾经位于DisplayObject中的缓存方法上，但被移动到了BitmapCache类中。
     * 
     * 在这种情况下，缓存纯粹是视觉上的，它会将DisplayObject渲染成一个图像来使用，而不是对象。
     * 实际缓存本身仍然与{@link cacheCanvas}一起存储在目标上。{@link Bitmap}对象执行缓存几乎没有好处，因为它已经是单个图像了。
     * 如果容器包含多个复杂且不经常移动的内容，使用缓存渲染图像将提高整体渲染速度。
     * 缓存不会自动更新，除非调用{@link cache}方法。如果缓存像Stage一样每帧更新一次，则可能无法提高渲染性能。
     * 当对象的内容变化频率很低时（画面长时间静止），最好使用缓存。
     * 
     * 缓存也是应用滤镜的必要条件。当滤镜不改变时，直接使用缓存显示，不需要每帧渲染。
     * BitmapCache还负责对对象应用过滤器，并根据这种关系读取每个{@link Filter}。在处理Context2D画布时，不建议使用实时过滤器。
     * 为了获得最佳性能并仍然允许一些视觉效果，请在可能的情况下使用compositeOperation。
     */
    class BitmapCache {
        constructor();

        // properties
        /** 跟踪缓存已更新的次数，主要用于防止重复的cacheURL。这对于查看缓存是否已更新非常有用。 */
        cacheID: number;

        // methods
        /**
         * 返回围绕所有应用的滤镜的边界，依赖于每个滤镜来描述它如何更改边界。
         * @param target 要检查其滤镜边界的对象。
         * @param output 可选参数，如果提供，则计算的边界将应用于该对象。
         */
        static getFilterBounds(target: DisplayObject, output?: Rectangle): Rectangle;
        /**
         * 返回此对象的字符串表示形式。
         */
        toString(): string;
        /**
         * 实际上创建了正确的缓存表面和与之相关的属性。缓存函数和这个类描述讨论了{@link cache}及其好处。以下是如何使用options对象的详细细节。
         * 
         * 1.如果options.useGL设置为"new"，则会创建一个StageGL并将其包含在其中，以便在渲染缓存时使用。
         * 
         * 2.如果options.useGL设置为"stage"，如果当前stage是StageGL，则将使用它。如果没有，它将默认为"new"。
         * 
         * 3.如果options.useGL是StageGL实例，它不会创建一个实例，而是使用提供的实例。
         * 
         * 4.如果options.useGL为undefined，将执行上下文2D缓存。
         * 
         * 这意味着您可以使用StageGL和2D的任何组合，其中一个、两个或两个阶段和缓存都是WebGL。在StageGL显示列表中使用"new"是非常不受欢迎的，但仍然是一种选择。
         * 由于负面性能原因和上述类别复杂性中提到的图像加载限制，应避免使用。
         * 
         * 当“options.useGL”设置为目标和WebGL的父阶段时，通过使用"RenderTextures"而不是画布元素来提高性能。这些是存储在GPU中的图形卡上的内部纹理。
         * 因为它们不再是画布，所以无法执行常规画布所能执行的操作。这样做的好处是避免了将纹理从GPU来回复制到Canvas元素的速度减慢。这意味着“阶段”是可用的推荐选项。
         * 
         * StageGL缓存不会推断绘制StageGL当前无法绘制的对象的能力，即在缓存形状、文本等时不要使用WebGL上下文缓存。
         * 
         * 具有2D上下文的WebGL缓存
         * ```js
         * var stage = new createjs.Stage();
         * var bmp = new createjs.Bitmap(src);
         * bmp.cache(0, 0, bmp.width, bmp.height, 1, {gl: "new"});          // no StageGL to use, so make one
         * 
         * var shape = new createjs.Shape();
         * shape.graphics.clear().fill("red").drawRect(0,0,20,20);
         * shape.cache(0, 0, 20, 20, 1);
         * ```
         * 带有WebGL上下文的WebGL缓存
         * ```js
         * var stageGL = new createjs.StageGL();
         * var bmp = new createjs.Bitmap(src);
         * bmp.cache(0, 0, bmp.width, bmp.height, 1, {gl: "stage"});       // use our StageGL to cache
         * 
         * var shape = new createjs.Shape();
         * shape.graphics.clear().fill("red").drawRect(0,0,20,20);
         * shape.cache(0, 0, 20, 20, 1);
         * ```
         * 您可能希望创建自己的StageGL实例来控制诸如透明颜色、透明度、AA等因素。
         * 如果您这样做，则传入一个新实例而不是“true”，库将自动在您的实例上将StageGL/isCacheControlled设置为true。
         * 这将触发它正确运行，而不是假设您的主上下文是WebGL。
         * @param target 
         * @param x 
         * @param y 
         * @param width 缓存区域的宽度。
         * @param height 缓存区域的高度。
         * @param scale 将创建缓存的比例。例如，如果使用myShape.cache（0,0100100.2）缓存矢量形状，则生成的cacheCanvas将为200x200 px。
         * 这样可以更逼真地缩放和旋转缓存的元素。默认值为1。
         * @param {Object} [options=undefined] 为缓存逻辑指定其他参数。
         * @param {undefined|"new"|"stage"|StageGL} [options.useGL=undefined] 选择是使用上下文2D还是WebGL渲染，以及是创建新的舞台实例还是使用现有的舞台实例。
         * 有关使用的详细信息，请参阅上文。
         * @for BitmapCache
         */
        define(target: DisplayObject, x: number, y: number, width: number, height: number, scale?: number, options?:any): void;
        /**
         * 直接通过{@link updateCache}调用，也可以在内部调用。这具有双重责任，即确保表面已准备好绘制，并执行绘制。
         * 有关每种行为的完整详细信息，请分别检查受保护的函数{@link _updateSurface}和{@link _drawToCache}。
         * @param compositeOperation 
         */
        update(compositeOperation?: string): void;
        /**
         * 重置并释放与此缓存关联的所有属性和内存。
         */
        release(): void;
        /**
         * 返回缓存的数据URL，如果未缓存此显示对象，则返回null。使用cacheID确保在缓存未更改的情况下不会生成新的数据URL。
         * @returns {string} 缓存的图像数据url。
         */
        getCacheDataURL(): string;
        /**
         * 使用context2D绘图命令显示正在使用的缓存画布。
         * @param ctx 绘制的画布上下文。
         * @returns {boolean} 绘制是否成功
         */
        draw(ctx: CanvasRenderingContext2D): boolean;
    }
    /**
     * 对位图使用九宫格缩放。
     * 
     * 案例：
     * ```js
     * var sb = new createjs.ScaleBitmap(image, new createjs.Rectangle(12, 12, 5, 10));
     * sb.setDrawSize(200, 300);
     * stage.addChild(sb);
     * ```
     */
    class ScaleBitmap extends DisplayObject {
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
        /**
         * 返回克隆的ScaleBitmap实例。
         */
        clone(): ScaleBitmap;
    }
    /**
     * 使用sprite sheet中定义的位图图示符显示文本。支持使用换行字符的多行文本，但不支持自动换行。
     * 有关定义图示符的详细信息，请参见{@link spriteSheet}属性。
     * 
     * 重要提示： 虽然BitmapText扩展了Container，但它并不是设计为一个容器。因此，addChild和removeChild等方法被禁用。
     */
    class BitmapText extends DisplayObject {
        /**
         * 
         * @param text 要显示的文本。
         * @param spriteSheet 定义字符图示符的精灵表。
         */
        constructor(text?:string, spriteSheet?:SpriteSheet);
        /**
         * BitmapText使用Sprite实例绘制文本。为了减少实例的创建和销毁（从而减少垃圾收集），它维护了一个内部的sprite实例对象池以供重用。
         * 增加此值会导致保留更多精灵，略微增加内存使用，但会减少实例化。
         * @defaultValue 100
         */
        static maxPoolSize: number;

        // properties
        /**
         * 此间距（像素）将添加到输出中的每个字符之后。
         * @defaultValue 0
         */
        letterSpacing: number;
        /**
         * 每行文字的高度。如果为0，则它将使用通过检查“1”、“T”或“L”字符的高度（按此顺序）计算的行高度。
         * 如果这些字符没有定义，它将使用子画面第一帧的高度。
         * @defaultValue 0
         */
        lineHeight: number;
        /**
         * 如果子画面中未定义空格字符，则将插入等于spaceWidth的空像素。
         * 如果为0，则它将使用通过检查“1”、“l”、“E”或“a”字符的宽度（按此顺序）计算的值。
         * 如果这些字符没有定义，它将使用子画面第一帧的宽度。
         * @defaultValue 0
         */
        spaceWidth: number;
        /**
         * 定义此位图文本的字形的SpriteSheet实例。
         * 每个字形/字符都应该在精灵表中定义一个与相应字符同名的单帧动画。
         * 例如，以下动画定义：
         * ```js
         * "A": {frames: [0]}
         * ```
         * 将指示应为“A”字符绘制子画面索引0处的帧。简短的形式也是可以接受的：
         * ```js
         * "A": 0
         * ```
         * 请注意，如果在精灵表中找不到文本中的字符，它也会尝试使用其他大小写（大写或小写）。
         * 
         * 有关定义精灵表数据的详细信息，请参见{@link SpriteSheet}。
         * @defaultValue null
         */
        spriteSheet: SpriteSheet;
        /**
         * 要显示的文本。
         * @defaultValue ""
         */
        text: string;
    }
    /**
     * 将方框模糊应用于context 2D中的DisplayObjects，并将高斯模糊应用于webgl中。请注意，此滤镜相当密集，尤其是当质量设置为高于1时。
     * 
     * 案例：
     * 
     * 此示例创建一个红色圆圈，然后对其应用5像素的模糊。
     * 它使用getBounds方法来解释模糊引起的扩散。
     * ```js
     * var shape = new createjs.Shape().set({x:100,y:100});
     * shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
     * 
     * var blurFilter = new createjs.BlurFilter(5, 5, 1);
     * shape.filters = [blurFilter];
     * var bounds = blurFilter.getBounds();
     * 
     * shape.cache(-50+bounds.x, -50+bounds.y, 100+bounds.width, 100+bounds.height);
     * ```
     * 有关应用滤镜的详细信息，请参阅{@link Filter}。
     */
    class BlurFilter extends Filter {
        /**
         * 
         * @param blurX 水平模糊半径（像素）。
         * @param blurY 垂直模糊半径（像素）。
         * @param quality 模糊迭代次数。
         */
        constructor(blurX?: number, blurY?: number, quality?: number)

        // properties
        /** 以像素为单位的水平模糊半径。 */
        blurX: number
        /** 以像素为单位的垂直模糊半径。 */
        blurY: number
        /**
         * 模糊迭代次数。例如，值为1将产生粗糙模糊。
         * 值为2将产生更平滑的模糊，但运行时间是原来的两倍。
         * @defaultValue 1
         */
        quality: number

        // methods
        clone(): BlurFilter
    }
    /**
     * ButtonHelper是一个帮助类，用于从 MovieClip 或 Sprite 实例创建交互式按钮。
     * 该类将截获对象的鼠标事件，并自动调用 gotoAndStop 或 gotoAndPlay 到相应的动画标签，添加指针光标，并允许用户定义命中状态帧。
     * 
     * ButtonHelper实例不需要加入stage，但应保留引用以防止垃圾收集。
     * 
     * 注意：只有启用了{@link enableMouseOver}，按钮的over状态才会触发。
     * 
     * 案例：
     * ```js
     * 		var helper = new createjs.ButtonHelper(myInstance, "out", "over", "down", false, myInstance, "hit");
     * 		myInstance.addEventListener("click", handleClick);
     * 		function handleClick(event) {
     * 		    // Click Happened.
     * 		}
     * ```
     */
    class ButtonHelper {
        /**
         * 
         * @param target 要管理的实例。
         * @param outLabel 当鼠标指针移出按钮时要跳转到的标签或动画。
         * @param overLabel 当鼠标指针悬浮在按钮时要跳转到的标签或动画。
         * @param downLabel 当鼠标指针在按钮上按下时要跳转到的标签或动画。
         * @param play 当按钮状态改变时，是调用"gotoAndPlay"还是"gotoAndStop"？
         * @param hitArea 一个可选项目，用作按钮的点击区域。如果未对此进行定义，则将使用按钮的可见区域。请注意，hitState可以使用与“target”参数相同的实例。
         * @param hitLabel hitArea实例上定义hitArea边界的标签或动画。如果这是null，那么将使用hitArea的默认状态。*
         */
        constructor(target: Sprite|MovieClip, outLabel?: string, overLabel?: string, downLabel?: string, play?: boolean, hitArea?: DisplayObject, hitLabel?: string);
        //constructor(target: MovieClip, outLabel?: string, overLabel?: string, downLabel?: string, play?: boolean, hitArea?: DisplayObject, hitLabel?: string);

        // properties
        /** 当用户按下目标时显示的标签名称或帧号。默认为“down”。 */
        downLabel: string | number;
        /** 当用户将鼠标悬停在目标上时显示的标签名称或帧号。默认为“out”。 */
        outLabel: string | number;
        /** 当用户将鼠标移出目标时显示的标签名称或帧号。默认为“over”。 */
        overLabel: string | number;
        /** 如果为true，则ButtonHelper将调用gotoAndPlay，如果为false，则将使用gotoAndStop。默认值为false。 */
        play: boolean;
        /** 此按钮助手的目标。 */
        target: MovieClip | Sprite;
        /** 启用或禁用目标上的按钮功能。 */
        enabled: boolean;

        // methods
        /**
         * @deprecated - 使用{@link enabled}属性代替
         */
        setEnabled(value: boolean): void;
        /**
         * @deprecated - 使用{@link enabled}属性代替
         */
        getEnabled(): boolean;
        /**
         * 返回此对象的字符串表示形式。
         * @returns 字符串表示形式。
         */
        toString(): string;
    }
    /**
     * 将颜色变换应用于DisplayObjects。
     * 
     * 案例：
     * 
     * 本例绘制一个红色圆圈，然后将其转换为蓝色。这是通过将所有通道相乘为0（透明度通道除外，透明度通道设置为1），然后将255添加到蓝色通道来实现的。
     * ```js
     * 		var shape = new createjs.Shape().set({x:100,y:100});
     * 		shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
     * 
     * 		shape.filters = [
     * 		    new createjs.ColorFilter(0,0,0,1, 0,0,255,0)
     * 		];
     * 		shape.cache(-50, -50, 100, 100);
     * ```
     * 有关应用滤镜的详细信息，请参见{@link Filter}。
     */
    class ColorFilter extends Filter {
        /**
         * 
         * @param redMultiplier 与红色通道相乘的量。这是一个介于0和1之间的范围。
         * @param greenMultiplier 与绿色通道相乘的量。这是一个介于0和1之间的范围。
         * @param blueMultiplier 与蓝色通道相乘的量。这是一个介于0和1之间的范围。
         * @param alphaMultiplier 与alpha通道相乘的量。这是一个介于0和1之间的范围。
         * @param redOffset 相乘后要添加到红色通道的数量。这是一个介于-255和255之间的范围。
         * @param greenOffset 相乘后要添加到绿色通道的数量。这是一个介于-255和255之间的范围。
         * @param blueOffset 相乘后要添加到蓝色通道的数量。这是一个介于-255和255之间的范围。
         * @param alphaOffset 相乘后要添加到alpha通道的数量。这是一个介于-255和255之间的范围。
         */
        constructor(redMultiplier?: number, greenMultiplier?: number, blueMultiplier?: number, alphaMultiplier?: number, redOffset?: number, greenOffset?: number, blueOffset?: number, alphaOffset?: number);

        // properties
        /** 与红色通道相乘的量。这是一个介于0和1之间的范围。 */
        alphaMultiplier: number;
        /** 相乘后要添加到alpha通道的数量。这是一个介于-255和255之间的范围。 */
        alphaOffset: number;
        /** 与蓝色通道相乘的量。这是一个介于0和1之间的范围。 */
        blueMultiplier: number;
        /** 相乘后要添加到蓝色通道的数量。这是一个介于-255和255之间的范围。 */
        blueOffset: number;
        /** 与绿色通道相乘的量。这是一个介于0和1之间的范围。 */
        greenMultiplier: number;
        /** 相乘后要添加到绿色通道的数量。这是一个介于-255和255之间的范围。 */
        greenOffset: number;
        /** 与红色通道相乘的量。这是一个介于0和1之间的范围。 */
        redMultiplier: number;
        /** 相乘后要添加到红色通道的数量。这是一个介于-255和255之间的范围。 */
        redOffset: number;

        // methods
        clone(): ColorFilter;
    }
    /**
     * 提供用于组合矩阵以与ColorMatrixFilter一起使用的辅助函数。大多数方法都返回实例以方便链式调用。
     * 
     * 案例：
     * ```js

     * 		myColorMatrix.adjustHue(20).adjustBrightness(50);
     * ```
     * 有关如何应用滤镜的示例，请参见{@link Filter}，或有关如何使用ColorMatrix更改DisplayObject颜色的示例，参见{@link ColorMatrixFilter}。
     */
    class ColorMatrix {
        constructor(brightness?: number, contrast?: number, saturation?: number, hue?: number);

        // methods
        /**
         * 通过将指定值添加到红色、绿色和蓝色通道来调整像素颜色的亮度。正值会使图像更亮，负值会使其更暗。
         * @param value 介于-255和255之间的值，该值将添加到RGB通道中。
         * @returns 返回该方法的ColorMatrix实例（适用于链式调用）
         */
        adjustBrightness(value: number): ColorMatrix;
        /**
         * 调整亮度、对比度、饱和度和色相的快捷方式。
         * 相当于按顺序调用adjustHue（色相）、adjustContrast（对比度）、adjustBrightness（亮度）、adjutoSaturation（饱和度）。
         * @param brightness 
         * @param contrast 
         * @param saturation 
         * @param hue 
         * @returns 返回该方法的ColorMatrix实例（适用于链式调用）
         */
        adjustColor(brightness: number, contrast: number, saturation: number, hue: number): ColorMatrix;
        /**
         * 调整像素颜色的对比度。正值将增加对比度，负值将降低对比度。
         * @param value 介于-100和100之间的值。
         * @returns 返回该方法的ColorMatrix实例（适用于链式调用）
         */
        adjustContrast(value: number): ColorMatrix;
        /**
         * 调整像素颜色的色调。
         * @param value 介于-180和180之间的值。
         * @returns 返回该方法的ColorMatrix实例（适用于链式调用）
         */
        adjustHue(value: number): ColorMatrix;
        /**
         * 调整像素的颜色饱和度。正值将增加饱和度，负值将降低饱和度（趋向灰度）。
         * @param value 介于-100和100之间的值。
         * @returns 返回该方法的ColorMatrix实例（适用于链式调用）
         */
        adjustSaturation(value: number): ColorMatrix;
        /**
         * 返回此ColorMatrix实例的克隆。
         */
        clone(): ColorMatrix;
        /**
         * danzen新增的声明，目前还不支持，请勿使用
         * @param ...matrix 
         */
        concat(...matrix: number[]): ColorMatrix;
        /**
         * 将指定的矩阵与此矩阵连接（相乘）。
         * @param matrix 
         */
        concat(matrix: ColorMatrix): ColorMatrix;
        /**
         * danzen新增的声明，目前还不支持，请勿使用
         * @param ...matrix 
         */
        copy(...matrix: number[]): ColorMatrix;
        /**
         * 将指定矩阵的值复制到此矩阵。
         * @param matrix 
         */
        copy(matrix: ColorMatrix): ColorMatrix;
        /**
         * 将矩阵重置为单位值。
         */
        reset(): ColorMatrix;
        /**
         * 使用指定的值重置实例。
         * @param brightness 
         * @param contrast 
         * @param saturation 
         * @param hue 
         */
        setColor( brightness: number, contrast: number, saturation: number, hue: number ): ColorMatrix;
        toArray(): number[];
        toString(): string;
    }
    /**
     * 允许您执行复杂的颜色操作，如修改饱和度、亮度或反转。
     * 有关更改颜色的详细信息，请参见{@link ColorMatrix}。
     * 为了更容易地进行颜色变换，请考虑{@link ColorFilter}。
     * 
     * 案例：
     * 
     * 此示例创建一个红色圆圈，反转其色调，然后使其饱和以使其变亮。
     * ```js
     * var shape = new createjs.Shape().set({x:100,y:100});
     * shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
     * 
     * var matrix = new createjs.ColorMatrix().adjustHue(180).adjustSaturation(100);
     * shape.filters = [
     *     new createjs.ColorMatrixFilter(matrix)
     * ];
     * 
     * shape.cache(-50, -50, 100, 100);
     * ```
     * 有关应用滤镜的详细信息，请参{@link Filter}。
     */
    class ColorMatrixFilter extends Filter {
        constructor(matrix: number[] | ColorMatrix);

        // properties
        /** 描述要执行的颜色操作的4x5矩阵。另请参阅ColorMatrix类。 */
        matrix: number[] | ColorMatrix;

        // methods
        clone(): ColorMatrixFilter;
    }
    /**
     * Container是一个可嵌套的显示列表，允许您使用复合显示元素。
     * 例如，可以将手臂、腿、躯干和头部位图实例组合到一个“人物容器”中，并将它们变换为一个组，同时仍然可以相对移动各个部分。
     * 容器的子级具有与其父级Container连接的transform和alpha属性。
     * 例如，放置在x=50且阿尔法=0.7的Container中的x=100且阿尔法=0.5的Shape将在x=150且阿尔法=0.35处渲染到画布上。
     * 容器有一些开销，所以通常不应该创建一个容器来容纳一个子容器。
     * 
     * 案例：
     * ```js
     * var container = new createjs.Container();
     * container.addChild(bitmapInstance, shapeInstance);
     * container.x = 100;
     * ```
     */
    class Container extends DisplayObject {
        constructor();

        // properties
        /** 显示列表中的子项数组。您通常应该使用子管理方法，如addChild、removeChild、swapChildren等，而不是直接访问它，但它是为高级用途而包含的。 */
        children: DisplayObject[];
        /** 指示是否独立启用此容器的子级以进行鼠标/指针交互。如果为false，子级将聚合在容器下——例如，单击子级形状将触发容器上的单击事件。说白了就是容器内子级是否可以接收鼠标/指针交互。 */
        mouseChildren: boolean;
        /** 返回容器中的子级数。 */
        numChildren: number;
        /** 如果为false，则tick将不会传播到此容器的子级。这可以提供一些性能优势。除了阻止“tick”事件被调度外，它还将阻止某些显示对象上与tick相关的更新（例如Sprite&MovieClip帧前进、DOMElement可见性处理）。 */
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
        /**
         * 与getObjectsUnderPoint功能相似，但仅返回最上层的显示对象。该方法执行效率比getObjectsUnderPoint高。但性能开销仍然不少，详情查看getObjectsUnderPoint的注释。
         * @param x 
         * @param y 
         * @param mode 匹配模式，0为所有、1为启用鼠标交互的、2为启用鼠标交互且不透明的对象。
         */
        getObjectUnderPoint(x: number, y: number, mode: number): DisplayObject;
        removeAllChildren(): void;
        removeChild(...child: DisplayObject[]): boolean;
        removeChildAt(...index: number[]): boolean;
        setChildIndex(child: DisplayObject, index: number): void;
        sortChildren(sortFunction: (a: DisplayObject, b: DisplayObject) => number): void;
        swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        swapChildrenAt(index1: number, index2: number): void;
    }
    /**
     * DisplayObject是一个抽象类，不能直接构建的。子类可以构建，如Container、Bitmap和Shape。
     * 
     * DisplayObject是EaselJS库中所有显示类的基类。
     * 
     * 它定义了所有显示对象之间共享的核心属性和方法，如转换属性（x、y、scaleX、scaleY等）、缓存和鼠标处理程序。
     */
    class DisplayObject extends EventDispatcher {
        constructor();

        // properties
        /** 此显示对象的alpha（透明度）。0是完全透明的，1是完全不透明的。 */
        alpha: number;
        /** 如果已创建缓存，则返回管理cacheCanvas及其属性的类。有关更多信息，请参阅BitmapCache。使用此选项可以控制、检查和更改缓存。在特殊情况下，这可能是修改后的或子类化的BitmapCache。 */
        bitmapCache: BitmapCache;
        /** 如果缓存处于活动状态，则返回包含此显示对象图像的画布。有关详细信息，请参阅缓存。使用此选项显示缓存的结果。这将是一个HTMLCanvasElement，除非为此缓存特意启用了特殊的缓存规则。 */
        cacheCanvas: HTMLCanvasElement | Object;
        /** 返回唯一标识此显示对象的当前缓存的ID号。这可用于确定自上次检查以来缓存是否已更改。 */
        cacheID: number;
        /** 复合操作指示此显示对象的像素将如何与其后面的元素复合。如果为null，则此属性将从父容器继承。有关更多信息，请阅读关于合成的whatwg规范。有关支持的compositeOperation值的列表，请访问W3C关于Compositing和Blending的草案。 */
        compositeOperation: string;
        /** 当用户将鼠标悬停在此显示对象上时,将显示相应的鼠标指针样式（例如“指针”、“帮助”、“文本”等），这类似与CSS的cursor */
        cursor: string;
        /** 应用于此显示对象的滤镜对象数组。当显示对象上调用Cache或UpdateCache时滤镜将应用或者更新，并且仅应用于缓存的区域。 */
        filters: Filter[];
        /**
         * 在检查鼠标交互或调用getObjectsUnderPoint时，将会对hitArea指定的显示对象进行碰撞检测。将对hitArea对象相对于此显示对象的坐标空间应用其变换（就像hitArea对象是此显示对象及其regX/Y的子对象一样）。hitArea将仅使用其自己的alpha值进行碰撞检测，而不管目标显示对象上的alpha值或目标的祖先（父级）。
         * 
         * 如果在容器上设置，容器的子对象将不会收到鼠标事件。这类似于将MouseChildren设置为false。
         * 
         * 请注意，当前基类的hitTest()方法不使用hitArea，Stage也不支持hitArea。
         */
        hitArea: DisplayObject;
        /** 此显示对象的唯一ID。方便扩展其他用途用途。 */
        id: number;
        /** 为该显示对象定义矢量遮罩（剪裁路径）的Shape实例。形状的变换将相对于显示对象的父坐标应用（就像它是父坐标的子坐标一样）。 */
        mask: Shape;
        /** 
         * 指示在运行鼠标交互时是否包含此对象。将容器的子级设置为false将导致单击该子级时容器上的事件不会触发。将此属性设置为false不会阻止getObjectsUnderPoint方法返回子对象。
         * 注意：在EaselJS 0.7.0中，mouseEnabled属性在嵌套容器中无法正常工作。请查看GitHub上的最新NEXT版本，以获取已解决此问题的更新版本。该修复程序将在EaselJS的下一个版本中提供。
         */
        mouseEnabled: boolean;
        /** 此显示对象的可选名称。包含在toString中。可用于调试。 */
        name: string;
        /** 对包含此显示对象的Container或Stage对象的引用，如果尚未添加到其中，则为null。 */
        parent: Container;
        /** 此显示对象的注册点的左偏移量。例如，要使100x100px位图围绕其中心旋转，您可以将regX和regY设置为50。缓存对象的注册点应根据预缓存条件设置，而不是缓存大小。 */
        regX: number;
        /** 此显示对象的注册点的y偏移。例如，要使100x100px位图围绕其中心旋转，您可以将regX和regY设置为50。缓存对象的注册点应根据预缓存条件设置，而不是缓存大小。 */
        regY: number;
        /** 此显示对象的旋转度。 */
        rotation: number;
        /** 水平拉伸此显示对象的因素。例如，将scaleX设置为2会将显示对象拉伸到其标称宽度的两倍。要水平翻转对象，请将比例设置为负数。 */
        scaleX: number;
        /** 垂直拉伸此显示对象的因素。例如，将scaleY设置为0.5会将显示对象拉伸到其标称高度的一半。要垂直翻转对象，请将比例设置为负数。 */
        scaleY: number;
        /** 将scaleX和scaleY属性设置为相同的值。请注意，当您获得该值时，如果scaleX和scaleY是不同的值，它将只返回scaleX。 */
        scale: number;
        /** 定义要在此显示对象上渲染的阴影的阴影对象。设置为null以删除阴影。如果为null，则此属性从父容器继承。 */
        shadow: Shadow;
        /** 水平倾斜此显示对象的因素。 */
        skewX: number;
        /** 垂直倾斜此显示对象的因素。 */
        skewY: number;
        /** 指示当snapToPixelEnabled为true时，是否应将显示对象绘制为整个像素。要启用/禁用对整个类别的显示对象的捕捉，请在原型上设置此值（例如Text.prototype.snapToPixel=true）。 */
        snapToPixel: boolean;
        /** 返回此显示对象将在其上呈现的Stage实例，如果尚未将其添加到Stage实例中，则返回null。 */
        stage: Stage;
        /** 抑制在跨域内容中使用hitTest、鼠标事件和GetObjectsUnderPoint等功能时生成的错误。 */
        static suppressCrossDomainErrors: boolean;
        /** 如果为false，则tick时钟将不会作用在此显示对象（或其子对象）上运行。这可以提供一些性能优势。除了阻止“tick”事件被分派外，它还将阻止某些显示对象上与tick相关的更新（例如Sprite和MovieClip帧前进，以及DOMElement显示属性）。 */
        tickEnabled: boolean;
        /** 如果非null，则定义此显示对象的变换矩阵，覆盖所有其他变换属性(x, y, rotation, scale, skew)。 */
        transformMatrix: Matrix2D;
        /** 指示是否应将此显示对象绘制到画布上，并在运行Stage.getObjectsUnderPoint方法时将其包含在内。 */
        visible: boolean;
        /** 显示对象相对于其父对象的x（水平）位置 */
        x: number;
        /** 显示对象相对于其父对象的y（垂直）位置 */
        y: number;

        // methods
        /**
         * 
         * @param evtObj 一个将被分派给所有Ticker监听器的事件对象。此对象在调度员之间重复使用，以降低构建和GC成本。
         */
        protected _tick(evtObj?: Object): void;
        /** 
         * 将显示对象绘制到新元素中，然后用于后续绘制。适用于不经常更改的复杂内容（例如，具有许多不移动的子项的容器，或复杂的矢量形状），这可以提供更快的渲染，因为内容不需要在每帧中重新渲染。缓存的显示对象可以自由移动、旋转、褪色等，但如果其内容发生变化，则必须再次调用updateCache()手动更新缓存。您必须通过x、y、w和h参数指定缓存区域。这定义了将使用此显示对象的坐标渲染和缓存的矩形。
         * 
         * 演示案例
         * 例如你定义了一个圆形半径为25像素，坐标为(0, 0)：
         * 
         * 		var shape = new createjs.Shape();
         * 		shape.graphics.beginFill("#ff0000").drawCircle(0, 0, 25);
         * 		shape.cache(-25, -25, 50, 50);
         * 
         * 请注意，滤镜需要在应用缓存之前声明，否则您必须要在应用滤镜之后调用updateCache。查看Filter类以获取更多信息。某些滤镜（例如BlurFilter）可能无法与scale参数一起按预期工作。
         * 通常，生成的cacheCanvas宽度和高度都应用了scale，但是一些过滤器（例如BlurFilter）会增加一些填充，这些填充可能不在缓存的区域。
         * 在以前的版本中，缓存是在DisplayObject上处理的，但后来被转移到了BitmapCache。这允许更容易的交互和替代缓存方法，如WebGL和StageGL。有关选项对象的更多信息，请参阅BitmapCache定义。
         * 
         * @param x 缓存区域的x坐标原点。
         * @param y 缓存区域的y坐标原点。
         * @param width 缓存区域的宽度。
         * @param height 缓存区域的高度。
         * @param scale 缓存内容的缩放。例如，如果使用myShape.cache(0,0,100,100,2)缓存矢量形状，则生成的cacheCanvas将为200x200像素。这使您能够以更高的保真度缩放和旋转缓存元素。默认值为1。
         */
        cache(x: number, y: number, width: number, height: number, scale?: number): void;
        /**
         * 返回此DisplayObject的克隆。克隆体的某些属性将恢复为默认值（例如.parent）。缓存不会跨克隆进行维护，某些元素会通过引用进行复制（遮罩、单个滤镜实例、hit area）。
         * @returns {DisplayObject} 当前DisplayObject实例的克隆。
         */
        clone(): DisplayObject;
        /**
         * 将显示对象绘制到指定的上下文中，忽略其可见、alpha、投影和变换。如果处理了绘图，则返回true（对于覆盖功能很有用）。
         * 
         * 注意：此方法主要用于内部使用，但可能对高级用途有用。
         * @param ctx 要绘制的画布2D上下文对象。
         * @param ignoreCache 指示绘图操作是否应忽略任何当前缓存。例如，用于绘制缓存（以防止它简单地将现有缓存绘制回自身）。
         */
        draw(ctx: CanvasRenderingContext2D, ignoreCache?: boolean): boolean;
        /**
         * 返回一个矩形，该矩形表示该对象在其局部坐标系中的边界（即无变换）。已缓存的对象将返回缓存的边界。
         * 
         * 并非所有显示对象都可以计算自己的边界（例如形状）。对于这些对象，可以使用 setBounds，以便在计算容器边界时包含它们。
         * 
         * 1.All        所有显示对象都支持使用setBounds()手动设置边界。同样，使用cache()缓存的显示对象将返回其缓存的边界。手动和缓存边界将覆盖下面列出的自动计算。
         * 2.Bitmap     返回Bitmap/sourceRect（如果指定）或图像的宽度和高度，从（x=0，y=0）开始延伸。
         * 3.Sprite     返回当前帧的边界。如果在spritesheet数据中指定了帧注册点，则x/y可能为非零。另请参见getFrameBounds
         * 4.Container  返回从getBounds()返回非空值的所有子级的聚合（组合）边界。
         * 5.Shape      当前不支持自动边界计算。使用setBounds()手动定义边界。
         * 6.Text       返回近似边界。水平值（x/宽度）非常准确，但垂直值（y/高度）则不准确，尤其是在使用textBaseline值而不是“top”时。
         * 7.BitmapText 返回近似边界。如果spritesheet帧注册点接近（x=0，y=0），则值将更准确。
         * 
         * 对于某些对象（例如文本或具有许多子对象的容器），计算边界可能很消耗性能，每次调用getBounds（）时都会重新计算边界。通过显式设置边界，可以防止对静态对象进行重新计算：
         * 
         * 		var bounds = obj.getBounds();
         * 		obj.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
         * 		// getBounds will now use the set values, instead of recalculating
         * 
         * 为了减少内存影响，返回的Rectangle实例可以在内部重用；克隆实例或复制其值（如果需要保留）。
         * 
         * 		var myBounds = obj.getBounds().clone();
         * 		// OR:
         * 		myRect.copy(obj.getBounds());
         * 
         * @returns {Rectangle} 显示对象的矩形边界，如果此对象没有边界，则为null。
         */
        getBounds(): Rectangle;
        /**
         * 返回缓存的数据URL，如果未缓存此显示对象，则返回null。仅当缓存已更改时生成，否则返回最后一个结果。
         * 
         * @returns {string} 缓存的图像数据url。
         */
        getCacheDataURL(): string;
        /**
         * 生成一个DisplayProps对象，表示对象及其所有父容器的组合显示属性，直到最高级别的祖先（通常是Stage）。
         * @param props 一个DisplayProps对象，用于填充计算值。如果为null，则返回一个新的DisplayProps对象。
         * @returns {DisplayProps} 包含显示属性的DisplayProps对象。
         */
        getConcatenatedDisplayProps(props?: DisplayProps): DisplayProps;
        /**
         * 生成一个Matrix2D对象，表示显示对象及其所有父容器到最高级别祖先（通常是Stage）的组合变换。这可用于在坐标空间之间转换位置，例如使用localToGlobal和globalToLocal。
         * @param mtx 用计算值填充的Matrix2D对象。如果为null，则返回一个新的Matrix2D对象。
         */
        getConcatenatedMatrix(mtx?: Matrix2D): Matrix2D;
        /**
         * 基于此对象的当前变换返回一个矩阵。
         * @param matrix 可选。用计算值填充的Matrix2D对象。如果为null，则返回一个新的Matrix对象。
         * @returns {Matrix2D} 表示此显示对象变换的矩阵。
         */
        getMatrix(matrix?: Matrix2D): Matrix2D;
        /**
         * @deprecated
         * 请改用stage属性。
         */
        getStage(): Stage;
        /**
         * 返回一个矩形，表示该对象在其父坐标系中的边界（即应用了变换）。已缓存的对象将返回缓存的转换边界。
         * 
         * 并非所有显示对象都可以计算自己的边界（例如Shape）。对于这些对象，可以使用setBounds，以便在计算容器边界时包含它们。
         * 
         * 为了减少内存影响，返回的Rectangle实例可以在内部重用；克隆实例或复制其值（如果需要保留）。
         * 
         * 容器实例计算所有通过getBounds返回边界的子级的聚合边界。
         * @returns {Rectangle} 表示边界的Rectangle实例，如果此对象没有边界，则为null。
         */
        getTransformedBounds(): Rectangle;
        /**
         * 将指定的x和y位置从全局（舞台）坐标空间转换到显示对象的坐标空间。例如，这可用于确定显示对象内的当前鼠标位置。返回一个Point实例，其x和y属性与显示对象坐标空间中的变换位置相关。
         * 
         * 案例
         * 
         * 		displayObject.x = 300;
         * 		displayObject.y = 200;
         * 		stage.addChild(displayObject);
         * 		var point = displayObject.globalToLocal(100, 100);
         * 		// Results in x=-200, y=-100
         * 
         * @param x 要变换的舞台上的x位置。
         * @param y 舞台上的y位置要变换。
         * @param pt 将结果复制到其中的对象。如果省略，将返回一个具有x/y属性的新Point对象。
         */
        globalToLocal(x: number, y: number, pt?: Point | Object): Point;
        /**
         * 检测显示对象是否与本地坐标中的指定点相交（即在指定位置绘制一个alpha>0的像素）。这将忽略显示对象的alpha、shadow、hitArea、mask和compositeOperation。
         * 
         * 案例
         * 
         * 		stage.addEventListener("stagemousedown", handleMouseDown);
         * 		function handleMouseDown(event) {
         * 			var hit = myShape.hitTest(event.stageX, event.stageY);
         * 		}
         * 
         * 请注意，EaselJS目前不支持形状到形状的碰撞。
         * @param x 
         * @param y 
         */
        hitTest(x: number, y: number): boolean;
        /**
         * 返回true或false，指示如果绘制到画布上，显示对象是否可见。这并不能说明它是否在舞台边界内可见。
         * 
         * 注意：此方法主要用于内部使用，但可能对高级用途有用。
         * 
         * @returns {boolean} 布尔值，指示如果绘制到画布上，显示对象是否可见。
         */
        protected isVisible(): boolean;
        /**
         * 将指定的x和y位置从显示对象的本地坐标空间转换到全局（舞台）坐标空间。
         * 
         * 例如，这可用于将HTML标签定位在嵌套显示对象上的特定点上。返回一个Point实例，其x和y属性与舞台上的变换坐标相关。
         * 
         * 注意：如果舞台有设置缩放的话，需要自己计算缩放。例如返回的Point实例是p，则实际的坐标是(p.x/stage.scaleX,p.y/stage.scaleY)。
         * @param x 
         * @param y 
         * @param pt 
         */
        localToGlobal(x: number, y: number, pt?: Point | Object): Point;
        /**
         * 将指定的x和y位置从该显示对象的坐标空间转换到目标显示对象的坐标空间。返回一个Point实例，其x和y属性与目标坐标空间中的变换位置相关。与使用以下代码处理localToGlobal和globalToLocal的效果相同。
         * 
         * 		var pt = this.localToGlobal(x, y);
         * 		pt = target.globalToLocal(pt.x, pt.y);
         * 
         * @param x 
         * @param y 
         * @param target 
         * @param pt 
         */
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
        /**
         * 用于快速设置显示对象上的变换属性。所有参数都是可选的。省略的参数将设置默认值。
         * @param x 
         * @param y 
         * @param scaleX 
         * @param scaleY 
         * @param rotation 旋转，单位为度，默认为0度。
         * @param skewX 水平倾斜系数
         * @param skewY 垂直倾斜系数
         * @param regX 水平注册点
         * @param regY 垂直注册点
         * @returns {DisplayObject} 当前DisplayObject实例的克隆。
         */
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): DisplayObject;
        /**
         * 清除当前的缓存。详情请查看cache。
         */
        uncache(): void;
        /**
         * 更新显示对象缓存，在没有激活缓存的情况下，调用updateCache将抛出错误。如果compositeOperation为空，则在绘图之前将清除当前缓存。
         * @param compositeOperation 合成操作。
         */
        updateCache(compositeOperation?: string): void;
        /**
         * 将此显示对象的变换、alpha、globalCompositeOperation、剪裁路径（遮罩）和阴影应用于指定的上下文。这通常称为绘制前。
         * @param ctx {CanvasRenderingContext2D} The canvas 2D to update.
         */
        updateContext(ctx: CanvasRenderingContext2D): void;
    }
    /**
     * 用于计算和封装与显示相关的属性。
     */
    class DisplayProps {
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


    class DOMElement extends DisplayObject {
        constructor(htmlElement: HTMLElement);

        // properties
        htmlElement: HTMLElement;

        // methods
        clone(): DisplayObject; // throw error
        set(props: Object): DOMElement;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): DOMElement;
    }


    class EaselJS {
        // properties
        static buildDate: string;
        static version: string;
    }

    class Filter {
        constructor();

        // methods
        applyFilter(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, targetCtx?: CanvasRenderingContext2D, targetX?: number, targetY?: number): boolean;
        clone(): Filter;
        getBounds(): Rectangle;
        toString(): string;
    }

    class Graphics {
        constructor();

        // properties
        /** Base64字符到值的映射。由decodePath使用。 */
        static BASE_64: Object;
        /** Graphics的可重用实例。BeginPath可避免不必要的实例化。 */
        static beginCmd: Graphics.BeginPath;
        /** 
         * 保存对创建或附加的最后一个命令的引用。例如，您可以保留对Fill命令的引用，以便稍后使用以下命令动态更新颜色：
         * 
         *     var myFill = myGraphics.beginFill("red").command;
         *     // update color later:
         *     myFill.style = "yellow";
         * 
         */
        command: Object;
        /** 
         * 返回图形指令数组。每个条目都是一个图形命令对象（例如graphics.Fill、graphics.Rect）。不建议直接修改返回的数组，这可能会导致意外行为。
         * 
         * 此属性主要用于指令的自检（例如用于图形导出）。
         */
        instructions: Object[]; // array of graphics command objects (Graphics.Fill, etc)
        /** 
         * 将setStrokeStyle的caps参数的数值映射到相应的字符串值。这主要用于小型API。映射如下：0到“对接”，1到“圆形”，2到“方形”。例如，要将线条大写设置为“方形”：
         * 
         *     myGraphics.ss(16, 2);
         * 
         */
        static STROKE_CAPS_MAP: string[];
        /** 
         * 将setStrokeStyle的关节参数的数值映射到相应的字符串值。这主要用于小型API。映射如下：0到“斜接”，1到“圆形”，2到“斜面”。例如，要将线接头设置为“斜面”：
         * 
         *     myGraphics.ss(16, 0, 2);
         * 
         */
        static STROKE_JOINTS_MAP: string[];

        // methods
        /**
         * 将图形命令对象附加到图形队列。
         * 该命令对象公开了一个“exec”方法，该方法接受两个参数：要操作的Context2D和传递到draw中的任意数据对象。
         * 后者通常是调用draw的Shape实例。
         * 
         * 此方法由图形方法（如drawCircle）在内部使用，但也可以直接用于插入内置或自定义图形命令。例如：
         * ```js
         * // attach data to our shape, so we can access it during the draw:
         * myShape.color = "red";
         * 
         * // append a Circle command object:
         * myShape.graphics.append(new createjs.Graphics.Circle(50, 50, 30));
         * 
         * // append a custom command object with an exec method that sets the fill style
         * // based on the shape's data, and then fills the circle.
         * myShape.graphics.append({exec:function(ctx, shape) {
         *     ctx.fillStyle = shape.color;
         *     ctx.fill();
         * }});
         * ```
         * @param command 
         * @param clean 
         * @returns 返回Graphics实例（用于链式调用）
         */
        append(command: Object, clean?: boolean): Graphics;
        /**
         * 绘制一条由半径、startAngle和endAngle参数定义的弧，以位置（x，y）为中心。
         * 例如，要绘制一个以（100100）为中心、半径为20的完整圆：
         * ```js
         * arc(100, 100, 20, 0, Math.PI*2);
         * ```
         * 有关详细信息，请阅读whatwg规范。一个微小的API方法“A”也存在。
         * @param x 
         * @param y 
         * @param radius 半径
         * @param startAngle 开始弧度
         * @param endAngle 结束弧度
         * @param anticlockwise 
         * @returns 返回Graphics实例（用于链式调用）
         */
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
        /**
         * 绘制具有指定控制点和半径的圆弧。有关详细信息，请阅读whatwg规范。一个微小的API方法“at”也存在。
         * @param x1 
         * @param y1 
         * @param x2 
         * @param y2 
         * @param radius 
         * @returns 返回Graphics实例（用于链式调用）
         */
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        /**
         * 使用指定的图像开始填充图案。这将结束当前的子路径。一个微小的API方法“bf”也存在。
         * @param image 用于填充的图像源（Image, Canvas, 或 Video），图像源必须要加载完成才能用于填充，否则填充为空。
         * @param repetition 可选。指示是否在填充区域中重复图像。"repeat"、"repeat-x"、"repreat-y"或"no-repeat"中的一个。默认为"repeat"。请注意，Firefox不支持“repeat-x”或“repeat-y”（最新测试在FF 20.0中），默认为“repeat”。
         * @param matrix 
         * @returns 返回Graphics实例（用于链式调用）
         */
        beginBitmapFill(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, repetition?: string, matrix?: Matrix2D): Graphics;
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
        f(color?: string): Graphics;
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
        class Arc
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

        class ArcTo
        {
            constructor(x1: number, y1: number, x2: number, y2: number, radius: number);

            // properties
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            radius: number;
        }

        class BeginPath
        {

        }

        class BezierCurveTo
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

        class Circle
        {
            constructor(x: number, y: number, radius: number);

            // properties
            x: number;
            y: number;
            radius: number;
        }

        class ClosePath
        {

        }

        class Fill
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

        class LineTo
        {
            constructor(x: number, y: number);

            // properties
            x: number;
            y: number;
        }

        class MoveTo
        {
            constructor(x: number, y: number);

            x: number;
            y: number;
        }

        class PolyStar
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

        class QuadraticCurveTo
        {
            constructor(cpx: number, cpy: number, x: number, y: number);

            // properties
            cpx: number;
            cpy: number;
            x: number;
            y: number;
        }

        class Rect
        {
            constructor(x: number, y: number, w: number, h: number);

            // properties
            x: number;
            y: number;
            w: number;
            h: number;
        }

        class RoundRect
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

        class Stroke
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

        class StrokeStyle
        {
            constructor(width: number, caps: string, joints: number, miterLimit: number);

            // properties
            caps: string;
            joints: string;
            miterLimit: number;
            width: number;
        }

        class StrokeDash
        {
            constructor(segments:any[], offset:number);

            // properties
            offset: number;
            segments: any[];
        }
    }



    class Matrix2D {
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
    /**
     * 作为参数传递给所有鼠标/指针/触摸相关事件。
     * 有关鼠标事件及其属性的列表，请参阅{@link DisplayObject}和{@link Stage}事件列表。
     */
    class MouseEvent extends Event {
        /**
         * 
         * @param type 事件类型。
         * @param bubbles 指示事件是否会在显示列表中冒泡。
         * @param cancelable 指示是否可以取消此事件的默认行为。
         * @param stageX 相对于舞台的x坐标。
         * @param stageY 相对于舞台的y坐标。
         * @param nativeEvent 与此鼠标事件相关的原生DOM事件。
         * @param pointerID 指针的唯一id。
         * @param primary 是否主指针，适用于多点触控环境中。
         * @param rawX 相对于舞台的原始x位置。
         * @param rawY 相对于舞台的原始y位置。
         * @param relatedTarget 鼠标事件的目标。
         */
        constructor(type: string, bubbles: boolean, cancelable: boolean, stageX: number, stageY: number, nativeEvent: NativeMouseEvent, pointerID: number, primary: boolean, rawX: number, rawY: number, relatedTarget: DisplayObject);

        // properties
        /** 指示事件是否由触摸输入（与鼠标输入相比）生成。 */
        isTouch: boolean;
        /** 返回鼠标在当前目标（即调度器）的本地坐标系中的x位置。 */
        localX: number;
        /** 返回鼠标在当前目标（即调度器）的本地坐标系中的y位置。 */
        localY: number;
        /** 浏览器生成的本地MouseEvent。此事件的属性和API可能因浏览器而异。如果EaselJS属性不是直接从本机MouseEvent生成的，则此属性将为null。 */
        nativeEvent: NativeMouseEvent;
        /** 指针（触摸点或光标）的唯一id。对于鼠标，这将是-1，或者是系统提供的id值。 */
        pointerID: number;
        /** 是否主指针，适用于多点触控环境中。这对鼠标来说永远是正确的。对于触摸指针，当前堆栈中的第一个指针将被视为主指针。 */
        primary: boolean;
        /** 相对于舞台的原始x位置。通常，这将与stageX值相同，除非stage.mouseMoveOutside为true并且指针在stage边界之外。 */
        rawX: number;
        /** 相对于舞台的原始y位置。通常，这将与stageX值相同，除非stage.mouseMoveOutside为true并且指针在stage边界之外。 */
        rawY: number;
        /**
         * 事件的次要目标（如适用）。
         * 这用于{@link mouseout}/{@link rollout}事件，以指示鼠标输入的对象，鼠标退出的对象的滚动/翻转，以及光标下对象的{@link stagemousedown}/{@link stagemouseup}事件（如果有的话）。
         */
        relatedTarget: DisplayObject;
        /** 舞台上的标准化x位置。这将始终在0到舞台宽度的范围内。 */
        stageX: number;
        /** 舞台上的标准化y位置。这将始终在0到舞台高度的范围内。 */
        stageY: number;
        mouseMoveOutside: boolean;

        // methods
        /*clone(): MouseEvent;
        
        // EventDispatcher mixins
        addEventListener(type: string, listener: (eventObj: Object) => boolean|void, useCapture?: boolean): Function;
        //addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean|void; }, useCapture?: boolean): Object;
        //addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
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
        willTrigger(type: string): boolean;*/
    }

    /**
     * MovieClip类将TweenJS Timeline与EaselJS容器相关联。
     * 它允许您创建封装时间线动画、状态更改和同步操作的对象。
     * MovieClip类从0.7.0开始就包含在EaselJS压缩文件中。
     * 
     * 目前，MovieClip只有在基于时间（而不是基于时间）的情况下才能正常工作，尽管已经做出了一些让步，以支持未来基于时间的时间表。
     * 
     * 案例：
     * 
     * 此示例来回设置两个形状的动画。灰色形状从左侧开始，但我们使用{@link gotoAndPlay}跳到动画的中点。
     * ```js
     * var stage = new createjs.Stage("canvas");
     * createjs.Ticker.addEventListener("tick", stage);
     * 
     * var mc = new createjs.MovieClip({loop:-1, labels:{myLabel:20}});
     * stage.addChild(mc);
     * 
     * var child1 = new createjs.Shape(
     *     new createjs.Graphics().beginFill("#999999")
     *         .drawCircle(30,30,30));
     * var child2 = new createjs.Shape(
     *     new createjs.Graphics().beginFill("#5a9cfb")
     *         .drawCircle(30,30,30));
     * 
     * mc.timeline.addTween(
     *     createjs.Tween.get(child1)
     *         .to({x:0}).to({x:60}, 50).to({x:0}, 50));
     * mc.timeline.addTween(
     *     createjs.Tween.get(child2)
     *         .to({x:60}).to({x:0}, 50).to({x:60}, 50));
     * 
     * mc.gotoAndPlay("start");
     * ```
     * 建议使用tween.to()来设置动画和属性（不使用持续时间来立即设置），并使用tween.wait()方法在动画之间创建延迟。
     * 请注意，使用tween.set()方法影响属性可能无法提供所需的结果。
     */
    class MovieClip extends Container {
        /**
         * 应用于此实例的配置属性（例如{mode:MovieClip.SYNHED}）。
         * MovieClip支持的属性如下。除非指定，否则这些属性都设置在相应的实例属性上。
         * 
         * mode
         * 
         * startPosition
         * 
         * frameBounds
         * 
         * 此对象也将传递到与此MovieClip关联的Timeline实例中。有关支持的属性列表（例如paused, labels, loop, reversed等），请参阅Timeline的文档。
         * @param props 当该属性的类型是Object时，将此对象中的属性（支持的属性：mode,startPosition,loop,labels,frameBounds,paused）复制到实例中。否则，使用该值设置实例的mode属性。
         * @param startPosition 指定此影片剪辑中要播放的第一帧，或者如果模式为单帧，则指定要显示的唯一帧。
         * @param loop 指定此MovieClip应循环的次数。值-1表示它应该无限循环。值为1会导致它循环一次（即总共播放两次）。
         * @param labels 帧标签的名称。
         */
        constructor(props?: string|Object, startPosition?: number, loop?: boolean, labels?: Object);

        // properties
        /**
         * 是否执行帧代码
         * @default true
         */
        actionsEnabled: boolean;
        /**
         * 如果为true，则每当时间轴将影片剪辑添加回显示列表时，影片剪辑将自动重置为其第一帧。
         * 这仅适用于模式为"INDEPENDENT"的MovieClip实例。
         * 
         * 例如，如果你有一个角色动画，其中“body”为其子显示对象（MovieClip实例）在每一帧上都有不同的服装，
         * 你可以将body.autoReset设置为false，这样你就可以手动更改它所在的帧，而不用担心它会自动重置。
         * @default true
         */
        autoReset: boolean;
        /** 构建时间，例如：Thu, 12 Oct 2017 16:34:10 GMT */
        static buildDate: string;
        /** 返回当前帧索引。 */
        currentFrame: number;
        /** 总帧数 */
        totalFrames: number;
        /** 返回当前帧的标签名称。 */
        currentLabel: string;
        /** 每一帧的矩形边界 */
        frameBounds: Rectangle[];
        /**
         * 默认情况下，MovieClip实例每滴答前进一帧。为MovieClip指定帧率将使其根据滴答之间的经过时间适当地前进，以保持目标帧率。
         * 
         * 例如，如果将帧速率为10的MovieClip放置在以40fps更新的舞台上，则MovieClip将大约每4个滴答前进一帧。
         * 这并不准确，因为每个滴答之间的时间在帧之间会略有不同。
         * 
         * 此功能取决于传递到{@link update}中的滴答事件对象（或具有适当“delta”属性的对象）。
         */
        framerate: number;
        /**
         * MovieClip将独立于其父级前进（播放），即使其父级已暂停。这是默认模式。
         */
        static INDEPENDENT: string;
        /** 返回一个具有标签和位置（也称为帧）属性的对象数组，按位置排序。 */
        labels: Object[];
        /**
         * 指定此MovieClip应循环的次数。值-1表示它应该无限循环。值为1会导致它循环一次（即总共播放两次）。
         * @default -1
         */
        loop: number;
        /**
         * 控制此MovieClip如何推进其时间。必须是0-INDEPENDENT（独立）、1-SINGLE_FRAME（单帧）或2-SYNCHED（同步）之一。
         * 有关行为的描述，请参见每个常数。
         * @default null
         */
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

    class MovieClipPlugin {
        // methods
        tween(tween: Tween, prop: string, value: string | number | boolean, startValues: any[], endValues: any[], ratio: number, wait: Object, end: Object): void;
    }

    class Point {
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

    class Rectangle {
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


    class Shadow {
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


    class Shape extends DisplayObject {
        constructor(graphics?: Graphics);

        // properties
        graphics: Graphics;

        // methods
        clone(recursive?: boolean): Shape;
        set(props: Object): Shape;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): Shape;
    }


    class Sprite extends DisplayObject {
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

    class SpriteContainer extends Container
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
    /**
     * 封装与精灵表关联的属性和方法。精灵表是一系列图像（通常是动画帧）组合成一个或多个较大的图像。例如，一个由八个100x100图像组成的动画可以组合成一个400x200的精灵表（4帧宽，2帧高）。
     * 传递给SpriteSheet构造函数的数据定义了：
     * 1.要使用的源图像。
     * 2.单个图像帧的位置。
     * 3.形成命名动画的序列帧。可选。
     * 4.目标播放帧率。可选。
     * 
     * SpriteSheet格式
     * SpriteSheets是一个具有两个必需属性（图像和帧）和两个可选属性（帧率和动画）的对象。这使得它们很容易在javascript代码或JSON中定义。
     * 
     * 图像
     * 一组源图像。图像可以是HTMlimage实例，也可以是图像的uri。建议采用前者来控制预加载。
     * 
     * 		images: [image1, "path/to/image2.png"],
     * 
     * 帧
     * 定义各个帧。帧数据支持两种格式：当所有帧的大小都相同（在网格中）时，使用具有width、height、regX、regY和count属性的对象。
     * 1.需要宽度和高度，并指定框架的尺寸
     * 2.regX和regY表示帧的注册点或“原点”
     * 3.间距表示帧之间的间距
     * 4.margin指定图像周围的边距
     * 5.count允许您指定精灵表中的总帧数；如果省略，则将基于源图像和帧的尺寸来计算。帧将根据其在源图像中的位置（从左到右，从上到下）分配索引。
     * 
     * 		frames: {width:64, height:64, count:20, regX: 32, regY:64, spacing:0, margin:0}
     * 
     * 如果帧的大小不同，请使用帧定义数组。每个定义本身都是一个数组，其中有4个必需项和3个可选项，顺序如下：
     * 1.前四个，x、y、宽度和高度是必需的，用于定义框架矩形。
     * 2.第五个参数imageIndex指定源图像的索引（默认为0）。
     * 3.最后两个regX和regY指定帧的注册点。
     * 
     * 		frames: [
     * 		    // x, y, width, height, imageIndex*, regX*, regY*
     * 		    [64, 0, 96, 64],
     * 		    [0, 0, 64, 64, 1, 32, 32]
     * 		    // etc.
     * 		]
     * 
     * 动画
     * 可选项。定义序列帧动画的名称。每个属性对应一个同名动画。每个动画必须指定要播放的帧，还可以包括相对播放速度（例如，2将以双倍速度播放，0.5以一半速度播放），以及完成后要播放的下一个动画的名称。
     * 
     * 支持三种格式来定义动画中的帧，可以根据需要进行混合和匹配：
     * 1.对于单帧动画，您可以简单地指定帧索引
     * 
     * 		animations: {
     * 		    sit: 7
     * 		}
     * 
     * 2.对于连续帧的动画，您可以使用一个数组，其中按顺序包含两个必需项和两个可选项：开始、结束、下一步和速度。这将从头到尾播放帧。
     * 
     * 		animations: {
     * 		    // start, end, next*, speed*
     * 		    run: [0, 8],
     * 		    jump: [9, 12, "run", 2]
     * 		}
     * 
     * 3.对于非连续帧，您可以使用具有frames属性的对象来定义要按顺序播放的帧索引数组。该对象还可以指定下一步和速度属性。
     * 
     * 		animations: {
     * 		    walk: {
     * 		        frames: [1,2,3,3,2,1]
     * 		    },
     * 		    shoot: {
     * 		        frames: [1,4,5,6],
     * 		        next: "walk",
     * 		        speed: 0.5
     * 		    }
     * 		}
     * 
     * 注意：速度属性是在EaselJS 0.7.0中添加的。早期版本具有频率属性，这与速度相反。例如，在早期版本中，值“4”是正常速度的1/4，但在EaselJS 0.7.0+中是正常速度的4倍。
     * 
     * 帧速率
     * 可选。指示播放此精灵表的默认帧速率，单位为每秒帧数。有关更多信息，请参阅帧率。
     * 
     * 		framerate: 20
     * 
     * 请注意，只有在Ticker生成的tick事件中提供了阶段更新方法时，Sprite帧率才有效。
     * 
     * 		createjs.Ticker.on("tick", handleTick);
     * 		function handleTick(event) {
     * 		    stage.update(event);
     * 		}
     * 
     * 案例
     * 定义一个简单的精灵表，其中一张图像“sprites.jpg”排列规格为50x50的网格中，有三个动画：“站立”显示第一帧，“运行”循环第1-5帧，“跳跃”播放第6-8帧并按顺序返回运行。
     * 
     * 		var data = {
     * 		    images: ["sprites.jpg"],
     * 		    frames: {width:50, height:50},
     * 		    animations: {
     * 		        stand:0,
     * 		        run:[1,5],
     * 		        jump:[6,8,"run"]
     * 		    }
     * 		};
     * 		var spriteSheet = new createjs.SpriteSheet(data);
     * 		var animation = new createjs.Sprite(spriteSheet, "run");
     * 
     * 生成SpriteSheet图像
     * 可以通过在PhotoShop中组合图像并手动指定帧大小或坐标来手动创建Spritesheets，但是有许多工具可以帮助实现这一点。
     * 1.从Adobe Flash/Animate导出SpriteSheets或HTML5内容支持EaselJS SpriteSheet格式。
     * 2.流行的Texture Packer支持EaselJS。
     * 3.Adobe Flash/Animate中的SWF动画可以使用Zoë导出到SpriteSheets
     * 
     * 跨域问题
     * 警告：使用以下方式与交互时，跨源加载的图像将引发跨源安全错误：
     * 1.鼠标。
     * 2.如getObjectUnderPoint()方法。
     * 3.滤镜。
     * 4.缓存。
     * 
     * 在将图像传递给EaselJS之前，您可以通过在图像上设置crossOrigin属性来解决这个问题，或者在PreloadJS的LoadQueue或LoadItems上设置crossOrigin属性。
     * 
     * 		var img = new Image();
     * 		img.crossOrigin="Anonymous";
     * 		img.src = "http://server-with-CORS-support.com/path/to/image.jpg";
     * 
     * 如果将字符串路径传递给SpriteSheets，它们将无法跨域工作。存储图像的服务器必须支持跨域请求，否则将无法工作。有关更多信息，请查看MDN上的CORS概述。
     */
    class SpriteSheet extends EventDispatcher {
        /**
         * 
         * @param data 描述SpriteSheet数据的对象。
         */
        constructor(data: Object);

        // properties
        animations: string[];
        complete: boolean;
        framerate: number;

        // methods
        clone(): SpriteSheet;
        /**
         * 返回一个定义指定动画的对象。返回的对象包含：
         * @param name 
         */
        getAnimation(name: string): SpriteSheetAnimation;
        /**
         * @deprecated - 已弃用，使用'animations'属性代替
         */
        getAnimations(): string[];
        /**
         * 返回指定图像和指定帧的源矩形的对象。改对象具有如下属性：
         * 
         * 1.图像属性，保存对其中找到帧的图像对象的引用
         * 
         * 2.rect属性包含一个Rectangle实例，该实例定义了该图像中帧的边界。
         * 
         * 3.与帧的regX/Y值对应的regX和regY属性。
         * @param frameIndex 帧索引。
         */
        getFrame(frameIndex: number): SpriteSheetFrame;
        /**
         * 返回一个矩形实例，定义指定帧相对于原点的边界。例如，一个regX为50、regY为40的90 x 70帧将返回：
         * @param frameIndex 
         * @param rectangle 
         */
        getFrameBounds(frameIndex: number, rectangle?: Rectangle): Rectangle;
        getNumFrames(animation: string): number;
    }


    class SpriteSheetBuilder extends EventDispatcher {
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
    /**
     * SpriteSheetUtils类是用于处理SpriteSheets的静态方法的集合。精灵表是一系列图像（通常是动画帧）组合成规则网格上的单个图像。例如，一个由8个100x100图像组成的动画可以组合成一个400x200的精灵表（4帧宽2帧高）。SpriteSheetUtils类使用静态接口，不应实例化。
     */
    class SpriteSheetUtils {
        /**
         * @deprecated
         */
        static addFlippedFrames(spriteSheet: SpriteSheet, horizontal?: boolean, vertical?: boolean, both?: boolean): void; // deprecated
        /**
         * 将指定精灵表的一帧作为新的PNG图像返回。这可能有用的一个例子是使用spritesheet帧作为位图填充的源。
         * @param spriteSheet 从中提取帧的SpriteSheet实例。
         * @param frameOrAnimation 要提取的帧号或动画名称。如果指定了动画名称，则只会提取动画的第一帧。
         */
        static extractFrame(spriteSheet: SpriteSheet, frameOrAnimation: number | string): HTMLImageElement;
        /**
         * @deprecated
         */
        static mergeAlpha(rgbImage: HTMLImageElement, alphaImage: HTMLImageElement, canvas?: HTMLCanvasElement): HTMLCanvasElement; // deprecated
    }

    class SpriteStage extends Stage
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

    class Stage extends Container {
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

    class StageGL extends Stage {
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
        setClearColor(color:string|number):void;
    }

    /**
     * 显示一行或多行动态文本（不可由用户编辑）。
     * 支持基本的换行（使用lineWidth），仅在空格和制表符上换行。
     * 注意，您可以使用{@link DOMElement}将HTML文本显示在canvas的上方或下方，通过{@link localToGlobal}方法定位，以此作为输入文本使用。
     * 
     * 注意，Text不支持HTML文本，并且一个Text实例只能显示一种字体样式。要使用多种字体样式，您需要创建多个Text实例，并手动定位它们。
     * 
     * 案例：
     * ```js
     * var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
     * text.x = 100;
     * text.textBaseline = "alphabetic";
     * ```
     * CreateJS Text支持web字体（与Canvas的规则相同）。字体必须加载并由浏览器支持才能显示。
     * 
     * 注意：渲染文本可能比较消耗性能，因此尽可能缓存实例。请注意，并非所有浏览器都会呈现完全相同的文本。
     * 
     * 如果你是高手，你可以自己封装一个RichText类，哈哈哈！
     * 
     * @see http://www.createjs.com/Docs/EaselJS/classes/Text.html
     */
    class Text extends DisplayObject {
        /**
         * 
         * @param text 显示的文本
         * @param font 要使用的字体样式。CSS字体属性的任何有效值都是可以接受的（例如“bold 36px Arial”）。
         * @param color 用于绘制文本的颜色。CSS颜色属性的任何有效值都是可接受的（例如“#F00”、“red”或“#FF0000”）。
         */
        constructor(text?: string, font?: string, color?: string);

        // properties
        /** 用于绘制文本的颜色。CSS颜色属性的任何有效值都是可接受的（例如“#F00”）。默认值为“#000”。它还将接受有效的canvas fillStyle值。 */
        color: string;
        /** 要使用的字体样式。CSS字体属性的任何有效值都是可以接受的（例如“bold 36px Arial”）。 */
        font: string;
        /** 指示多行文本的行高（基线之间的垂直距离）。如果为null或0，则使用getMeasuredLineHeight的值。 */
        lineHeight: number;
        /** 指示一行文本在换行为多行之前的最大宽度。如果为null，则不会对文本进行包装。 */
        lineWidth: number;
        /** 绘制文本的最大宽度。如果指定了maxWidth（非空），文本将被压缩或缩小以适应此宽度。有关详细信息，请查看[whatwg](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles)规范。 */
        maxWidth: number;
        /** 如果大于0，文本将绘制为指定宽度的笔划（轮廓）。 */
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

    class Ticker {
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
    /**
     * 目前没有TickerEvent的定义
     */
    class TickerEvent {
        // properties
        target: Object;
        type: string;
        paused: boolean;
        delta: number;
        time: number;
        runTime: number;
    }
    /**
     * EaselJS中支持多点触摸设备的全局实用程序。目前支持W3C Touch API（iOS和现代Android浏览器）和Pointer API（IE），包括IE10中的ms-prefixed事件，以及IE11中的unfixed事件。
     * 
     * 在清理应用程序时确保禁用触摸。启用它前，您不必检查是否支持触摸，因为如果不支持触摸，它将失效。
     * 案例：
     * ```js
     * var stage = new createjs.Stage("canvasId");
     * createjs.Touch.enable(stage);
     * ```
     * 注意：当舞台不需要触摸功能时，禁用Touch非常重要：
     * ```js
     * createjs.Touch.disable(stage);
     * ```
     */
    class Touch {
        // methods
        /**
         * 调用该方法将会移除所有注册在canvas（stage.canvas）的触摸事件（包含touchstart、touchmove、touchend、touchcancel）侦听器。
         * @param stage 目标舞台。
         */
        static disable(stage: Stage): void;
        /**
         * 为舞台启用触摸事件交互，目前支持iOS（以及兼容的浏览器，如现代Android浏览器）和IE10/11。支持单点触控和多点触控模式。扩展了EaselJS {@link MouseEvent}模型，但不支持双击或over/out事件。有关详细信息，请参阅MouseEvent MouseEvent/pointerId:属性。
         * @param stage 启用触摸事件交互的舞台。
         * @param singleTouch 是否单点触摸模式，默认是false。
         * @param allowDefault 如果为真，则当用户与目标画布交互时，将允许默认手势操作（例如滚动、缩放），默认是false。
         * @returns 如果在目标舞台上成功启用了触摸，则返回true。
         */
        static enable(stage: Stage, singleTouch?: boolean, allowDefault?: boolean): boolean;
        /**
         * 如果当前浏览器支持触摸，则返回true。
         * @returns 指示当前浏览器是否支持触摸。
         */
        static isSupported(): boolean;
    }
    /**
     * 用于生成连续唯一ID号的全局实用程序。UID类使用静态接口（例如UID.get()），不应实例化。
     */
    class UID {
        // methods
        /**
         * 返回下一个唯一id。
         * @returns 下一个唯一id
         */
        static get(): number;
    }

    class CSSPlugin {
        constructor();

        // properties
        static cssSuffixMap: Object;

        // methods
        static install(): void;
    }
    /**
     * 当HTML视频进行搜索时，包括循环时，在新帧可用之前有一段不确定的时间。这可能会导致视频在绘制到画布上时闪烁或闪烁。VideoBuffer类通过将每一帧绘制到屏幕外画布并在寻道过程中保留前一帧来解决这个问题。
     * ```js
     * var myBuffer = new createjs.VideoBuffer(myVideo);
     * var myBitmap = new Bitmap(myBuffer);
     * ```
     */
    class VideoBuffer{
        /**
         * 
         * @param video 要缓冲的HTML视频元素。
         */
        constructor(video: HTMLVideoElement);
        // methods
        /**
         * 获取一个HTML画布元素，显示当前视频帧，或者在寻道/循环中显示前一帧。主要用于位图。
         * @returns 画布元素
         */
        getImage(): HTMLCanvasElement;
    }
    class Ease {
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

    class MotionGuidePlugin {
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
    class SamplePlugin {
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

    class Timeline extends EventDispatcher {
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


    class Tween extends EventDispatcher {
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

    class TweenJS {
        // properties
        static buildDate: string;
        static version: string;
    }
    class AbstractLoader extends EventDispatcher {
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

    class AbstractMediaLoader
    {
        constructor(loadItem: Object, preferXHR: boolean, type: string);
    }

    class AbstractRequest
    {
        constructor(item: LoadItem);

        cancel(): void;
        destroy(): void;
        load(): void;
    }

    class BinaryLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        // methods
        static canLoadItem(item: Object): boolean;
    }

    class CSSLoader extends AbstractLoader
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

    class ErrorEvent
    {
        constructor(title?: string, message?: string, data?: Object);

        // properties
        data: Object;
        message: string;
        title: string;
    }

    class ImageLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        static canLoadItem(item: Object): boolean;
    }

    class JavaScriptLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        static canLoadItem(item: Object): boolean;
    }

    class JSONLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        static canLoadItem(item: Object): boolean;
    }

    class JSONPLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        static canLoadItem(item: Object): boolean;
    }

    class LoadItem
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

    class LoadQueue extends AbstractLoader
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

    class ManifestLoader extends AbstractLoader
    {
        constructor(loadItem: LoadItem | Object);

        // methods
        static canLoadItem(item: LoadItem | Object): boolean;
    }

    class MediaTagRequest
    {
        constructor(loadItem: LoadItem, tag: HTMLAudioElement | HTMLVideoElement, srcAttribute: string);
    }

    class PreloadJS
    {
        static buildDate: string;
        static version: string;
    }

    class ProgressEvent
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
    class RequestUtils
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

    class SoundLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        static canLoadItem(item: Object): boolean;
    }

    class SpriteSheetLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        static canLoadItem(item: Object): boolean;
    }

    class SVGLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        static canLoadItem(item: Object): boolean;
    }

    class TagRequest
    {

    }

    class TextLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        static canLoadItem(item: Object): boolean;
    }

    class VideoLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        static canLoadItem(item: Object): boolean;
    }

    class XHRRequest extends AbstractLoader
    {
        constructor(item: Object);

        // methods
        getAllResponseHeaders(): string;
        getResponseHeader(header: string): string;
    }

    class XMLLoader extends AbstractLoader
    {
        constructor(loadItem: Object);

        static canLoadItem(item: Object): boolean;
    }
    class AbstractPlugin
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

    class AbstractSoundInstance extends EventDispatcher
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

    class FlashAudioLoader extends AbstractLoader
    {
        // properties
        flashId: string;

        // methods
        setFlash(flash: Object): void;
    }

    class FlashAudioPlugin extends AbstractPlugin
    {
        // properties
        flashReady: boolean;
        showOutput: boolean;
        static swfPath: string;

        // methods
        static isSupported(): boolean;
    }

    class FlashAudioSoundInstance extends AbstractSoundInstance
    {
        constructor(src: string, startTime: number, duration: number, playbackResource: Object);
    }

    /**
     * @deprecated - use FlashAudioPlugin
     */
    class FlashPlugin {
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

    class HTMLAudioPlugin extends AbstractPlugin
    {
        constructor();

        // properties
        defaultNumChannels: number;
        enableIOS: boolean;     // deprecated
        static MAX_INSTANCES: number;

        // methods
        static isSupported(): boolean;
    }

    class HTMLAudioSoundInstance extends AbstractSoundInstance
    {
        constructor(src: string, startTime: number, duration: number, playbackResource: Object);
    }

    class HTMLAudioTagPool
    {

    }

    class PlayPropsConfig
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

    class Sound extends EventDispatcher
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

    class SoundJS {
        static buildDate: string;
        static version: string;
    }

    class WebAudioLoader
    {
        static context: AudioContext;
    }

    class WebAudioPlugin extends AbstractPlugin
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

    class WebAudioSoundInstance extends AbstractSoundInstance
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
export default createjs;
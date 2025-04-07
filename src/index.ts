import { debounce, throttle } from "lodash";

export interface IWatermarkConfig{
    // 文字内容
    text: string;
    // 文字大小
    fontSize: number;
    // 文字颜色
    rgb:[number, number, number];
    // 文字透明度
    opacity: number;
    // 文字倾斜角度
    rotate: number;
    // 文字X轴间距
    gapX:number;
    // 文字Y轴间距
    gapY:number;
}

export class Watermark{
    private targetDom:HTMLElement;

    private watermarkImg?:string;

    private watermarkFrame?:HTMLDivElement;

    private renderLock = false;

    private config:IWatermarkConfig = {
        text: 'watermark',
        fontSize: 16,
        rgb: [0,0,0],
        rotate: -30,
        opacity:0.15,
        gapX: 200,
        gapY: 200,
    }

    async _getCanvasImg(){
        const canvas = document.createElement('canvas',{}) as HTMLCanvasElement;
        canvas.width = 2000;
        canvas.height = 2000;

        this.writeText(canvas);

        let imgData = canvas.toDataURL('image/png');
        return imgData;
    }

    async _initDom(){
        // 销毁之前的
        let watermarkDom = this.targetDom.querySelector(':scope > .watermark-frame');
        if( watermarkDom ){
            watermarkDom?.remove();
        }

        // 给父元素添加定位
        if( !this.targetDom.style.position ){
            this.targetDom.style.position = 'relative';
        }

        // 创建canvas块
        this.watermarkFrame = document.createElement('div') as HTMLDivElement;
        
        if( !this.watermarkImg ){
            this.watermarkImg = await this._getCanvasImg();
        }

        this.watermarkFrame.style = `width:100%;height:100%;position:absolute;top:0;left:0;z-index:9999;pointer-events:none;overflow:hidden;background-repeat:repeat;background-image:url(${this.watermarkImg})`;
        this.watermarkFrame.classList.add('watermark-frame');
        this.targetDom.appendChild(this.watermarkFrame);
    }

    constructor(targetDom: HTMLElement, config?: Partial<IWatermarkConfig>){
        this.targetDom = targetDom;

        this.config = {
            ...this.config,
            ...config
        };
    }

    private writeText(canvas:HTMLCanvasElement) {
        const config = this.config;
        if( !this.targetDom ) return false;

        const ctx = canvas.getContext('2d')!;
        if( !ctx ) return false;

        const text = config.text;
        ctx.font = `${config.fontSize}px Arial`

        // 获取文本的宽度
        const metrics = ctx.measureText(text)
        const textWidth = metrics.width
        const textHeight = 10

        // 旋转角度（弧度）
        const radian = (config.rotate * Math.PI) / 180

        // 旋转文本
        ctx.rotate(radian)
        // ctx.translate(canvas.width / 2, canvas.height / 2)

        ctx.fillStyle = `rgba(${config.rgb.join(',')},${config.opacity})`

        const numX = (canvas.width * 2) / textWidth
        const numY = (canvas.height * 2) / textHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < numX; i++) {
            for (let j = 0; j < numY; j++) {
                ctx.fillText(
                text,
                0 - canvas.width + i * textWidth + i * config.gapX,
                0 - canvas.height + j * textHeight + j * config.gapY,
                )
            }
        }

        return ctx;
    }

    render(){
        if( this.renderLock ) return false;
        console.log('render watermark');
        this.renderLock = true;

        this._initDom();

        setTimeout(()=>{
            this.renderLock = false;
        },500);
    }

    start(){
        this.render();
        const throttleRender = throttle(()=>{
            this.render();
        },1000)

        // 监听DOM变化
        const mObserver = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver)=>{
            const isReRender = mutations.some((mutation) => {
                
                if( 'childList' == mutation.type && mutation.removedNodes.length > 0 ){
                    // 防删
                    return Array.from(mutation.removedNodes).some((node)=>{
                        let d = node as HTMLElement;
                        return d.classList && d === this.watermarkFrame;
                    })
                }else if( mutation.type == 'attributes' && mutation.target==this.watermarkFrame){
                    // 防隐藏
                    return true;
                }
                
            });
            if(isReRender){
                throttleRender();
            }
        });
        mObserver.observe(this.targetDom, {
            attributes: true, childList: true, subtree: true
        });
    }
}
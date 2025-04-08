export interface IWatermarkConfig {
    text: string;
    fontSize: number;
    rgb: [number, number, number];
    opacity: number;
    rotate: number;
    gapX: number;
    gapY: number;
}
export declare class Watermark {
    private targetDom;
    private watermarkImg?;
    private watermarkFrame?;
    private renderLock;
    private config;
    _getCanvasImg(): Promise<string>;
    _initDom(): Promise<void>;
    constructor(targetDom: HTMLElement, config?: Partial<IWatermarkConfig>);
    private writeText;
    render(): false | undefined;
    start(): void;
}

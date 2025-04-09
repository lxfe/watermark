<h2 align="center">Watermark<br/>水印</h2>

**其他语言版本: [English](https://github.com/lxfe/watermark/blob/main/README.md), [中文](https://github.com/lxfe/watermark/blob/main/README_zh.md).**

# Watermark class

这是一个用于在网页上创建水印的 TypeScript 类。
<br/>
🎈特点功能/支持项：
- ⚠️防删：防止用户通过控制台删除该水印，即使删除了，也能立马恢复。

- 👀防隐藏：防止用户通过控制台隐藏该水印，即使隐藏了，也能立马恢复。

- 🗽配置：支持对水印的文本、大小、颜色、透明度、旋转角度、间距等进行配置。

## 配置

Watermark 类可以使用以下属性进行配置：

- `text`: 要显示为水印的文本。
- `fontSize`: 文本的大小。
- `rgb`: 文本的颜色，以 RGB 格式表示。
- `opacity`: 文本的透明度。
- `rotate`: 文本的旋转角度。
- `gapX`: 文本之间的水平间距。
- `gapY`: 文本之间的垂直间距。

## 使用方法

要使用 Watermark 类，你需要创建一个实例并调用 `start` 方法。以下是一个示例：

```typescript
import { Watermark } from '@tanzhen08/watermark';

const watermark = new Watermark(document.body, {
    text: '水印',
    fontSize: 16,
    rgb: [0, 0, 0],
    opacity: 0.15,
    rotate: -30,
    gapX: 200,
    gapY: 200,
});

watermark.start();
```

这将使用指定的配置在整个网页的主体上创建一个水印。

## 许可证

本项目采用 MIT 许可证。
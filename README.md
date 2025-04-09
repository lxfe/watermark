<h2 align="center">Watermark<br/>水印</h2>

**Read this in other languages: [English](README.md), [中文](README_zh.md).**

# Watermark Class

This is a TypeScript class for creating a watermark on a web page.
<br/>
🎈Features/support items:
- ⚠️Anti-deletion: Prevent users from deleting the watermark through the console. Even if deleted, it can be restored immediately.

- 👀Anti-hiding: Prevent users from hiding the watermark through the console. Even if hidden, it can be restored immediately.

- 🗽Configuration: Supports configuration of the watermark's text, size, color, transparency, rotation angle, spacing, etc.

## Configuration

The Watermark class can be configured with the following properties:

- `text`: The text to be displayed as the watermark.
- `fontSize`: The size of the text.
- `rgb`: The color of the text in RGB format.
- `opacity`: The opacity of the text.
- `rotate`: The rotation angle of the text.
- `gapX`: The horizontal spacing between the text.
- `gapY`: The vertical spacing between the text.

## Usage

To use the Watermark class, you need to create an instance of it and call the `start` method. Here is an example:

```typescript
import { Watermark } from '@tanzhen08/watermark';

const watermark = new Watermark(document.body, {
    text: 'watermark',
    fontSize: 16,
    rgb: [0, 0, 0],
    opacity: 0.15,
    rotate: -30,
    gapX: 200,
    gapY: 200,
});

watermark.start();
```

This will create a watermark on the entire body of the web page with the specified configuration.

## License

This project is licensed under the MIT License.
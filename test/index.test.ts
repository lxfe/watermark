import { Watermark } from "../src/index";

test("load watermark",()=>{
    console.log(new Watermark(document.getElementsByTagName("body")[0]));
    // expect(Watermark).not.toBeUndefined();
})
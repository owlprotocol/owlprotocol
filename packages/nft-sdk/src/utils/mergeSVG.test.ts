/** Tests showcasing UInt1Array use */
import { assert } from 'chai';
import { mergeSVG } from './mergeSVG.js';
import { svgToString } from './svgToString.js';

describe('mergeSVG', () => {
    it('mergeSVG', () => {
        const svg1 = '<svg>SVG1</svg>';
        const svg2 = '<svg>SVG2</svg>';
        const svg = mergeSVG([svg1, svg2]);
        const defaultMergeParams =
            // eslint-disable-next-line prettier/prettier
            "xmlns='http://www.w3.org/2000/svg'version='1.2' width='800' height='800' viewBox='0 0 800 800'";
        const expected = `<svg ${defaultMergeParams}><svg>SVG1</svg><svg>SVG2</svg></svg>`;

        assert.equal(svgToString(svg), svgToString(expected));
    });
});

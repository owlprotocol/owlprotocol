export function mergeSVG(layers: string[], width = 800, height = 800): string {
    let svg = `<svg xmlns='http://www.w3.org/2000/svg' version='1.2' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>`;
    layers.forEach((l) => {
        svg = svg + l;
    });
    svg = svg + '</svg>';
    return svg;
}

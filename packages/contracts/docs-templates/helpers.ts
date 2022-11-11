import { HelperOptions, Utils } from 'handlebars';

// import { TypeName } from 'solidity-ast';
// import { DocItemWithContext } from '../../site';

/**
 * Returns a Markdown heading marker. An optional number increases the heading level.
 *
 *    Input                  Output
 *    {{h}} {{name}}         # Name
 *    {{h 2}} {{name}}       ## Name
 */
export function h(opts: HelperOptions): string;
export function h(hsublevel: number, opts: HelperOptions): string;
export function h(hsublevel: number | HelperOptions, opts?: HelperOptions) {
    const { hlevel } = getHLevel(hsublevel, opts);
    return new Array(hlevel).fill('#').join('');
};

/**
 * Delineates a section where headings should be increased by 1 or a custom number.
 *
 *    {{#hsection}}
 *    {{>partial-with-headings}}
 *    {{/hsection}}
 */
export function hsection(opts: HelperOptions): string;
export function hsection(hsublevel: number, opts: HelperOptions): string;
export function hsection(this: unknown, hsublevel: number | HelperOptions, opts?: HelperOptions) {
    let hlevel;
    ({ hlevel, opts } = getHLevel(hsublevel, opts));
    opts.data = Utils.createFrame(opts.data);
    opts.data.hlevel = hlevel;
    return opts.fn(this as unknown, opts);
}

/**
 * Helper for dealing with the optional hsublevel argument.
 */
function getHLevel(hsublevel: number | HelperOptions, opts?: HelperOptions) {
    if (typeof hsublevel === 'number') {
        opts = opts!;
        hsublevel = Math.max(1, hsublevel);
    } else {
        opts = hsublevel;
        hsublevel = 1;
    }
    const contextHLevel: number = opts.data?.hlevel ?? 0;
    return { opts, hlevel: contextHLevel + hsublevel };
}

export function trim(text: string) {
    if (typeof text === 'string') {
        return text.trim();
    }
}

export function joinLines(text?: string) {
    if (typeof text === 'string') {
        return text.replace(/\n+/g, ' ');
    }
}

// Regular expression -> match all function names, contract names, and # to separate
const re = /{([\-#a-zA-Z0-9_]*)}/gm;
const path = './'; // todo - set this somewhere else
export function formatLinks(this: unknown, opts: HelperOptions) {
    // Render our text
    let rendered = opts.fn(this as unknown, opts);
    // Find all occurrences
    const matches = rendered.match(re);
    if (!matches) return rendered;

    // Iterate through links and format
    for (const match of matches) {
        // {ContractA#mint} => ContractA#mint
        let name = match.slice(1, match.length - 1);

        // Standardize how it's formatted
        // {ContractA-mint} => {ContractA#Mint}
        if (name.includes('-')) name = name.replace('-', '#');

        const link = getLink(name, path);

        // Set md link and update
        rendered = rendered.replace(match, link);
    }

    return rendered;
}

/**
 * Returns displayName and resource for a given artifact name
 */
function getLink(name: string, path: string) {

    let displayName = name;
    let resource = '';
    let link = '';

    // ContractA#mint => Contract.mint(...)
    displayName = displayName.replace('#', '.');

    // Split up what we're referencing
    // 'CrafterMint#deposit'.split('#') => ['CrafterMint', 'deposit']
    const components = name.split('#');

    // Add function display: deposit => deposit(...)
    if (isFunction(components[components.length - 1]))
        displayName += '(...)';

    // Either an external contract (CaseSensitive) or a local function (alllowercase)
    if (components.length == 1) {
        // Check if we need to be lowercase (is an anchor)
        if (isFunction(components[0])) {
            components[0] = components[0].toLowerCase();
            resource = '#' + components[0];
        } else {
            // Link to another page
            resource = path + components[0];
        }
    } else if (components.length == 2) {
        // Always an anchor, which must always be lower
        components[1] = components[1].toLowerCase();

        // See if we found an anchor type
        if (isAnchor(name)) {
            // Special local {#Anchor} type
            displayName = displayName.slice(1); // slice off .
            // We don't want to path anywhere else
            path = '';
        }

        // Put everything back together to a link
        resource = path + components.join('#');
    } else {
        // Unsupported format, just return
        return name;
    }

    // Generate link
    link = `[\`${displayName}\`](${resource})`;

    return link;

}

/**
 * Determines whether a specified text string is referencing a local function or
 * a separate contract.
 * {Contract#function} is not local
 * {function} is local
 */
function isFunction(name: string) {
    return (!name.includes('#') && name.length > 0 && name[0] === name[0].toLowerCase());
}

/**
 * Identify local anchors by #Item
 */
function isAnchor(name: string) {
    return (name[0] === '#');
}

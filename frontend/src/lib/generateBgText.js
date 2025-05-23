function hashFnv32a(str) {
    let hval = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    return hval >>> 0;
}

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255),
    ];
}

function getLuminance(r, g, b) {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

/**
 * Generate aesthetically distinct text colors per string.
 * @param {string} value
 * @param {number} variant optional subtle variation number
 * @returns {object} {color, isDark}
 */
export function generateTextColorFromString(value, variant = 0) {
    const baseHash = hashFnv32a(value);

    // 12 hue buckets (each 30 degrees apart)
    const bucketCount = 12;

    // Pick a bucket from the hash + variant
    const bucketIndex = (baseHash + variant) % bucketCount;

    // Hue is bucketIndex * 30 degrees + small offset from hash for variation
    const hueOffset = (baseHash % 25); // 0-24 degrees offset inside bucket
    const hue = (bucketIndex * 30 + hueOffset) % 360;

    // Saturation: 60-80%
    const saturation = 60 + ((baseHash >> 3) % 21); // 60 to 80

    // Lightness: 35-55%
    const lightness = 35 + ((baseHash >> 5) % 21); // 35 to 55

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    const [r, g, b] = hslToRgb(hue, saturation, lightness);
    const luminance = getLuminance(r, g, b);

    return {
        color,
        isDark: luminance < 0.5,
    };
}

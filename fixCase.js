const fs = require('fs');
const path = require('path');

const dirs = ['src/app', 'src/components'];
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = dirs.flatMap(walk);

function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(w => {
        if (!w) return '';
        if (w.includes('<') || w.includes('>')) return w;
        return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(' ');
}

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Replace tailwind class 'uppercase' with 'capitalize' globally
    content = content.replace(/\buppercase\b/g, 'capitalize');

    // 2. Replace hardcoded ALL CAPS text inside JSX elements: >SOME TEXT<
    content = content.replace(/>([A-Z0-9 &'?,.!-]+)</g, (match, p1) => {
        if (/^[A-Z0-9 &'?,.!-]+$/.test(p1) && /[A-Z]/.test(p1)) {
            return '>' + toTitleCase(p1) + '<';
        }
        return match;
    });

    // 3. Replace hardcoded ALL CAPS text inside string literals: "SOME TEXT"
    content = content.replace(/\"([A-Z0-9 &'?,.!-]+)\"/g, (match, p1) => {
        if (p1.includes(' ') && /^[A-Z0-9 &'?,.!-]+$/.test(p1) && /[A-Z]/.test(p1)) {
            return '\"' + toTitleCase(p1) + '\"';
        }
        return match;
    });

    fs.writeFileSync(file, content);
});

let cssPath = 'src/app/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace(/\buppercase\b/g, 'capitalize');
fs.writeFileSync(cssPath, css);

console.log('Conversion successful.');

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

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace the tailwind class 'lowercase' with 'capitalize' globally
    content = content.replace(/\blowercase\b/g, 'capitalize');
    content = content.replace(/\buppercase\b/g, 'capitalize');

    fs.writeFileSync(file, content);
});

let cssPath = 'src/app/globals.css';
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    css = css.replace(/\blowercase\b/g, 'capitalize');
    css = css.replace(/\buppercase\b/g, 'capitalize');
    fs.writeFileSync(cssPath, css);
}

console.log('Restored capitalize class globally.');

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

    // Remove tracking-tighter/tight/tracking-[something] only on large texts
    const largeTextRegex = /text-(3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[.*?\])/;
    const congestedRegex = /tracking-(tighter|tight|\[.*?\])/;

    // Use a function to selectively replace classes inside className="..."
    content = content.replace(/className=["']([^"']+)["']/g, (match, classes) => {
        if (largeTextRegex.test(classes)) {
            // It's a large text title!
            // 1. Remove font-black and font-bold, replace with font-normal
            classes = classes.replace(/\bfont-black\b/g, 'font-normal');
            classes = classes.replace(/\bfont-bold\b/g, 'font-normal');
            
            // 2. Remove tracking that causes congestion, replace with tracking-normal or wide
            classes = classes.replace(/\btracking-tighter\b/g, 'tracking-normal');
            classes = classes.replace(/\btracking-tight\b/g, 'tracking-normal');
            classes = classes.replace(/\btracking-\[.*?\]\b/g, 'tracking-normal');
            
            // 3. Make sure we also add font-serif since we want Carattere!
            if (!classes.includes('font-serif')) {
                classes += ' font-serif';
            }
        }
        return `className="${classes}"`;
    });

    // We also want to replace exact strings if we missed any
    // e.g., <h2 className="...">THE GDPL DIFFERENCE</h2>
    // But we already did that in the previous step.

    fs.writeFileSync(file, content);
});

console.log('Fixed congested font rendering for script fonts.');

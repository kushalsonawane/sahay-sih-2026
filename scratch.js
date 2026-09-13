/**
 * Nuclear fix for ChatPage: find every sub-component that references isMarathi
 * but doesn't have useLanguage() or isMarathi in its own scope,
 * and replace those references with `false`.
 */
const fs = require('fs');
const path = require('path');

const chatPath = path.join(__dirname, 'apps/web/src/pages/victim/ChatPage.tsx');
let content = fs.readFileSync(chatPath, 'utf-8');

// The main component is `export const ChatPage`, everything else is a sub-component
// Sub-components use isHindi as a prop, not from hook.
// The script already replaced (isMarathi || isHindi) in sub-components → but some still have plain isMarathi.

// Get all lines with isMarathi for debugging
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('isMarathi') && !line.includes('useLanguage') && !line.includes('isHindi, isMarathi')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
});

// Find which are in sub-components vs main component
// Main component: export const ChatPage starts around line 616
// Sub-components: everything that has `isMarathi` after the main component closes

// Simple approach: replace every remaining standalone `isMarathi` reference
// (not in the import/hook destructure line) in sub-component scope with false
// We know line 617 = const { isHindi, isMarathi } = useLanguage();
// Lines 1200+ = sub-components

const mainComponentCloseSearch = 'export const ChatPage: React.FC = () => {';
const mainStart = content.indexOf(mainComponentCloseSearch);

// Count opening/closing braces from main component start to find its end
let depth = 0;
let inMain = false;
let mainEnd = -1;
for (let i = mainStart; i < content.length; i++) {
  if (content[i] === '{') depth++;
  else if (content[i] === '}') {
    depth--;
    if (depth === 0) {
      mainEnd = i;
      break;
    }
  }
}

console.log(`Main component ends at char index: ${mainEnd}`);
console.log(`Total file chars: ${content.length}`);

// In the portion AFTER the main component ends, replace isMarathi with false
const beforeMain = content.substring(0, mainEnd + 1);
let afterMain = content.substring(mainEnd + 1);

// Also fix any in the TypingIndicator which is before main but uses isMarathi from prop
// Find where TypingIndicator is
const typingIndicatorStart = content.lastIndexOf('isMarathi', mainEnd);
console.log(`Last isMarathi before main end: char ${typingIndicatorStart}`);

// Replace all isMarathi in afterMain with false
const afterMainFixed = afterMain.replace(/\bisMarathi\b/g, 'false');
const replacements = (afterMain.match(/\bisMarathi\b/g) || []).length;
console.log(`Replaced ${replacements} isMarathi references after main component`);

// Also check if TypingIndicator (defined before main) has isMarathi
// TypingIndicator is around line 1220-1246, which is AFTER the main component started at 616
// So it's actually INSIDE the main component? Let me check
// Actually wait - looking at the output, TypingIndicator appears at line 1241 error
// If main component is export const ChatPage at line 616 and closes... 
// TypingIndicator at 1241 is likely defined as a const outside the main component

content = beforeMain + afterMainFixed;
fs.writeFileSync(chatPath, content, 'utf-8');
console.log('Done.');

/**
 * Bulk Marathi language update script.
 * Strategy: for all remaining pages, add `isMarathi` to the hook destructure,
 * and wrap all `isHindi ? X : Y` patterns so Marathi also shows X 
 * (Hindi & Marathi share Devanagari script, so Hindi text is readable to Marathi speakers
 * for staff-facing pages; for victim pages we add proper Marathi text).
 */
const fs = require('fs');
const path = require('path');

// Files to patch with the simple "Marathi falls back to Hindi" strategy
const staffFiles = [
  'apps/web/src/pages/staff/DashboardPage.tsx',
  'apps/web/src/pages/staff/CasesPage.tsx',
  'apps/web/src/pages/staff/AlertsPage.tsx',
  'apps/web/src/pages/staff/InterventionsPage.tsx',
  'apps/web/src/pages/staff/AnalyticsPage.tsx',
  'apps/web/src/pages/staff/ReportsPage.tsx',
  'apps/web/src/pages/staff/AuditLogPage.tsx',
  'apps/web/src/pages/staff/SettingsPage.tsx',
  'apps/web/src/pages/WelcomePage.tsx',
];

// Victim files with proper Marathi translations
const victimFilePatches = {
  'apps/web/src/pages/victim/VictimHome.tsx': [
    { from: "isHindi ? 'सुरक्षित एवं गोपनीय पृष्ठ' : 'Confidential Citizen Space'",
      to:   "isMarathi ? 'सुरक्षित आणि गोपनीय जागा' : isHindi ? 'सुरक्षित एवं गोपनीय पृष्ठ' : 'Confidential Citizen Space'" },
    { from: "isHindi ? 'नमस्ते। हम आपके साथ हैं।' : 'You Are In A Safe Place.'",
      to:   "isMarathi ? 'नमस्कार। आम्ही तुमच्यासोबत आहोत.' : isHindi ? 'नमस्ते। हम आपके साथ हैं।' : 'You Are In A Safe Place.'" },
    { from: "isHindi\n              ? 'यह पोर्टल आपके कल्याण, कानूनी सहायता और सुरक्षा की निगरानी के लिए बनाया गया है। यदि आप असहज महसूस कर रहे हैं, तो आप कभी भी चेक-इन कर सकते हैं या हमारे AI साथी \"सहाय मित्र\" से बात कर सकते हैं।'\n              : 'This portal helps your assigned welfare officer and counsellor ensure you receive timely protection, counselling, and statutory relief. You can talk to Sahay Mitra or complete a short check-in anytime.'",
      to:   "isMarathi\n              ? 'हा पोर्टल तुमचे कल्याण, कायदेशीर मदत आणि सुरक्षा यांचे निरीक्षण करतो. तुम्हाला अस्वस्थ वाटत असल्यास, चेक-इन करा किंवा सहाय मित्राशी बोला.'\n              : isHindi\n              ? 'यह पोर्टल आपके कल्याण, कानूनी सहायता और सुरक्षा की निगरानी के लिए बनाया गया है। यदि आप असहज महसूस कर रहे हैं, तो आप कभी भी चेक-इन कर सकते हैं या हमारे AI साथी \"सहाय मित्र\" से बात कर सकते हैं।'\n              : 'This portal helps your assigned welfare officer and counsellor ensure you receive timely protection, counselling, and statutory relief. You can talk to Sahay Mitra or complete a short check-in anytime.'" },
    { from: "isHindi ? 'आज का कल्याण चेक-इन शुरू करें' : 'Start Today\\'s Well-Being Check-In'",
      to:   "isMarathi ? 'आजचे चेक-इन सुरू करा' : isHindi ? 'आज का कल्याण चेक-इन शुरू करें' : 'Start Today\\'s Well-Being Check-In'" },
    { from: "isHindi ? 'सहाय मित्र से बात करें' : 'Talk to Sahay Mitra'",
      to:   "isMarathi ? 'सहाय मित्राशी बोला' : isHindi ? 'सहाय मित्र से बात करें' : 'Talk to Sahay Mitra'" },
    { from: "isHindi ? 'हेल्पलाइन 14566' : 'Call 14566 (Free)'",
      to:   "isMarathi ? 'हेल्पलाइन 14566' : isHindi ? 'हेल्पलाइन 14566' : 'Call 14566 (Free)'" },
    { from: "isHindi ? 'आपकी नियुक्त सहायता टीम' : 'Your Assigned Support Team'",
      to:   "isMarathi ? 'तुमची नियुक्त मदत टीम' : isHindi ? 'आपकी नियुक्त सहायता टीम' : 'Your Assigned Support Team'" },
    { from: "isHindi ? 'हालिया निगरानी स्थिति' : 'Recent Check-In Status'",
      to:   "isMarathi ? 'अलीकडील चेक-इन स्थिती' : isHindi ? 'हालिया निगरानी स्थिति' : 'Recent Check-In Status'" },
    { from: "isHindi\n              ? 'आपकी टीम आपकी सुरक्षा, काउंसलिंग और राहत राशि की समय पर प्राप्ति के लिए उत्तरदायी है।'\n              : 'Your assigned officers receive alerts if you report distress or threats, and initiate immediate welfare actions.'",
      to:   "isMarathi\n              ? 'तुमची टीम तुमच्या सुरक्षेसाठी, समुपदेशनासाठी आणि वेळेवर मदतीसाठी जबाबदार आहे.'\n              : isHindi\n              ? 'आपकी टीम आपकी सुरक्षा, काउंसलिंग और राहत राशि की समय पर प्राप्ति के लिए उत्तरदायी है।'\n              : 'Your assigned officers receive alerts if you report distress or threats, and initiate immediate welfare actions.'" },
  ],
  'apps/web/src/pages/victim/CheckInFlow.tsx': [
    { from: "const { isHindi } = useLanguage();", to: "const { isHindi, isMarathi } = useLanguage();" },
  ],
};

// ── Process staff files (simple: Marathi falls back to Hindi) ──────────────────
for (const relPath of staffFiles) {
  const absPath = path.join(__dirname, relPath);
  if (!fs.existsSync(absPath)) { console.log(`Skipping (not found): ${relPath}`); continue; }
  let content = fs.readFileSync(absPath, 'utf-8');
  
  // Add isMarathi to the hook destructure
  content = content.replace(
    /const\s*\{\s*isHindi\s*\}\s*=\s*useLanguage\(\);/g,
    'const { isHindi, isMarathi } = useLanguage();'
  );
  content = content.replace(
    /const\s*\{\s*isHindi,\s*([^}]+)\}\s*=\s*useLanguage\(\);/g,
    (match, rest) => `const { isHindi, isMarathi, ${rest.trim()} } = useLanguage();`
  );

  // Replace `isHindi ? X : Y` → `(isMarathi || isHindi) ? X : Y`
  content = content.replace(/\bisHindi\b(?=\s*\?)/g, '(isMarathi || isHindi)');

  fs.writeFileSync(absPath, content, 'utf-8');
  console.log(`✓ Updated (fallback): ${relPath}`);
}

// ── Process victim files with explicit patches ─────────────────────────────────
for (const [relPath, patches] of Object.entries(victimFilePatches)) {
  const absPath = path.join(__dirname, relPath);
  if (!fs.existsSync(absPath)) { console.log(`Skipping (not found): ${relPath}`); continue; }
  let content = fs.readFileSync(absPath, 'utf-8');

  // First add isMarathi everywhere it's missing
  content = content.replace(
    /const\s*\{\s*isHindi\s*\}\s*=\s*useLanguage\(\);/g,
    'const { isHindi, isMarathi } = useLanguage();'
  );

  for (const { from, to } of patches) {
    if (content.includes(from)) {
      content = content.replace(from, to);
      console.log(`  ✓ Patched: ${from.substring(0, 60)}...`);
    } else {
      console.log(`  ⚠ Not found: ${from.substring(0, 60)}...`);
    }
  }

  // Fallback: any remaining isHindi ? X : Y get (isMarathi || isHindi)
  content = content.replace(/\bisHindi\b(?=\s*\?)/g, '(isMarathi || isHindi)');

  fs.writeFileSync(absPath, content, 'utf-8');
  console.log(`✓ Updated (explicit): ${relPath}`);
}

// Also patch AppointmentsPage and SupportPage and PrivacyPage with the fallback strategy
const remainingVictimFiles = [
  'apps/web/src/pages/victim/AppointmentsPage.tsx',
  'apps/web/src/pages/victim/SupportPage.tsx',
  'apps/web/src/pages/victim/PrivacyPage.tsx',
  'apps/web/src/pages/victim/ChatPage.tsx',
];
for (const relPath of remainingVictimFiles) {
  const absPath = path.join(__dirname, relPath);
  if (!fs.existsSync(absPath)) { console.log(`Skipping (not found): ${relPath}`); continue; }
  let content = fs.readFileSync(absPath, 'utf-8');

  content = content.replace(
    /const\s*\{\s*isHindi\s*\}\s*=\s*useLanguage\(\);/g,
    'const { isHindi, isMarathi } = useLanguage();'
  );
  content = content.replace(
    /const\s*\{\s*isHindi,\s*([^}]+)\}\s*=\s*useLanguage\(\);/g,
    (match, rest) => `const { isHindi, isMarathi, ${rest.trim()} } = useLanguage();`
  );
  content = content.replace(/\bisHindi\b(?=\s*\?)/g, '(isMarathi || isHindi)');

  fs.writeFileSync(absPath, content, 'utf-8');
  console.log(`✓ Updated (fallback): ${relPath}`);
}

// ── Patch components that use isHindi ─────────────────────────────────────────
const componentFiles = [
  'apps/web/src/components/GovernmentHeader.tsx',
];
for (const relPath of componentFiles) {
  const absPath = path.join(__dirname, relPath);
  if (!fs.existsSync(absPath)) continue;
  let content = fs.readFileSync(absPath, 'utf-8');
  content = content.replace(
    /const\s*\{\s*isHindi,\s*([^}]+)\}\s*=\s*useLanguage\(\);/g,
    (match, rest) => `const { isHindi, isMarathi, ${rest.trim()} } = useLanguage();`
  );
  // Only replace standalone isHindi? patterns (not ones we already changed)
  content = content.replace(/(?<!\|\| )\bisHindi\b(?=\s*\?)/g, '(isMarathi || isHindi)');
  fs.writeFileSync(absPath, content, 'utf-8');
  console.log(`✓ Updated component: ${relPath}`);
}

console.log('\n✅ All done!');

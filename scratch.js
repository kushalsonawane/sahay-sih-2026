const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'apps/web/src/pages/LandingPage.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace useLanguage hook
content = content.replace('const { isHindi } = useLanguage();', 'const { isHindi, isMarathi } = useLanguage();');

// Replacements array
const replacements = [
  {
    regex: /\{isHindi \? 'नवीनतम अधिसूचना' : 'Official Notification'\}/g,
    replace: "{isMarathi ? 'अधिकृत सूचना' : isHindi ? 'नवीनतम अधिसूचना' : 'Official Notification'}"
  },
  {
    regex: /\{isHindi\s*\?\s*'अनुसूचित जाति एवं अनुसूचित जनजाति \(अत्याचार निवारण\) नियम 12\(4\) के अंतर्गत पीड़ितों को 7 कार्यदिवसों में 25% प्रथम किश्त का प्रत्यक्ष लाभ अंतरण \(DBT\) अनिवार्य है।'\s*:\s*'Rule 12\(4\) SC\/ST PoA Rules mandates release of initial 25% statutory economic relief within 7 working days of FIR registration across all districts\.'\}/g,
    replace: "{isMarathi\n              ? 'अनुसूचित जाती व जमाती (अत्याचार प्रतिबंध) नियम १२(४) अंतर्गत ७ कामकाजाच्या दिवसांत २५% कायदेशीर आर्थिक मदत देणे अनिवार्य आहे.'\n              : isHindi\n              ? 'अनुसूचित जाति एवं अनुसूचित जनजाति (अत्याचार निवारण) नियम 12(4) के अंतर्गत पीड़ितों को 7 कार्यदिवसों में 25% प्रथम किश्त का प्रत्यक्ष लाभ अंतरण (DBT) अनिवार्य है।'\n              : 'Rule 12(4) SC/ST PoA Rules mandates release of initial 25% statutory economic relief within 7 working days of FIR registration across all districts.'}"
  },
  {
    regex: /\{isHindi\s*\?\s*'सहाय \(SAHAY\) — राष्ट्रीय अत्याचार निवारण निगरानी, संकट पूर्वानुमान एवं वैधानिक राहत प्रणाली'\s*:\s*'SAHAY — National Portal for Atrocity Distress Monitoring, Rule 12 Relief & Section 15A Witness Protection'\}/g,
    replace: "{isMarathi\n                ? 'सहाय (SAHAY) — राष्ट्रीय अत्याचार संकट देखरेख आणि कायदेशीर मदत प्रणाली'\n                : isHindi\n                ? 'सहाय (SAHAY) — राष्ट्रीय अत्याचार निवारण निगरानी, संकट पूर्वानुमान एवं वैधानिक राहत प्रणाली'\n                : 'SAHAY — National Portal for Atrocity Distress Monitoring, Rule 12 Relief & Section 15A Witness Protection'}"
  },
  {
    regex: /\{isHindi \? 'हितधारक एवं उपयोगकर्ता पोर्टल \(\#users\)' : 'Stakeholder & User Portals \(\#users\)'\}/g,
    replace: "{isMarathi ? 'हितधारक आणि वापरकर्ता पोर्टल (#users)' : isHindi ? 'हितधारक एवं उपयोगकर्ता पोर्टल (#users)' : 'Stakeholder & User Portals (#users)'}"
  },
  {
    regex: /\{isHindi \? 'नागरिक एवं पीड़ित सुरक्षित पोर्टल' : 'Citizen & Beneficiary Safe Space'\}/g,
    replace: "{isMarathi ? 'नागरिक व लाभार्थी सुरक्षित जागा' : isHindi ? 'नागरिक एवं पीड़ित सुरक्षित पोर्टल' : 'Citizen & Beneficiary Safe Space'}"
  },
  {
    regex: /\{isHindi \? 'नागरिक सुरक्षित पोर्टल में प्रवेश करें →' : 'Enter Citizen Safe Portal →'\}/g,
    replace: "{isMarathi ? 'नागरिक सुरक्षित पोर्टल प्रविष्ट करा →' : isHindi ? 'नागरिक सुरक्षित पोर्टल में प्रवेश करें →' : 'Enter Citizen Safe Portal →'}"
  },
  {
    regex: /\{isHindi \? 'जिला दंडाधिकारी एवं अधिकारी कंसोल' : 'District Magistrate & Officer Console'\}/g,
    replace: "{isMarathi ? 'जिल्हा दंडाधिकारी आणि अधिकारी कन्सोल' : isHindi ? 'जिला दंडाधिकारी एवं अधिकारी कंसोल' : 'District Magistrate & Officer Console'}"
  },
  {
    regex: /\{isHindi \? 'प्रशासनिक कंसोल में प्रवेश करें →' : 'Enter District Officer Console →'\}/g,
    replace: "{isMarathi ? 'प्रशासकीय कन्सोल प्रविष्ट करा →' : isHindi ? 'प्रशासनिक कंसोल में प्रवेश करें →' : 'Enter District Officer Console →'}"
  },
  {
    regex: /\{isHindi \? 'क्लिनिकल मनोवैज्ञानिक कंसोल' : 'Clinical Psychologist Console'\}/g,
    replace: "{isMarathi ? 'क्लिनिकल सायकोलॉजिस्ट कन्सोल' : isHindi ? 'क्लिनिकल मनोवैज्ञानिक कंसोल' : 'Clinical Psychologist Console'}"
  },
  {
    regex: /\{isHindi \? 'क्लिनिकल कंसोल में प्रवेश करें →' : 'Enter Counsellor Console →'\}/g,
    replace: "{isMarathi ? 'सल्लागार कन्सोल प्रविष्ट करा →' : isHindi ? 'क्लिनिकल कंसोल में प्रवेश करें →' : 'Enter Counsellor Console →'}"
  },
  {
    regex: /\{isHindi \? 'मंत्रालय एवं राज्य निदेशालय डैशबोर्ड' : 'Ministry Directorate & State Analytics'\}/g,
    replace: "{isMarathi ? 'संचालनालय व राज्य विश्लेषण' : isHindi ? 'मंत्रालय एवं राज्य निदेशालय डैशबोर्ड' : 'Ministry Directorate & State Analytics'}"
  },
  {
    regex: /\{isHindi \? 'मंत्रालय डैशबोर्ड में प्रवेश करें →' : 'Enter Directorate Analytics →'\}/g,
    replace: "{isMarathi ? 'संचालनालय विश्लेषण प्रविष्ट करा →' : isHindi ? 'मंत्रालय डैशबोर्ड में प्रवेश करें →' : 'Enter Directorate Analytics →'}"
  },
  {
    regex: /\{isHindi \? 'नवीनतम परिपत्र, अधिसूचनाएं एवं आदेश' : 'Latest Circulars, Notifications & Government Orders'\}/g,
    replace: "{isMarathi ? 'नवीनतम परिपत्रके, अधिसूचना व सरकारी आदेश' : isHindi ? 'नवीनतम परिपत्र, अधिसूचनाएं एवं आदेश' : 'Latest Circulars, Notifications & Government Orders'}"
  },
  {
    regex: /\{isHindi\s*\?\s*'वैधानिक आर्थिक राहत अनुसूची — नियम 12\(4\) अनुलग्नक-I'\s*:\s*'Statutory Economic Relief Scales — Rule 12\(4\) Annexure-I'\}/g,
    replace: "{isMarathi\n                  ? 'कायदेशीर आर्थिक मदत — नियम १२(४) परिशिष्ट-१'\n                  : isHindi\n                  ? 'वैधानिक आर्थिक राहत अनुसूची — नियम 12(4) अनुलग्नक-I'\n                  : 'Statutory Economic Relief Scales — Rule 12(4) Annexure-I'}"
  }
];

replacements.forEach(rep => {
  content = content.replace(rep.regex, rep.replace);
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Updated LandingPage.tsx successfully.');

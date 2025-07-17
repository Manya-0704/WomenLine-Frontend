const translations = {
  en: {
    mainHeading: "Join Hands With Women, For Women, Through WomenLine.",
    mainSubheading: "Womenline is AI-powered, multilingual, and culturally intelligent personal wellness platform for women across all life stages",
    getStarted: "Get Started",
    feature1: "Period & Hormonal Health",
    feature1desc: "Track your cycle, symptoms, and hormonal health with privacy-first tools.",
    feature2: "Mental Wellness",
    feature2desc: "Mood tracking, CBT, gratitude journaling, and emotional support.",
    feature3: "Legal & Safety",
    feature3desc: "Abuse helplines, legal rights, and anonymous complaint submission.",
    navHome: "Home",
    navLogin: "Login",
    navSignup: "Sign Up",
    navHealth: "Health Info",
    navMaCoin: "MaCoin"
  },
  hi: {
    mainHeading: "महिलाओं के लिए, महिलाओं के साथ, WomenLine के माध्यम से जुड़ें।",
    mainSubheading: "Womenline एक एआई-संचालित, बहुभाषी, और सांस्कृतिक रूप से बुद्धिमान व्यक्तिगत वेलनेस प्लेटफॉर्म है।",
    getStarted: "शुरू करें",
    feature1: "मासिक धर्म और हार्मोनल स्वास्थ्य",
    feature1desc: "गोपनीयता के साथ अपने चक्र, लक्षण और हार्मोनल स्वास्थ्य को ट्रैक करें।",
    feature2: "मानसिक स्वास्थ्य",
    feature2desc: "मूड ट्रैकिंग, CBT, आभार जर्नलिंग, और भावनात्मक समर्थन।",
    feature3: "कानूनी और सुरक्षा",
    feature3desc: "दुरुपयोग हेल्पलाइन, कानूनी अधिकार, और गुमनाम शिकायत।",
    navHome: "होम",
    navLogin: "लॉगिन",
    navSignup: "साइन अप",
    navHealth: "स्वास्थ्य जानकारी",
    navMaCoin: "मा कॉइन"
  },
  ta: {
    mainHeading: "பெண்களுக்கு, பெண்களுடன், WomenLine மூலம் இணைக.",
    mainSubheading: "Womenline என்பது ஏஐ இயக்கும், பன்மொழி மற்றும் கலாச்சார அறிவு கொண்ட நலவாழ்வு தளம்.",
    getStarted: "தொடங்கவும்",
    feature1: "மாதவிடாய் மற்றும் ஹார்மோன் ஆரோக்கியம்",
    feature1desc: "உங்கள் சுழற்சி, அறிகுறிகள் மற்றும் ஹார்மோன் ஆரோக்கியத்தை தனிப்பட்ட முறையில் கண்காணிக்கவும்.",
    feature2: "மனநலம்",
    feature2desc: "மனநிலை கண்காணிப்பு, CBT, நன்றி பதிவு மற்றும் உணர்ச்சி ஆதரவு.",
    feature3: "சட்டம் மற்றும் பாதுகாப்பு",
    feature3desc: "தவறான நடத்தை உதவி, சட்ட உரிமைகள் மற்றும் பெயர் தெரியாத புகார்.",
    navHome: "முகப்பு",
    navLogin: "உள்நுழைவு",
    navSignup: "பதிவு",
    navHealth: "ஆரோக்கியம்",
    navMaCoin: "மா நாணயம்"
  }
};

document.getElementById('langSwitcher').addEventListener('change', function() {
  const lang = this.value;
  Object.keys(translations[lang]).forEach(key => {
    const el = document.getElementById(key);
    if (el) el.textContent = translations[lang][key];
  });
  // Update nav links
  const navIds = ['navHome', 'navLogin', 'navSignup', 'navHealth', 'navMaCoin'];
  navIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && translations[lang][id]) el.textContent = translations[lang][id];
  });
}); 
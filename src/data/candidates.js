const firstNames = ["Arjun","Priya","Rahul","Ananya","Vikram","Sneha","Rohan","Kavya","Aditya","Meera",
  "Karan","Pooja","Nikhil","Divya","Siddharth","Riya","Harsh","Tanya","Akash","Shreya",
  "Varun","Nisha","Deepak","Simran","Rajesh","Anjali","Mohit","Swati","Vivek","Kritika",
  "Gaurav","Neha","Aman","Preeti","Shubham","Sakshi","Tushar","Sonali","Abhishek","Komal",
  "Piyush","Mansi","Yash","Bhavna","Tarun","Jyoti","Nitin","Pallavi","Saurabh","Rekha",
  "Arun","Sunita","Ajay","Geeta","Suresh","Usha","Ramesh","Lata","Mahesh","Sona",
  "Dev","Mia","Noah","Emma","Liam","Olivia","Lucas","Ava","Mason","Isabella",
  "Ethan","Sophia","Oliver","Mia","Aiden","Charlotte","James","Amelia","Logan","Harper"];

const lastNames = ["Sharma","Patel","Singh","Kumar","Gupta","Verma","Joshi","Mehta","Shah","Rao",
  "Nair","Reddy","Pillai","Iyer","Menon","Bose","Das","Chatterjee","Banerjee","Mukherjee",
  "Tiwari","Pandey","Mishra","Dubey","Yadav","Srivastava","Malhotra","Kapoor","Bajaj","Chopra",
  "Williams","Johnson","Brown","Jones","Garcia","Miller","Davis","Wilson","Moore","Taylor",
  "Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Martinez","Robinson","Clark"];

const colleges = [
  "IIT Bombay","IIT Delhi","IIT Madras","IIT Kanpur","IIT Kharagpur",
  "NIT Trichy","NIT Warangal","NIT Surathkal","BITS Pilani","BITS Hyderabad",
  "VIT Vellore","SRM Chennai","Manipal Institute","IIIT Hyderabad","IIIT Bangalore",
  "DTU Delhi","NSIT Delhi","Jadavpur University","Anna University","Pune University",
  "Amity University","Symbiosis Institute","BMS College","RV College","PES University",
  "MIT Manipal","Thapar University","LPU","Chandigarh University","Shiv Nadar University",
];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function weightedScore() {
  // More realistic distribution — mostly 40–85 range
  const base = rand(40, 95);
  const noise = rand(-5, 5);
  return Math.max(0, Math.min(100, base + noise));
}

export function generateCandidates(count = 100) {
  const used = new Set();
  return Array.from({ length: count }, (_, i) => {
    let name;
    do {
      const fn = firstNames[rand(0, firstNames.length - 1)];
      const ln = lastNames[rand(0, lastNames.length - 1)];
      name = `${fn} ${ln}`;
    } while (used.has(name) && used.size < firstNames.length * lastNames.length);
    used.add(name);

    return {
      id: i + 1,
      name,
      college: colleges[rand(0, colleges.length - 1)],
      assignment_score: weightedScore(),
      video_score: weightedScore(),
      ats_score: weightedScore(),
      github_score: weightedScore(),
      communication_score: weightedScore(),
      applied_date: new Date(Date.now() - rand(1, 30) * 86400000).toLocaleDateString("en-IN"),
      experience: `${rand(0, 3)} yrs`,
    };
  });
}

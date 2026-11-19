// Everything about you lives here. Edit this file to update the whole site.

export const profile = {
  name: 'Ammar Zeyad',
  role: 'Junior DevOps & Cloud Engineer',
  location: 'Amman, Jordan → relocating to the UK',
  tagline:
    'From three and a half years in IT support to containers, CI/CD and cloud. This is where I document everything I learn along the way.',
  now: {
    label: 'Currently building',
    text: 'Containerising a five-service booking platform (FastAPI, PostgreSQL, Redis, RabbitMQ), heading next into CI/CD, Kubernetes and Terraform on AWS.',
  },
  studying: 'MSc Computer Science (online), University of East London',
  rightToWork: 'Right to work in the UK: Graduate visa valid to July 2027.',
  email: 'ammarzeyad00@outlook.com',
  links: {
    github: 'https://github.com/AmmarZeyad0',
    linkedin: 'https://www.linkedin.com/in/ammar-zeyad',
    credly: 'https://www.credly.com/users/ammar-zeyad',
  },
  languages: ['English (fluent)', 'Arabic (native)'],
};

export const skills: { group: string; items: string[] }[] = [
  { group: 'Cloud (AWS)', items: ['EC2', 'VPC', 'IAM', 'S3', 'CloudWatch', 'Security groups'] },
  { group: 'Containers', items: ['Docker', 'Docker Compose', 'Kubernetes', 'Nginx'] },
  { group: 'CI/CD', items: ['GitHub Actions', 'Jenkins'] },
  { group: 'Infrastructure as code', items: ['Terraform'] },
  { group: 'Monitoring', items: ['Prometheus', 'Grafana'] },
  { group: 'Linux & scripting', items: ['Linux administration', 'Bash', 'SSH', 'cron', 'Troubleshooting'] },
  { group: 'Networking & security', items: ['Networking fundamentals', 'VPN & remote access', 'Access control'] },
  { group: 'Data services (containerised)', items: ['PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ'] },
  { group: 'Version control', items: ['Git', 'GitHub', 'GitLab'] },
];

export const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services',
    date: 'Dec 2025 · valid to Dec 2028',
    url: 'https://www.credly.com/users/ammar-zeyad',
  },
  { name: 'Introduction to Linux (LFS101)', issuer: 'The Linux Foundation' },
  { name: 'Introduction to Kubernetes (LFS158)', issuer: 'The Linux Foundation', date: 'May 2026', url: '/certificates' },
  { name: 'Cloud-Native Tools & CNCF Ecosystem Mentorship', issuer: 'Qualify U', date: 'Jul 2026', url: '/certificates' },
  { name: 'Jenkins Skill Tree', issuer: 'LabEx', date: 'Feb 2026', url: '/certificates' },
  { name: 'Intermediate Software Development (301, 302, 303)', issuer: 'Code Fellows', date: '2021' },
];

export const experience = [
  {
    role: 'IT Support',
    org: 'Al Bait Company · Amman',
    period: 'Mar 2021 – Sep 2024',
    points: [
      'Set up workstations, troubleshot connectivity problems and maintained systems for staff across the business.',
      'Supported the network and remote access, keeping VPN connections working and applying basic security configuration.',
      'Resolved day-to-day IT issues and agreed priorities with business stakeholders.',
      'Kept internal documentation, issue tracking and operational reports up to date.',
    ],
  },
  {
    role: 'IT Consultant & Project Liaison',
    org: 'Al Diken Bros. · Amman',
    period: 'Jun 2023 – Jan 2024',
    points: [
      'Main contact with an external vendor building a Delivery Management System, turning business needs into technical requirements.',
      'Documented workflows and functional requirements, and tracked development tasks.',
      'Helped automate repetitive customer communication workflows.',
      'Standardised task tracking across teams with Slack and Trello.',
    ],
  },
  {
    role: 'Full Stack Development Intern (part-time)',
    org: 'Epic Academy by Aspire · Amman',
    period: 'Jan 2023 – Mar 2023',
    points: ['Built web interfaces in React and connected them to backend APIs.', 'Worked in Agile sprints with a development team.'],
  },
];

export const education = [
  { degree: 'MSc Computer Science (online)', school: 'University of East London', period: 'Sep 2026 – present' },
  { degree: 'BSc (Hons) Information Technology', school: 'University of the West of England, Bristol', period: '2024 – 2025' },
  { degree: 'Higher International Diploma in Software Engineering', school: 'Luminus Technical University College', period: '2020 – 2022' },
];

// Certificates shown on /certificates and on the home page.
// Files live in public/certificates/ (the PDF/PNG) and public/certificates/thumbs/ (preview JPG).
// To add one: drop the file + a preview image in those folders and add an entry here.

export type Cert = {
  id: string;            // file name without extension
  title: string;
  issuer: string;
  date: string;          // ISO date, used for sorting
  file: string;          // extension of the original file
  category: 'Cloud' | 'DevOps' | 'Kubernetes' | 'Git' | 'Foundations' | 'Web';
  featured?: boolean;
  note?: string;
  verify?: string;
};

export const certificates: Cert[] = [
  { id: 'aws-certified-cloud-practitioner', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2025-12-08', file: 'pdf', category: 'Cloud', featured: true, note: 'CLF-C02 · valid to Dec 2028', verify: 'https://www.credly.com/users/ammar-zeyad' },
  { id: 'qualify-u-cloud-native-mentorship', title: 'Cloud-Native Tools & CNCF Ecosystem Mentorship', issuer: 'Qualify U', date: '2026-07-31', file: 'pdf', category: 'DevOps', featured: true, note: '27 guided 1-on-1 sessions · CI/CD, observability, GitOps' },
  { id: 'linux-foundation-intro-kubernetes-lfs158', title: 'Introduction to Kubernetes (LFS158)', issuer: 'The Linux Foundation', date: '2026-05-06', file: 'pdf', category: 'Kubernetes', featured: true },
  { id: 'gitmastery-git-fundamentals', title: 'Git Fundamentals', issuer: 'GitMastery', date: '2026-10-05', file: 'png', category: 'Git', note: '18 hands-on levels' },
  { id: 'labex-jenkins', title: 'Jenkins Skill Tree', issuer: 'LabEx', date: '2026-02-04', file: 'png', category: 'DevOps' },
  { id: 'dolfined-it-cloud-devops-fundamentals', title: 'IT, Cloud, TCP/IP & DevOps Fundamentals', issuer: 'DolfinED', date: '2025-12-19', file: 'pdf', category: 'DevOps' },
  { id: 'kodekloud-git-for-beginners', title: 'Git for Beginners', issuer: 'KodeKloud', date: '2025-12-12', file: 'pdf', category: 'Git' },
  { id: 'aws-cloud-practitioner-essentials', title: 'AWS Cloud Practitioner Essentials', issuer: 'AWS Training & Certification', date: '2025-12-02', file: 'pdf', category: 'Cloud' },
  { id: 'udemy-aws-ccp-clf-c02', title: 'Ultimate AWS Certified Cloud Practitioner CLF-C02', issuer: 'Udemy', date: '2025-11-01', file: 'pdf', category: 'Cloud', note: '14.5 hours', verify: 'https://ude.my/UC-7d7568a8-7768-4236-8d00-dc0cff31820e' },
  { id: 'coursera-aws-cloud-technical-essentials', title: 'AWS Cloud Technical Essentials', issuer: 'AWS · Coursera', date: '2025-08-05', file: 'pdf', category: 'Cloud' },
  { id: 'ibm-software-programming-databases', title: 'Introduction to Software, Programming & Databases', issuer: 'IBM · Coursera', date: '2025-08-11', file: 'pdf', category: 'Foundations' },
  { id: 'ibm-hardware-os-essentials', title: 'Hardware & Operating System Essentials', issuer: 'IBM · Coursera', date: '2025-08-09', file: 'pdf', category: 'Foundations' },
  { id: 'ibm-intro-hardware-operating-systems', title: 'Introduction to Hardware & Operating Systems', issuer: 'IBM · Coursera', date: '2025-08-09', file: 'pdf', category: 'Foundations' },
  { id: 'ibm-technical-support-basics', title: 'Technical Support Basics', issuer: 'IBM · Coursera', date: '2025-08-06', file: 'pdf', category: 'Foundations' },
  { id: 'meta-intro-front-end', title: 'Introduction to Front-End Development', issuer: 'Meta · Coursera', date: '2023-07-26', file: 'pdf', category: 'Web' },
];

export const certSrc = (c: Cert) => `/certificates/${c.id}.${c.file}`;
export const certThumb = (c: Cert) => `/certificates/thumbs/${c.id}.jpg`;
export const certDate = (c: Cert) =>
  new Date(c.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
export const sortedCerts = () =>
  [...certificates].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.date.localeCompare(a.date));

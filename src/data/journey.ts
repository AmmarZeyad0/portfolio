// Your timeline, newest first. Add a milestone whenever something happens.
// `link` is optional and can point to a post, project or PDF on this site.

export type Milestone = {
  date: string;
  title: string;
  detail: string;
  kind: 'education' | 'work' | 'cert' | 'project' | 'training';
  link?: string;
};

export const journey: Milestone[] = [
  {
    date: 'Oct 2026',
    title: 'Started the Ticket Booking Platform',
    detail: 'Event-driven system with three FastAPI services and two Python workers, being taken from Docker through CI/CD, Kubernetes and Terraform on AWS.',
    kind: 'project',
    link: '/projects/ticket-booking-platform',
  },
  {
    date: 'Oct 2026',
    title: 'Git Fundamentals, GitMastery',
    detail: '18 hands-on levels completed by typing real Git commands in a simulated repository.',
    kind: 'cert',
    link: '/certificates',
  },
  {
    date: 'Sep 2026',
    title: 'Began MSc Computer Science',
    detail: 'Online at the University of East London.',
    kind: 'education',
  },
  {
    date: 'Feb – Jul 2026',
    title: 'Cloud & DevOps Mentorship, Qualify-You',
    detail: 'Containerised an application with Docker, ran it on Kubernetes, and practised Linux administration. 27 guided 1-on-1 sessions covering CI/CD, observability and GitOps.',
    kind: 'training',
    link: '/projects/qualify-you-kubernetes',
  },
  {
    date: 'May 2026',
    title: 'Introduction to Kubernetes (LFS158)',
    detail: 'Completed The Linux Foundation’s Kubernetes course.',
    kind: 'cert',
    link: '/certificates',
  },
  {
    date: 'Feb 2026',
    title: 'Jenkins Skill Tree, LabEx',
    detail: 'Hands-on CI with Jenkins.',
    kind: 'cert',
    link: '/certificates',
  },
  {
    date: 'Dec 2025',
    title: 'AWS Certified Cloud Practitioner',
    detail: 'Passed CLF-C02. Valid to December 2028. The same month: KodeKloud Git for Beginners and DolfinED IT, Cloud, TCP/IP & DevOps Fundamentals.',
    kind: 'cert',
    link: '/certificates',
  },
  {
    date: 'Aug 2025',
    title: 'Foundations sprint on Coursera',
    detail: 'AWS Cloud Technical Essentials, plus four IBM courses on hardware, operating systems, software and technical support.',
    kind: 'cert',
    link: '/certificates',
  },
  {
    date: '2025',
    title: 'Graduated BSc (Hons) Information Technology',
    detail: 'University of the West of England, Bristol.',
    kind: 'education',
  },
  {
    date: 'Mar 2021 – Sep 2024',
    title: 'IT Support at Al Bait Company',
    detail: 'Three and a half years keeping systems, networks and VPN access running for staff across the business.',
    kind: 'work',
  },
  {
    date: 'Jun 2023 – Jan 2024',
    title: 'IT Consultant & Project Liaison, Al Diken Bros.',
    detail: 'Bridged the business and a software vendor building a Delivery Management System.',
    kind: 'work',
  },
  {
    date: 'Jan – Mar 2023',
    title: 'Full Stack Development Intern',
    detail: 'React interfaces connected to backend APIs, in Agile sprints at Epic Academy by Aspire.',
    kind: 'work',
  },
  {
    date: '2021',
    title: 'Code Fellows: Software Development 301–303',
    detail: 'Intermediate software development training.',
    kind: 'training',
  },
  {
    date: '2020 – 2022',
    title: 'Higher International Diploma in Software Engineering',
    detail: 'Luminus Technical University College. Where it all started.',
    kind: 'education',
  },
];

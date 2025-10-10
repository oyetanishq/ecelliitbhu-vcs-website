export interface Course {
    id: string;
    title: string;
    duration: string;
    price: string;
    short: string;
    details: string;
}

export const COURSES: Course[] = [
    {
        id: "entrepreneurship-bootcamp",
        title: "Entrepreneurship Bootcamp",
        duration: "8 weeks",
        price: "Free",
        short: "Hands-on training for aspiring entrepreneurs.",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac varius mauris, sed hendrerit ex. Ut sit amet metus id risus facilisis porta.",
    },
    {
        id: "startup-fundamentals",
        title: "Startup Fundamentals",
        duration: "6 weeks",
        price: "₹1499",
        short: "A course on business models, funding, and pitching.",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor est sit amet interdum varius, sem odio convallis turpis.",
    },
    {
        id: "innovation-lab",
        title: "Innovation Lab",
        duration: "4 weeks",
        price: "Free",
        short: "Fostering creativity through real-world projects.",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique sapien at ligula tempus, ac facilisis urna pharetra.",
    },
];

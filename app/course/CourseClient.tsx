"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RegisterButton from "./components/register-button";

type Status = "no-session" | "unregistered" | "registered";

interface CourseClientProps {
    status: Status;
}

const modules = [
    { id: 1, module: 1, label: "Foundations of Venture Capital", topic: "Intro, Firm, Finances", zIndex: 10, position: { top: "0%", left: "15%" } },
    { id: 2, module: 2, label: "Understanding Startups and Funding Pipeline", topic: "Ecosystem, Diligence", zIndex: 10, position: { top: "15%", left: "48%" } },
    { id: 3, module: 3, label: "Deal Structuring and Portfolio Management", topic: "Investments, Term Sheets, Portfolio Management", zIndex: 10, position: { top: "40%", left: "55%" } },
    { id: 5, module: 5, label: "Career and Global VC Perspective", topic: "Career, VC, Assignments", zIndex: 20, position: { top: "30%", left: "5%" } },
    { id: 4, module: 4, label: "Advanced Tools, Pitches and Emerging Trends", topic: "Pitch Eval, Tools, Future of VC", zIndex: 10, position: { top: "55%", left: "20%" } },
];

const moduleData = {
    1: [
        { day: "Day 1", content: "Introduction to Venture Capital", task1: "Introduction to Venture Capital", task2: "History and Evolution0", task3: "VC as aCareer (basic intro)" },
        { day: "Day 2", content: "Inside a VC Firm", task1: "Working and Structure of a VC firm", task2: "", task3: "" },
        { day: "Day 3", content: "VC Finances", task1: "How do VCs make money?", task2: "Stages of Funding: Angel, VC, Entry & Exit", task3: "Investment Strategy and Thesis" },
    ],
    2: [
        { day: "Day 4", content: "The Startup Ecosystem", task1: "Startup Ecosystem’s Elements & Key Players", task2: "Market Analysis (TAM/ SAM/ SOM, Unit Economics, Competitive Moats) & Startup Business Models", task3: "Process of VC Funding (overview) & Parameters of Investing" },
        { day: "Day 5", content: "Due Diligence", task1: "Due Diligence Types", task2: "Due Diligence - Key metrics & KPIs to verify", task3: "Practical Template for Due Diligence" },
        { day: "Day 6", content: "Data and Deal Flow", task1: "Sourcing Data & Tools for Sourcing (LinkedIn, Pitchbook)", task2: "Pipeline Building, Lead Tracking", task3: "Power of Networking" },
    ],
    3: [
        { day: "Day 7", content: "Investment Process and Deal Types", task1: "Process of VC Funding (in detail)", task2: "Deal Types (Equity, Convertible Notes, SAFE, Term Sheets)", task3: "" },
        { day: "Day 8", content: "Term Sheets and Portfolio Management", task1: "Introduction to Valuation (Pre-money and Post-money)", task2: "Term Sheets & Cap tables (Equity, Dilution, Dilution examples, Liquidation preference, ESOPs)", task3: "Basics of Finance Modeling, Portfolio and Risk Management" },
    ],
    4: [
        { day: "Day 9", content: "Career in Venture Capital", task1: "VC as a Career (detailed)", task2: "How to Get into a VC Firm", task3: "Analyst to Associate Growth Track" },
        { day: "Day 10", content: "Venture Capital in India and Abroad", task1: "VC in India (Landscape) - Indian VC ecosystem overview", task2: "Global VC Models, Indian VC Culture vs Global VC Culture", task3: "Impact of Global Events on VC Ecosystem" },
        { day: "Day 11", content: "Applied Assignment", task1: "Assignment (Investment Memo/ Mock Deal Recommendation)", task2: "", task3: "" },
    ],
    5: [
        { day: "Day 12", content: "Pitch Evaluation", task1: "How to evaluate pitch decks", task2: "Red flags in startup pitches", task3: "Elements of a Perfect Pitch" },
        { day: "Day 13", content: "VC Tools and Platforms", task1: "VC Tools: Notion, Airtable, Pitchbook, Carta", task2: "Practical Demonstration / Workflow Simulation", task3: "" },
        { day: "Day 14", content: "Future of Venture Capital", task1: "New Emerging trends: AI in VC, Climate Tech, Micro-VCs, Rolling funds", task2: "", task3: "" },
        { day: "Day 15", content: "Done! Congrats!", task1: "", task2: "", task3: "" },
    ],
};

const courseModules = [
    {
        module: 1,
        title: "Foundations of Venture Capital",
        description:
            "This module introduces the fundamentals of venture capital, including its history, the internal structure of a VC firm, and the financial models behind how VCs make money and create an investment thesis.",
        topics: ["Introduction to VC", "VC Firm Structure", "VC Finances", "Funding Stages", "Investment Thesis", "Fund Returns"],
    },
    {
        module: 2,
        title: "Understanding Startups and Funding Pipeline",
        description:
            "This module covers the startup ecosystem, market analysis (TAM/SAM/SOM), and the critical processes of performing due diligence and building a deal flow pipeline through sourcing and networking.",
        topics: ["Startup Ecosystem", "Market Analysis", "Business Models", "Due Diligence", "Metrics & KPIs", "Deal Flow", "Sourcing Tools"],
    },
    {
        module: 3,
        title: "Deal Structuring and Portfolio Management",
        description:
            "This module dives into the details of the investment process, different deal types (Equity, SAFE, Convertible Notes), and the legal/financial components of term sheets, cap tables, and valuation.",
        topics: ["Investment Process", "Deal Types", "Valuation", "Term Sheets", "Cap Tables", "Dilution", "Portfolio Management"],
    },
    {
        module: 4,
        title: "Career and Global VC Perspective",
        description:
            "This module explores career paths in venture capital, skills required for an analyst, and compares the VC landscapes in India and globally, including regulatory aspects. It concludes with an applied assignment.",
        topics: ["VC Careers", "Analyst Skills", "Memo Writing", "Global VC Models", "Indian VC Ecosystem", "SEBI Regulations", "Investment Memo"],
    },
    {
        module: 5,
        title: "Advanced Tools, Pitches and Emerging Trends",
        description:
            "This module focuses on practical skills like evaluating pitch decks, using common VC tools (Notion, Airtable, Pitchbook), and understanding emerging trends like AI in VC, Climate Tech, and new fund structures.",
        topics: ["Pitch Deck Evaluation", "VC Tools", "Notion", "Airtable", "Pitchbook", "Future of VC", "AI in VC", "Climate Tech"],
    },
];

const CourseClient: React.FC<CourseClientProps> = ({ status }) => {
    const [selectedModule, setSelectedModule] = useState(1);

    const scrollToCourseStructure = () => {
        document.getElementById("course-structure")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen hero-background">
            {/* Hero Section */}
            <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-[90vh] px-4 md:px-8 pt-6 sm:pt-12 py-12">
                {/* Left: Module Cards (hidden on mobile) */}
                <div className="hidden lg:block relative w-full max-w-3xl h-[70vh]">
                    {modules.map((item) => (
                        <div
                            key={item.id}
                            className="absolute bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-64 transition-all duration-300 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-border-orange-500/10"
                            style={{ ...item.position, zIndex: item.zIndex }}
                        >
                            <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">{item.label}</div>
                            <div className="text-white text-3xl font-bold mb-3">Module {item.module}</div>
                            <div className="text-sm text-white/70">{item.topic}</div>
                        </div>
                    ))}

                    <div
                        className="absolute bg-black/40 backdrop-blur-md border-2 border-orange-500 rounded-2xl p-6 w-64 text-center transition-all duration-300 shadow-2xl shadow-orange-border-orange-500/20"
                        style={{ bottom: "0%", left: "50%", transform: "translateX(-50%)", zIndex: 30 }}
                    >
                        <div className="text-white text-3xl font-bold mb-2">Hackathon 🏆</div>
                        <div className="text-sm text-white/70">Final Assessment</div>
                    </div>
                </div>

                {/* Right: Hero Text */}
                <div className="relative z-10 w-full text-center lg:text-right max-w-3xl">
                    <div className="space-y-6">
                        <div className="text-sm text-orange-400 font-medium tracking-wider">IIT BHU's Summer Course for VC and Start Up</div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            The perfect start
                            <br />
                            <span className="text-orange-500">for your Start Up journey.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:ml-auto">
                            The summer course on VC and  Start Up offers a comprehensive blend of resources — engaging videos, blogs, assignments, and a
                            final hackathon!
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-end pt-4">
                            <RegisterButton status={status} />

                            <a
                                href="https://chat.whatsapp.com/FKpfFAEdb001JPVIeDh1J0?mode=wwt"
                                target="_blank" // Opens the link in a new tab
                                rel="noopener noreferrer" // Security best practice for new tabs
                                className="px-6 py-3 bg-[#FF8C00] text-black font-semibold rounded-full hover:bg-[#FFA500] hover:text-black active:scale-95 transition-all shadow-lg hover:shadow-[#FF8C00]/50"                            >
                                JOIN WHATSAPP GROUP
                            </a>


                        </div>

                        <button
                            onClick={scrollToCourseStructure}
                            className="mt-12 flex items-center gap-2 text-foreground border border-foreground rounded-full px-6 py-3 hover:bg-foreground/10 transition-all mx-auto lg:ml-auto group"
                        >
                            EXPLORE COURSE STRUCTURE
                            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Mobile Module Cards Carousel */}
                <div className="lg:hidden flex justify-start gap-3 px-2 overflow-x-auto pb-4 w-full">
                    {modules.map((item) => (
                        <div key={item.module} className="bg-card border border-border rounded-lg p-3 min-w-[140px] flex-shrink-0 text-left">
                            <div className="text-orange-400 text-sm font-bold">Module {item.module}</div>
                            <div className="text-xs text-muted-foreground mt-1">{item.label || item.topic}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Course Outline Section */}
            <section id="course-structure" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="text-sm text-orange-400 font-medium tracking-wider mb-4">Course Outline</div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">How is the course structured?</h2>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">The 6-module course takes you from the fundamentals of venture capital to advanced startup funding, deal structuring, and portfolio management</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseModules.map((module, index) => (
                        <Card
                            key={module.module}
                            className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-orange-500 transition-all duration-300 group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500 transition-colors">
                                    <span className="text-orange-400 font-bold">{module.module}</span>
                                </div>
                                <div className="text-lg font-bold">Module {module.module}</div>
                            </div>

                            <h3 className="text-base sm:text-lg font-semibold mb-3 group-hover:text-orange-400 transition-colors">{module.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{module.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {module.topics.map((topic) => (
                                    <span key={topic} className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    ))}

                    {/* Hackathon card */}
                    <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur-sm border-orange-500 hover:shadow-[0_0_40px_hsl(188_85%_43%/0.4)] transition-all duration-300 group sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-2xl">🏆</div>
                            <div className="text-lg font-bold">Hackathon</div>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold mb-3 text-orange-500">Final Assessment</h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            Apply everything you’ve learned in a thrilling hackathon with real-world tasks, peer competition, and certification.
                        </p>
                    </Card>
                </div>
            </section>

            {/* Curriculum Table */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Detailed Curriculum</h2>
                    <p className="text-muted-foreground text-base sm:text-lg">Explore the daily breakdown of each module</p>
                </div>

                {/* Responsive Tabs */}
                <div className="w-full">
                    <Tabs value={selectedModule.toString()} onValueChange={(v) => setSelectedModule(parseInt(v))} className="w-full">
                        <TabsList className="grid w-full h-fit grid-cols-3 sm:grid-cols-6 mb-8 bg-card border border-border overflow-x-auto scrollbar-hide">
                            {[1, 2, 3, 4, 5].map((module) => (
                                <TabsTrigger
                                    key={module}
                                    value={module.toString()}
                                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-sm sm:text-base px-2 sm:px-4"
                                >
                                    Module {module}
                                </TabsTrigger>
                            ))}
                            <TabsTrigger value="6" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-sm sm:text-base px-2 sm:px-4">
                                Additional
                            </TabsTrigger>
                        </TabsList>

                        {[1, 2, 3, 4, 5].map((module) => (
                            <TabsContent key={module} value={module.toString()} className="mt-0">
                                <div className="rounded-lg border border-border overflow-hidden bg-card/50 backdrop-blur-sm">
                                    {/* ✅ Make table horizontally scrollable on small screens */}
                                    <div className="overflow-x-auto">
                                        <Table className="min-w-[700px] sm:min-w-full text-sm sm:text-base">
                                            <TableHeader>
                                                <TableRow className="bg-card hover:bg-card">
                                                    <TableHead className="w-[80px] sm:w-[100px] font-bold">Day</TableHead>
                                                    <TableHead className="font-bold">Contents</TableHead>
                                                    <TableHead className="font-bold">Task 1</TableHead>
                                                    <TableHead className="font-bold">Task 2</TableHead>
                                                    <TableHead className="font-bold">Task 3</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {moduleData[module as keyof typeof moduleData].map((day, index) => (
                                                    <TableRow key={index} className="hover:bg-orange-500/5 transition-colors">
                                                        <TableCell className="font-semibold text-orange-500 whitespace-nowrap">{day.day}</TableCell>
                                                        <TableCell className="font-medium">{day.content}</TableCell>
                                                        <TableCell className="text-muted-foreground">{day.task1}</TableCell>
                                                        <TableCell className="text-muted-foreground">{day.task2}</TableCell>
                                                        <TableCell className="text-muted-foreground">{day.task3}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>
        </div>
    );
};

export default CourseClient;

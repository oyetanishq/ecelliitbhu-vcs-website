"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RegisterButton from "./components/register-button";

const weeks = [
    { id: 1, week: 1, label: "REPRESENTATION", topic: "Python, EDA, Pandas", zIndex: 10, position: { top: "0%", left: "15%" } },
    { id: 2, week: 2, label: "SUPERVISED LEARNING", topic: "Regression, Classification", zIndex: 10, position: { top: "15%", left: "48%" } },
    { id: 3, week: 3, label: "REINFORCEMENT LEARNING", topic: "Advanced ML, Clustering", zIndex: 10, position: { top: "40%", left: "55%" } },
    { id: 5, week: 5, label: "PROBABILITY", topic: "Deep Learning Basics", zIndex: 20, position: { top: "30%", left: "5%" } },
    { id: 4, week: 4, label: "", topic: "Ensemble Learning, Kaggle", zIndex: 10, position: { top: "55%", left: "20%" } },
];

const weeklyData = {
    1: [
        {
            day: "Day 1",
            content: "Getting Started with Python",
            task1: "Anaconda Installation",
            task2: "Jupyter Tutorial",
            task3: "Python Basics Tutorial",
        },
        {
            day: "Day 2",
            content: "Data Structures in Python",
            task1: "Lists, Sets, Tuples",
            task2: "Dictionaries",
            task3: "Practice Notebook",
        },
        {
            day: "Day 3",
            content: "Numpy",
            task1: "Numpy Tutorial Video",
            task2: "Numpy Blog",
            task3: "Practice Exercises",
        },
        {
            day: "Day 4",
            content: "Pandas and Matplotlib",
            task1: "Pandas Tutorial",
            task2: "Matplotlib Guide",
            task3: "EDA Introduction",
        },
        {
            day: "Day 5",
            content: "EDA and Feature Engineering",
            task1: "Comprehensive EDA",
            task2: "Handling Missing Values",
            task3: "Feature Engineering",
        },
    ],
    2: [
        {
            day: "Day 1",
            content: "Linear Regression Basics",
            task1: "Theory & Concepts",
            task2: "Implementation",
            task3: "Practice Problems",
        },
        {
            day: "Day 2",
            content: "Logistic Regression",
            task1: "Classification Intro",
            task2: "Sklearn Tutorial",
            task3: "Model Evaluation",
        },
        {
            day: "Day 3",
            content: "Regularization Techniques",
            task1: "Ridge Regression",
            task2: "Lasso Regression",
            task3: "Elastic Net",
        },
        {
            day: "Day 4",
            content: "Naïve Bayes & Evaluation",
            task1: "Probability Basics",
            task2: "Naïve Bayes",
            task3: "Metrics Deep Dive",
        },
        {
            day: "Day 5",
            content: "Model Optimization",
            task1: "Hyperparameter Tuning",
            task2: "Cross Validation",
            task3: "Final Project",
        },
    ],
    3: [
        {
            day: "Day 1",
            content: "Support Vector Machines",
            task1: "SVM Theory",
            task2: "Kernel Methods",
            task3: "Implementation",
        },
        {
            day: "Day 2",
            content: "K-Nearest Neighbors",
            task1: "Distance Metrics",
            task2: "KNN Algorithm",
            task3: "Applications",
        },
        {
            day: "Day 3",
            content: "Clustering Methods",
            task1: "K-Means",
            task2: "Hierarchical",
            task3: "DBSCAN",
        },
        {
            day: "Day 4",
            content: "Dimensionality Reduction",
            task1: "PCA Theory",
            task2: "Implementation",
            task3: "t-SNE",
        },
        {
            day: "Day 5",
            content: "Anomaly Detection",
            task1: "Isolation Forest",
            task2: "One-Class SVM",
            task3: "Applications",
        },
    ],
    4: [
        {
            day: "Day 1",
            content: "Ensemble Methods Intro",
            task1: "Bagging",
            task2: "Boosting",
            task3: "Stacking",
        },
        {
            day: "Day 2",
            content: "Random Forest",
            task1: "Theory",
            task2: "Implementation",
            task3: "Feature Importance",
        },
        {
            day: "Day 3",
            content: "Gradient Boosting",
            task1: "XGBoost",
            task2: "LightGBM",
            task3: "CatBoost",
        },
        {
            day: "Day 4",
            content: "Kaggle Competition Basics",
            task1: "Getting Started",
            task2: "Competition Strategies",
            task3: "Submission",
        },
        {
            day: "Day 5",
            content: "Semi-Supervised Learning",
            task1: "Self-Training",
            task2: "Label Propagation",
            task3: "Applications",
        },
    ],
    5: [
        {
            day: "Day 1",
            content: "Neural Networks Basics",
            task1: "Perceptron",
            task2: "Multi-layer Networks",
            task3: "Forward Propagation",
        },
        {
            day: "Day 2",
            content: "Activation Functions",
            task1: "ReLU & Variants",
            task2: "Sigmoid & Tanh",
            task3: "Softmax",
        },
        {
            day: "Day 3",
            content: "Backpropagation",
            task1: "Gradient Descent",
            task2: "Chain Rule",
            task3: "Implementation",
        },
        {
            day: "Day 4",
            content: "Deep Learning Frameworks",
            task1: "TensorFlow Basics",
            task2: "PyTorch Intro",
            task3: "Keras Tutorial",
        },
        {
            day: "Day 5",
            content: "CNNs & RNNs Introduction",
            task1: "Convolutional Layers",
            task2: "Pooling Layers",
            task3: "Recurrent Networks",
        },
    ],
};

const courseWeeks = [
    {
        week: 1,
        title: "Python Fundamentals & Data Analysis",
        description:
            "This week covers Python basics along with essential libraries like Pandas, Numpy, and Matplotlib, and introduces core concepts of Exploratory Data Analysis (EDA) and Feature Engineering.",
        topics: ["Python Basics", "Pandas", "NumPy", "Matplotlib", "EDA", "Feature Engineering"],
    },
    {
        week: 2,
        title: "Supervised Learning & Model Performance",
        description:
            "This week familiarises you with Machine Learning basics, and covers basic ML concepts like Linear Regression, Logistic Regression, Regularization, Naïve Bayes, Evaluation Metrics and more. It also covers a machine learning library, Sklearn.",
        topics: ["Linear Regression", "Logistic Regression", "Regularization", "Naïve Bayes", "Sklearn", "Evaluation Metrics"],
    },
    {
        week: 3,
        title: "Advanced ML & Unsupervised Learning",
        description:
            "This week covers various important ML algorithms like SVM, KMeans, KNN and also familiarises you with unsupervised learning, PCA(Principal Component Analysis). It also introduces dimensionality reduction, clustering methods, and anomaly detection.",
        topics: ["SVM", "KMeans", "KNN", "PCA", "Clustering", "Anomaly Detection"],
    },
    {
        week: 4,
        title: "Ensemble Learning & Kaggle",
        description:
            "This week introduces ensemble learning methods like Random Forest, Gradient Boosting, and XGBoost. You'll also learn about semi-supervised learning and get hands-on experience with Kaggle competitions.",
        topics: ["Random Forest", "Gradient Boosting", "XGBoost", "Semi-Supervised Learning", "Kaggle"],
    },
    {
        week: 5,
        title: "Deep Learning Fundamentals",
        description:
            "This week dives into neural networks, deep learning frameworks, and introduces you to TensorFlow and PyTorch. You'll learn about CNNs, RNNs, and basic neural network architectures.",
        topics: ["Neural Networks", "TensorFlow", "PyTorch", "CNNs", "RNNs", "Deep Learning"],
    },
];

const Index = () => {
    const [selectedWeek, setSelectedWeek] = useState(1);

    const scrollToCourseStructure = () => {
        document.getElementById("course-structure")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen hero-background">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
                {/* Positioning Container */}
                <div className="relative w-full max-w-3xl h-[60vh] md:h-[70vh]">
                    {/* Week Cards */}
                    {weeks.map((item) => (
                        <div
                            key={item.id}
                            className="absolute bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-64 transition-all duration-300 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-border-orange-500/10"
                            style={{ ...item.position, zIndex: item.zIndex }}
                        >
                            <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">{item.label}</div>
                            <div className="text-white text-3xl font-bold mb-3">Week {item.week}</div>
                            <div className="text-sm text-white/70">{item.topic}</div>
                        </div>
                    ))}

                    {/* Hackathon Card */}
                    <div
                        className="absolute bg-black/40 backdrop-blur-md border-2 border-orange-500 rounded-2xl p-6 w-64 text-center transition-all duration-300 shadow-2xl shadow-orange-border-orange-500/20"
                        style={{ bottom: "0%", left: "50%", transform: "translateX(-50%)", zIndex: 30 }}
                    >
                        <div className="text-white text-3xl font-bold mb-2">Hackathon 🏆</div>
                        <div className="text-sm text-white/70">Final Assessment</div>
                    </div>
                </div>

                {/* Main content - Right side */}
                <div className="relative z-10 max-w-3xl ml-auto mr-4 md:mr-20 text-right">
                    <div className="space-y-6">
                        <div className="text-sm text-orange-400 font-medium tracking-wider">IIT BHU's Summer Course for AI</div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            The perfect start
                            <br />
                            <span className="text-orange-500">for your AI journey.</span>
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl ml-auto">
                            The summer course on Data Science and Machine Learning offers a comprehensive blend of high-quality resources sourced from the internet, including engaging videos,
                            informative blogs, weekly assignments, and culminating in an exciting hackathon to assess your knowledge and skills.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-end pt-4">
                            <RegisterButton />
                            <Button size="lg" variant="outline" className="rounded-full px-8 border-foreground hover:bg-foreground/10">
                                JOIN DISCORD SERVER
                            </Button>
                        </div>

                        <button
                            onClick={scrollToCourseStructure}
                            className="mt-12 flex items-center gap-2 text-foreground border border-foreground rounded-full px-6 py-3 hover:bg-foreground/10 transition-all ml-auto group"
                        >
                            EXPLORE COURSE STRUCTURE
                            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Mobile course preview */}
                <div className="lg:hidden absolute bottom-10 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto pb-4">
                    {weeks.map((item) => (
                        <div key={item.week} className="bg-card border border-border rounded-lg p-3 min-w-[120px] flex-shrink-0">
                            <div className="text-orange-400 text-sm font-bold">Week {item.week}</div>
                            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Course Outline Section */}
            <section id="course-structure" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="text-sm text-orange-400 font-medium tracking-wider mb-4">Course Outline</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">How is the course structured?</h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto">The 6 week course takes you from basic Python to complex neural networks. The course is structured as follows:</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseWeeks.map((week, index) => (
                        <Card
                            key={week.week}
                            className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-orange-500 transition-all duration-300 hover:shadow-[0_0_30px_hsl(188_85%_43%/0.2)] group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500 transition-colors">
                                    <span className="text-orange-400 font-bold text-lg">{week.week}</span>
                                </div>
                                <div className="text-xl font-bold">Week {week.week}</div>
                            </div>

                            <h3 className="text-lg font-semibold mb-3 group-hover:text-orange-400 transition-colors">{week.title}</h3>

                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{week.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {week.topics.map((topic) => (
                                    <span key={topic} className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    ))}

                    {/* Hackathon Card */}
                    <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur-sm border-orange-500 hover:shadow-[0_0_40px_hsl(188_85%_43%/0.4)] transition-all duration-300 group md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-2xl">🏆</div>
                            <div className="text-xl font-bold">Hackathon</div>
                        </div>

                        <h3 className="text-lg font-semibold mb-3 text-orange-500">Final Assessment</h3>

                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            Put all your learning to test in an exciting hackathon! Work on real-world projects, compete with peers, and showcase your skills. This is your chance to apply everything
                            you've learned throughout the course.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs px-3 py-1 rounded-full bg-orange-500 text-white font-medium">Real-world Project</span>
                            <span className="text-xs px-3 py-1 rounded-full bg-orange-500 text-white font-medium">Competition</span>
                            <span className="text-xs px-3 py-1 rounded-full bg-orange-500 text-white font-medium">Certification</span>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Interactive Curriculum Table */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Detailed Curriculum</h2>
                    <p className="text-muted-foreground text-lg">Explore the daily breakdown of each week's content</p>
                </div>

                <div className="hidden md:block">
                    <Tabs value={selectedWeek.toString()} onValueChange={(v) => setSelectedWeek(parseInt(v))} className="w-full">
                        <TabsList className="grid w-full grid-cols-6 mb-8 bg-card border border-border">
                            {[1, 2, 3, 4, 5].map((week) => (
                                <TabsTrigger key={week} value={week.toString()} className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                                    Week {week}
                                </TabsTrigger>
                            ))}
                            <TabsTrigger value="6" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                                Additional
                            </TabsTrigger>
                        </TabsList>

                        {[1, 2, 3, 4, 5].map((week) => (
                            <TabsContent key={week} value={week.toString()} className="mt-0">
                                <div className="rounded-lg border border-border overflow-hidden bg-card/50 backdrop-blur-sm">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-card hover:bg-card">
                                                <TableHead className="w-[100px] font-bold">Day</TableHead>
                                                <TableHead className="font-bold">Contents</TableHead>
                                                <TableHead className="font-bold">Task 1</TableHead>
                                                <TableHead className="font-bold">Task 2</TableHead>
                                                <TableHead className="font-bold">Task 3</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {weeklyData[week as keyof typeof weeklyData].map((day, index) => (
                                                <TableRow key={index} className="hover:bg-orange-500/5 transition-colors">
                                                    <TableCell className="font-semibold text-orange-500">{day.day}</TableCell>
                                                    <TableCell className="font-medium">{day.content}</TableCell>
                                                    <TableCell className="text-muted-foreground">{day.task1}</TableCell>
                                                    <TableCell className="text-muted-foreground">{day.task2}</TableCell>
                                                    <TableCell className="text-muted-foreground">{day.task3}</TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow className="bg-orange-500/10 active:orange-500/10">
                                                <TableCell colSpan={5} className="text-center font-bold text-orange-400 py-4 cursor-pointer hover:bg-orange-500/30">
                                                    Assignments & Quiz Available
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        ))}

                        <TabsContent value="6" className="mt-0">
                            <div className="rounded-lg border border-border p-8 bg-card/50 backdrop-blur-sm text-center">
                                <h3 className="text-2xl font-bold mb-4">Additional Resources</h3>
                                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                                    <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                                        <div className="font-semibold text-orange-400 mb-2">Data Visualization</div>
                                        <div className="text-sm text-muted-foreground">Seaborn & Plotly tutorials</div>
                                    </div>
                                    <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                                        <div className="font-semibold text-orange-400 mb-2">Linear Algebra</div>
                                        <div className="text-sm text-muted-foreground">Mathematical foundations</div>
                                    </div>
                                    <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                                        <div className="font-semibold text-orange-400 mb-2">Practice Exercises</div>
                                        <div className="text-sm text-muted-foreground">Additional challenges</div>
                                    </div>
                                    <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                                        <div className="font-semibold text-orange-400 mb-2">Python OOPs</div>
                                        <div className="text-sm text-muted-foreground">Advanced concepts</div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Mobile view message */}
                <div className="md:hidden text-center p-8 border border-border rounded-lg bg-card/50 backdrop-blur-sm">
                    <p className="text-muted-foreground">Course Table is visible only in desktop mode.</p>
                    <p className="text-sm text-muted-foreground mt-2">Please view on a larger screen to see the detailed curriculum table.</p>
                </div>
            </section>
        </div>
    );
};

export default Index;

export const projectsData = [
    {
        id: "lankacrafts",
        icon: "bxl bx-react",
        title: "Lanka Crafts",
        description:
            `Developed Lanka Crafts, a full-stack digital platform as a Year 2 Semester 2 university project, focusing on secure client-server architecture, cloud integrations, and modular full-stack development. The platform bridges digital gaps between traditional Sri Lankan artisans and tourists by discovering, booking workshops, and reviewing authentic cultural workshops.

        The system supports:
        - User Management: Secure Tourist/ Artisan authentication via Firebase.
        - Artisan Showcase: Portfolio and digital media management.
        - Workshop Booking: Real - time scheduling with double - booking prevention.
        - AI Assistance: In - app messaging and LLM - driven customer support.
        - Review & Feedback: Post - experience ratings with AI feedback summaries.
        - Admin Dashboard: Artisan verification workflow and geographic insights.

        🔹 My Role(Tourist Profile & Experience Sharing Module)
        Designed the core Tourist registration, onboarding, and profile customization flows.Built a map - based artisan discovery interface on the frontend utilizing geolocation tracking and geospatial rendering.Engineered a multimedia blog publishing system allowing tourists to log and share cultural experiences.Architected the DevSecOps security pipeline, transitioning the mobile application to a dynamic JS configuration environment(app.config.js) to safeguard third - party API tokens via EAS cloud build runtime variables.

        🔹 Team Collaboration
Collaborated in a 6 - member team, with each engineer owning a core module.Integrated server - side token validation using the Firebase Admin SDK and enforced Role-Based Access Control(RBAC) middleware across API routes.Fully deployed the live architecture across Netlify(Web), Railway(API Backend), and published pre - compiled binaries via GitHub Releases(Android APK).

        Tech Stack: Node.js, Express.js, React.js, React Native, Expo SDK, MongoDB Atlas, Firebase Auth, Groq AI SDK(Llama - 3.3 - 70b), Tailwind CSS, Netlify, Railway`,
        images: [
            "/assets/lankacrafts_1.webp",
            "/assets/lankacrafts_2.webp",
            "/assets/lankacrafts_3.webp",
            "/assets/lankacrafts_4.webp",
            "/assets/lankacrafts_5.webp",
            "/assets/lankacrafts_6.webp"
        ],
        links: [
            { text: "GitHub Repository", url: "https://github.com/Kasun-Aka/LankaCrafts" }
        ]
    },
    {
        id: "unifound",
        icon: "bxl bx-react",
        title: "UniFound",
        description:
            `A self-initiated personal full-stack project, independently designed and developed to explore and gain hands-on experience with modern web technologies.

        The University Lost & Found System digitizes and secures the lost-and-found process within a university environment, replacing informal methods such as WhatsApp groups and notice boards with a centralized, authenticated platform.
            
        Built entirely by me using Next.js, NestJS, Supabase, and Docker, this project focuses on applying real-world software engineering principles including secure authentication, role-based access control, clean system architecture, and containerized deployment.
            
        The application includes user dashboards, admin moderation, live system statistics, and a structured item recovery workflow that tracks items from loss to successful claim.
            
        Tech Stack: Next.js(React), NestJS, Supabase, HTML, TailwindCSS, Docker.`,
        images: [
            "/assets/unifound1.webp",
            "/assets/unifound2.webp",
            "/assets/unifound3.webp",
            "/assets/unifound4.webp",
            "/assets/unifound5.webp",
            "/assets/unifound6.webp",
            "/assets/unifound7.webp"
        ],
        links: [
            { text: "GitHub Repository", url: "https://github.com/Kasun-Aka/Lost-and-Found-System" }
        ]
    },
    {
        id: "cricket_predictor",
        icon: "bx bx-cricket-ball",
        title: "T20I Match Prediction Tool",
        description:
            `Developed a T20 International cricket match prediction tool as a Year 2 Semester 1 group project, combining machine learning and sports analytics in a real-world web application.

        The project predicts:
        - Optimal toss decision (Bat/Bowl)
        - Safe first-innings score
        - Match winner with associated confidence

        All predictions are based on historical T20I match data (2005–2023) and statistical modeling rather than simple heuristics.

        🔹 My Role & Contributions
        Implemented ML feature engineering, including:
            - Encoding categorical variables
            - Dimensionality Reduction (PCA)
        Developed Random Forest-based models for match winner and toss prediction
        Built regression model for safe first-innings score
        Integrated ML models into a Streamlit web application, enabling interactive user input for teams and venue

        🔹 Team Collaboration
        This was a 6-member group project, with each member responsible for key system modules:
        Model training, feature engineering and data preprocessing.

        Ensured clean ML pipeline, modular coding, and reproducible results

        Key Skills & Learnings
        - Practical application of supervised machine learning for sports analytics
        - Feature engineering for tabular sports data
        - Ensemble modeling (Random Forest) and regression modeling
        - Web deployment of ML models via Streamlit
        - Team-based software development and module integration

        Tech Stack: Python, scikit-learn, pandas, Streamlit, ML feature engineering

        Note: Predictions are based on historical data and intended for educational and analytical purposes only.`,
        images: ["/assets/cricket_predictor.webp"],
        links: [
            { text: "GitHub Repository", url: "https://github.com/Kasun-Aka/T20I-Cricket-Prediction-WebApp" }
        ]
    },
    {
        id: "health_insurance",
        icon: "bx bx-code-alt",
        title: "TrueLife",
        description:
            `Developed a Health Insurance Web Application as a Year 2 Semester 1 university group project, focusing on enterprise-level backend development, database integration, and modular system design.

        The system supports:
        - User management  
        - Insurance plans management  
        - Payment processing  
        - Reviews & ratings  
        - Reports & analytics  
        - Admin system  

        The backend was built using Java and Spring Boot, following the Controller–Service–Repository architecture, with Microsoft SQL Server (MSSQL) used for persistent data storage. The frontend was developed using HTML, CSS, and JavaScript.

        🔹 My Role
        - Designed and implemented the Insurance Plans Management module
        - Developed REST controllers, services, and repositories
        - Integrated insurance plan data with MSSQL
        - Ensured clean architecture and seamless module integration

        🔹 Team Collaboration
        - Worked as part of a 6-member team, with each member owning a core system module
        - Successfully tested and validated the system using Docker

        Tech Stack: Java, Spring Boot, MSSQL, HTML, CSS, JavaScript, Docker`,
        images: [
            "/assets/health_insurance1.webp",
            "/assets/health_insurance2.webp",
            "/assets/health_insurance3.webp",
            "/assets/health_insurance4.webp",
            "/assets/health_insurance5.webp",
            "/assets/health_insurance6.webp",
            "/assets/health_insurance7.webp"
        ],
        links: [
            { text: "GitHub Repository", url: "https://github.com/Kasun-Aka/Health-Insurance-Webapp" }
        ]
    },
    {
        id: "wedding_planner",
        icon: "bx bx-code-alt",
        title: "Ever After",
        description:
            `Developed a Wedding Planning Web Application as a group project during Year 1 Semester 2, focusing on backend architecture, modular design, and team-based development.

        The application was built using Java (Spring Boot) for backend services and HTML/CSS/JavaScript for the frontend, following a Controller–Service–Repository layered architecture.
            
        🔹My Contributions
        - Designed and implemented the Booking Management module (frontend & backend)
        - Implemented core business logic under strict academic constraints
        - Ensured clean separation of concerns and maintainable code structure
            
        🔹 Technical Constraints
        Due to university guidelines:
        - No database or authentication APIs were used
        - Data persistence was handled via **text files**
        - All processing logic was managed at the backend level
            
        This project was developed by a 5-member team, where each member was responsible for a major system module (user management, vendor management etc). The work involved coordination, module integration, and shared architectural decisions.
            
        Key Learnings
        - Spring Boot application structure
        - Backend logic without database dependency
        - Collaborative development in a multi-member team
        - Adapting to real-world constraints in academic environments
            
        Tech Stack: Java, Spring Boot, HTML, CSS, JavaScript`,
        images: [
            "/assets/wedding_planner1.webp",
            "/assets/wedding_planner2.webp",
            "/assets/wedding_planner3.webp",
            "/assets/wedding_planner4.webp",
            "/assets/wedding_planner5.webp",
            "/assets/wedding_planner6.webp"
        ],
        links: [
            { text: "GitHub Repository", url: "https://github.com/Kasun-Aka/wedding-planning-webapp" }
        ]
    },
    {
        id: "v3j",
        icon: "bx bx-link",
        title: "V3J Automotive Solutions",
        description: "My first industry level project for a client, Official website for the Business",
        images: [
            "/assets/v3j-1.webp",
            "/assets/v3j-2.webp",
            "/assets/v3j-3.webp"
        ],
        links: [
            { text: "GitHub Repository (Frontend)", url: "https://github.com/v3j-hub/v3j-frontend" },
            { text: "GitHub Repository (Backend)", url: "https://github.com/v3j-hub/v3j-backend" }
        ]
    },
    {
        id: "pacman",
        icon: "bx bx-pacman",
        title: "Project PacMan v2",
        description:
            `A fan-made recreation of the classic Pac-Man game, built using Scratch 3 and enhanced with improved movement, better visuals, and clean logic.
        This project is developed solely for entertainment purposes, with no commercial intent.

        🎮 How to Play
        Move Pac-Man through the maze using arrow keys.
        Eat all 40 dots while avoiding ghosts.
        Complete the maze to win. But beware — one wrong turn and the ghosts will get you!
        
        📁 Project Info
        💻 Platform: Scratch 3.0 (converted to HTML)
        🛠 Built with: Scratch blocks + TurboWarp Packager
        📦 Output format: HTML (browser-playable)
        
        🚀 How to Run
        Tap the 'Play Now' Button.
        No installation needed. No security warnings.
        ✅ Works on Windows and most modern systems.
        ❌ Not tested on mobile or Mac.

        📝 Credits & Disclaimer
        This project was entirely developed by GhostDevKA for entertainment purposes only.
        It is not intended for commercial use.
        Some content (characters, sounds, sprites) is not owned by the creator.
        All rights and credits go to their respective owners.
        This is a fan-made project created with respect to the original Pac-Man game.`,
        images: [
            "/assets/pacmanv2_1.webp",
            "/assets/pacmanv2_2.webp",
            "/assets/pacmanv2_3.webp"
        ],
        links: [
            { text: "GitHub Repository", url: "https://github.com/Kasun-Aka/pacmanv2_public" },
            { text: "Play Now", url: "https://687d0b6ca90e377679f065dd--reliable-entremet-5cc343.netlify.app/" }
        ]
    }
];

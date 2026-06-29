export const blogsData = [
  {
    id: "1",
    author: "Upek Kasun Akalanka",
    author_details: "BSc (Hons) IT Undergraduate at SLIIT | Software Engineering Specialization",
    profile_pic: "/assets/profile.webp",
    title: "How I Simplified Backend Development for My Project",
    date: "January 29, 2026",
    image: "/assets/blog_1.webp",
    description: `I’m currently developing a web application, and I wanted a database solution that wouldn’t slow me down with heavy configuration. I was looking for something that is easy to set up, uses SQL, and has a decent free tier — especially as a student.

That’s when I came across Supabase.

Many of you might already know about it, but this post is mainly for newcomers to the field, like me, who are still exploring real-world tools while learning. I was genuinely impressed by how simple and developer-friendly Supabase is.

Getting started is straightforward. You create a Supabase account, set up a project, and install the Supabase client (for example, using the npm package). Once that’s done, you can connect your application using API keys and start working almost immediately.

One thing I really liked is that you can manage your SQL database directly from the Supabase dashboard. You can write queries, create tables, and view data without needing any extra tools. Since it’s built on PostgreSQL, it also feels like working with a proper production-grade database, not just a learning tool.

Another big advantage is authentication. Supabase provides a built-in auth system with ready-to-use methods for actions like sign-up, login, and logout. Having both the database and authentication in one place makes development much easier, especially when you’re building full-stack applications.

As a student, tools like this are really helpful because they let you focus more on building the application logic instead of spending days configuring infrastructure. I’m still learning, but Supabase has already made my development process smoother and more enjoyable.

If you’re a beginner or a student working on your serious web app, Supabase is definitely worth checking out.`
  },
  {
    id: "2",
    author: "Upek Kasun Akalanka",
    author_details: "BSc (Hons) IT Undergraduate at SLIIT | Software Engineering Specialization",
    profile_pic: "/assets/profile.webp",
    title: "Why There Are So Many Programming Languages Today",
    date: "February 06, 2026",
    image: "/assets/blog_2.webp",
    description: `When I first started learning programming, one of the most confusing things for me was the number of programming languages out there. Everywhere I looked, I saw different names — C, C++, Java, Python, JavaScript, PHP — and people debating which one is “best”. As a beginner, it felt overwhelming at times.

Over time, I started to realize that the real question isn’t which language is best, but why there are so many of them in the first place.

There were programming languages before C, and they played an important role in the early days of computing. I’m starting from C here not because it was the first language, but because it represents a major turning point in how programming evolved. There are many more languages than the ones I’ve mentioned or explored in this article, but I’m focusing on a few key examples that helped me understand why programming languages kept changing and expanding over time.

C — Power and Control
C gave developers a lot of control over how computers work at a low level. This made it extremely fast and efficient, but also more demanding to work with.

Upsides:

Very high performance
Direct control over memory
Strong foundation for understanding how systems work

Downsides:

Steeper learning curve
Easy to make serious mistakes
Development can be slower for large applications

Where it’s strong: Operating systems, embedded systems, system-level software

C showed what was possible, but also highlighted how complex software development could become.

Java and C++ — Managing Growing Complexity
As software systems became larger, developers needed better ways to organize and maintain code. Languages like C++ and Java were designed to help with that.

C++ extended C with more abstraction, while Java focused on portability and safety.

Upsides:

Better structure for large projects
Support for object-oriented design
Strong ecosystems

Downsides:

Can become complex over time
Requires careful design and discipline

Where they’re strong: Enterprise systems, backend services, large applications, game engines (C++)

These languages helped teams build bigger systems more reliably.

Python — Making Programming More Accessible
Python gained popularity because it made programming easier to read and write. It allowed developers to focus more on solving problems rather than fighting the language.

Upsides:

Simple and readable syntax
Fast development
Large community and libraries

Downsides:

Slower execution speed
Not ideal for low-level tasks

Where it’s strong: Data science, automation, backend development, education

Python showed that clarity and productivity are often more important than performance.

JavaScript and PHP — The Rise of the Web
As the web grew, programming needs changed again. Applications had to run in browsers and respond quickly on servers.

JavaScript became essential for the browser. PHP made server-side web development easier and more accessible.

Upsides:

Easy to get started
Widely used in web development
Strong community support

Downsides:

Can lead to messy code if not structured well

Where they’re strong: Web applications, websites, full-stack development

The web era showed how important accessibility and speed of development are.

Modern Languages — Focused Solutions
Today, we see languages like Go, Rust, Kotlin, and TypeScript. These were created to address specific problems rather than replace everything that came before.

Go focuses on simplicity and concurrency
Rust focuses on memory safety without sacrificing performance
TypeScript improves JavaScript by adding type safety

Each of these languages makes trade-offs depending on the problem they’re trying to solve.

What I’ve Learned as a Student
What I’ve slowly started to understand is that new programming languages don’t exist because old ones failed. They exist because technology keeps changing, and new problems need better tools.

No single language is perfect. Each one is designed with certain priorities — performance, safety, productivity, or simplicity.

As a student, this changed how I look at learning. Instead of chasing “the best language”, I try to understand why a language exists and what problems it’s good at solving.`
  },
  {
    id: "3",
    author: "Upek Kasun Akalanka",
    author_details: "BSc (Hons) IT Undergraduate at SLIIT | Software Engineering Specialization",
    profile_pic: "/assets/profile.webp",
    title: "How a Change in Perspective Upgraded My App’s Accuracy to 99%",
    date: "June 27, 2026",
    image: "/assets/blog_3.webp",
    description: `When building a new software product, hitting a technical wall is part of the process. How we pivot defines the success of the project.

Recently, I set out to build an expense tracking system. The core feature was simple in theory: allow users to upload an image of a receipt, automatically read the text, and track their expenses seamlessly.

However, getting a machine to reliably read real-world receipts turned out to be an incredible engineering puzzle. Here is how I went from almost shelving the project to achieving near-perfect accuracy.

🛑 The Initial Hurdle: Classic OCR Limits
My first instinct was to go the traditional route using Tesseract OCR. To get the best results possible, I spent hours building and testing various image preprocessing pipelines:

Grayscaling the images to remove color noise.
Enhancing sharpness and contrast to make text pop.

Despite these efforts, the results fluctuated wildly. Real-world receipts come with wrinkles, fading text, and strange fonts. The traditional OCR approach couldn't consistently handle the chaos, hovering at less than 50% accuracy.

It was frustrating, and for a brief moment, I considered putting the idea on hold. But as developers, we don't give up, we iterate.

💡 The Epiphany: Shifting to Multimodal AI
Instead of trying to force a traditional tool to work, I took a step back and looked at the problem from a different angle. I knew that tools like Google Lens read text characters incredibly well, so my initial thought was to find a way to integrate something similar into my workflow. But as I kept thinking down that path, a far better solution hit me: Why not use a multimodal AI with vision capabilities? That way, I wouldn't just be extracting raw text, I could scrape the data and automatically organize it into a structured format without breaking a sweat.

I researched powerful, reliable AI APIs that were developer-friendly and accessible. That is when Gemini entered the game.

Instead of just parsing raw, messy text strings, I re-architected the backend workflow:

The user uploads a receipt image.
The backend securely processes the image and pairs it with a structured prompt.
The system leverages Gemini's native Structured JSON Output feature to enforce a strict data model.

📈 The Result: From <50% to ~99% Accuracy
The difference was night and day. Because the model understands context, knowing that a currency symbol belongs near a total or recognizing line items even on a crinkled receipt, the accuracy sky-rocketed.

I tested it with various kinds of receipts, layouts, and lighting conditions. It consistently returned clean, perfectly formatted JSON data straight to my database. The system went from unpredictable to nearly 99% accurate.

💡 The Bigger Picture: Sometimes, the solution to a hard problem isn't about working harder on the wrong tool; it's about shifting your perspective. The right technology might already be right in front of you, waiting to be applied in a creative way.
The project is still in active development, and I am putting the finishing touches on it before uploading the final version. I can't wait to share the repository and the full architecture with you all soon!

#SoftwareEngineering #ArtificialIntelligence #WebDevelopment #ProblemSolving #TechInnovation #ThinkDifferent`
  }
];

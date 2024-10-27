import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Flexbox layout with min-h-screen */}
      <div className="container mx-auto p-8 pb-16 flex-grow"> {/* Added pb-16 to avoid footer overlap */}
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Our mission is to create a platform where readers can discover valuable insights, 
            tips, and knowledge across a wide range of topics. From technology and programming to lifestyle, health, and entertainment, 
            we aim to provide well-researched, high-quality content that educates and inspires. 
          </p>
          <p className="text-lg text-gray-700">
            We believe that knowledge is power, and by sharing our experiences, expertise, and ideas, 
            we hope to help our audience make informed decisions, grow their skills, and find inspiration in everyday life.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg text-gray-700">
            Founded in 2023, this blog started as a small passion project by a group of friends who wanted 
            to share their love for writing and exploring new ideas. What began as a hobby quickly grew into a platform 
            with thousands of monthly readers, thanks to the consistent efforts of our talented writers and contributors.
          </p>
          <p className="text-lg text-gray-700">
            Today, we are proud to have built a community of curious minds who come to us for fresh perspectives, 
            insightful articles, and engaging discussions on the topics that matter most in our rapidly changing world.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <p className="text-lg text-gray-700">
            Our team is made up of passionate writers, researchers, and content creators from diverse backgrounds.
            We are united by our curiosity and our drive to create meaningful content. 
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mt-4">
            <li><strong>John Doe</strong> - Technology Enthusiast, Frontend Developer, and author of our top technology blogs.</li>
            <li><strong>Jane Smith</strong> - Health and Wellness Expert, with over 10 years of experience in the industry.</li>
            <li><strong>Robert Brown</strong> - Lifestyle and Productivity Coach, sharing insights on how to lead a balanced life.</li>
            <li><strong>Emily White</strong> - Entertainment Writer, covering movies, TV shows, and pop culture trends.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-700">
            We prioritize quality over quantity. Each blog post is carefully crafted, researched, and edited to ensure it meets the highest standards. 
            We believe in providing content that is not only informative but also actionable. Whether you're looking to learn a new skill, 
            stay updated on current trends, or simply find a good read, we have something for everyone.
          </p>
          <p className="text-lg text-gray-700">
            Our content is written by industry experts and passionate writers who are dedicated to delivering accurate, timely, and engaging articles. 
            We strive to make our blog a go-to destination for readers looking to explore new ideas and broaden their horizons.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-lg text-gray-700">
            We are more than just a blog – we are a community of like-minded individuals who love learning, sharing, and growing together. 
            By joining our community, you'll get access to exclusive content, updates, and opportunities to connect with other readers.
          </p>
          <p className="text-lg text-gray-700">
            Subscribe to our newsletter to stay up to date with the latest blog posts, announcements, and special events. 
            We promise not to spam your inbox and only share content we know you'll love.
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;

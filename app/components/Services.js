"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    const items = document.querySelectorAll(".service-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: "app-dev",
      title: "App Design",
      desc: "Improving your data experience through custom mobile app development.",
      icon: "/icons/app-development.png",
    },
    {
      id: "data",
      title: "Data Analytics",
      desc: "Analysing data for actionable insights and strategies to drive smarter decisions.",
      icon: "/icons/data-analytics.png",
    },
    {
      id: "scraping",
      title: "Web Scraping",
      desc: "Extracting your competitor data efficiently and ethically.",
      icon: "/icons/web-scraping.png",
    },
    {
      id: "automation",
      title: "Automation",
      desc: "Streamlining processes to enhance efficiency with automated workflows, triggers, and reporting.",
      icon: "/icons/automation.png",
    },
    {
      id: "web-dev",
      title: "Web Development",
      desc: "Building robust web platforms and maximising appeal with modern web design.",
      icon: "/icons/web-development.png",
    },
    {
      id: "seo",
      title: "SEO and Online Reach",
      desc: "Maximising reach with SEO best practices and tailored content creation.",
      icon: "/icons/seo.png",
    },
  ];

  return (
    <section id="services" className="services-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row">
          {services.map((service) => (
            <div
              key={service.id}
              className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center"
            >
              <a
                href={`#${service.id}`}
                className="text-decoration-none text-center service-item"
              >
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={90}
                  height={75}
                  className="mb-3"
                />
                <h5 className="text-on-light">{service.title}</h5>
                <p className="text-muted">{service.desc}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

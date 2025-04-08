"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ServiceDetails() {
  const [expanded, setExpanded] = useState({});
  const sectionRefs = useRef({});

  const services = [
    {
      id: "app-dev",
      title: "App Development",
      tldr: "We build custom business apps for small teams that need smarter ways to track jobs, manage data, and keep customers informed. Based in the South West, working UK-wide, our tools are built around your workflow—not the other way around.",
      text: [
        "At Datopia, we started with a simple goal: to help small businesses across Devon, Cornwall, and the South West take control of their data and finally feel in command of their day-to-day operations. Time and again, we saw skilled teams relying on patchy systems—spreadsheets, scribbled notes, email chains—just to keep things moving. So we began building custom business apps that work the way businesses actually work: clear, connected, and designed for the real world.",
        "Take our Jewellery Repairs Tracker, for example. A high-street jeweller needed a better way to manage ongoing repair jobs. We created a tailored app where staff could log customer info, upload photos, add design briefs, track job progress, and trigger automatic updates to keep customers in the loop. Now, the whole team can see the status of every job in real time, and the system even sends automatic SMS and email alerts when items are ready for collection. That’s a proper workflow automation app—built around their process, not a generic template.",
        "We believe software should feel like it was made just for you—because with Datopia, it is. Whether you’re running a retail shop, a workshop, or a service-based business, we can build data-driven business tools that streamline your workflow and grow with your team. Based in the South West and working remotely across the UK, we’re here to help small businesses move past the overwhelm and into a smarter, more connected way of working.",
      ],
      image: "/images/services/app-dev.jpg",
    },
    {
      id: "data",
      title: "Data Analytics",
      tldr: "Unlock insights from your raw data. We help small businesses by building dashboards and reporting systems to track performance, customer behaviour, and KPIs in real time.",
      text: [
        "At Datopia, we help small businesses make sense of the data they already have. Many companies don’t realise how much valuable insight is sitting in spreadsheets, reports, or scattered systems. Our custom data dashboards pull all of that together—so you can quickly see what’s performing, what needs attention, and where to go next. It’s not about more data. It’s about the right data, shown in the right way.",
        "One recent example comes from a local product-based company that needed to better understand how their stock was performing. We worked closely with them to build a range of interactive dashboards, giving them real-time insight into sales performance, seasonal demand, and product popularity. Within weeks, they were making smarter, data-driven decisions—doubling down on bestsellers and fine-tuning their pricing and stock levels based on facts, not guesswork.",
        "Whether you’re dealing with stock, services, staff, or sales, our data analysis solutions give you clarity and confidence. We work with teams across Devon, Cornwall and the wider UK to design dashboards that match how you think and work—making business intelligence part of your everyday toolkit, not an afterthought.",
        "We also provide training in Microsoft Excel, PowerQuery and even Python, for businesses that want to learn more about getting the most from their own data.",
      ],
      image: "/images/services/data.jpg",
    },
    {
      id: "scraping",
      title: "Web Scraping",
      tldr: "Collect structured data from competitors, marketplaces, or any source. We automate data collection with custom-built, reliable scrapers that give small businesses a competitive edge by gathering real-time insights.",
      text: [
        "In today’s digital market, information is power—and at Datopia, we help you gather it efficiently. Our web scraping tools are designed to extract key data from competitor websites, marketplaces, and public sources, giving your business the ability to react quickly and stay ahead. Whether you’re tracking product prices, stock levels, or market trends, we can automate the process and serve it up in a clean, easy-to-use format.",
        "A great example of this is a local client who needed help tracking the pricing and offers of their two main competitors. We built them a custom scraping solution that automatically pulled product data—including live prices and promotional offers—into a dashboard. This allowed their team to respond in real time with targeted discounts and matched competitor pricing, removing hours of manual research.",
        "We design ethical web scraping solutions for small businesses across the UK, tailored to your industry and your exact needs. If you want to keep a close eye on the market, adjust your pricing strategy, or feed competitor data into your wider analytics setup, we’ll build a system that puts that intelligence at your fingertips.",
      ],
      image: "/images/services/scraping.jpg",
    },
    {
      id: "automation",
      title: "Automation",
      tldr: "From email triggers to CRM syncing and document generation — we automate your repetitive tasks to save time and reduce errors, improving the way your business communicates, responds, and delivers.",
      text: [
        "At Datopia, we help small businesses streamline their day-to-day operations through smart automation. Many teams waste hours manually handling tasks that could easily run on autopilot—like sorting incoming emails, routing customer queries, or sending out basic updates. We use tools like Microsoft Power Automate and Zapier to create robust, low-maintenance solutions that free up your team’s time and reduce errors.",
        "A recent project involved setting up a flow of automated responses for a local business inundated with customer enquiries. We designed a series of Power Automate flows that scanned incoming messages, routed them to the right department, and sent an instant, friendly auto-reply to manage expectations. It took pressure off staff while keeping the customer experience smooth and professional.",
        "From internal alerts to multi-step approval chains, our workflow automation solutions help small businesses in Devon, Cornwall, and across the UK cut down on admin, improve consistency, and respond faster. If you're still copy-pasting, forwarding, or manually following up, we can help you automate it.",
      ],
      image: "/images/services/automation.jpg",
    },
    {
      id: "web-dev",
      title: "Web Development",
      tldr: "We build fast, responsive websites that match your brand and deliver results. Clean code, great UX, and SEO-ready out of the box, turning visitors into customers with streamlined design and built-in sales tools.",
      text: [
        "Your website is often the first impression your business makes, so at Datopia, we focus on building sites that are fast, mobile-friendly, and genuinely useful. Whether you need a simple presence or a full e-commerce platform, we tailor every project to reflect your brand and meet your practical needs. No bloated templates—just clean, maintainable code that works.",
        "One of our standout builds was a complete e-commerce site overhaul for a South West client. Their old website was dated, slow, and offered no way to sell products or services online. We rebuilt the site from the ground up, with a modern layout, custom product management, and secure checkout functionality. The result? A site that’s as beautiful as it is effective, and a huge boost in online revenue.",
        "We work with small businesses across Devon, Cornwall, and the UK to design bespoke websites that drive results—whether that means more bookings, more online sales, or more people finding out what you do best. If you're ready for a site that actually works for your business, we’re ready to build it.",
      ],
      image: "/images/services/web-development.jpg",
    },
    {
      id: "seo",
      title: "Search Engine Optimisation",
      tldr: "Boost your visibility on Google with structured SEO, keyword targeting, and performance improvements that drive organic traffic.",
      text: [
        "Having a great website is only part of the story. At Datopia, we specialise in local SEO for small businesses*—making sure your site shows up when people are searching for your services in Devon, Cornwall, or anywhere in the UK. From keyword targeting and metadata optimisation to content strategy and technical fixes, we help you build long-term, sustainable visibility online.",
        "For one of our South West clients, we’ve already boosted organic search traffic tenfold in just a few weeks. After launching their new site, we implemented structured metadata, improved content hierarchy, and aligned on high-intent keywords relevant to their market. We recognised the disconnect between their various social media efforts, and those on their own website and developed a streamlined strategy for maxmising their audience reach. The result? A measurable surge in qualified leads—and zero spend on paid ads. ",
        "We treat SEO as a living, breathing part of your online presence — not a one-off fix. If you’re tired of being buried on page three and want real results that grow over time, we’ll help you get there with personalised strategies that work.",
      ],
      image: "/images/services/seo.jpg",
    },
  ];

  const toggleExpanded = (id, e) => {
    const clickedElement = e.currentTarget;
    const rectBefore = clickedElement.getBoundingClientRect().top;

    setExpanded((prev) => (prev[id] ? {} : { [id]: true }));

    setTimeout(() => {
      const rectAfter = clickedElement.getBoundingClientRect().top;
      const delta = rectAfter - rectBefore;
      if (delta !== 0) {
        window.scrollBy({ top: -delta, behavior: "auto" });
      }
    }, 50);
  };

  return (
    <>
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const bgClass = isEven
          ? "bg-brand3 text-on-dark"
          : "bg-white text-on-light";

        return (
          <motion.section
            ref={(el) => (sectionRefs.current[service.id] = el)}
            key={service.id}
            id={service.id}
            className={`service-split ${bgClass}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="w-100">
              <div className="row g-0 align-items-stretch">
                {/* IMAGE */}
                <div
                  className={`col-12 col-md-6 ${
                    isEven ? "" : "order-md-2"
                  } px-0 d-flex align-items-stretch overflow-hidden`}
                >
                  <div
                    className={`w-100 position-relative transition-image ${
                      expanded[service.id] ? "zoomed" : ""
                    }`}
                    style={{ minHeight: "400px" }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-fit-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>

                {/* TEXT */}
                <div
                  className={`col-12 col-md-6 px-4 px-md-5 py-5 ${
                    isEven ? "" : "order-md-1"
                  }`}
                >
                  <div className="text-center text-md-start">
                    <h2>{service.title}</h2>

                    <div className="tldr-block mt-3 mb-4">
                      <h6 className="tldr-title">TL;DR</h6>
                      <p className="lead fw-bold">{service.tldr}</p>
                      <button
                        className="btn btn-link text-decoration-none text-accent fw-bold"
                        onClick={(event) => toggleExpanded(service.id, event)}
                      >
                        {expanded[service.id] ? "Show less" : "Read more"}
                      </button>
                    </div>

                    <div
                      className={`extra-text-wrapper ${
                        expanded[service.id] ? "show" : ""
                      }`}
                    >
                      <div className="scrollable-text">
                        {service.text.map((para, idx) => (
                          <p key={idx} className="expand-paragraph lead">
                            {para}
                          </p>
                        ))}
                      </div>

                      <a href="#contact" className="btn btn-brand mt-3">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        );
      })}
    </>
  );
}

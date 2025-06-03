import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  InputGroup,
  Placeholder, // Import Placeholder component
} from "react-bootstrap";

import {
  FaSearch,
  FaFilter,
  FaHeart,
  FaLightbulb,
  FaRocket,
  FaMicrophone,
  FaImage,
  FaVideo,
  FaCode,
  FaChartBar,
  FaFileAlt,
} from "react-icons/fa";

import ToolCard from "../components/ToolCard";
import FixedLogos from "../components/FixedLogos";
import { useNavigate } from "react-router-dom";

const COLORS = {
  primary: "#5F2EEA",
  primaryLight: "#9369DA",
  text: "#6A6A80",
  bg: "#F8F8FC",
};

const FONT = "Poppins, sans-serif";

const categories = [
  { name: "Text Generation", tools: 156, icon: <FaFileAlt color="black" /> },
  { name: "Image Generation", tools: 87, icon: <FaImage color="black" /> },
  { name: "Voice Generation", tools: 42, icon: <FaMicrophone color="black" /> },
  { name: "Video Generation", tools: 35, icon: <FaVideo color="black" /> },
  { name: "Code Generation", tools: 28, icon: <FaCode color="black" /> },
  { name: "Data Analysis", tools: 63, icon: <FaChartBar color="black" /> },
];

const whyItems = [
  {
    title: "All in One Place",
    description:
      "Access hundreds of AI tools without switching between websites.",
  },

  {
    title: "User Privacy First",
    description:
      "Transparent data policies so you know exactly what information is shared.",
  },

  {
    title: "Expert Curation",
    description:
      "Our team tests and reviews tools to ensure quality and usefulness.",
  },

  {
    title: "Personalized Recommendations",
    description:
      "Get AI tool suggestions based on your usage patterns and preferences.",
  },
];

const HoverCard = ({ hoveredIndex, index, setHovered, children, ...props }) => (
  <Card
    {...props}
    className={`h-100 border-0 shadow-sm rounded-4 p-3 ${
      hoveredIndex === index ? "hover-effect" : ""
    }`}
    style={{ cursor: "pointer", ...props.style }}
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
  >
    <Card.Body>{children}</Card.Body>
  </Card>
);

export default function Home() {
  const [hoveredHow, setHoveredHow] = useState(null);
  const [hoveredWhy, setHoveredWhy] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [trendingTools, setTrendingTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (searchQuery) {
      navigate(`/explore?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch("/api/tool/");
        const data = await response.json();
        setTrendingTools(data.data);
      } catch (error) {
        console.error("Error fetching tools:", error);
        setError("Failed to load tools.");
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Removed direct return statements for loading/error
  // The page will now render immediately, and the data will populate when ready.

  return (
    <div
      style={{
        marginTop: "7vh",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT,
        backgroundColor: COLORS.bg,
      }}
    >
      <style>
        {`
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card.hover-effect {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important;
        }
        `}
      </style>

      {/* HERO SECTION */}

      <section
        className="py-5 text-center d-flex align-items-center"
        style={{
          background: "linear-gradient(180deg, #e8e2fb 30%, #dfe7fb 100%)",
          minHeight: "70vh",
          paddingTop: "8vh",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1
                className="display-4 fw-bold mb-4"
                style={{ color: COLORS.primary }}
              >
                There's an AI for Everything. <br /> Find it. Use it. Instantly.
              </h1>

              <p className="lead mb-5" style={{ color: COLORS.text }}>
                McCarthy is your one-stop marketplace to discover, compare, and
                use the best AI tools.
              </p>

              <InputGroup
                className="mb-4 shadow mx-auto rounded-pill"
                style={{ maxWidth: "600px", overflow: "hidden" }}
              >
                <InputGroup.Text
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "none",
                    borderRight: "1px solid #E0E0E0",
                    paddingLeft: "15px",
                  }}
                >
                  <FaSearch style={{ color: "textColor" }} />
                </InputGroup.Text>

                <Form.Control
                  placeholder="Search for AI tools (eg., video generation)"
                  aria-label="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: "none", boxShadow: "none" }}
                />

                <Link to="/explore">
                  <Button
                    variant="light"
                    id="dropdown-filters"
                    style={{
                      border: "none",
                      borderLeft: "1px solid #E0E0E0",
                      color: "#6A6A80",
                      zIndex: 0,
                    }}
                  >
                    <FaFilter className="me-2" /> Filters
                  </Button>
                </Link>
                <Button
                  style={{
                    backgroundColor: "#7646C3",
                    borderColor: "#7646C3",
                    borderRadius: "0",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    zIndex: 0,
                  }}
                  onClick={handleSearchClick}
                >
                  <Link
                    to="/explore"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Search
                  </Link>
                </Button>
              </InputGroup>

              <Button
                style={{
                  backgroundColor: "#7646C3",
                  borderColor: COLORS.primaryLight,
                  padding: "12px 30px",
                  fontSize: "1.1rem",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(147, 105, 218)",
                }}
                className="mt-3 rounded-pill"
                onClick={handleSearchClick}
              >
                <Link
                  to="/explore"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Search →
                </Link>
              </Button>

              <div className="d-flex justify-content-center mt-5 gap-3">
                <FixedLogos />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* HOW SECTION */}

      <Container className="text-center my-5 py-5">
        <h2 className="fw-bold mb-3">How McCarthy Works</h2>
        <p className="lead mb-5" style={{ color: COLORS.text }}>
          Discover, compare, and use AI tools without the hassle of switching
          between websites.
        </p>

        <Row className="justify-content-center">
          {[
            {
              icon: (
                <FaSearch
                  size={40}
                  style={{
                    color: "#9369DA",
                    backgroundColor: "#F0F0FF",
                    padding: "10px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                />
              ),
              title: "Search & Discover",
              desc: "Explore our curated AI tools...",
            },

            {
              icon: (
                <FaLightbulb
                  size={40}
                  style={{
                    color: "#FFD700",
                    backgroundColor: "#FFFBEB",
                    padding: "10px",
                    borderRadius: "12px",
                  }}
                />
              ),

              title: "Compare & Choose",
              desc: "Read reviews, compare features...",
            },

            {
              icon: (
                <FaRocket
                  size={40}
                  style={{
                    color: "#FF6347",
                    backgroundColor: "#FFEEEA",
                    padding: "10px",
                    borderRadius: "12px",
                  }}
                />
              ),
              title: "Use Instantly",
              desc: "Launch tools directly and start creating.",
            },
          ].map((item, idx) => (
            <Col md={4} className="mb-4" key={idx}>
              <HoverCard
                index={idx}
                hoveredIndex={hoveredHow}
                setHovered={setHoveredHow}
              >
                <div
                  className="mb-3"
                  style={{ fontSize: "2rem", color: "#7646C3" }}
                >
                  {item.icon}
                </div>
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted">{item.desc}</p>
              </HoverCard>
            </Col>
          ))}
        </Row>
      </Container>

      {/* TRENDING TOOLS */}

      <section style={{ backgroundColor: "#eeebfc" }}>
        <Container className="my-5 py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold" style={{ color: "#7646C3" }}>
              Top Trending Tools
            </h2>

            <Link
              to="/explore"
              style={{ textDecoration: "none", color: COLORS.primaryLight }}
            >
              View all tools →
            </Link>
          </div>

          <Row xs={1} md={3} className="g-4">
            {loading ? (
              // Placeholder/Skeleton for loading state
              Array.from({ length: 3 }).map((_, idx) => (
                <Col key={idx}>
                  <Card className="h-100 shadow-sm rounded-4 p-3 border-0">
                    <Card.Body>
                      <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                        <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                        <Placeholder xs={8} />
                      </Placeholder>
                      <Placeholder.Button variant="primary" xs={6} />
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : error ? (
              <Col>
                <div className="text-danger">Error: {error}</div>
              </Col>
            ) : (
              // Actual ToolCards once data is loaded
              trendingTools?.map((tool, idx) => (
                <ToolCard
                  tool={{
                    _id: tool._id,
                    icon: tool.image,
                    name: tool.title,
                    description: tool.description,
                    tags: tool.hashtags,
                    toolUrl: tool.toolUrl,
                  }}
                  key={idx}
                />
              ))
            )}
          </Row>
        </Container>
      </section>

      {/* BROWSE BY CATEGORY */}

      <Container className="my-5 py-5 text-center">
        <h2
          className="fw-bold mb-3"
          style={{ color: "#7646C3", fontSize: "2.5rem" }}
        >
          Browse by Category
        </h2>
        <p className="lead mb-5" style={{ color: COLORS.text }}>
          Find the perfect AI tool for your specific needs.
        </p>

        <Row className="justify-content-center g-4">
          {categories.map((cat, idx) => (
            <Col xs={6} sm={4} lg={2} key={idx}>
              <Link to="/explore" style={{ textDecoration: "none" }}>
                <div
                  className={`card h-100 border-0 shadow-sm rounded-4 p-3 ${
                    hoveredCategory === idx ? "hover-effect" : ""
                  }`}
                  style={{ minHeight: "150px", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredCategory(idx)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div
                    className="mb-2"
                    style={{ fontSize: "2rem", color: "#7646C3" }}
                  >
                    {cat.icon}
                  </div>
                  <p className="fw-semibold mb-1" style={{ color: "#333333" }}>
                    {cat.name}
                  </p>
                  <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                    {cat.tools} tools
                  </p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* WHY SECTION */}

      <section style={{ backgroundColor: "#eeebfc" }}>
        <Container className="my-5 py-5 text-center">
          <h2 className="fw-bold mb-3" style={{ color: "#7646C3" }}>
            Why McCarthy?
          </h2>

          <p className="lead mb-5" style={{ color: COLORS.text }}>
            We're not just a directory – we're your AI tool companion.
          </p>

          <Row className="justify-content-center g-4">
            {whyItems.map((item, idx) => (
              <Col md={3} key={idx}>
                <HoverCard
                  index={idx}
                  hoveredIndex={hoveredWhy}
                  setHovered={setHoveredWhy}
                >
                  <h5 className="fw-bold mb-2">{item.title}</h5>

                  <p className="text-muted">{item.description}</p>
                </HoverCard>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA SECTION */}

      <div style={{ padding: "0 4rem 4rem" }}>
        <div
          style={{
            borderRadius: "1.2rem",
            minHeight: "40vh",
            background: "linear-gradient(90deg, #7b2ff7 0%, #4facfe 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: 40,
          }}
        >
          <Container>
            <h2 className="fw-bold" style={{ fontSize: "2rem" }}>
              Ready to enhance your workflow with AI?
            </h2>

            <p style={{ fontSize: "1.25rem", marginTop: 15 }}>
              Start exploring the world's best AI tools curated just for you.
            </p>

            <Link
              to="/explore"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                variant="light"
                style={{
                  marginTop: 25,
                  padding: "10px 25px",
                  fontWeight: "500",
                  borderRadius: "25px",
                }}
              >
                Explore →
              </Button>
            </Link>
          </Container>
        </div>
      </div>
    </div>
  );
}

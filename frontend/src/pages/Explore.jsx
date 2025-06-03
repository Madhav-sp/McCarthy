import React, { useState, useEffect } from "react";
import axios from "axios";
import ToolList from "../components/ToolList";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Card,
  ListGroup,
  Modal,
  Placeholder, // Import Placeholder
} from "react-bootstrap";
import { Search, SlidersHorizontal } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [pricingFilters, setPricingFilters] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const navigate = useNavigate();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const paramSearchQuery = queryParams.get("query");

  useEffect(() => {
    if (paramSearchQuery) {
      navigate("/explore");
      setSearchQuery(paramSearchQuery);
    }
  }, [paramSearchQuery]);

  const categories = [
    "Text Generation",
    "Image Generation",
    "Voice Generation",
    "Video Generation",
    "Code Generation",
  ];

  const pricingOptions = [
    "Free",
    "Freemium",
    "Premium",
    "Free Trial",
    "Pay Per Use",
  ];

  const fetchTools = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Clear any previous errors
    try {
      const response = await axios.get("/api/tool");
      setTools(response.data.data);
    } catch (error) {
      console.error("Error fetching tools:", error);
      setError("Failed to load tools. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after fetching (success or error)
    }
  };

  const filterTools = () => {
    let filtered = tools;

    if (searchQuery) {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.title.toLowerCase().includes(lowerCaseSearchQuery) ||
          (tool.hashtags &&
            tool.hashtags.some((tag) =>
              tag.toLowerCase().includes(lowerCaseSearchQuery)
            )) ||
          (tool.keyWords &&
            tool.keyWords.some((keyword) =>
              keyword.toLowerCase().includes(lowerCaseSearchQuery)
            ))
      );
    }

    if (categoryFilters.length > 0) {
      const lowerCaseCategoryFilters = categoryFilters.map((c) =>
        c.toLowerCase()
      );
      filtered = filtered.filter((tool) =>
        lowerCaseCategoryFilters.some(
          (category) =>
            (tool.keyWords &&
              tool.keyWords.some((kw) => kw.toLowerCase() === category)) ||
            (tool.hashtags &&
              tool.hashtags.some((tag) => tag.toLowerCase() === category))
        )
      );
    }

    if (pricingFilters.length > 0) {
      const lowerCasePricingFilters = pricingFilters.map((p) =>
        p.toLowerCase()
      );
      filtered = filtered.filter(
        (tool) =>
          tool.pricing &&
          lowerCasePricingFilters.includes(tool.pricing.toLowerCase())
      );
    }

    setFilteredTools(filtered);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((item) => item !== category)
        : [...prevFilters, category]
    );
  };

  const handlePricingChange = (pricing) => {
    setPricingFilters((prevFilters) =>
      prevFilters.includes(pricing)
        ? prevFilters.filter((item) => item !== pricing)
        : [...prevFilters, pricing]
    );
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterTools();
    setShowFilterModal(false);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    // Only filter if tools have been loaded or if filters/search change
    if (!loading) {
      filterTools();
    }
  }, [searchQuery, categoryFilters, pricingFilters, tools, loading]); // Add 'loading' to dependencies

  const primaryPurple = "#6c63ff";
  const lightPurple = "#f0f0ff";
  const darkText = "#333";
  const mutedText = "#666";
  const lightGreyBorder = "#e0e0e0";

  return (
    <Container style={{ marginTop: "5rem", padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "0.5rem",
          }}
        >
          Explore AI Tools
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Discover the perfect AI tools for your specific needs
        </p>
      </div>

      <div className="d-lg-none mb-4 px-3">
        <Form
          onSubmit={handleSearchSubmit}
          className="d-flex align-items-center justify-content-between"
          style={{
            border: `1px solid ${lightGreyBorder}`,
            borderRadius: "50px",
            padding: "0.5rem 1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            backgroundColor: "#fff",
          }}
        >
          <FormControl
            type="text"
            placeholder="Search for AI tools..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              border: "none",
              boxShadow: "none",
              padding: "0",
              fontSize: "0.95rem",
              flexGrow: 1,
              marginRight: "0.5rem",
            }}
          />
          <Button
            variant="link"
            onClick={() => setShowFilterModal(true)}
            style={{
              color: primaryPurple,
              padding: "0.25rem 0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <SlidersHorizontal size={20} /> Filters
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: primaryPurple,
              backgroundImage: `linear-gradient(to right, ${primaryPurple}, #8a7dff)`,
              borderColor: primaryPurple,
              borderRadius: "50px",
              padding: "0.5rem 1rem",
              fontSize: "0.95rem",
              color: "white",
              fontWeight: "600",
              marginLeft: "0.5rem",
            }}
          >
            Search
          </Button>
        </Form>
      </div>

      <Row>
        <Col lg={3} className="d-none d-lg-block mb-4">
          <Card
            className="shadow-sm border-0 rounded-4"
            style={{ padding: "1.5rem" }}
          >
            <Card.Body style={{ padding: "0" }}>
              <Form onSubmit={handleSearchSubmit} className="mb-4">
                <div
                  className="d-flex align-items-center"
                  style={{
                    border: `1px solid ${lightGreyBorder}`,
                    borderRadius: "8px",
                    padding: "0.5rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <FormControl
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                      border: "none",
                      boxShadow: "none",
                      padding: "0.5rem",
                      fontSize: "0.95rem",
                    }}
                    className="flex-grow-1"
                  />
                  <Button
                    variant="link"
                    type="submit"
                    style={{ color: mutedText, padding: "0.5rem" }}
                  >
                    <Search size={20} />
                  </Button>
                </div>
              </Form>

              <div className="mb-4">
                <h5
                  style={{
                    color: darkText,
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  Categories
                </h5>
                <ListGroup variant="flush">
                  {categories.map((category) => (
                    <ListGroup.Item
                      key={category}
                      action
                      onClick={() => handleCategoryChange(category)}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        padding: "0.75rem 0",
                        borderBottom: `1px solid ${lightGreyBorder}`,
                        cursor: "pointer",
                      }}
                    >
                      <Form.Check
                        type="checkbox"
                        id={`category-${category}`}
                        label={category}
                        checked={categoryFilters.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        style={{ fontSize: "0.95rem", color: mutedText }}
                      />
                      <span
                        style={{
                          backgroundColor: lightPurple,
                          color: primaryPurple,
                          borderRadius: "4px",
                          padding: "0.2em 0.6em",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {
                          tools.filter(
                            (tool) =>
                              (tool.keyWords &&
                                tool.keyWords.includes(category)) ||
                              (tool.hashtags &&
                                tool.hashtags.includes(category))
                          ).length
                        }
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              <div>
                <h5
                  style={{
                    color: darkText,
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  Pricing
                </h5>
                <ListGroup variant="flush">
                  {pricingOptions.map((option) => (
                    <ListGroup.Item
                      key={option}
                      action
                      onClick={() => handlePricingChange(option)}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        padding: "0.75rem 0",
                        borderBottom: `1px solid ${lightGreyBorder}`,
                        cursor: "pointer",
                      }}
                    >
                      <Form.Check
                        type="checkbox"
                        id={`pricing-${option}`}
                        label={option}
                        checked={pricingFilters.includes(option)}
                        onChange={() => handlePricingChange(option)}
                        style={{ fontSize: "0.95rem", color: mutedText }}
                      />
                      <span
                        style={{
                          backgroundColor: lightPurple,
                          color: primaryPurple,
                          borderRadius: "4px",
                          padding: "0.2em 0.6em",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {tools.filter((tool) => tool.pricing === option).length}
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          {loading ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {Array.from({ length: 9 }).map((_, idx) => (
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
              ))}
            </Row>
          ) : error ? (
            <div className="text-center mt-5 text-danger">
              <h4>{error}</h4>
              <p>Please check your internet connection or try again later.</p>
            </div>
          ) : (
            <>
              <ToolList
                tools={filteredTools}
                userToken={localStorage.getItem("accessToken")}
              />
              {filteredTools.length === 0 && (
                <div className="text-center mt-5" style={{ color: mutedText }}>
                  <h4>No tools found matching your criteria.</h4>
                  <p>Try adjusting your search query or filters.</p>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>

      <Modal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Tools</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <h5
              style={{
                color: darkText,
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Categories
            </h5>
            <ListGroup variant="flush">
              {categories.map((category) => (
                <ListGroup.Item
                  key={category}
                  action
                  onClick={() => handleCategoryChange(category)}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    padding: "0.75rem 0",
                    borderBottom: `1px solid ${lightGreyBorder}`,
                    cursor: "pointer",
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    id={`modal-category-${category}`}
                    label={category}
                    checked={categoryFilters.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    style={{ fontSize: "0.95rem", color: mutedText }}
                  />
                  <span
                    style={{
                      backgroundColor: lightPurple,
                      color: primaryPurple,
                      borderRadius: "4px",
                      padding: "0.2em 0.6em",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {
                      tools.filter(
                        (tool) =>
                          (tool.keyWords && tool.keyWords.includes(category)) ||
                          (tool.hashtags && tool.hashtags.includes(category))
                      ).length
                    }
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          <div>
            <h5
              style={{
                color: darkText,
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Pricing
            </h5>
            <ListGroup variant="flush">
              {pricingOptions.map((option) => (
                <ListGroup.Item
                  key={option}
                  action
                  onClick={() => handlePricingChange(option)}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    padding: "0.75rem 0",
                    borderBottom: `1px solid ${lightGreyBorder}`,
                    cursor: "pointer",
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    id={`modal-pricing-${option}`}
                    label={option}
                    checked={pricingFilters.includes(option)}
                    onChange={() => handlePricingChange(option)}
                    style={{ fontSize: "0.95rem", color: mutedText }}
                  />
                  <span
                    style={{
                      backgroundColor: lightPurple,
                      color: primaryPurple,
                      borderRadius: "4px",
                      padding: "0.2em 0.6em",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {tools.filter((tool) => tool.pricing === option).length}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              filterTools();
              setShowFilterModal(false);
            }}
            style={{
              backgroundColor: primaryPurple,
              backgroundImage: `linear-gradient(to right, ${primaryPurple}, #8a7dff)`,
              borderColor: primaryPurple,
              color: "white",
            }}
          >
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    community: "",
    clan: "",
    family_name: "",
    occupation: "",
    address: "",
    state_of_residence: "",
    lga_of_residence: "",
    sex: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Predefined options for community, clan, and sex
  const communities = ["Community 1", "Community 2", "Community 3"];
  const clans = ["Clan 1", "Clan 2", "Clan 3"];
  const sexOptions = ["male", "female", "other"];

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/register/", formData); // Update to match your backend URL

      if (response.status === 201) {
        setSuccessMessage("Registration successful!");
        setError(null); // Clear any previous error
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || "An error occurred.");
      } else {
        setError("Network error, please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name (Required)</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email (Required)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password (Required)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Community (Required)</label>
          <select
            name="community"
            value={formData.community}
            onChange={handleChange}
            required
          >
            <option value="">Select a community</option>
            {communities.map((community, index) => (
              <option key={index} value={community}>
                {community}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Clan (Required)</label>
          <select
            name="clan"
            value={formData.clan}
            onChange={handleChange}
            required
          >
            <option value="">Select a clan</option>
            {clans.map((clan, index) => (
              <option key={index} value={clan}>
                {clan}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Family Name (Required)</label>
          <input
            type="text"
            name="family_name"
            value={formData.family_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Occupation (Optional)</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address (Optional)</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>State of Residence (Optional)</label>
          <input
            type="text"
            name="state_of_residence"
            value={formData.state_of_residence}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>LGA of Residence (Optional)</label>
          <input
            type="text"
            name="lga_of_residence"
            value={formData.lga_of_residence}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Sex (Optional)</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="">Select sex</option>
            {sexOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;

// src/pages/Register.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock } from "lucide-react";
import AnimatedFormContainer from "../components/AnimatedFormContainer";
import AnimatedFormItem from "../components/AnimatedFormItem";
import CreativeButton from "../components/CreativeButton";

// Assuming axios.defaults.baseURL is set elsewhere
// Assuming a proper toast library like react-hot-toast is used for server feedback

export default function Register() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      // Your API call logic
    } catch (err) {
      // Your server error handling logic
    }
  };

  return (
    <AnimatedFormContainer title="Create Account" intro="Join the Apple Home ecosystem today." onSubmit={handleRegister}>
      <AnimatedFormItem label="Full Name" index={0} icon={<User />} error={errors.fullName}>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
      </AnimatedFormItem>
      <AnimatedFormItem label="Email Address" index={1} icon={<Mail />} error={errors.email}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </AnimatedFormItem>
      <AnimatedFormItem label="Password" index={2} icon={<Lock />} error={errors.password}>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </AnimatedFormItem>
      <AnimatedFormItem label="Confirm Password" index={3} icon={<Lock />} error={errors.confirmPassword}>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
      </AnimatedFormItem>

      <div className="mt-6">
        <CreativeButton text="Create Account" type="submit" />
      </div>
      
      <p className="text-gray-400 mt-8 text-center">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-[#00d5be] hover:underline">
          Sign In
        </Link>
      </p>
    </AnimatedFormContainer>
  );
}
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from "lucide-react";
import AnimatedFormContainer from "../components/AnimatedFormContainer";
import AnimatedFormItem from "../components/AnimatedFormItem";
import CreativeButton from "../components/CreativeButton";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
        setError("Please enter both email and password.");
        return;
    }
    try {
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect email or password");
    }
  };

  return (
    <AnimatedFormContainer title="Welcome Back" intro="Sign in to your account to continue." onSubmit={handleLogin}>
      <AnimatedFormItem label="Email Address" index={0} icon={<Mail />}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </AnimatedFormItem>
      <AnimatedFormItem label="Password" index={1} icon={<Lock />}>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </AnimatedFormItem>
      
      {error && <p className="text-red-500 text-xs text-center -mb-2">{error}</p>}
      
      <div className="mt-8">
        <CreativeButton text="Sign In" type="submit" />
      </div>

      <p className="text-gray-400 mt-8 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-[#00d5be] hover:underline">
          Create one
        </Link>
      </p>
    </AnimatedFormContainer>
  );
}

// Create: src/app/signup/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Store,
  MapPin,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import StyledButton from "@/components/ui/StyledButton";
import PlacesAutocomplete from "@/components/PlacesAutocomplete";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    marketingEmails: false,

    // Step 2: Store Details
    storeName: "",
    storeLocation: "",
    deliveryTypes: {
      superFast: false, // 15 mins
      fast: false, // 30 mins
      normal: false, // 60 mins
    },
  });

  const [formStep, setFormStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryTypeChange = (type: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      deliveryTypes: {
        ...prev.deliveryTypes,
        [type]: checked,
      },
    }));
  };

  const validateStep1 = () => {
    if (!formData.email) {
      toast.error("Please enter your email", { icon: "📧" });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address", { icon: "📧" });
      return false;
    }

    if (!formData.phone) {
      toast.error("Please enter your phone number", { icon: "📞" });
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long", {
        icon: "🔒",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match", { icon: "🔒" });
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!formData.storeName.trim()) {
      toast.error("Please enter your store name", { icon: "🏪" });
      return false;
    }

    if (!formData.storeLocation.trim()) {
      toast.error("Please enter your store location", { icon: "📍" });
      return false;
    }

    const hasDeliveryType = Object.values(formData.deliveryTypes).some(
      (type) => type === true
    );

    if (!hasDeliveryType) {
      toast.error("Please select at least one delivery type", { icon: "🚚" });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setFormStep(2);
      toast.success("Personal details saved! Now let's set up your store.", {
        icon: "✅",
      });
    } else {
      toast.error("Please fix the errors before proceeding", {
        icon: "⚠️",
      });
    }
  };

  const handleBack = () => {
    setFormStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const selectedDeliveryTypes = Object.entries(formData.deliveryTypes)
        .filter(([_, selected]) => selected)
        .map(([type, _]) => {
          switch (type) {
            case "superFast":
              return "Super Fast (15 mins)";
            case "fast":
              return "Fast (30 mins)";
            case "normal":
              return "Normal (60 mins)";
            default:
              return type;
          }
        });

      toast.success(
        `Account created successfully! Welcome to SuperRider, ${formData.storeName}!`,
        {
          icon: "🎉",
          duration: 5000,
        }
      );

      console.log("Form Data:", {
        ...formData,
        selectedDeliveryTypes,
      });

      // Redirect to dashboard or login
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      toast.error("Failed to create account. Please try again.", {
        icon: "❌",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start py-0 justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/SuperRiderTransparent.png"
              width={120}
              height={100}
              alt="SuperRider Logo"
              className="mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="text-gray-600 mt-2">
            {formStep === 1
              ? "Join SuperRider and start managing your deliveries"
              : "Tell us about your store"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6 w-full">
          <div className="flex items-center justify-center space-x-4 w-full">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                formStep >= 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              1
            </div>

            <div
              className={`h-1 w-42 ${
                formStep >= 2 ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                formStep >= 2
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {formStep === 1 ? "Personal Information" : "Store Setup"}
            </CardTitle>
            <CardDescription className="text-center">
              {formStep === 1
                ? "Enter your personal information"
                : "Set up your store details and delivery options"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal Details */}
            {formStep === 1 && (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="akash@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9900XXXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Checkboxes */}

                {/* Next Button */}
                <StyledButton
                  type="primary"
                  onClick={handleNext}
                  disabled={isLoading}
                  className="w-full"
                >
                  Next
                </StyledButton>
              </form>
            )}

            {/* Step 2: Store Details */}
            {formStep === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Store Name */}
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <div className="relative">
                    <Store className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="storeName"
                      placeholder="Your Store Name"
                      value={formData.storeName}
                      onChange={(e) =>
                        handleInputChange("storeName", e.target.value)
                      }
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Store Location */}
                <div className="space-y-2">
                  <Label htmlFor="storeLocation">Store Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                    <PlacesAutocomplete
                      id="storeLocation"
                      value={formData.storeLocation}
                      onChange={(value) =>
                        handleInputChange("storeLocation", value)
                      }
                      placeholder="Enter your store address"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Delivery Types */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Select Delivery Types
                  </Label>
                  <p className="text-sm text-gray-600">
                    Choose the delivery options you want to offer
                  </p>

                  <div className="space-y-3">
                    {/* Super Fast Delivery */}
                    <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Checkbox
                        id="superFast"
                        checked={formData.deliveryTypes.superFast}
                        onCheckedChange={(checked) =>
                          handleDeliveryTypeChange(
                            "superFast",
                            checked as boolean
                          )
                        }
                        disabled={isLoading}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-red-500" />
                          <Label
                            htmlFor="superFast"
                            className="font-medium text-gray-900"
                          >
                            Super Fast Delivery
                          </Label>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          15 minutes • Premium pricing • High demand orders
                        </p>
                      </div>
                    </div>

                    {/* Fast Delivery */}
                    <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Checkbox
                        id="fast"
                        checked={formData.deliveryTypes.fast}
                        onCheckedChange={(checked) =>
                          handleDeliveryTypeChange("fast", checked as boolean)
                        }
                        disabled={isLoading}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <Label
                            htmlFor="fast"
                            className="font-medium text-gray-900"
                          >
                            Fast Delivery
                          </Label>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          30 minutes • Standard pricing • Most popular option
                        </p>
                      </div>
                    </div>

                    {/* Normal Delivery */}
                    <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Checkbox
                        id="normal"
                        checked={formData.deliveryTypes.normal}
                        onCheckedChange={(checked) =>
                          handleDeliveryTypeChange("normal", checked as boolean)
                        }
                        disabled={isLoading}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-500" />
                          <Label
                            htmlFor="normal"
                            className="font-medium text-gray-900"
                          >
                            Normal Delivery
                          </Label>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          60 minutes • Economy pricing • Budget-friendly option
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <StyledButton
                    type="primary"
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? "Creating account..." : "Create account"}
                  </StyledButton>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

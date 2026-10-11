"use client";

import { toast } from "react-toastify";
import React, { useState } from "react";
import {Button, FieldError, Form, Input, Label, TextField,} from "@heroui/react";
import { signUp } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "Sign Up Failed!");
        return;
      }

      toast.success("Sign Up Successful!");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-[#f4f6f3] flex flex-col justify-center items-center px-4 py-8 text-gray-800">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            সাইন আপ
          </h1>

          <p className="text-sm text-gray-600">
            নতুন অ্যাকাউন্ট তৈরি করে বাজার দর ও অন্যান্য সুবিধা উপভোগ করুন।
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-700">
                নাম
              </Label>
              <Input placeholder="আপনার নাম লিখুন" className="mt-1" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-700">
                ইমেইল
              </Label>
              <Input placeholder="you@example.com" className="mt-1" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-700">
                পাসওয়ার্ড
              </Label>
              <Input
                placeholder="কমপক্ষে ৮ অক্ষর, ১ বড় হাতের অক্ষর ও সংখ্যা"
                className="mt-1"
              />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="confirmPassword"
              type="password"
              validate={(value) => {
                if (value !== password) {
                  return "Passwords do not match";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-700">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>
              <Input
                placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                className="mt-1"
              />
              <FieldError />
            </TextField>

            <Button
              type="submit"
              className="w-full py-3 mt-2 bg-[#0f8a42] hover:bg-[#0c7337] text-white font-semibold rounded-xl shadow-sm transition-all"
            >
              সাইন আপ
            </Button>
          </Form>

          <div className="text-center pt-2 text-xs text-gray-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#0f8a42] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

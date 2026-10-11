"use client";

import { toast } from "react-toastify";
import React, { useState } from "react";
import {Button, FieldError, Form, Input, Label, TextField,} from "@heroui/react";

import { signIn } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
      });

      if (error) {
        toast.error(error.message || "Sign In Failed!");
        return;
      }

      toast.success("Sign In Successful!");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f6f3] flex flex-col justify-center items-center px-4 py-8 text-gray-800">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            সাইন ইন
          </h1>

          <p className="text-sm text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-700">
                পাসওয়ার্ড
              </Label>
              <Input placeholder="কমপক্ষে ৮ অক্ষর" className="mt-1" />
              <FieldError />
            </TextField>

            <Button
              type="submit"
              isDisabled={loading}
              className="w-full py-3 mt-2 bg-[#0f8a42] hover:bg-[#0c7337] text-white font-semibold rounded-xl shadow-sm transition-all"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </Button>
          </Form>

          <div className="text-center pt-2 text-xs text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#0f8a42] hover:underline"
            >
              সাইন আপ করুন
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

export default SignIn;

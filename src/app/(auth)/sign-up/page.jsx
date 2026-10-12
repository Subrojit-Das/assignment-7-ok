"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn, signUp } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না!");
      return;
    }

    try {
      const { error } = await signUp.email({
        name: String(data.name),
        email: String(data.email),
        password: String(data.password),
      });

      if (error) {
        console.error("SIGN UP ERROR:", error);
        toast.error(error.message || "Sign Up Failed!");
        return;
      }

      toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("CATCH ERROR:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  const hendelgooglesignup = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google Sign Up Failed!");
      }
    } catch (error) {
      toast.error(error.message || "Google Sign Up Failed!");
    }
  };

  const hendelgithubsignup = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub Sign Up Failed!");
      }
    } catch (error) {
      toast.error(error.message || "GitHub Sign Up Failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f3] flex flex-col items-center justify-center px-4 py-8 text-gray-800">
      <div className="w-full max-w-md space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="text-sm text-gray-600">
            নিজস্ব অ্যাকাউন্ট তৈরি করে বাজার দর ও অন্যান্য সুবিধা উপভোগ করুন।
          </p>
        </div>

        <div className="bg-[#fbfcfb] p-5 sm:p-7 rounded-2xl border border-gray-200 shadow-sm">
          <Form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                }
                return null;
              }}
            >
              <Label className="text-xs font-semibold text-gray-700">
                নাম
              </Label>

              <Input
                name="name"
                placeholder="আপনার নাম লিখুন"
                className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0f8a42]"
              />

              <FieldError />
            </TextField>

            <TextField isRequired name="email" type="email">
              <Label className="text-xs font-semibold text-gray-700">
                ইমেইল
              </Label>

              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0f8a42]"
              />

              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              validate={(value) => {
                if (value.length < 8) {
                  return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                }

                if (!/[A-Z]/.test(value)) {
                  return "কমপক্ষে একটি বড় হাতের অক্ষর দিন";
                }

                if (!/[0-9]/.test(value)) {
                  return "কমপক্ষে একটি সংখ্যা দিন";
                }

                return null;
              }}
            >
              <Label className="text-xs font-semibold text-gray-700">
                পাসওয়ার্ড
              </Label>

              <Input
                name="password"
                type="password"
                placeholder="পাসওয়ার্ড লিখুন"
                className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0f8a42]"
              />

              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="confirmPassword"
              type="password"
              validate={(value) => {
                if (value !== password) {
                  return "পাসওয়ার্ড মিলছে না";
                }
                return null;
              }}
            >
              <Label className="text-xs font-semibold text-gray-700">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>

              <Input
                name="confirmPassword"
                type="password"
                placeholder="আবার পাসওয়ার্ড লিখুন"
                className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0f8a42]"
              />

              <FieldError />
            </TextField>

            <Button
              type="submit"
              className="mt-1 w-full rounded-md bg-[#078a42] py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#067536]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </Form>

          <div className="pt-3 text-center text-xs text-gray-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#078a42] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </div>

          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onClick={hendelgooglesignup}
              className="flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <span className="font-bold text-[#4285F4]">G</span>
              Google দিয়ে সাইন আপ
            </Button>

            <Button
              type="button"
              onClick={hendelgithubsignup}
              className="flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 fill-current"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.06-1.24-5.06-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.59 5.22-5.07 5.49.4.35.75 1.02.75 2.06v3.09c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub দিয়ে সাইন আপ
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 transition-colors hover:text-gray-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
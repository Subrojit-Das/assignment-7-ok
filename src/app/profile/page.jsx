
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {updateUser, useSession, signOut,} from "../../lib/auth-client";

import { Button, FieldError, FieldGroup, Fieldset, Form, Input, Label, TextField,} from "@heroui/react";

import Image from "next/image";

export default function ProfilePage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [signOutLoading, setSignOutLoading] = useState(false);

    const handleSignOut = async () => {
        try {
            setSignOutLoading(true);

            const result = await signOut();

            if (result?.error) {
                toast.error("Sign Out Failed!");
                return;
            }

            toast.success("Sign Out Successful!");
        } catch (error) {
            toast.error("Something went wrong during Sign Out!");
        } finally {
            setSignOutLoading(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        try {
            setLoading(true);

            const resData = await updateUser({
                name: String(userData.name),
            });

            if (resData?.error) {
                toast.error("Profile Update Failed!");
                return;
            }

            toast.success("Profile Updated Successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f6f3] px-4 py-8 sm:px-8 text-gray-800">
            <div className="container mx-auto max-w-4xl space-y-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        আমার প্রোফাইল
                    </h1>

                    <p className="text-sm text-gray-600 mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {session?.user?.image ? (
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name || "User"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                                {session?.user?.name?.[0] || "U"}
                            </div>
                        )}

                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold text-gray-900">
                                {session?.user?.name || "ইউজার"}
                            </h2>

                            <span className="text-sm text-gray-500">
                                {session?.user?.email || "email@example.com"}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        disabled={signOutLoading}
                        className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-xl transition-all disabled:opacity-50"
                    >
                        {signOutLoading ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                    </button>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm">
                    <Form onSubmit={onSubmit} className="w-full space-y-6">
                        <Fieldset>
                            <Fieldset.Legend className="text-lg font-bold text-gray-900">
                                তথ্য
                            </Fieldset.Legend>

                            <FieldGroup className="mt-4">
                                <TextField
                                    isRequired
                                    name="name"
                                    defaultValue={session?.user?.name || ""}
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

                                    <Input
                                        placeholder="আপনার নাম লিখুন"
                                        className="mt-1"
                                    />

                                    <FieldError />
                                </TextField>
                            </FieldGroup>

                            <Fieldset.Actions className="mt-6">
                                <Button
                                    type="submit"
                                    isDisabled={loading}
                                    className="w-full py-3 bg-[#0f8a42] hover:bg-[#0c7337] text-white font-semibold rounded-xl shadow-sm transition-all"
                                >
                                    {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>
                </div>
            </div>
        </div>
    );
}

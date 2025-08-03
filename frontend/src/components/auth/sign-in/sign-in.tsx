"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 min-w-[300px]">
      <label htmlFor="email">이메일</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        placeholder="example@inflab.com"
        className="border-2 border-gray-300 rounded-sm p-2"
      />
      <label htmlFor="password">비밀번호</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        placeholder="example@inflab.com"
        className="border-2 border-gray-300 rounded-sm p-2"
      />

      <button
        type="submit"
        className="bg-green-500 text-white font-bold cursor-pointer rounded-sm p-2"
      >
        로그인
      </button>
      <Link href="/signup" className="text-center">
        회원가입
      </Link>
    </form>
  );
};

export default SignIn;

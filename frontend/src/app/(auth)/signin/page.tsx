import SignIn from "@/components/auth/sign-in/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 - 인프런",
  description: "인프런 로그인 페이지입니다.",
};

export default function SigninPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">로그인</h1>
      <p className="text-gray-700">인프런 계정으로 로그인할 수 있어요</p>
      <SignIn />
    </div>
  );
}

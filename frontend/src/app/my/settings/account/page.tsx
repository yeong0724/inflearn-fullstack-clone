import AccountSetting from "@/components/my/settings/account/account-setting";
import { getProfile } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "계정 설정 - 인프런",
  description: "인프런 계정 설정 페이지입니다.",
};

export default async function Page() {
  const { data: profile, error } = await getProfile();

  if (!profile || error) return <div>프로필이 존재하지 않습니다.</div>;

  return <AccountSetting profile={profile} />;
}

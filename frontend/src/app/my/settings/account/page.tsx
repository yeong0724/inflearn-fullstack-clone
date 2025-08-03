import AccountSetting from "@/components/my/settings/account/account-setting";
import { getProfile } from "@/lib/api";

export default async function Page() {
  const { data: profile, error } = await getProfile();

  if (!profile || error) return <div>프로필이 존재하지 않습니다.</div>;

  return <AccountSetting profile={profile} />;
}

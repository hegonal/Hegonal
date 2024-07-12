import { ContentLayout } from "@/components/dashboard/content-layout";
import AdminPanelLayout from "@/components/dashboard/layout";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export interface UserTeams {
  team_id: string;
  member_id: string;
  name: string;
  description: string;
  role: string;
  member_count: number,
  created_at: Date;
  updated_at: Date;
}

export interface teamsResponseData {
  error: boolean;
  msg: string;
  user_teams: UserTeams[];
}

export default async function DashboardLayout({
  params,
  children,
}: {
  params: { teamID: string };
  children: React.ReactNode;
}) {
  const headersList = headers();
  const forwardedHost = headersList.get("X-Forwarded-Host");
  const forwardedProto = headersList.get("X-Forwarded-Proto");

  const origin =
    process.env.API_ORIGIN || `${forwardedProto}://${forwardedHost}`;
  const cookie = headersList.get("Cookie");

  const response = await fetch(`${origin}/api/team/teams`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookie || "",
    },
  });

  const teamsData: teamsResponseData = await response.json();

  if (response.status !== 200) {
    return redirect("/error")
  }

  const foundTeam = teamsData.user_teams.find(
    (team) => team.team_id === params.teamID
  );

  if (!foundTeam) {
    return notFound()
  }

  return (
    <AdminPanelLayout teamsData={teamsData}>
      <ContentLayout teamsData={teamsData}>
        {children}
      </ContentLayout>
    </AdminPanelLayout>
  );
}

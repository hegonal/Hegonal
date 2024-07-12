import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { teamsResponseData } from "./[teamID]/layout";

export default async function RedirectToFirstTeam() {
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
    return redirect("/error");
  }

  return redirect(`/dashboard/${teamsData.user_teams[0].team_id}/overview`);
}

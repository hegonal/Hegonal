import { redirect } from "next/navigation";

export default async function RedirectToOverview({
  params,
}: {
  params: { teamID: string };
}) {
  redirect(`${params.teamID}/overview`);

  return <></>;
}

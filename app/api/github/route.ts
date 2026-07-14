import { NextResponse } from "next/server";

const USERNAME = "Mishal04";

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-app",
        },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-app",
        },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) throw new Error(`User fetch failed: ${userRes.status}`);
    if (!reposRes.ok) throw new Error(`Repos fetch failed: ${reposRes.status}`);

    const user = await userRes.json();
    const repos: Array<{ language: string | null; stargazers_count: number; fork: boolean }> =
      await reposRes.json();

    // Count languages — skip forked repos and nulls
    const langMap: Record<string, number> = {};
    let totalStars = 0;

    for (const repo of repos) {
      totalStars += repo.stargazers_count ?? 0;
      if (repo.language && !repo.fork) {
        langMap[repo.language] = (langMap[repo.language] ?? 0) + 1;
      }
    }

    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      name: user.name ?? USERNAME,
      bio: user.bio ?? "",
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      totalStars,
      topLanguages,
      profileUrl: user.html_url ?? `https://github.com/${USERNAME}`,
    });
  } catch (err) {
    console.error("GitHub API error:", err);
    // Fallback with real known values so UI never looks empty
    return NextResponse.json({
      name: "Mishal Ashfaq",
      bio: "Student in BS Computer Science",
      publicRepos: 21,
      followers: 0,
      following: 2,
      totalStars: 0,
      topLanguages: [
        { name: "JavaScript", count: 8 },
        { name: "TypeScript", count: 6 },
        { name: "HTML",       count: 5 },
        { name: "CSS",        count: 4 },
        { name: "Python",     count: 2 },
      ],
      profileUrl: `https://github.com/${USERNAME}`,
    });
  }
}

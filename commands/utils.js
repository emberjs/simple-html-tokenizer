async function get(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`GET ${url} failed: ${res.status} ${res.statusText}`);
  }
  return res;
}

export async function getText(url) {
  return (await get(url)).text();
}

export async function getJSON(url) {
  return (await get(url)).json();
}

export async function getGithubRefSHA(owner, repo, ref) {
  let body = await getJSON(
    `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${ref}`
  );
  return body.object.sha;
}

export function githubContentURL(owner, repo, sha, path) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${sha}/${path}`;
}

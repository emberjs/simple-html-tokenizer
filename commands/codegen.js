import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getGithubRefSHA, githubContentURL, getText } from './utils.js';

export default async function codegen(owner, repo, ref, src, dest, generator) {
  console.log(`getting sha for ${owner}/${repo} ${ref}`);
  const sha = await getGithubRefSHA(owner, repo, ref);
  const url = githubContentURL(owner, repo, sha, src);

  console.log(`downloading ${url}`);
  const body = await getText(url);
  let code = `/**
 * generated from ${url}
 * do not edit
 */
`;
  code += generator(body);
  writeFileSync(dest, code);
  console.log(`generated ${fileURLToPath(dest)}`);
}

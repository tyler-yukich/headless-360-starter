# Security Policy

## Scope

`headless-360-starter` is a **front-stage demo starter kit**. It renders a
phone-framed, animated flow with **no backend, no database, and no real
integration** — state is threaded through URL parameters only. It is intended
to be cloned, rebranded, and recorded, not deployed as a production service.

Because of that, the realistic security surface is small: the build toolchain
and third-party npm dependencies. There is no authentication, no data storage,
and no server-side request handling in the kit itself.

## Supported versions

This is a template repository; only the `main` branch is maintained. Clones and
forks are expected to diverge and are out of scope.

## Reporting a vulnerability

Please **do not open a public issue** for a security report.

Use GitHub's private vulnerability reporting for this repository:
**Security → Advisories → Report a vulnerability**
(`https://github.com/tyler-yukich/headless-360-starter/security/advisories/new`).

Include the affected file or dependency, a description of the issue, and steps
to reproduce if you have them. As a small open-source starter kit this project
offers no formal response-time guarantee, but reports are reviewed and
addressed on a best-effort basis.

## For people building demos from this kit

If you rebrand this kit for a real customer demo, remember:

- **Keep customer-confidential material out of git.** Briefs, account names, and
  strategy belong in local working files, not commits. The `.gitignore` already
  excludes `.env*` and `*.pem`.
- **This kit does not do credit adjudication or store personal data.** If you
  wire it to a real backend, that integration — and any PII, secrets, or
  compliance obligations it introduces — is your responsibility, not the kit's.
- **Any persona data shipped in the kit is fictional.** Do not replace it with
  real applicant information in a repository.

# Rose Academies - Uganda

This project is being built by a team at [Blueprint](https://calblueprint.org), a student organization at the University of California, Berkeley building software pro bono for nonprofits.

## Getting Started

### Prerequisites

Check your installation of `node` and `pnpm`:

```bash
node -v
pnpm -v
```

We strongly recommend using a Node version manager like [nvm](https://github.com/nvm-sh/nvm) (for Mac) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (for Windows) to install Node.js. If you don't plan on switching between different Node versions, you can alternatively get a [prebuilt installer](https://nodejs.org/en/download/prebuilt-installer) from the Node.js website for an easier approach. Make sure to get Node version 20 and up, the latest LTS version should be sufficient.

After installing Node, you most likely have npm installed as well (check by running `npm -v`). If you have npm installed, simply run `npm install -g pnpm` to install pnpm. If your command line does not recognize npm as a command, refer to [this article](https://www.geeksforgeeks.org/how-to-resolve-npm-command-not-found-error-in-node-js/) to troubleshoot.

Additional resources:

- [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Installing pnpm without npm](https://pnpm.io/installation)

### Installation

1. Clone the repo & install dependencies
   1. Clone this repo
      - using SSH (recommended)
        ```bash
        git clone git@github.com:calblueprint/rose-academies-uganda.git
        ```
      - using HTTPS
        ```bash
        git clone https://github.com/calblueprint/rose-academies-uganda.git
        ```
   2. Enter the cloned directory
      ```bash
      cd rose-academies-uganda
      ```
   3. Install project dependencies. This command installs all packages from [`package.json`](package.json).
      ```bash
      pnpm install
      ```

2. Set up secrets:
   1. In the project's root directory (`rose-academies-uganda/`), create a new file named `.env.local`
   2. Copy the credentials from [Blueprint's internal Notion](https://www.notion.so/calblueprint/Environment-Setup-6fb1e251cdca4393b9dd47a3436abc11?pvs=4#9c2ff603f7a44348835c97e96d521d2d) (access is required) and paste them into the `.env.local` file.

**Helpful resources**

- [GitHub: Cloning a Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository)
- [GitHub: Generating SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

### Development environment

- **[VSCode](https://code.visualstudio.com/) (recommended)**
  1. Open the `rose-academies-uganda` project in VSCode.
  2. Install recommended workspace VSCode extensions. You should see a pop-up on the bottom right to "install the recommended extensions for this repository".

### Running the app

In the project directory, run:

```shell
pnpm dev
```

Then, navigate to http://localhost:3000 to launch the web application.

## Raspberry Pi WiFi setup

The production Pi exposes an educator-friendly setup page at `/setup`. When no
saved WiFi is available, the Pi starts its unique `Rose-Setup-XXXX` hotspot.
Join that hotspot. The setup page should open automatically. If it does not,
open:

```text
http://rosehub.local/setup
```

The setup page scans for nearby networks, accepts credentials locally, tests
access to Supabase, and restores the setup hotspot after a failed connection.
After the Pi has internet, it registers an unassigned device record and shows a
one-time code. The educator enters that code in the signed-in cloud app to link
the Pi to their account. Educator accounts remain invite-only.

The same `/setup` page is a five-step first-time wizard: welcome, internet,
educator account, offline content, and readiness. It recognizes an existing
WiFi connection or device link, can start a local content sync, verifies that a
classroom and lessons exist in SQLite, and finishes with the student address
and offline network name.

The offline-content step performs an integrity check through
`/api/setup/readiness`. Every file referenced by the local lesson manifest must
exist and be readable. Expected byte sizes are compared when available, and
SHA-256 hashes are compared for files uploaded through the cloud app. New syncs
also verify downloaded bytes before making them visible to students.

Captive-portal routing is state-aware. A new Pi with no offline classroom data
opens `/setup`; after at least one classroom and lesson are stored locally, the
same offline hotspot opens `/join` for students. Educators can still reach the
wizard from the **Educator setup and maintenance** link on the join page.

## Classroom join boundaries

Join codes are validated by the Pi, not by browser-loaded classroom data. A
valid code creates a signed, HTTP-only classroom session lasting 12 hours. The
SQLite API then returns only that classroom's lessons and files, and the
file route checks the same session before serving bytes. Signing out clears the
session. Students continue to use the same simple flow: enter the code, view
lessons, and sign out when finished.

The setup API reports that WiFi changes are unsupported during development on
macOS or Windows. The Pi helper and its limited sudo permission are installed
by `scripts/setup-pi.sh`.

To test the complete educator setup UI locally without changing real network
settings, start the local app in mock mode:

```bash
PORT=3001 DEVICE_ID=wifi-setup-ui-test NEXT_PUBLIC_DEVICE_ID=wifi-setup-ui-test DEVICE_PAIRING_CODE=A1B2C3D4E5F6 ROSE_WIFI_MOCK=true ROSE_PAIRING_MOCK_CLAIMED=true pnpm dev:local
```

Then open `http://localhost:3001/setup`. Mock mode exists only when the
`ROSE_WIFI_MOCK=true` environment variable is explicitly supplied.

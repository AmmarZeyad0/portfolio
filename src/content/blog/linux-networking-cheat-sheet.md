---
title: Linux & Networking Cheat Sheet
description: The commands I actually use, from navigation and logs to permissions, systemd, networking and Bash scripting. Linux is the floor for every tool I work on.
date: 2026-11-19
tags: [linux, networking, devops, cheatsheet]
---

> Linux is the floor for any tool I work on. If it's shaky, everything above it wobbles.

> [!important] The competence bar
> Drop onto a fresh Ubuntu box over SSH, work out why a service is down by reading `journalctl` and the logs, fix a permissions or port problem, and write a 20-line Bash script that automates a backup or cleanup, all without googling the syntax.

<p class="no-print">📄 <strong>Prefer it offline?</strong> <a href="/pdfs/linux-networking-cheat-sheet.pdf" download>Download this cheat sheet as a PDF</a>.</p>

**Legend**

- `$` prompt = standard user
- `#` prompt = root user
- `<thing>` = you replace it with a real value
- Commands assume Ubuntu/Debian (apt-based)

### Terminal shortcuts

| Shortcut | What it does |
|---|---|
| `Ctrl + Alt + T` | Open a terminal |
| `Ctrl + L` | Clear the terminal |
| `Ctrl + D` | Close the shell (exit) |
| `Ctrl + U` | Cut (remove) the current line |
| `Ctrl + A` | Move the cursor to the start of the line |
| `Ctrl + E` | Move the cursor to the end of the line |
| `Ctrl + C` | Stop the current command |
| `Ctrl + Z` | Suspend (pause) the running program |

---

## 1. Navigation & Files (FHS)

### Core movement

| Command | What it does |
|---|---|
| `whoami` | Print the current user |
| `pwd` | Print working directory (where you are right now) |
| `ls` | List files in the current directory |
| `ls -la` | List **all** files (`-a` includes hidden dotfiles) in **l**ong format (perms, owner, size, date) |
| `cd <dir>` | Change directory |
| `cd ~` | Go to your home directory |
| `cd /` | Go to the root directory (top of the whole filesystem) |
| `cd ..` | Go **up one level** to the parent directory |
| `cd -` | Jump back to the **previous** directory you were in (not the parent) |
| `tree` | Show the directory as a visual tree of folders and files |

**Path types**

- **Absolute path** starts from root: `/var/log/syslog`. Works from anywhere.
- **Relative path** starts from where you stand: `logs/syslog`. Depends on your current directory.

**sudo**

- `sudo <command>` runs that one command with admin (root) privileges. Stands for "superuser do."

**Variables**

- A variable stores a value under a name so you can reuse it: `name="ammar"`, then read it with `$name`.

### Filesystem Hierarchy (FHS): where things live

| Path | What lives there |
|---|---|
| `/bin` | Essential command binaries (the basic command-line programs). On modern systems this is usually a symlink to `/usr/bin` |
| `/sbin` | Applications that only the superuser will need |
| `/etc` | System-wide configuration files. App and system settings live here |
| `/home` | Your personal user directories. **Your files** |
| `/usr` | Installed software, libraries, and read-only program data. **Not** your files |
| `/var/log` | Log files. First place to look when something breaks |
| `/opt` | Optional or third-party software |
| `/tmp` | Temporary files. Usually wiped on reboot |
| `/proc` | Virtual directory exposing live kernel and process info |
| `/sys` | Info about devices and drivers |
| `/dev` | Device files |
| `/lib` | Shared library files used by different applications |
| `/boot` | Files required for starting the system |
| `/srv` | Data for servers |

> [!tip] `/usr` vs `/home`
> `/usr` is for installed **programs and system stuff**. `/home` is for **your personal files**. Easy to mix up because of the name.

### File operations

| Command | What it does |
|---|---|
| `cp <src> <dest>` | Copy a file. Add `-r` to copy a whole directory |
| `mv <src> <dest>` | Move **or** rename a file/directory (same command for both), e.g. `mv /path/to/source/*.txt /path/to/destination/` |
| `rm <file>` | Remove a file |
| `mkdir <dir>` | Make a directory |
| `mkdir -p a/b/c` | Make a directory **with parents** in one go, and don't error if it already exists |
| `touch <file>` | Create an empty file, or update the timestamp of an existing one |
| `ln -s <target> <link>` | Create a **s**ymbolic link (a shortcut/pointer to another file or directory) |

### Finding things

| Command | What it does |
|---|---|
| `find <path> -name "*.log"` | Search for files by name, type, size, time. Live search, slow but precise |
| `find . -type f -size +10M` | Files larger than 10MB under the current directory |
| `find . -mtime -7` | Files modified in the last 7 days |
| `locate <name>` | Find files fast using a prebuilt index. Run `sudo updatedb` to refresh the index |
| `which <cmd>` | Show the full path of the program that runs when you type a command |

**Common `find` flags:** `-name` (case-sensitive), `-iname` (ignore case), `-type f`/`-type d` (file/dir), `-size`, `-mtime`, `-exec <cmd> {} \;` (run a command on each result).

### Danger zone

> [!danger] `rm -rf` deletes without asking and without undo
> `-r` recursive (into subfolders), `-f` force (no prompt). `rm -rf /some/path` wipes everything under it permanently. There is no recycle bin. Double-check the path before you hit enter, and never run it as root on a path you can't see clearly.

---

## 2. Reading & Searching Text (the daily bread of logs)

### Viewing

| Command | What it does |
|---|---|
| `cat <file>` | Print the whole file to the screen (also joins files together) |
| `less <file>` | Open a file in a scrollable pager. Scroll up/down, search with `/`, quit with `q`. Good for big files |
| `head <file>` | Show the first 10 lines |
| `tail <file>` | Show the last 10 lines (great for the newest log entries) |
| `tail -f <file>` | **Follow** the file live, printing new lines as they arrive. The log-watching command |
| `ls -lr` | Long format, files in the _current folder only_, sorted in **reverse alphabetical order** (`-r` = reverse, not recursive) |
| `ls -lR` | Long format, files in the current folder _and all subfolders_ (`-R` capital = recursive) |
| `ls *` | List everything matching the wildcard `*` in the current directory |

> [!warning] `-r` vs `-R` on `ls`
> Lowercase `-r` reverses the order. Capital `-R` recurses into subfolders. Easy to swap by accident.

### Searching with `grep`

`grep "<pattern>" <file>` searches for text inside files.

| Flag | Meaning |
|---|---|
| `-r` | Recursive: search through a whole directory tree |
| `-i` | Ignore case |
| `-v` | Invert: show lines that do **not** match |
| `-n` | Show line numbers |
| `-E` | Extended regex (use `\|` for OR, e.g. `grep -E "error\|fail"`) |
| `-w` | Match whole words only |
| `-c` | Count matching lines instead of printing them |
| `-A <n>` | Print n lines **A**fter each match |
| `-B <n>` | Print n lines **B**efore each match |
| `-C <n>` | Print n lines of **C**ontext around each match |

Example: `grep -rin "error" /var/log` finds "error" (any case, with line numbers) everywhere under `/var/log`.

### Shaping text

| Command | What it does |
|---|---|
| `wc -l` | Count lines (`-w` words, `-c` bytes, `-m` characters) |
| `sort` | Sort lines (`-n` numeric, `-r` reverse, `-k <n>` sort by column n) |
| `uniq` | Collapse **adjacent** duplicate lines. Pair with `sort` first. `-c` counts each |
| `cut` | Pull out columns: `cut -d',' -f1` takes field 1 using comma as the delimiter |
| `tr` | Translate or delete characters: `tr 'a-z' 'A-Z'` upper-cases text |
| `awk` | Field-aware processor. `awk '{print $1}'` prints the first column of each line |
| `sed` | Stream editor for find and replace: `sed 's/old/new/g'` swaps text inline |

Classic combo: `cat access.log | grep "404" | wc -l` counts how many 404s are in the log.

---

## 3. Pipes, Redirection & Permissions

### Pipes and redirection

Three data streams are connected to every command:

- **STDIN (0)**: standard input
- **STDOUT (1)**: standard output
- **STDERR (2)**: standard error

| Symbol | What it does |
|---|---|
| `\|` | Pipe: send the output of one command into the input of the next |
| `>` | Redirect output to a file, **overwriting** it |
| `>>` | Redirect output to a file, **appending** to it |
| `2>` | Redirect **errors** (stderr) to a file |
| `2>&1` | Send errors to the same place as normal output |
| `> /dev/null` | Throw output away (the system trash can) |
| `cmd 2>&1 \| tee log.txt` | Show output on screen **and** save it to a file |
| `xargs` | Turn a list of input into arguments for another command, e.g. `find . -name "*.tmp" \| xargs rm` |

### Permissions: the `rwx` model

Every file has three permission groups: **owner**, **group**, **others**. Each can have read, write, execute.

| Letter | Value | Means |
|---|---|---|
| `r` | 4 | Read |
| `w` | 2 | Write |
| `x` | 1 | Execute (run a program, or enter a directory) |

Add the numbers per group. So `755` = `rwx` (7) for owner, `r-x` (5) for group, `r-x` (5) for others.

| Command | What it does |
|---|---|
| `chmod 755 <file>` | Set permissions numerically |
| `chmod u+x <file>` | Symbolic: give the **u**ser e**x**ecute. Targets: `u` user, `g` group, `o` others, `a` all |
| `chown <user> <file>` | Change the file's owner. `chown user:group <file>` changes both at once |
| `chgrp <group> <file>` | Change the file's group ownership |
| `umask` | Shows or sets the default permissions stripped from new files |

### Users and privilege

| Command | What it does |
|---|---|
| `id` | Show your user ID, group ID, and group memberships |
| `whoami` | Show the current username |
| `sudo <cmd>` | Run a single command as root |
| `su <user>` | Switch to another user (`su -` becomes root with their full environment) |
| `sudo useradd -e 2026-12-31 -m <username>` | Add a user with a home directory and an expiration date |
| `ssh <username>@<server_ip>` | SSH into a server |

**Key config files**

- `/etc/passwd` lists user accounts (username, home dir, default shell). No passwords here despite the name.
- `/etc/group` lists groups and their members.

---

## 4. Processes, Services & Resources

### Processes

| Command | What it does |
|---|---|
| `ps` | Show your current process status, static snapshot |
| `ps aux` | Show **every** process on the system. `aux` are options to `ps`: `a` all users, `u` user-friendly columns, `x` include background daemons |
| `top` | Live, refreshing view of running processes and resource use |
| `htop` | Friendlier interactive `top`: colors, scrolling, mouse, easy kill. Install with `sudo apt install htop` |
| `kill <pid>` | Send a signal to a process by its PID (default is a polite stop) |
| `pgrep <name>` | Find a process ID by name |
| `pkill <name>` | Send a signal to (stop) processes by name |
| `pidof <name>` | Give the PID of a running application |

### Signals

Signals are messages you send to a process to tell it what to do.

| Signal | Number | Effect |
|---|---|---|
| `SIGTERM` | 15 | Polite "please shut down." Default for `kill`. Lets the app clean up |
| `SIGKILL` | 9 | Force kill. Cannot be ignored. Use when `SIGTERM` won't work: `kill -9 <pid>` |
| `SIGHUP` | 1 | Hang up. Often used to tell a service to reload its config |
| `SIGINT` | 2 | Interrupt. What `Ctrl-C` sends |
| `SIGSTOP` / `SIGCONT` | 19 / 18 | Pause / resume a process |

### Background jobs

| Command | What it does |
|---|---|
| `<cmd> &` | Start a job in the background |
| `Ctrl-Z` | Suspend the current foreground job |
| `bg` | Resume a suspended job in the background |
| `fg` | Bring a background job to the foreground |
| `jobs` | List background jobs in this shell |
| `nohup <cmd> &` | Run a job that keeps going after you log out |

### Services and logs (systemd)

| Command | What it does |
|---|---|
| `systemctl status <svc>` | Is the service running, and why did it fail |
| `systemctl start/stop/restart <svc>` | Control the service now |
| `systemctl enable <svc>` | Start the service automatically at boot |
| `systemctl disable <svc>` | Stop it from starting at boot |
| `journalctl -u <svc>` | Show logs for a specific service (unit) |
| `journalctl -u <svc> -f` | Follow that service's logs live |
| `journalctl -u <svc> --since "1 hour ago"` | Filter logs by time |

### Resources: "why is this box unhappy?"

| Command | What it does |
|---|---|
| `df -h` | Disk space per filesystem, human-readable. Catches "disk full" |
| `du -sh <dir>` | Total size of a directory, summarized |
| `free -h` | RAM and swap usage |
| `uptime` | How long the box has been up, plus load averages (1/5/15 min) |
| `uname -a` | Kernel version, hostname, and architecture |

---

## 5. Networking from the Shell

### Inspect

| Command | What it does |
|---|---|
| `ip addr show` | Show all network interfaces and their addresses (IPv4 **and** IPv6) |
| `ip route` | Show the routing table, including your default gateway |
| `ss -tln` | List listening **TCP** ports (`t` TCP, `l` listening, `n` numeric) |
| `ss -uln` | List listening **UDP** ports (`u` UDP) |
| `ss -tlnp` | Same, plus the process holding each port (run with `sudo`) |

### Test and debug

| Command | What it does |
|---|---|
| `ping <host>` | Check connectivity and measure latency |
| `curl <url>` | Transfer data and talk to API servers; the go-to for testing REST APIs. `-I` headers only, `-O` save file, `-L` follow redirects, `-X POST -d '...'` send data |
| `wget <url>` | Download and save files. `-c` resume, `-r` recursive. Better than curl for grabbing whole files |
| `traceroute <host>` | Show the network hops between you and a host |
| `nc <host> <port>` | netcat: open raw TCP/UDP connections, test if a port is reachable, move data |

### DNS tools

| Command | What it does |
|---|---|
| `dig <domain>` | Query DNS records (domain to IP and more). `+short` for a clean answer, `dig <domain> MX` for mail records |
| `dig -x <ip>` | Reverse DNS: IP back to a hostname |
| `nslookup <domain>` | Older, simpler DNS lookup tool |
| `whois <domain or ip>` | Find the registered **owner** of a domain or IP block |

> [!warning] `dig` is not `whois`
> `dig` looks up **DNS records** (what address a name points to). To find **who owns** an IP or domain, use `whois`. For reverse DNS (IP to name) use `dig -x <ip>`.

### Config files

- `/etc/hosts` is a static, local map of hostnames to IPs. Checked **before** DNS. Handy for testing.
- `/etc/resolv.conf` lists which DNS servers (nameservers) the machine uses to resolve names.

---

## 6. Packages, Transfer & Shell Environment

### Packages

| Command | What it does |
|---|---|
| `sudo apt update` | Refresh the list of available packages |
| `sudo apt install <pkg>` | Install a package |
| `sudo apt remove <pkg>` | Remove a package |
| `dpkg -i <file>.deb` | Install a local `.deb` package (low-level, no dependency handling) |
| `dpkg -l` | List installed packages |

> [!note] Other distros
> Ubuntu/Debian use `apt`. RHEL, CentOS, and Fedora use `yum` or its successor `dnf`. Same idea, different command.

### Archiving and transfer

| Command | What it does |
|---|---|
| `tar -czvf out.tar.gz <dir>` | **Create** a gzipped archive (`c` create, `z` gzip, `v` verbose, `f` file) |
| `tar -xzvf out.tar.gz` | **Extract** that archive (`x` extract) |
| `tar -tzvf out.tar.gz` | **List** contents without extracting (`t` list) |
| `gzip <file>` / `gunzip <file>.gz` | Compress / decompress a single file |
| `zip -r out.zip <dir>` / `unzip out.zip` | Zip / unzip (cross-platform format) |
| `scp <file> user@host:/path` | Securely copy a file over SSH (`-r` for directories) |
| `rsync -avz <src> user@host:/path` | Sync files efficiently. `a` preserve everything, `v` verbose, `z` compress in transit. Add `-n` for a dry run, `--delete` to mirror exactly |

### Shell environment

| Command | What it does |
|---|---|
| `export VAR=value` | Create an environment variable that child processes can see |
| `env` | List all current environment variables |
| `echo $PATH` | Show the directories searched when you type a command |
| `~/.bashrc` | Runs on each new interactive shell. Put your aliases and exports here |
| `alias ll='ls -la'` | Make a shortcut for a longer command |
| `history` | Show past commands (`!!` reruns the last one) |
| `Ctrl-R` | Reverse-search through your command history as you type |

---

## 7. Shell Scripting (this is what makes you a DevOps, not a user)

### Structure

| Piece | What it does |
|---|---|
| `#!/bin/bash` | The **shebang**: first line that tells the system which interpreter to use |
| `name="value"` | Set a variable. **No spaces** around the `=` |
| `$name` | Read a variable |
| `$0` / `$1` / `$@` / `$#` | Script name / first argument / all arguments / argument count |
| `result=$(command)` | Command substitution: capture a command's output into a variable |

### Logic

| Construct | Example |
|---|---|
| if / then | `if [ "$x" -eq 1 ]; then echo yes; fi` |
| for loop | `for f in *.txt; do echo "$f"; done` |
| while loop | `while read line; do echo "$line"; done < file` |
| `[ ]` | POSIX test, works in any shell |
| `[[ ]]` | Bash test, safer and supports `&&`, `\|\|`, and regex `=~` |
| `$?` | Exit code of the last command. `0` means success, anything else is failure |

### Safety

> [!important] Start every serious script with this
> ```bash
> set -euo pipefail
> ```
> - `-e` exit immediately if any command fails
> - `-u` error if you use an unset variable (catches typos)
> - `-o pipefail` make a pipeline fail if **any** stage fails, not just the last one
>
> Without this, a script can sail past a failed command and quietly do the wrong thing, like backing up nothing or deleting the wrong files.

### Scheduling

| Command | What it does |
|---|---|
| `cron` | The background daemon that runs scheduled jobs |
| `crontab -e` | Edit your scheduled jobs |
| `crontab -l` | List your scheduled jobs |

Cron format: `minute hour day month weekday command`. Example: `0 2 * * * /home/ammar/backup.sh` runs the script at 02:00 every day.

---

## 8. Editors (enough to survive)

### vim (modal: it has modes)

| Key | Action |
|---|---|
| `i` | Enter insert mode (start typing) |
| `Esc` | Back to normal mode |
| `:wq` | Write (save) and quit |
| `:q!` | Quit without saving |
| `dd` | Delete the current line |
| `yy` / `p` | Copy line / paste |
| `/text` | Search for "text" (press `n` for next match) |

### nano (simple, no modes)

| Key | Action |
|---|---|
| `Ctrl-O` | Save (write Out) |
| `Ctrl-X` | Exit |
| `Ctrl-W` | Search |

---

> [!summary] Gotchas worth burning into memory
> - `cd -` goes to the **previous** directory, `cd ..` goes to the **parent**.
> - `ls -r` reverses order, `ls -R` recurses. Capital matters.
> - `dig` looks up **DNS records**; `whois` finds the **owner**; `dig -x` does reverse DNS.
> - `aux` is not a command, it is the options to `ps` (`ps aux`).
> - `ip addr show` shows IPv4 **and** IPv6.
> - `nc` is for raw TCP/UDP connections and port tests, not DNS.
> - `tail` shows the last **10** lines by default; `tail -f` follows live.

---
title: CI/CD Cheat Sheet
description: Delivery vs deployment, the stages of a pipeline, four deployment strategies, the GitHub Actions vocabulary and a Jenkinsfile you can read top to bottom.
date: 2026-11-19
tags: [cicd, github-actions, jenkins, devops, cheatsheet]
---

<p class="no-print">📄 <strong>Prefer it offline?</strong> <a href="/pdfs/ci-cd-cheat-sheet.pdf" download>Download this cheat sheet as a PDF</a>.</p>

## Continuous Delivery vs Continuous Deployment

| | What happens after a successful build | Human in the loop? |
|---|---|---|
| **Continuous Delivery** | Every successful build produces an artifact that is **ready** to deploy to production | **Yes**: someone approves the release |
| **Continuous Deployment** | Every successful build produces an artifact and **deploys it to production** automatically | **No** |

> [!tip] The one-line difference
> Delivery means *ready to ship*. Deployment means *shipped*.

---

## The pipeline stages

| # | Stage | What it does |
|---|---|---|
| 1 | **Source** | Triggers on any code event: push, pull request or a schedule |
| 2 | **Build** | Compiles the code and produces an **immutable artifact** |
| 3 | **Test** | Runs the tests against the code (see the three levels below) |
| 4 | **Security & quality** | Checks that catch problems tests miss, like a hardcoded password |
| 5 | **Publish** | Pushes the verified Docker image to a registry. It's immutable and available to any environment |
| 6 | **Deploy** | Deploys the artifact to **staging first, then production** (recreate, rolling update, blue-green or canary) |
| 7 | **Verify** | Post-deploy checks. **Smoke tests** hit live endpoints to confirm the deployment worked |

### The three levels of testing

| Level | Speed | What it tests |
|---|---|---|
| **Unit** | Fastest: thousands per second | One function, in isolation |
| **Integration** | Slower | Components working together |
| **End-to-end** | Slowest | The entire app, through a full user flow |

---

## Deployment strategies

| Strategy | How it works | Downtime | Typical use |
|---|---|---|---|
| **Recreate** | Stop the old version, start the new one | **Yes** | Database schema migrations |
| **Rolling update** | Replace instances one by one | No | The default for stateless apps |
| **Blue-green** | Two identical environments; switch traffic over instantly | No | When you need a guaranteed, instant rollback |
| **Canary** | Send a slice of traffic (e.g. 20%) to the new version, expand if healthy | No | Testing on real traffic safely |

---

## GitHub Actions vocabulary

| Term | What it means |
|---|---|
| **Workflow** | A YAML file that defines automation. Lives in `.github/workflows/` |
| **Event** | What triggers the workflow (`push`, `pull_request`, `schedule`) |
| **Job** | A group of steps that runs on one machine (runner). Jobs run in parallel by default |
| **Step** | A single task: either a shell command (`run:`) or a pre-built action (`uses:`) |
| **Action** | A reusable unit from the GitHub Marketplace (e.g. `actions/checkout`) |
| **Runner** | The VM that executes the job (`ubuntu-latest`, `windows-latest`, etc.) |
| **Secret** | Encrypted env var stored in GitHub settings. Accessed as `${{ secrets.NAME }}` |

> [!important] `npm install` vs `npm ci`
> Use `npm install` for local development and `npm ci` in CI pipelines. `npm ci` guarantees the exact same dependency tree every time.

### Why put `env:` at the top of a workflow

- **DRY:** define the image name and tag once, then reference them everywhere you need them.
- **Consistency:** to change the image name you edit one line instead of hunting through multiple jobs.
- **Traceability:** every job uses the same values, so it's clear what was built and deployed.

---

## Jenkins core concepts

| Concept | What it is |
|---|---|
| **Job / Project** | A single automated task or pipeline. It can be as simple as running a shell script, or a multi-stage pipeline with test, build and deploy |
| **Build** | One execution of a job |
| **Pipeline** | A series of stages defined in code |
| **Jenkinsfile** | A text file that defines your pipeline |
| **Stage** | A named section in the pipeline |
| **Step** | A single command or action inside a stage |
| **Agent** | The machine where the pipeline runs. `agent any` means pick any available machine |

### Jenkinsfile structure (declarative)

```groovy
pipeline {
    // Where the pipeline runs
    agent any

    // Environment variables available to all stages
    environment {
        APP_NAME = 'my-application'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    // The pipeline stages
    stages {
        stage('Checkout') {
            steps {
                checkout scm  // Check out code from Git
            }
        }

        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t ${APP_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Deploy') {
            // Only run this stage on the main branch
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                sh './scripts/deploy.sh'
            }
        }
    }

    // Runs after all stages, whether they pass or fail
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
        always {
            // Clean up Docker images to save disk space
            sh 'docker image prune -f'
        }
    }
}
```

> [!summary] Remember
> - Delivery = ready to ship (human approves). Deployment = shipped automatically.
> - Build once, produce an **immutable** artifact, promote that same artifact through staging and production.
> - Recreate is the only strategy here with downtime.
> - `npm ci` in pipelines, `npm install` on your laptop.
> - In Jenkins, `post { always { ... } }` runs whether the pipeline passed or failed.

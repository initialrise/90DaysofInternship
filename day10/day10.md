### Day10

# GIT BASICS

Learn about

- Concepts of `origin` `HEAD`
- Basic git commands (init, commit, staging, log , stash)
- Repo Basics (pull, push, fetch)
- Branch ( branch, checkout, switch )
- Others merge, rebase, diff, cherrypick
- rollback (reset, soft & hard)
- Git Deep Dive Videos

### Basic Git Commands

### Notes

- Files in git repo can be of two states:- tracked or untracked
- Staged Files -> Files ready to be committed to the repo
- Commit -> Save Point (Checkpoint)
  git commit -a flag skips staging

#### Common Commands

`git init`

- Initializes the git repository with .git folder

`git commit`

- To create snapshots of the project

`git add`

- Add files from local folder into git staging area
- Staging area is the area where files are placed before commiting

`git log`

- View the details of commits in descending order

`git stash`

- use to stash uncommitted changes
- changes would be stashed and last commit's file snapshot would be used
- can be returned to
- (use case, you need to switch branches before commit | You are half way done with certain feature and don't want to commit)

#### Repo Basics

`git clone`

- Copy or clone remote repo to local machine
  `git pull`
- Retrieve the changes from remote repo and merge into local
  `git fetch`
- Only retrieve the changes but do not merge
  `git push`
- Push the changes from local to remote repo

#### Branch

`git checkout`

- To create new branch and switch to it use `-b`
- To switch branch use `git checkout branchname`

## `git switch`

#### Others

`git merge`

- Merge branches

`git rebase`

-

`git diff`

- View the differences between commits

`git cherrypick`

#### Rolling Back

`git reset`

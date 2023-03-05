#!/bin/sh

# export $(grep -v '^#' .env | xargs)
#
# if [[ -z "${OWL_INFURA_KEY}" ]]; then
#     echo "Error: Must define env var OWL_INFURA_KEY to scrub"
#     exit 0
# fi

# darwin=false;
# case "`uname`" in
#   Darwin*) darwin=true ;;
# esac

# find all infura API keys and replace them
# if $darwin; then
#     grep -r --exclude-dir=node_modules './packages' -e ${OWL_INFURA_KEY} | gxargs -d '\n' -n1 | awk '{print substr($1,0,length($1)-1)}' | xargs -n1 sed -i '' -e "s/${OWL_INFURA_KEY}/feeABCDEFGHIJKLMNOPQRSTUVWXYZ123/g"
# else
#     grep -r --exclude-dir=node_modules './packages' -e ${OWL_INFURA_KEY} | gxargs -d '\n' -n1 | awk '{print substr($1,0,length($1)-1)}' | xargs -n1 sed -i'' -e "s/${OWL_INFURA_KEY}/feeABCDEFGHIJKLMNOPQRSTUVWXYZ123/g"
# fi

# scrub all cli projects except the examples
# find ./packages/cli/src/projects -mindepth 1 -maxdepth 1 -type d -not -regex '\.\/packages\/cli\/src\/projects\/shapes.*' -a -not -regex '\.\/packages\/cli\/src\/projects\/example.*' -exec rm -rf '{}' \;

git-filter-repo --path 'packages/cli/src/projects/first-party' --path 'packages/cli/src/projects/innovot' --path 'packages/cli/src/projects/owls' --invert-paths --refs=subrepo-public

# remove same secrets as above from all git history for this branch
git-filter-repo --replace-text .git-filter-repo-replace_text --refs=subrepo-public

# TODO: remove any example API endpoints from `.env.example` files


#!/bin/bash


TEMP_CLONE_FOLDER="temp_wiki2"

if [ -z "$ACTION_MAIL" ]; then
  echo "ACTION_MAIL ENV is missing"
  exit 1
fi

if [ -z "$ACTION_NAME" ]; then
  echo "ACTION_NAME ENV is missing"
  exit 1
fi

if [ -z "$OWNER" ]; then
  echo "OWNER ENV is missing. Cannot proceed"
  exit 1
fi

if [ -z "$REPO_NAME" ]; then
  echo "REPO_NAME ENV is missing. Cannot proceed"
  exit 1
fi

if [ -z "$WIKI_PUSH_MESSAGE" ]; then
  echo "WIKI_PUSH_MESSAGE ENV is missing, using the default one"
  WIKI_PUSH_MESSAGE='Auto Publish new pages'
fi

# get source code of the wiki
mkdir $TEMP_CLONE_FOLDER
cd $TEMP_CLONE_FOLDER
git init
git config user.name $ACTION_NAME
git config user.email $ACTION_MAIL
git pull https://${GITHUB_TOKEN}@github.com/$OWNER/$REPO_NAME.wiki.git
cd ..

rm -rf $TEMP_CLONE_FOLDER/* # make sure we remove everyting first. In case files were deleted/renamed



function processFile {
  echo "   Processing $1"

  if [[ $i == *.md ]]; then
    realFileName=`basename $1` # filename 'block-reordering' will end up with the name 'Block Reordering'
    newFileName=`echo $realFileName | tr - " "` # replace - with spaces
    newFileName=`echo $newFileName | sed -e "s/\b\(.\)/\u\1/g"` #capitalize
    
    
    if [[ $i == *.md ]]; then
      echo "   Changing markdown file $i, saving to $TEMP_CLONE_FOLDER/$newFileName"

      # Replacing image urls, to relative paths in the wiki. 
      # This may give some problems if text /docs/ is present in markdown...
      # We can create a more restrictive rule
      sed 's/\/docs\///g' "$1" > "$TEMP_CLONE_FOLDER/$newFileName" 
    else

      # If its not markdown just copy the file. No need to change it
      echo "   copying $i to $TEMP_CLONE_FOLDER/$newFileName"
      cp "$1" "$TEMP_CLONE_FOLDER/$newFileName"
    fi
  fi
}


#Deprecated when moved app documentation to /docs
#echo "Copying challenge docs"
## Challenge documentation
#for i in $MD_FOLDER*; do
#  processFile $i
#done

echo "Copying docs"
# Project documentation
for i in docs/*; do
  processFile $i
done

echo "Copying app docs"
# Project documentation
for i in docs/app/*; do
  processFile $i
done


echo "Copying images folder"
cp -r "docs/app/img" "$TEMP_CLONE_FOLDER"


echo "Pushing new pages"
cd $TEMP_CLONE_FOLDER
git add .
git commit -m "$WIKI_PUSH_MESSAGE"
git push origin

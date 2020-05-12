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

if [ -z "$MD_FOLDER" ]; then
  echo "MD_FOLDER ENV is missing, using the default one"
  MD_FOLDER='.'
fi

if [ -z "$WIKI_PUSH_MESSAGE" ]; then
  echo "WIKI_PUSH_MESSAGE ENV is missing, using the default one"
  WIKI_PUSH_MESSAGE='Auto Publish new pages'
fi


mkdir $TEMP_CLONE_FOLDER
cd $TEMP_CLONE_FOLDER
git init
git config user.name $ACTION_NAME
git config user.email $ACTION_MAIL
git pull https://${GH_PAT}@github.com/$OWNER/$REPO_NAME.wiki.git
cd ..


for i in $MD_FOLDER*; do
  echo "Processing $i"

  if [[ $i == *.md ]]; then
    realFileName=`basename $i`
    newFileName=`echo $realFileName | tr - " "` # replace - with spaces
    newFileName=`echo $newFileName | sed -e "s/\b\(.\)/\u\1/g"` #capitalize
    
    
    if [[ $i == *.md ]]; then
      echo "Changing markdown file $i, saving to $TEMP_CLONE_FOLDER/$newFileName"
      sed 's/\/documentation\///g' "$i" > "$TEMP_CLONE_FOLDER/$newFileName"
    else
      echo "copying $i to $TEMP_CLONE_FOLDER/$newFileName"
      cp "$i" "$TEMP_CLONE_FOLDER/$newFileName"
    fi
  fi
    
done

echo "Copying images folder"
cp -r "$MD_FOLDER/img" "$TEMP_CLONE_FOLDER"

echo "Pushing new pages"
cd $TEMP_CLONE_FOLDER
git add .
git commit -m "$WIKI_PUSH_MESSAGE"
git push --set-upstream https://${GH_PAT}@github.com/$OWNER/$REPO_NAME.wiki.git master
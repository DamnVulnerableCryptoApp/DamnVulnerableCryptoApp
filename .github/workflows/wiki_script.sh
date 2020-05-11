#!/bin/bash

TEMP_CLONE_FOLDER="temp_wiki"

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

for i in "${MD_FOLDER}/*" do
  if [[ "$i" == *.md ]]; then
    realFileName=${i}

    echo "Processing $realFileName"

    if [[ $i == *.md ]]; then
      echo "Changing markdown file $MD_FOLDER$i"
      sed 's/\/documentation\///g' "$MD_FOLDER$i" > "$TEMP_CLONE_FOLDER/${realFileName}"
    else
      echo "copying $MD_FOLDER/$i to $TEMP_CLONE_FOLDER/${realFileName}"
      cp "$MD_FOLDER/$i" "$TEMP_CLONE_FOLDER/${realFileName}"
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
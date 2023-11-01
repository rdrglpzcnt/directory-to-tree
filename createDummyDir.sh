#!/bin/bash

# Function to generate a random string
generate_random_string() {
  tr -dc 'a-zA-Z0-9' </dev/urandom | head -c 8
}

# Function to create nested directories and files
create_dummy_dir() {
  local depth=$1
  if [ $depth -le 0 ]; then
    return
  fi

  for ((i=1; i<=5; i++)); do
    dir_name=$(generate_random_string)
    mkdir "$dir_name"
    cd "$dir_name"
    for ((j=1; j<=5; j++)); do
      file_name=$(generate_random_string).txt
      echo "$(generate_random_string)" > "$file_name"
    done
    create_dummy_dir $((depth - 1))
    cd ..
  done
}

# Create the initial directory
mkdir -p dummy_dir
cd dummy_dir

# Start creating the structure
create_dummy_dir 5

echo "Directory structure with random files created."

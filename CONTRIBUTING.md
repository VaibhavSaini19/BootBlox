## Contributing Guidelines
First off, thanks for taking the time to contribute! 😄
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Contributions are handled in the form of Pull Requests. You fork this repository, create a new branch, make relevant changes, and submit a Pull Request – once that's done we'll be able to review your PRs and merge them to the master branch.


### Steps to add Code block:

-   Fork the repo
-   Clone it to your local system
-   Fire up a terminal in the repo's directory
-   Type `npm install` and hit enter to install Bootstrap v5 and bootstrap-icons
-   Type `npm install` and hit enter to install all the necessary dependencies (like Bootstrap v5 and bootstrap-icons)
-   Create a new branch from the `master` branch and give it an appropriate name corresponding to the issue
-   Navigate to a category folder of your choice under `blocks` folder, or if you would like to add a new `block` category, create an issue, and it will be assigned to you
-   Create a new `<blockCategory_num>.html` file. For eg. the `Blog` category already contains 3 templates, so the next one would be `blog_4.html` (You can use the HTML boilerplate provided in `blocks/boilerplate/boilerplate.html`)
-   Try to use minimal inline or external CSS while creating the block template, as this project is based on using Bootstrap
-   While creating the block template, try to use minimal inline or external CSS, as this project is based on using Bootstrap
-   Use class `btn-primary`, `bg-primary`, `text-primary` for buttons, backgrounds and text color respectively. The advanced color theme will be applied automatically upon choosing by the user
-   After you are done creating the template block, create a SVG thumbnail and add it in the `assets/thumbs`, and then make a pull request. We will handle it from there to include it in the main page
-   After you are done, commit the changes to your branch and open a Pull Request as per the formatting described below


### Steps to add SVG thumbnail:

-   Fork the repo
-   Clone it to your local system
-   Fire up a terminal in the repo's directory
-   Type `npm install` and hit enter to install all the necessary dependencies (like Bootstrap v5 and bootstrap-icons)
-   Create a new branch from the `master` branch and give it an appropriate name corresponding to the issue
-   Develop the required thumbnails using any designing / prototyping tool of your choice (For eg. Figma, Adobe XD)
-   Export it in SVG format and put the file under `assets/thumbs/` folder. For each file, the filename should correspond to the code block name. For eg. for code block: `blog_3.html`, thumbnail filename: `blog_3_thumb.svg`.
-   After you are done, commit the changes to your branch and open a Pull Request as per the formatting described below


### Formatting

Format your PR titles likewise:
> [Tag]: Describe change in present tense
Tag can be:
-   Feat (new feature)
-   Fix (bug fix)
-   Refactor (refactoring code)
-   Style (formatting, no code change)
-   Doc (changes to documentation)
-   Test (adding or refactoring tests; no production code change)
Remember to:
-   Capitalize the subject line
-   Use the imperative mood in the subject line
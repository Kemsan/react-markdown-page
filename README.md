# react-markdown-page
React Markdown generic webpage

PoC of markdown landing page system. Using Next + React + StyledComponents + Redux. 

# How to use

## Setup

Install packages in project

`yarn`

or

`npm install`

and copy contents of `.env.example` into `.env`.

File `.env.example` has default values, you can change them at any time.

After that you can run build or developer version of your application.

## Running

To develope application use command

`yarn dev`

Server will be hosted on your local PC under port defined in `.env` file.

By default - page will start at port `3000` under `http://localhost:3000` address.

## Writing pages

### Creating

Pages are located in `templates/pages` directory. Each file represents single page.

Name of the file  is same as route to the page, e.g. `test.md` will generate `http://localhost:3000/test` route.

**Exception**

There is exception for file named `home.md`, this file will always generate two routes - `/` and `/home`.

### Writing

You should write all pages in markdown only. 

Your pages can contain some custom tags which we created.

#### Options tag

Options tag have code block like structure:

```
---
| option: value
---
```

Each option tag should start and end with three dashes.

Option values should be in `| <optionName>: <optionValue>` format

It's necressary to start each option with pipe sign (`|`), and be in name: value format. Without that option will not be parsed.

Option value can be plain value (e.g. `name: value`, option with name `name` will have `value` as his value) or list of params:

```
| name: [option="value" option="value"]
```

List of params should always start and end with sqaure brackets.

Each of the value should be in format `option="value"` and be separated by single space

*Options tag should be located at start of the each page, or in `options.md` file*

There are some special values for options tag:

- `title` - setups page title, if not provided, title from `options.md` will be used

- `meta` - meta tags for page

#### Component tag

Component tags inserts modules into your site.

Each of them should start like normal markdown list (with exception - always with dash as delimiter). This makes the components to be nested without being "beautified" by any markdown formater.

After dash sign you should put name of the component you like to instert.
Beacause of the "list like" we uses the exclamation mark before components name (e.g. `!WideImage`)

At next line of the component (with addition of one tab) you can put options for component - same as options tag, but without dashes at start and the end. 

Or just children value for that component.

```
- !WideImage
  | title: Hero1
  | icon: test
  Test test test *test*
```

*It's neccressary to put options and child text using tab/spaces before them, otherwise the component will not render properly*

## Additional notes

Templates for pages will be automatically re-parsed on each change/add/remove of the file in `templates/` directory.

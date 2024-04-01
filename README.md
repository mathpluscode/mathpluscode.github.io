# Local Development

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Website Development

For Mac, install `node` using [`brew`](https://formulae.brew.sh/formula/node).

```bash
brew install node
```

Then install the packages

```bash
npm install
```

Optionally run the following command to update the packages

```bash
npm audit fix
```

Start the development server

```bash
npm run start
```

The deployment on GitHub pages is done using
[GitHub Actions](https://github.com/mathpluscode/mathpluscode.github.io/actions).

## Code Formatting

Pre-commit hooks are used to format the code. Install the pre-commit hooks using the following command.

```bash
pip install pre-commit
```

Then run the following command to install the pre-commit hooks.

```bash
pre-commit install
```

Run the following command to update pre-commit hooks.

```bash
pre-commit autoupdate
```

Run the following command to run the pre-commit hooks against all files.

```bash
pre-commit run --all-files
```

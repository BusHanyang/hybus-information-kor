import * as fs from "fs";
import * as showdown from "showdown";

const readFileContents = async (filename: string): Promise<string> => {
  try {
    const data = await fs.promises.readFile(filename, "utf8")
    console.log(`Current directory: ${process.cwd()}`)
    return data
  } catch (err) {
    console.error(err)
    return ""
  }
}

const createCustomHtmlFile = (title: string, htmlContent: string): void => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css" integrity="sha512-Ya9H+OPj8NgcQk34nCrbehaA0atbzGdZCI2uCbqVRELgnlrh8vQ2INMnkadVMSniC54HChLIh5htabVuKJww8g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          <style>
            .markdown-body {
              box-sizing: border-box;
              min-width: 200px;
              max-width: 980px;
              margin: 0 auto;
              padding: 45px;
            }

            @media (max-width: 767px) {
              .markdown-body {
                padding: 15px;
              }
            }
          </style>
          <title>${title}</title>
        </head>
        <body class="markdown-body">
            ${htmlContent}
        </body>
      </html>
    `;

    fs.writeFile("index.html", html, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log("File created successfully")
    })
  }

const convertFile = async (title: string, filename: string): Promise<void> => {
    const data = await readFileContents(filename)
    const converter = new showdown.Converter()
    converter.setFlavor('github')
    const initialHtml = converter.makeHtml(data)
    createCustomHtmlFile(title, initialHtml)
}

convertFile("버스하냥이란?", "README.md")

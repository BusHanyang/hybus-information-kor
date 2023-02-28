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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css" integrity="sha512-bm684OXnsiNuQSyrxuuwo4PHqr3OzxPpXyhT66DA/fhl73e1JmBxRKGnO/nRwWvOZxJLRCmNH7FII+Yn1JNPmg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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

            @media (prefers-color-scheme: dark) {
              .markdown-body {
                --color-canvas-default: #374151;
              }
            }

            @media (prefers-color-scheme: light) {
              .markdown-body {
                --color-canvas-default: #FFFFFF;
              }
            }
          </style>
          <script>
            const themeCookie = document.cookie
              .split('; ')
              .find(row => row.startsWith('_theme='))
              ?.split('=')[1];

              if (themeCookie === undefined) {
                console.log("Theme color not detected.")
              }

              if (themeCookie === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
              } else {
                document.documentElement.setAttribute('data-theme', 'light');
              }
          </script>
          <title>${title}</title>
        </head>
        <body class="markdown-body">
            ${htmlContent}
        </body>
      </html>
    `;
    
    fs.promises.mkdir("./dist", { recursive: true }).then(() => {
      fs.writeFile("./dist/index.html", html, (err) => {
        if (err) {
          console.error(err)
          return
        }
        console.log("File created successfully")
      })
    }).catch((err) => console.error(err))
  }

const convertFile = async (title: string, filename: string): Promise<void> => {
    const data = await readFileContents(filename)
    const converter = new showdown.Converter()
    converter.setFlavor('github')
    const initialHtml = converter.makeHtml(data)
    createCustomHtmlFile(title, initialHtml)
}

convertFile("버스하냥이란?", "README.md")

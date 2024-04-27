import cherrio from "cheerio";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

const footerHeader = `
  <div style="border-top: solid 1px #bbb; width: 100%; font-size: 9px;
    padding: 5px 5px 0; color: #bbb; position: relative;">
    <div style="position: absolute; left: 5px; top: 5px;"><span class="date"></span></div>
    <div style="position: absolute; right: 5px; top: 5px;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>
  </div>
`;

const baseHTML = `
  <head>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;" class="bg-gray-800">
      <h1 class="text-red-500">{{title}}</h1>
      <img src="{{logo}}" alt="Random image" class="w-40 h-40 rounded-full" />
      <p class="text-yellow-500 text-4xl px-4 py-10 bg-green-400 w-full uppercase text-center">Some paragraph</p>
      <p style="margin-bottom: 20px; color: red;">Some paragraph</p>
      <span class="text-white">Some SPAN paragraph {{title}}</span>
      <div class="bg-white p-4 rounded-lg">
        <section style='width:100%; border: 1px solid black; border-radius: 5px;' class="p-2">
            <div style='display: grid; grid-template-columns: repeat(7, 1fr); border-bottom: 1px solid black; width: 100%;'>
              <p>Name</p>
              <p>Age</p>
              <p>Is Adult</p>
              <p>Is Even</p>
              <p>Is Odd</p>
              <p>Surname</p>
              <p>Address</p>
            </div>
            {{#each list}}
            <div style='display: grid; grid-template-columns: repeat(7, 1fr); border-bottom: 1px solid black; width: 100%;'>
              <p>{{name}}</p>
              <p>{{age}}</p>
              <p>{{isAdult}}</p>
              <p>{{isEven}}</p>
              <p>{{isOdd}}</p>
              <p>{{surname}}</p>
              <p>{{address}}</p>
            </div>
            {{/each}}
          </section>
          <p>{{asdasdasdsa}}</p>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;" class="bg-gray-300">
    <h1 class="text-red-500">{{data}}</h1>
    <p class="text-yellow-500 text-4xl px-4 py-10 bg-green-400 w-full uppercase text-center">Some paragraph</p>
    <p style="margin-bottom: 20px; color: red;">Some paragraph</p>
    <div class="bg-white p-4 rounded-lg">
      <section style='width:100%; border: 1px solid black; border-radius: 5px;' class="p-2">
          <div style='display: grid; grid-template-columns: repeat(7, 1fr); border-bottom: 1px solid black; width: 100%;'>
            <p>{{abc}}</p>
            <p>Age</p>
            <p>Is Adult</p>
            <p>Is Even</p>
            <p>Is Odd</p>
            <p>Surname</p>
            <p>Address</p>
          </div>
          {{#each list2}}
            <ul style='display: grid; grid-template-columns: repeat(7, 1fr); border-bottom: 1px solid black; width: 100%;'>
              <li>{{name}}</li>
              <li>{{age}}</li>
              <li>{{isAdult}}</li>
              <li>{{isEven}}</li>
              <li>{{isOdd}}</li>
              <li>{{surname}}</li>
              <li>{{address}}</li>
              <li>{{city}}</li>
              <li>{{country}}</li>
              <li>{{TEST}}</li>
            </ul>
          {{/each}}
        </section>
      </div>
  </div>
  </body>
`;

export async function GET() {
  const $ = cherrio.load(baseHTML);

  const html = $("body").html();

  const parameters = { list: [] } as Record<string, unknown>;

  $("h1, p").each((index, element) => {
    // check is element text {{}} or not
    if (!/{{.*?}}/.test($(element).text().trim())) return;

    let key = $(element).text().trim().replace(/ /g, "");

    // replace {{}} with empty string
    key = key.replace(/{{|}}/g, "");
    const value = $(element).text().trim();

    parameters[key] = value;
  });

  // for images
  $("img").each((index, element) => {
    const value = $(element).attr("src");

    if (!value) return;

    let key = value.replace(/ /g, "");

    key = key.replace(/{{|}}/g, "");
    parameters[key] = value;
  });

  const eachStartRegex = /{{#each\s(.*?)}}/g;

  const eachStartMatches = baseHTML.match(eachStartRegex);

  const listKeys = eachStartMatches?.map((match) =>
    match.replace(/{{#each\s|}}/g, "")
  );

  if (listKeys) {
    listKeys.forEach((listKey) => {
      $("ul li").each((index, element) => {
        // check is element text {{}} or not
        if (!/{{.*?}}/.test($(element).text().trim())) return;

        let key = $(element).text().trim().replace(/ /g, "");

        // replace {{}} with empty string
        key = key.replace(/{{|}}/g, "");
        const value = $(element).text().trim();

        parameters[listKey] = [
          {
            ...((parameters[listKey] as Record<string, unknown>[])?.[0] || {}),
            [key]: value,
          },
        ];
      });
    });
  }

  return NextResponse.json({
    html,
    parameters: Object.fromEntries(Object.entries(parameters).sort()),
  });
}

export async function POST(request: Request) {
  const {
    htmlTemplate = baseHTML,
    title = "Export",
    data = "Hello World",
  } = await request.json();

  const mockData = Array.from({ length: 15 }, (_, i) => ({
    name: Math.random().toString(36).substring(7),
    age: Math.floor(Math.random() * 100),
    isAdult: Math.random() > 0.5,
    isEven: i % 2 === 0,
    isOdd: i % 2 !== 0,
    surname: "Doe",
    address: "Some address",
  }));

  const template = Handlebars.compile(htmlTemplate);

  const compiledHtml = template({
    title,
    data,
    list: mockData,
    list2: mockData.map((item) => ({
      ...item,
    })),
    totalPages: 2,
    pageNumber: 1,
    logo: "https://picsum.photos/200/300",
  });

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(compiledHtml);
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: footerHeader,
    footerTemplate: footerHeader,
    margin: { bottom: "50px", top: "50px" },
    tagged: true,
    outline: true,
  });

  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="export.pdf"',
      "Access-Control-Allow-Origin": "*",
    },
  });
}

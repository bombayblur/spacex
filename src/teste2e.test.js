import puppeteer from "puppeteer";

jest.setTimeout(100000);

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250
    });
    page = await browser.newPage();
  });

  it("opens comarison page and tests if correct missions are loaded", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(`button[data-testId="compare-button"]`);

    let randomNumberA = Math.floor(Math.random() * 11);
    let randomNumberB = Math.floor(Math.random() * 11);
    randomNumberB = randomNumberA === randomNumberB ? Math.floor(Math.random() * 11) : randomNumberB;

    await page.click(`div[data-id="${randomNumberA}"] input`);
    let textA = await page.$eval(`div[data-id="${randomNumberA}"] [data-colindex="1"]`, (e) => e.textContent)

    await page.click(`div[data-id="${randomNumberB}"] input`);
    let textB = await page.$eval(`div[data-id="${randomNumberB}"] [data-colindex="1"]`, (e) => e.textContent)

    await page.click(`button[data-testId="compare-button"]`);

    await page.waitForSelector("#modal-modal-title");

    let toTestTextA = await page.$eval('#compare1', (e) => e.textContent);
    let toTestTextB = await page.$eval('#compare2', (e) => e.textContent);

    expect(textA).toBe(toTestTextA);
    expect(textB).toBe(toTestTextB);

    await page.click('.MuiBackdrop-root');


  })

  afterAll(() => browser.close());
});
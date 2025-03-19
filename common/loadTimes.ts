import { expect, type Page } from "@playwright/test";

export class PageLoad {

  async assertPageLoadTimes(page: Page, path: string) {
    const navigationTimingJson = await page.evaluate(() =>
      JSON.stringify(performance.getEntriesByType("navigation")),
    );

    const navigationTiming = JSON.parse(navigationTimingJson)[0];
    const duration = navigationTiming.loadEventEnd - navigationTiming.startTime;
    
    if(duration > 5000){
        console.error(`ERROR: ${path} page start to loadEventEnd = ${duration}ms`)
    }
    if(duration > 1000 && duration <= 5000){
        console.warn(`WARNING: ${path} page start to loadEventEnd = ${duration}ms`)
    }
  }
}

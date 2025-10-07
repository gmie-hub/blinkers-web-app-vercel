import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { writeFile } from "fs/promises";

const BASE_URL = "https://www.blinkersnigeria.com";

const routes = [
  "/",
  // "/market/:search?",
  "/product-listing/:search?",
  "/product-details/:id/:user_id/:title?/:description?",
  "/product-details/:id",
  "/related-ads/:id",
  "/review/:id",
  "/product-review/:id",
  "/seller-profile/:id",
  "/seller-ads/:id",
  "/review-seller/:id",
  "/write-review/:id",
  "/contact-us",
  "/about-us",
  "/faq",
  "/notifications",
  "/notifications/:id",
  "/terms-conditions",
  "/safety-tips",
  "/how-to-buy",
  "/how-to-sell",
  "/jobs",
  "/pricing",
  "/jobs/:search",
  "/job-details/:id/:title?/:description?",
  "/job-details/:id/:title?",
  "/job/more-jobs-like-this/:id",
  "/images/:id",
  "/videos/:id",
  "/job/register-as-applicant",
  "/job/add-business",
  "/job/apply/:id",
  "/post-job",
  "/edit-job/:id",
  "/directory",
  "/directory/:search",
  "/directory-details/:id/:name?/:about?",
  "/directory-details/:id/:name?",
  "/related-businesses/:id",
  "/subscription",
  "/subscription-pricing/:id",
  "/claimed-business",
  "/claim-business/:id",
  "/submittedsuccessfully",
  "/profile/:id?",
  "/edit-business",
  "/view-job-details/:id",
  "/applicants/:id",
  "/jobs/view-applicant/:id",
  "/create-ad",
  "/edit-ad/:id",
  "/my-ads",
  "/my-application-details/:id/:applicationDetailsId",
  "/sign-up",
  "/seller-signUp",
  "/login",
  "/forgot-password",
  "/reset-password/:email",
  "/password-reset-successful",
  "/verification-code/:email?/:phoneNumber?",
  "/reset-password-verification-code/:email/",
  "/seller-verification",
  "/recommended-businesses",
  "/top-businesses",
  "/jobs-for-you",
  "/popular-jobs",
  "/privacy-and-policy",


];

async function generateSitemap() {
  const stream = new SitemapStream({ hostname: BASE_URL });

  const xml = await streamToPromise(
    Readable.from(
      routes.map((route) => ({
        url: route,
        changefreq: "weekly",
        priority: 0.8,
      }))
    ).pipe(stream)
  );

  await writeFile("./dist/sitemap.xml", xml.toString());
}

generateSitemap().catch(console.error);

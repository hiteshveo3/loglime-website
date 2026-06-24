import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content");

export function readContentFile(fileName: "legal-documents.md" | "website-copy.md") {
  return fs.readFileSync(path.join(contentDir, fileName), "utf8");
}

export function extractBetween(content: string, startMarker: string, endMarker?: string) {
  const start = content.indexOf(startMarker);

  if (start === -1) {
    return "";
  }

  const bodyStart = start + startMarker.length;
  const end = endMarker ? content.indexOf(endMarker, bodyStart) : -1;
  const raw = end === -1 ? content.slice(bodyStart) : content.slice(bodyStart, end);

  return raw
    .replaceAll("[EFFECTIVE_DATE]", "June 23, 2026")
    .replaceAll("[COMPANY_LEGAL_NAME]", "Loglime LLC")
    .replaceAll("[COMPANY_REGISTERED_ADDRESS]", "1207 Delaware Ave Ste 303, Wilmington, DE 19806, United States")
    .replaceAll("[COMPANY_ADDRESS]", "1207 Delaware Ave Ste 303, Wilmington, DE 19806, United States")
    .replaceAll("[GOVERNING_LAW_JURISDICTION]", "State of Delaware, United States")
    .replaceAll("[DISPUTE_JURISDICTION]", "Courts of Delaware, United States")
    .replaceAll("[ARBITRATION_BODY]", "American Arbitration Association (AAA)")
    .replace(/\n---\n/g, "\n")
    .trim();
}

export function getLegalDocument(documentNumber: number) {
  const content = readContentFile("legal-documents.md");
  const startMarker = `# DOCUMENT ${documentNumber}`;
  const endMarker = `# DOCUMENT ${documentNumber + 1}`;

  return extractBetween(content, startMarker, content.includes(endMarker) ? endMarker : "# APPENDIX");
}

export function getWebsiteSection(sectionMarker: string, endMarker?: string) {
  const content = readContentFile("website-copy.md");
  return extractBetween(content, sectionMarker, endMarker);
}
